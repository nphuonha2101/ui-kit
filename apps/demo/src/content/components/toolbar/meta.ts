import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "toolbar",
  "title": "Toolbar",
  "description": "A compact container for related actions, toggles, inputs and links with roving keyboard focus.",
  "category": "Actions",
  "imports": "import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarInput, ToolbarLink, ToolbarSeparator, ToolbarToggle } from \"@nphuonha/ui-kit\";",
  "extraProps": [
    {
      "name": "ToolbarGroup",
      "type": "component",
      "description": "Groups related controls so they are announced and navigated together."
    },
    {
      "name": "ToolbarButton",
      "type": "component",
      "description": "Button that joins the toolbar's roving focus order. Pass a trigger through render to compose it."
    },
    {
      "name": "ToolbarToggle",
      "type": "component",
      "description": "Two-state toolbar button for formatting and view options."
    },
    {
      "name": "ToolbarLink",
      "type": "component",
      "description": "Link that joins the toolbar's roving focus order."
    },
    {
      "name": "ToolbarInput",
      "type": "component",
      "description": "Compact input that joins the toolbar's roving focus order. Use at most one per horizontal toolbar."
    },
    {
      "name": "ToolbarSeparator",
      "type": "component",
      "description": "Divider between groups; its orientation follows the toolbar."
    }
  ],
  "examples": [
    {
      "title": "Vertical toolbar",
      "description": "Set orientation to vertical for canvas and editor tools.",
      "demoKey": "toolbar-vertical"
    },
    {
      "title": "Search toolbar",
      "description": "Use the plain variant and keep a single input last in a horizontal toolbar.",
      "demoKey": "toolbar-search"
    }
  ]
};
