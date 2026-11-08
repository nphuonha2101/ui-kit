export type ComponentCategory =
  | "Actions"
  | "Forms"
  | "Overlays"
  | "Navigation"
  | "Data Display"
  | "Feedback";

export interface ComponentProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ComponentExampleMeta {
  title: string;
  description?: string;
  demoKey?: string;
}

export interface ComponentMeta {
  slug: string;
  title: string;
  description: string;
  category: ComponentCategory;
  imports: string;
  props: ComponentProp[];
  examples?: ComponentExampleMeta[];
}

export interface ComponentSnippets {
  preview: string;
  usage: string;
  examples?: Record<string, string>;
}
