import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import { OTPField } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"mx-auto w-full max-w-sm\">\n      <OTPField\n        label=\"Verification code\"\n        description=\"Enter the 6-digit code we sent to your email.\"\n      />\n    </div>\n  );\n}",
  "usage": "<OTPField\n  label=\"Verification code\"\n  length={6}\n  onValueComplete={(code) => verify(code)}\n/>",
  "examples": {
    "otp-field-masked": "import { OTPField } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"mx-auto w-full max-w-sm\">\n      <OTPField\n        label=\"PIN\"\n        length={4}\n        mask\n        description=\"Enter your 4-digit PIN.\"\n        size=\"lg\"\n      />\n    </div>\n  );\n}",
    "otp-field-error": "import { OTPField } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"mx-auto w-full max-w-sm\">\n      <OTPField\n        label=\"Verification code\"\n        defaultValue=\"123\"\n        error=\"That code is incorrect. Try again.\"\n      />\n    </div>\n  );\n}"
  }
};
