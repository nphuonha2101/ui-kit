import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import { Alert } from \"@nphuonha/ui-kit\";\nimport {\n  CheckCircleIcon,\n  InfoIcon,\n  WarningIcon,\n} from \"@phosphor-icons/react\";\n\nexport function Example() {\n  return (\n    <div className=\"mx-auto flex w-full max-w-md flex-col gap-3\">\n      <Alert icon={InfoIcon} variant=\"info\" title=\"Heads up\">\n        A short supporting message with useful context.\n      </Alert>\n      <Alert icon={CheckCircleIcon} variant=\"success\" title=\"Saved\">\n        Your changes are live.\n      </Alert>\n      <Alert icon={WarningIcon} variant=\"danger\" title=\"Something went wrong\">\n        Check the form and try again.\n      </Alert>\n    </div>\n  );\n}",
  "usage": "<Alert variant=\"success\" title=\"Saved\">\n  Your changes are live.\n</Alert>",
  "examples": {}
};
