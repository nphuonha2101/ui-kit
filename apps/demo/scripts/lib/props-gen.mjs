import ts from "typescript";
import fs from "node:fs";
import path from "node:path";

const SOURCE_RE = /\.tsx?$/;
const TEST_RE = /(?:\.test|\.spec)\.tsx?$/;

export const SPECIAL_PROPS_TYPES = {
  "button-link": "ButtonLinkProps",
  "otp-field": "OTPFieldProps",
  toaster: "ToasterProps",
};

export function pascalCase(value) {
  return value.replace(/(^|-)([a-z0-9])/g, (_, __, char) => char.toUpperCase());
}

export function propsTypeName(slug) {
  return SPECIAL_PROPS_TYPES[slug] ?? `${pascalCase(slug)}Props`;
}

export function walkDir(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDir(full, out);
    else out.push(full);
  }
  return out;
}

export function createKitProgram(kitSrcDir) {
  const files = walkDir(kitSrcDir).filter(
    (file) => SOURCE_RE.test(file) && !TEST_RE.test(file) && !file.includes(`${path.sep}test${path.sep}`),
  );
  const program = ts.createProgram(files, {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.ReactJSX,
    strict: true,
    skipLibCheck: true,
    esModuleInterop: true,
    lib: ["lib.dom.d.ts", "lib.esnext.d.ts"],
  });
  return { program, checker: program.getTypeChecker(), files };
}

export function readMeta(metaFile) {
  const source = fs.readFileSync(metaFile, "utf8");
  const match = source.match(/export const meta: ComponentMeta = ([\s\S]*?);\s*$/);
  if (!match) throw new Error(`Could not parse ${metaFile}`);
  return JSON.parse(match[1]);
}

export function buildExportedTypeIndex(program) {
  const index = new Map();
  for (const sourceFile of program.getSourceFiles()) {
    if (sourceFile.isDeclarationFile) continue;
    for (const statement of sourceFile.statements) {
      if (!ts.isInterfaceDeclaration(statement) && !ts.isTypeAliasDeclaration(statement)) continue;
      if (!statement.name.text.endsWith("Props")) continue;
      const exported = statement.modifiers?.some(
        (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
      );
      if (!exported) continue;
      const name = statement.name.text;
      const entries = index.get(name) ?? [];
      entries.push({ node: statement, sourceFile });
      index.set(name, entries);
    }
  }
  return index;
}

export function resolvePropsDeclaration(index, slug) {
  const typeName = propsTypeName(slug);
  const entries = index.get(typeName);
  if (!entries?.length) return null;
  if (entries.length > 1) {
    const files = entries.map((entry) => path.basename(entry.sourceFile.fileName)).join(", ");
    throw new Error(`Multiple exported ${typeName} declarations found: ${files}`);
  }
  return { ...entries[0], typeName };
}

function tagText(tag) {
  const value = tag.comment ?? tag.text;
  const text =
    typeof value === "string" ? value : ts.displayPartsToString(value ?? []);
  return text.trim().replace(/\s+/g, " ");
}

export function parseDocsTags(decl) {
  const docs = new Map();
  for (const tag of ts.getJSDocTags(decl)) {
    const tagName = tag.tagName.text;
    if (tagName !== "docs" && tagName !== "docsDefault" && tagName !== "docsType") continue;
    const text = tagText(tag);
    if (!text) continue;
    const space = text.indexOf(" ");
    if (space === -1) continue;
    const propName = text.slice(0, space);
    const value = text.slice(space + 1).trim();
    const entry = docs.get(propName) ?? {};
    if (tagName === "docs") entry.description = value;
    else if (tagName === "docsDefault") entry.default = value;
    else entry.type = value;
    docs.set(propName, entry);
  }
  return docs;
}

function isKitFile(fileName, kitSrcDir) {
  return fileName.startsWith(kitSrcDir + path.sep);
}

export function isCvaVariantDeclaration(decl) {
  if (!ts.isPropertyAssignment(decl)) return false;
  const variantsObject = decl.parent;
  if (!ts.isObjectLiteralExpression(variantsObject)) return false;
  const variantsProperty = variantsObject.parent;
  if (!ts.isPropertyAssignment(variantsProperty)) return false;
  if (variantsProperty.name.getText() !== "variants") return false;
  const optionsObject = variantsProperty.parent;
  if (!ts.isObjectLiteralExpression(optionsObject)) return false;
  const call = optionsObject.parent;
  if (!ts.isCallExpression(call)) return false;
  return ts.isIdentifier(call.expression) && call.expression.text === "cva";
}

function propertyName(node) {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) {
    return node.text;
  }
  return undefined;
}

