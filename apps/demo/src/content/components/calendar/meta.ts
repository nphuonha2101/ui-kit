import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "calendar",
  "title": "Calendar",
  "description": "An inline date grid with single and range selection, keyboard navigation and locale-aware weeks. Use DatePicker for an input-style field.",
  "category": "Forms",
  "imports": "import { Calendar } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "mode",
      "type": "\"single\" | \"range\"",
      "default": "\"single\"",
      "description": "Selection model."
    },
    {
      "name": "value",
      "type": "Date | CalendarRange | null",
      "description": "Controlled selection. Use Date for single and { from, to } for range."
    },
    {
      "name": "defaultValue",
      "type": "Date | CalendarRange | null",
      "description": "Initial selection for uncontrolled usage."
    },
    {
      "name": "onValueChange",
      "type": "(value: Date | CalendarRange | null) => void",
      "description": "Called when the selection changes."
    },
    {
      "name": "onBlur",
      "type": "FocusEventHandler<HTMLDivElement>",
      "description": "Blur handler for react-hook-form."
    },
    {
      "name": "month",
      "type": "Date",
      "description": "Controlled visible month."
    },
    {
      "name": "defaultMonth",
      "type": "Date",
      "description": "Initial visible month. Defaults to the selected date or today."
    },
    {
      "name": "onMonthChange",
      "type": "(month: Date) => void",
      "description": "Called when the visible month changes."
    },
    {
      "name": "min",
      "type": "Date",
      "description": "Earliest selectable day."
    },
    {
      "name": "max",
      "type": "Date",
      "description": "Latest selectable day."
    },
    {
      "name": "disabled",
      "type": "(date: Date) => boolean",
      "description": "Disables individual days."
    },
    {
      "name": "locale",
      "type": "Intl.LocalesArgument",
      "description": "Locale used for month, weekday and day labels."
    },
    {
      "name": "weekStartsOn",
      "type": "0 | 1 | 2 | 3 | 4 | 5 | 6",
      "description": "First day of the week. Defaults to the locale's week info."
    },
    {
      "name": "showOutsideDays",
      "type": "boolean",
      "default": "true",
      "description": "Renders days from the previous and next months."
    },
    {
      "name": "size",
      "type": "\"sm\" | \"default\"",
      "default": "\"default\"",
      "description": "Day cell size."
    },
    {
      "name": "label",
      "type": "ReactNode",
      "description": "Visible label."
    },
    {
      "name": "description",
      "type": "ReactNode",
      "description": "Helper text."
    },
    {
      "name": "error",
      "type": "ReactNode",
      "description": "Error message and invalid state."
    },
    {
      "name": "required",
      "type": "boolean",
      "description": "Marks the label and grid as required."
    },
    {
      "name": "footer",
      "type": "ReactNode",
      "description": "Slot below the grid for actions or a selection summary."
    }
  ],
  "examples": [
    {
      "title": "Range selection",
      "description": "Set mode to range and use a { from, to } value. Hovering previews the second endpoint.",
      "demoKey": "calendar-range"
    },
    {
      "title": "Compact size",
      "description": "Use size=\"sm\" for tighter layouts. For an input-style field, use DatePicker.",
      "demoKey": "calendar-compact"
    },
    {
      "title": "Constraints",
      "description": "Limit selectable days with min, max and a disabled predicate.",
      "demoKey": "calendar-constraints"
    }
  ]
};
