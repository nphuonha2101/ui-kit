import type { ComponentSnippets } from "@/content/types";

import { snippets as buttonSnippets } from "./button/snippets";
import { snippets as iconButtonSnippets } from "./icon-button/snippets";
import { snippets as checkboxSnippets } from "./checkbox/snippets";
import { snippets as fieldSnippets } from "./field/snippets";
import { snippets as inputSnippets } from "./input/snippets";
import { snippets as labelSnippets } from "./label/snippets";
import { snippets as radioGroupSnippets } from "./radio-group/snippets";
import { snippets as selectSnippets } from "./select/snippets";
import { snippets as switchSnippets } from "./switch/snippets";
import { snippets as textareaSnippets } from "./textarea/snippets";
import { snippets as dialogSnippets } from "./dialog/snippets";
import { snippets as popoverSnippets } from "./popover/snippets";
import { snippets as sheetSnippets } from "./sheet/snippets";
import { snippets as tooltipSnippets } from "./tooltip/snippets";
import { snippets as bottomNavSnippets } from "./bottom-nav/snippets";
import { snippets as desktopNavSnippets } from "./desktop-nav/snippets";
import { snippets as tabsSnippets } from "./tabs/snippets";
import { snippets as badgeSnippets } from "./badge/snippets";
import { snippets as cardSnippets } from "./card/snippets";
import { snippets as separatorSnippets } from "./separator/snippets";
import { snippets as alertSnippets } from "./alert/snippets";
import { snippets as spinnerSnippets } from "./spinner/snippets";
import { snippets as toasterSnippets } from "./toaster/snippets";

const snippetsMap: Record<string, ComponentSnippets> = {
  "button": buttonSnippets,
  "icon-button": iconButtonSnippets,
  "checkbox": checkboxSnippets,
  "field": fieldSnippets,
  "input": inputSnippets,
  "label": labelSnippets,
  "radio-group": radioGroupSnippets,
  "select": selectSnippets,
  "switch": switchSnippets,
  "textarea": textareaSnippets,
  "dialog": dialogSnippets,
  "popover": popoverSnippets,
  "sheet": sheetSnippets,
  "tooltip": tooltipSnippets,
  "bottom-nav": bottomNavSnippets,
  "desktop-nav": desktopNavSnippets,
  "tabs": tabsSnippets,
  "badge": badgeSnippets,
  "card": cardSnippets,
  "separator": separatorSnippets,
  "alert": alertSnippets,
  "spinner": spinnerSnippets,
  "toaster": toasterSnippets,
};

export function getSnippets(slug: string) {
  return snippetsMap[slug];
}
