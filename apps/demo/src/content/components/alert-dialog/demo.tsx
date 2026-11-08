"use client";

import * as React from "react";
import { WarningIcon } from "@phosphor-icons/react";
import { AlertDialog, Button, toast } from "@nphuonha/ui-kit";

function AlertDialogDemo() {
  return (
    <AlertDialog
      trigger={<Button variant="danger">Delete project</Button>}
      icon={WarningIcon}
      title="Delete project?"
      description="This will permanently remove the project and all of its data. This action cannot be undone."
      confirmLabel="Delete project"
      onConfirm={() => toast("Project deleted")}
    />
  );
}

export const demo = AlertDialogDemo;
export const examples = {};
