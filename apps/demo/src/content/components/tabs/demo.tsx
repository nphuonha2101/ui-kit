"use client";

import { Input, Switch, Tabs } from "@nphuonha/ui-kit";

function TabsDemo() {
  return (
    <Tabs
      defaultValue="overview"
      listClassName="mx-auto"
      items={[
        {
          value: "overview",
          label: "Overview",
          content: (
            <div className="rounded-card bg-surface p-4 text-sm leading-6 text-muted-foreground">
              A clean segmented control with a sliding active pill and clear content panels.
            </div>
          ),
        },
        {
          value: "activity",
          label: "Activity",
          content: (
            <div className="rounded-card bg-surface p-4 text-sm leading-6 text-muted-foreground">
              Recent activity appears here.
            </div>
          ),
        },
        {
          value: "disabled",
          label: "Disabled",
          content: null,
          disabled: true,
        },
      ]}
    />
  );
}

function TabsSettingsDemo() {
  return (
    <Tabs
      defaultValue="general"
      items={[
        {
          value: "general",
          label: "General",
          content: (
            <div className="flex flex-col gap-3 rounded-card bg-surface p-4">
              <div className="text-sm font-medium">Workspace name</div>
              <Input defaultValue="Avery Studio" />
            </div>
          ),
        },
        {
          value: "notifications",
          label: "Notifications",
          content: (
            <div className="flex flex-col gap-3 rounded-card bg-surface p-4">
              <Switch label="Product updates" defaultChecked />
              <Switch label="Weekly digest" />
            </div>
          ),
        },
        {
          value: "danger",
          label: "Danger",
          content: (
            <div className="rounded-card bg-destructive/10 p-4 text-sm text-muted-foreground">
              Destructive settings can live in their own tab.
            </div>
          ),
        },
      ]}
    />
  );
}

export const demo = TabsDemo;
export const examples = {
  "tabs-settings": TabsSettingsDemo,
};
