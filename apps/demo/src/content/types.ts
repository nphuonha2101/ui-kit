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
  /**
   * Rows for compound components that do not expose a single Props type.
   * When set, generated props are not used for this component.
   */
  manualProps?: ComponentProp[];
  /** Extra rows merged after generated props, e.g. nested fields or compound parts. */
  extraProps?: ComponentProp[];
  examples?: ComponentExampleMeta[];
}

export interface ComponentSnippets {
  preview: string;
  usage: string;
  examples?: Record<string, string>;
}