function getKitDeclaration(symbol, kitSrcDir) {
  for (const decl of symbol.declarations ?? []) {
    if (!isKitFile(decl.getSourceFile().fileName, kitSrcDir)) continue;
    if (isCvaVariantDeclaration(decl)) {
      return { decl, kind: "cva" };
    }
    if (ts.isPropertySignature(decl)) {
      return { decl, kind: "property" };
    }
  }
  return null;
}

function getCvaVariantKeys(decl) {
  const initializer = decl.initializer;
  if (!ts.isObjectLiteralExpression(initializer)) return [];
  return initializer.properties
    .map((property) => {
      if (ts.isPropertyAssignment(property) || ts.isShorthandPropertyAssignment(property)) {
        return propertyName(property.name);
      }
      return undefined;
    })
    .filter(Boolean);
}

function findDefaultVariants(decl) {
  const variantsObject = decl.parent;
  const optionsObject = variantsObject?.parent?.parent;
  if (!ts.isObjectLiteralExpression(optionsObject)) return null;
  for (const property of optionsObject.properties) {
    if (!ts.isPropertyAssignment(property)) continue;
    if (property.name.getText() !== "defaultVariants") continue;
    if (!ts.isObjectLiteralExpression(property.initializer)) continue;
    return property.initializer;
  }
  return null;
}

function formatInitializer(node) {
  if (!node) return undefined;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return JSON.stringify(node.text);
  }
  if (ts.isNumericLiteral(node)) return node.text;
  if (node.kind === ts.SyntaxKind.TrueKeyword) return "true";
  if (node.kind === ts.SyntaxKind.FalseKeyword) return "false";
  if (node.kind === ts.SyntaxKind.NullKeyword) return "null";
  if (ts.isPrefixUnaryExpression(node)) return node.getText();
  const text = node.getText().trim();
  return text || undefined;
}

export function getCvaDefault(decl, name) {
  const defaults = findDefaultVariants(decl);
  if (!defaults) return undefined;
  for (const property of defaults.properties) {
    if (!ts.isPropertyAssignment(property)) continue;
    if (propertyName(property.name) !== name) continue;
    return formatInitializer(property.initializer);
  }
  return undefined;
}

function bindingName(node) {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node)) return node.text;
  return undefined;
}

export function collectDefaults(folder, mainFile) {
  const files = fs
    .readdirSync(folder)
    .filter((entry) => SOURCE_RE.test(entry) && !TEST_RE.test(entry))
    .map((entry) => path.join(folder, entry))
    .sort((a, b) => {
      if (a === mainFile) return -1;
      if (b === mainFile) return 1;
      return a.localeCompare(b);
    });

  const defaults = new Map();
  const ambiguous = new Set();
  const addDefault = (name, value) => {
    if (!name || !value) return;
    if (defaults.has(name) && defaults.get(name) !== value) {
      ambiguous.add(name);
      defaults.delete(name);
      return;
    }
    if (!ambiguous.has(name)) defaults.set(name, value);
  };

  for (const file of files) {
    const sourceText = fs.readFileSync(file, "utf8");
    const sourceFile = ts.createSourceFile(file, sourceText, ts.ScriptTarget.ES2020, true, ts.ScriptKind.TSX);
    const visit = (node) => {
      if (ts.isBindingElement(node) && node.initializer) {
        addDefault(bindingName(node.propertyName ?? node.name), formatInitializer(node.initializer));
      }
      ts.forEachChild(node, visit);
    };
    visit(sourceFile);
  }

  return defaults;
}

function getTag(symbol, name) {
  const tag = symbol.getJsDocTags().find((entry) => entry.name === name);
  if (!tag) return undefined;
  return tagText(tag) || undefined;
}

function isWrappedFunction(type) {
  if (!type.startsWith("(") || !type.endsWith(")")) return false;
  let depth = 0;
  for (let index = 0; index < type.length; index += 1) {
    if (type[index] === "(") depth += 1;
    else if (type[index] === ")") {
      depth -= 1;
      if (depth === 0 && index < type.length - 1) return false;
    }
  }
  return depth === 0 && type.slice(1, -1).includes("=>");
}

function simplifyType(value) {
  let type = value.replace(/\s+/g, " ").trim();
  type = type.replace(
    /React\.ReactElement<unknown, string \| (?:React\.)?JSXElementConstructor<any>>/g,
    "ReactElement",
  );
  type = type.replace(/React\.ReactElement<[^<>]*>/g, "ReactElement");
  type = type.replace(/React\./g, "");
  type = type.replace(/\s*\|\s*undefined\b/g, "");
  type = type.replace(/^undefined\s*\|\s*/, "");
  if (isWrappedFunction(type)) type = type.slice(1, -1);
  return type.trim();
}

