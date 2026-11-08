"use client";

import * as React from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  Input,
  Separator,
  Switch,
} from "@nphuonha/ui-kit";
import { AccentPicker } from "@/components/site/accent-picker";
import { useThemeSettings } from "@/components/site/providers";

export function ThemingPlayground() {
  const { dark, setDark, accent } = useThemeSettings();

  return (
    <Card>
      <CardContent className="flex flex-col gap-5 pt-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold">Accent</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Pick a preset or a custom color. The change applies instantly across the site.
            </p>
          </div>
          <Badge variant="primary">{accent ?? "default"}</Badge>
        </div>

        <AccentPicker />

        <Separator />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <Switch
            label="Dark mode"
            description="Applies the .dark token set."
            checked={dark}
            onCheckedChange={setDark}
          />
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">Primary</Button>
            <Button size="sm" variant="secondary">Secondary</Button>
            <Button size="sm" variant="soft">Soft</Button>
            <Button size="sm" variant="outline">Outline</Button>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-card bg-surface p-4 sm:flex-row sm:items-center">
          <Input placeholder="you@example.com" type="email" className="sm:flex-1" />
          <Button>Continue</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="solid">Solid</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
