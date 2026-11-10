"use client";

import { CheckboxGroup } from "@nphuonha/ui-kit";

const channels = [
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS" },
  {
    value: "push",
    label: "Push notifications",
    description: "Mobile app only",
  },
];

function CheckboxGroupDemo() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <CheckboxGroup
        label="Notification channels"
        description="Choose where we should reach you."
        defaultValue={["email"]}
        options={channels}
      />
    </div>
  );
}

function CheckboxGroupHorizontalDemo() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <CheckboxGroup
        label="Dietary preferences"
        orientation="horizontal"
        options={[
          { value: "vegetarian", label: "Vegetarian" },
          { value: "vegan", label: "Vegan" },
          { value: "gluten", label: "Gluten free" },
        ]}
      />
    </div>
  );
}

function CheckboxGroupErrorDemo() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <CheckboxGroup
        label="Notification channels"
        required
        error="Choose at least one channel."
        options={[
          { value: "email", label: "Email" },
          { value: "sms", label: "SMS" },
        ]}
      />
    </div>
  );
}

export const demo = CheckboxGroupDemo;
export const examples = {
  "checkbox-group-horizontal": CheckboxGroupHorizontalDemo,
  "checkbox-group-error": CheckboxGroupErrorDemo,
};
