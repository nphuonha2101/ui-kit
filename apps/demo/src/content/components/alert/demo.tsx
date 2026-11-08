"use client";

import { Alert } from "@nphuonha/ui-kit";
import { CheckCircleIcon, InfoIcon, WarningIcon } from "@phosphor-icons/react";

function AlertDemo() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3">
      <Alert icon={InfoIcon} variant="info" title="Heads up">
        A short supporting message with useful context.
      </Alert>
      <Alert icon={CheckCircleIcon} variant="success" title="Saved">
        Your changes are live.
      </Alert>
      <Alert icon={WarningIcon} variant="danger" title="Something went wrong">
        Check the form and try again.
      </Alert>
    </div>
  );
}

export const demo = AlertDemo;
export const examples = {};
