"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  DotsThreeIcon,
  DownloadSimpleIcon,
  InfoIcon,
  PlusIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Dialog,
  Field,
  IconButton,
  Input,
  Progress,
  Separator,
  Tabs,
} from "@nphuonha/ui-kit";
import { registry } from "@/content/components";

function ButtonsScene() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm">Primary</Button>
        <Button size="sm" variant="secondary">
          Secondary
        </Button>
        <Button size="sm" variant="outline">
          Outline
        </Button>
        <Button size="sm" variant="ghost">
          Ghost
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" shape="pill" startIcon={PlusIcon}>
          New project
        </Button>
        <Button size="sm" variant="secondary" shape="pill" startIcon={DownloadSimpleIcon}>
          Export
        </Button>
        <Button size="sm" variant="danger" startIcon={TrashIcon}>
          Delete
        </Button>
        <IconButton aria-label="More actions" variant="ghost" size="icon-sm">
          <DotsThreeIcon size={17} weight="bold" />
        </IconButton>
      </div>
    </div>
  );
}

function FormScene() {
  return (
    <div className="w-full max-w-[16rem]">
      <p className="text-sm font-semibold">Sign in</p>
      <p className="mt-0.5 text-xs text-muted-foreground">Use your workspace account.</p>
      <div className="mt-3 flex flex-col gap-2.5">
        <Field label="Email">
          <Input type="email" placeholder="you@studio.com" className="h-9 text-[13px]" />
        </Field>
        <Field label="Password">
          <Input type="password" placeholder="••••••••" className="h-9 text-[13px]" />
        </Field>
        <Button size="sm" className="mt-1 w-full" type="button">
          Continue
        </Button>
      </div>
    </div>
  );
}

function DialogScene() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="w-full max-w-[15rem]">
      <div className="flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-full bg-primary-soft text-primary-soft-foreground">
          <InfoIcon size={16} />
        </span>
        <div>
          <p className="text-sm font-semibold">Invite teammate</p>
          <p className="text-[11px] text-muted-foreground">2 seats left on this plan</p>
        </div>
      </div>
      <Separator className="my-3" />
      <Button size="sm" className="w-full" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Invite a teammate"
        description="They will get access to every private project in this workspace."
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Send invite</Button>
          </>
        }
      >
        <Field label="Email address">
          <Input placeholder="teammate@studio.com" autoFocus />
        </Field>
      </Dialog>
    </div>
  );
}

function TabsScene() {
  return (
    <div className="w-full max-w-sm">
      <Tabs
        defaultValue="overview"
        items={[
          {
            value: "overview",
            label: "Overview",
            content: (
              <div className="rounded-control bg-surface p-4">
                <p className="text-xs font-medium">Solid surfaces</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Tonal fills replace outlines, so panels read as one material.
                </p>
              </div>
            ),
          },
          {
            value: "tokens",
            label: "Tokens",
            content: (
              <div className="rounded-control bg-surface p-4">
                <p className="text-xs font-medium">Semantic by default</p>
                <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                  --primary · --surface · --ring
                </p>
              </div>
            ),
          },
          {
            value: "motion",
            label: "Motion",
            content: (
              <div className="rounded-control bg-surface p-4">
                <p className="text-xs font-medium">Short and quiet</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  160–220ms, one easing curve, reduced-motion respected.
                </p>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

function CardScene() {
  return (
    <Card className="w-full max-w-[17rem] shadow-none">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Project
            </p>
            <p className="mt-1 text-sm font-semibold">Design tokens</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Migrate semantic colors across the marketing site.
            </p>
          </div>
          <Badge variant="warning">In review</Badge>
        </div>
        <Progress value={72} className="mt-4" size="sm" label="Progress" showValue />
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex -space-x-2">
            <Avatar alt="Minh Anh" size="sm" className="ring-2 ring-card" />
            <Avatar alt="Ada Lovelace" size="sm" className="ring-2 ring-card" />
            <Avatar alt="Grace Hopper" size="sm" className="ring-2 ring-card" />
          </div>
          <Button size="sm" variant="secondary">
            Open
          </Button>
        </div>
      </div>
    </Card>
  );
}

function StatusScene() {
  return (
    <div className="flex w-full max-w-[17rem] flex-col gap-2.5">
      <div className="flex flex-wrap gap-1.5">
        <Badge variant="primary">New</Badge>
        <Badge variant="success">Passing</Badge>
        <Badge variant="warning">Review</Badge>
        <Badge variant="danger">Failed</Badge>
      </div>
      <Alert variant="success" icon={CheckCircleIcon} title="Build complete">
        All 57 components compiled in 3.2s.
      </Alert>
      <Alert variant="info" icon={InfoIcon} title="Heads up">
        Accent changes apply to portals too.
      </Alert>
    </div>
  );
}

const tiles = [
  { slug: "button", span: "lg:col-span-7", scene: <ButtonsScene /> },
  { slug: "input", span: "lg:col-span-5", scene: <FormScene /> },
  { slug: "dialog", span: "lg:col-span-5", scene: <DialogScene /> },
  { slug: "tabs", span: "lg:col-span-7", scene: <TabsScene /> },
  { slug: "card", span: "lg:col-span-6", scene: <CardScene /> },
  { slug: "badge", span: "lg:col-span-6", scene: <StatusScene /> },
];

export function ShowcaseTiles() {
  return (
    <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
      {tiles.map((tile) => {
        const entry = registry.find((component) => component.slug === tile.slug);
        if (!entry) return null;
        return (
          <article
            key={tile.slug}
            data-motion="component-card"
            className={`surface-curved group relative flex flex-col overflow-hidden rounded-card bg-card shadow-soft transition-[transform,box-shadow] duration-[var(--duration-ui-slow)] ease-[var(--ease-out-ui)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-raised)] ${tile.span}`}
          >
            <div className="preview-canvas relative flex min-h-64 flex-1 items-center justify-center overflow-hidden p-6">
              {tile.scene}
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-border/50 px-5 py-3.5">
              <p className="truncate text-sm font-semibold">{entry.title}</p>
              <Link
                href={`/docs/components/${tile.slug}`}
                className="inline-flex shrink-0 items-center gap-1 rounded-pill px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
              >
                Docs <ArrowUpRightIcon size={13} />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
