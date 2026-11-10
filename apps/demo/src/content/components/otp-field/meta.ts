import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "otp-field",
  "title": "OTP Field",
  "description": "A segmented one-time-code input with paste support, completion events and validation states.",
  "category": "Forms",
  "imports": "import { OTPField } from \"@nphuonha/ui-kit\";",
  "examples": [
    {
      "title": "Masked code",
      "description": "Use mask for PIN-style entry with fewer slots.",
      "demoKey": "otp-field-masked"
    },
    {
      "title": "Invalid code",
      "description": "Show a message when the entered code was rejected.",
      "demoKey": "otp-field-error"
    }
  ]
};
