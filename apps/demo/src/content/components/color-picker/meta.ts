import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "color-picker",
  "title": "ColorPicker",
  "description": "A hex color field with a saturation/brightness area, hue slider, presets and an optional eyedropper. Accepts and emits normalized #rrggbb values.",
  "category": "Forms",
  "imports": "import { ColorPicker } from \"@nphuonha/ui-kit\";",
  "examples": [
    {
      "title": "Presets",
      "description": "Pass swatches for quick choices and enable clearable when the color is optional.",
      "demoKey": "color-picker-presets"
    },
    {
      "title": "Custom color",
      "description": "Pick with the pointer or keyboard, or type a hex value directly.",
      "demoKey": "color-picker-custom"
    },
    {
      "title": "States",
      "description": "Disabled and invalid states share the same field styling as Input.",
      "demoKey": "color-picker-states"
    }
  ]
};
