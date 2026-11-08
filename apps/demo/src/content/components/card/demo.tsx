"use client";

import { Badge, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@nphuonha/ui-kit";
import { PlusIcon, ShareIcon } from "@phosphor-icons/react";

function CardDemo() {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>Project</CardTitle>
        <CardDescription>Manage your project settings and deployments.</CardDescription>
      </CardHeader>
      <CardContent className="text-sm leading-6 text-muted-foreground">
        Solid surfaces, clear hierarchy and a top-lit curved edge.
      </CardContent>
      <CardFooter>
        <Button size="sm">Save</Button>
        <Button size="sm" variant="ghost">Cancel</Button>
      </CardFooter>
    </Card>
  );
}

function CardProfileDemo() {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent className="flex items-center gap-3 pt-6">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary-soft-foreground">
          AQ
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">Avery Quinn</p>
          <p className="text-xs text-muted-foreground">Product designer</p>
        </div>
        <Badge variant="primary">Pro</Badge>
      </CardContent>
      <CardContent className="grid grid-cols-3 gap-2 pt-0 text-center">
        {[
          ["24", "Projects"],
          ["1.2k", "Followers"],
          ["86", "Following"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-control bg-surface p-2">
            <div className="text-sm font-semibold">{value}</div>
            <div className="text-[11px] text-muted-foreground">{label}</div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button className="flex-1" size="sm" startIcon={PlusIcon}>Follow</Button>
        <Button size="sm" variant="secondary" startIcon={ShareIcon}>Share</Button>
      </CardFooter>
    </Card>
  );
}

export const demo = CardDemo;
export const examples = {
  "card-profile": CardProfileDemo,
};
