import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "otp-field",
  "title": "OTP Field",
  "description": "A segmented one-time-code input with paste support, completion events and validation states.",
  "category": "Forms",
  "imports": "import { OTPField } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "length",
      "type": "number",
      "default": "6",
      "description": "Number of character slots."
    },
    {
      "name": "value",
      "type": "string",
      "description": "Controlled code value."
    },
    {
      "name": "defaultValue",
      "type": "string",
      "description": "Initial code for an uncontrolled field."
    },
    {
      "name": "onValueChange",
      "type": "(value: string) => void",
      "description": "Called with the current code on every edit."
    },
    {
      "name": "onValueComplete",
      "type": "(value: string) => void",
      "description": "Called when all slots are filled or a complete code is pasted."
    },
    {
      "name": "label",
      "type": "ReactNode",
      "description": "Visible label, linked to the first slot."
    },
    {
      "name": "description",
      "type": "ReactNode",
      "description": "Helper text below the slots."
    },
    {
      "name": "error",
      "type": "ReactNode",
      "description": "Error message and invalid state."
    },
    {
      "name": "required",
      "type": "boolean",
      "description": "Marks the label and native control as required."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "description": "Disables every slot."
    },
    {
      "name": "readOnly",
      "type": "boolean",
      "description": "Keeps the value visible but not editable."
    },
    {
      "name": "mask",
      "type": "boolean",
      "description": "Masks entered characters."
    },
    {
      "name": "autoSubmit",
      "type": "boolean",
      "description": "Submits the owning form when the code becomes complete."
    },
    {
      "name": "size",
      "type": "\"default\" | \"lg\"",
      "default": "\"default\"",
      "description": "Slot size."
    },
    {
      "name": "name",
      "type": "string",
      "description": "Name used when the owning form is submitted."
    }
  ],
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