function formatType(symbol, decl, checker) {
  const override = getTag(symbol, "type");
  if (override) return override;
  const target = decl ?? symbol.declarations?.[0] ?? decl;
  const type = checker.getTypeOfSymbolAtLocation(symbol, target);
  const value = checker.typeToString(type, target, ts.TypeFormatFlags.NoTruncation);
  return simplifyType(value);
}

function formatCvaType(decl) {
  const keys = getCvaVariantKeys(decl);
  return keys.length ? keys.map((key) => JSON.stringify(key)).join(" | ") : "string";
}

function getDescription(symbol, checker) {
  return ts.displayPartsToString(symbol.getDocumentationComment(checker)).trim().replace(/\s+/g, " ");
}

export function extractProps({ program, checker, kitSrcDir, decl }) {
  const type = checker.getTypeAtLocation(decl.name);
  const symbols = checker.getPropertiesOfType(type);
  const docsTags = parseDocsTags(decl);
  const hasIgnore = (symbol) => symbol.getJsDocTags().some((tag) => tag.name === "ignore");
  const mainFile = decl.getSourceFile().fileName;
  const defaults = collectDefaults(path.dirname(mainFile), mainFile);
  const unionDecls = new Set();
  if (type.isUnion()) {
    for (const constituent of type.types) {
      for (const declaration of constituent.symbol?.declarations ?? []) {
        unionDecls.add(declaration);
      }
    }
  }

  const cva = [];
  const kit = [];
  const inherited = [];
  const seen = new Set();

  for (const symbol of symbols) {
    const name = symbol.getName();
    if (seen.has(name)) continue;
    seen.add(name);

    const info = getKitDeclaration(symbol, kitSrcDir);
    const docsTag = docsTags.get(name);
    const description = docsTag?.description ?? getDescription(symbol, checker);
    if (hasIgnore(symbol)) continue;
    if (!info && !docsTag) continue;
    if (!description) continue;

    const tagDefault = info ? getTag(symbol, "default") : undefined;
    const defaultTag = docsTag?.default;
    let defaultValue;
    let order;

    if (info?.kind === "cva") {
      defaultValue = tagDefault ?? defaults.get(name) ?? getCvaDefault(info.decl, name);
      const variantsObject = info.decl.parent;
      order = variantsObject.properties.findIndex((property) => property === info.decl);
      cva.push({
        name,
        type: formatCvaType(info.decl),
        ...(defaultValue ? { default: defaultValue } : {}),
        description,
        order,
      });
      continue;
    }

    const declForType = info?.kind === "property" ? info.decl : symbol.declarations?.[0] ?? decl;
    defaultValue = tagDefault ?? defaultTag ?? defaults.get(name);
    const unionBranch = info?.kind === "property" && unionDecls.has(info.decl.parent);
    const prop = {
      name,
      type: docsTag?.type ?? formatType(symbol, info?.kind === "property" ? info.decl : undefined, checker),
      ...(defaultValue ? { default: defaultValue } : {}),
      description,
      sourceFile: declForType.getSourceFile().fileName,
      position: info?.kind === "property" ? info.decl.getStart() : Number.MAX_SAFE_INTEGER,
      priority: unionBranch ? 0 : 1,
    };

    if (info) kit.push(prop);
    else inherited.push(prop);
  }

  const fileOrder = (file) => {
    if (file === mainFile) return 0;
    if (path.dirname(file) === path.dirname(mainFile)) return 1;
    return 2;
  };

  cva.sort((a, b) => a.order - b.order);
  kit.sort((a, b) => {
    const priorityDiff = a.priority - b.priority;
    if (priorityDiff !== 0) return priorityDiff;
    const fileDiff = fileOrder(a.sourceFile) - fileOrder(b.sourceFile);
    if (fileDiff !== 0) return fileDiff;
    const fileDiffByName = a.sourceFile.localeCompare(b.sourceFile);
    if (fileDiffByName !== 0) return fileDiffByName;
    return a.position - b.position;
  });
  const docsOrder = new Map([...docsTags.keys()].map((name, index) => [name, index]));
  inherited.sort(
    (a, b) => (docsOrder.get(a.name) ?? 0) - (docsOrder.get(b.name) ?? 0),
  );

  return [
    ...cva.map(({ order: _order, ...prop }) => prop),
    ...kit.map(({ sourceFile: _file, position: _position, priority: _priority, ...prop }) => prop),
    ...inherited.map(({ sourceFile: _file, position: _position, priority: _priority, ...prop }) => prop),
  ];
}
