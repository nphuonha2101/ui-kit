"use client";

import { Progress } from "@nphuonha/ui-kit";

function ProgressDemo() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <Progress value={64} label="Uploading assets" showValue />
      <Progress value={32} label="Storage used" tone="success" showValue />
      <Progress
        value={82}
        label="Plan limit"
        tone="warning"
        size="lg"
        showValue
      />
    </div>
  );
}

function ProgressIndeterminateDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Progress value={null} label="Preparing workspace" showValue />
    </div>
  );
}

function ProgressTonesDemo() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4">
      <Progress value={48} label="Primary" size="sm" showValue />
      <Progress value={64} label="Success" tone="success" showValue />
      <Progress value={78} label="Warning" tone="warning" showValue />
      <Progress value={92} label="Danger" tone="danger" showValue />
    </div>
  );
}

export const demo = ProgressDemo;
export const examples = {
  "progress-indeterminate": ProgressIndeterminateDemo,
  "progress-tones": ProgressTonesDemo,
};
