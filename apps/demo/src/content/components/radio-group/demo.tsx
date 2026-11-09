"use client";

import { RadioGroup } from "@nphuonha/ui-kit";

function RadioGroupDemo() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <RadioGroup
        label="Plan"
        required
        defaultValue="pro"
        options={[
          { value: "free", label: "Free", description: "Basics for personal projects" },
          { value: "pro", label: "Pro", description: "Most features, unlimited projects" },
          { value: "team", label: "Team", description: "Collaboration and roles", disabled: true },
        ]}
      />
    </div>
  );
}

export const demo = RadioGroupDemo;
export const examples = {};
