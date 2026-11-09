"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRightIcon, RocketLaunchIcon } from "@/components/icons";
import {
  Avatar,
  Badge,
  ButtonLink,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Progress,
  Separator,
  Switch,
  Toggle,
} from "@nphuonha/ui-kit";
import { BookmarkSimpleIcon } from "@phosphor-icons/react";

const tasks = [
  { id: "accordion", label: "Accordion", hint: "FAQ + settings" },
  { id: "avatar", label: "Avatar", hint: "Profiles + teams" },
  { id: "progress", label: "Progress", hint: "Uploads + setup" },
  { id: "toggle", label: "Toggle", hint: "Saved + filters" },
];

export function HeroShowcase() {
  const [shipped, setShipped] = React.useState<string[]>(["accordion", "avatar"]);
  const [autoPublish, setAutoPublish] = React.useState(true);
  const progress = Math.round((shipped.length / tasks.length) * 100);

  const setTask = (id: string, checked: boolean) => {
    setShipped((current) =>
      checked ? [...new Set([...current, id])] : current.filter((item) => item !== id),
    );
  };

  return (
    <div data-motion="hero-card" className="relative mx-auto w-full max-w-md">
      <div
        data-motion="hero-glow"
        className="absolute -inset-6 rounded-[2rem] bg-primary/10 blur-3xl"
        aria-hidden
      />
      <Card className="relative">
        <CardHeader className="p-7 pb-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-2">
              <CardTitle className="flex items-center gap-2">
                <RocketLaunchIcon size={17} className="text-primary" />
                New in the kit
              </CardTitle>
              <CardDescription>
                Five new building blocks, ready to compose.
              </CardDescription>
            </div>
            <Toggle size="icon-sm" aria-label="Watch release" defaultPressed>
              <BookmarkSimpleIcon size={16} />
            </Toggle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 p-7">
          <div className="flex items-center justify-between gap-3">
            <div className="flex -space-x-2">
              <Avatar alt="Minh Anh" size="sm" className="ring-2 ring-card" />
              <Avatar alt="Ada Lovelace" size="sm" className="ring-2 ring-card" />
              <Avatar alt="Grace Hopper" size="sm" className="ring-2 ring-card" />
              <span className="flex size-8 items-center justify-center rounded-full bg-surface text-xs font-semibold text-muted-foreground ring-2 ring-card">
                +2
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {shipped.length} of {tasks.length} shipped
            </span>
          </div>

          <Progress value={progress} label="Release checklist" showValue size="sm" />

          <div className="flex flex-col gap-3.5">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={task.id}
                    checked={shipped.includes(task.id)}
                    onCheckedChange={(checked) => setTask(task.id, checked)}
                  />
                  <label
                    htmlFor={task.id}
                    className="cursor-pointer text-sm font-medium leading-none"
                  >
                    {task.label}
                  </label>
                </div>
                <span className="text-xs text-muted-foreground">{task.hint}</span>
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">Auto-publish</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Push the tag when everything is green.
              </p>
            </div>
            <Switch
              checked={autoPublish}
              onCheckedChange={setAutoPublish}
              aria-label="Auto-publish"
            />
          </div>

          <ButtonLink
            render={<Link href="/docs/components" />}
            className="w-full"
            endIcon={ArrowUpRightIcon}
          >
            Browse components
          </ButtonLink>
        </CardContent>
      </Card>
      <div className="absolute -right-3 -top-3 rotate-6">
        <Badge variant="solid">Live</Badge>
      </div>
    </div>
  );
}
