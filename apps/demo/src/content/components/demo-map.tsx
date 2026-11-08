"use client";

import type * as React from "react";
import dynamic from "next/dynamic";

const buttonDemo = dynamic(() => import("./button/demo").then((module) => module.demo));
const iconButtonDemo = dynamic(() => import("./icon-button/demo").then((module) => module.demo));
const checkboxDemo = dynamic(() => import("./checkbox/demo").then((module) => module.demo));
const fieldDemo = dynamic(() => import("./field/demo").then((module) => module.demo));
const inputDemo = dynamic(() => import("./input/demo").then((module) => module.demo));
const labelDemo = dynamic(() => import("./label/demo").then((module) => module.demo));
const radioGroupDemo = dynamic(() => import("./radio-group/demo").then((module) => module.demo));
const selectDemo = dynamic(() => import("./select/demo").then((module) => module.demo));
const switchDemo = dynamic(() => import("./switch/demo").then((module) => module.demo));
const textareaDemo = dynamic(() => import("./textarea/demo").then((module) => module.demo));
const dialogDemo = dynamic(() => import("./dialog/demo").then((module) => module.demo));
const popoverDemo = dynamic(() => import("./popover/demo").then((module) => module.demo));
const sheetDemo = dynamic(() => import("./sheet/demo").then((module) => module.demo));
const tooltipDemo = dynamic(() => import("./tooltip/demo").then((module) => module.demo));
const tabsDemo = dynamic(() => import("./tabs/demo").then((module) => module.demo));
const badgeDemo = dynamic(() => import("./badge/demo").then((module) => module.demo));
const cardDemo = dynamic(() => import("./card/demo").then((module) => module.demo));
const separatorDemo = dynamic(() => import("./separator/demo").then((module) => module.demo));
const alertDemo = dynamic(() => import("./alert/demo").then((module) => module.demo));
const spinnerDemo = dynamic(() => import("./spinner/demo").then((module) => module.demo));
const toasterDemo = dynamic(() => import("./toaster/demo").then((module) => module.demo));

const buttonbuttonSizesExample = dynamic(() =>
  import("./button/demo").then((module) => module.examples["button-sizes"]),
);
const selectselectFieldExample = dynamic(() =>
  import("./select/demo").then((module) => module.examples["select-field"]),
);
const tabstabsSettingsExample = dynamic(() =>
  import("./tabs/demo").then((module) => module.examples["tabs-settings"]),
);
const cardcardProfileExample = dynamic(() =>
  import("./card/demo").then((module) => module.examples["card-profile"]),
);
const toastertoastPromiseExample = dynamic(() =>
  import("./toaster/demo").then((module) => module.examples["toast-promise"]),
);

export const demoMap: Record<string, React.ComponentType> = {
  "button": buttonDemo,
  "icon-button": iconButtonDemo,
  "checkbox": checkboxDemo,
  "field": fieldDemo,
  "input": inputDemo,
  "label": labelDemo,
  "radio-group": radioGroupDemo,
  "select": selectDemo,
  "switch": switchDemo,
  "textarea": textareaDemo,
  "dialog": dialogDemo,
  "popover": popoverDemo,
  "sheet": sheetDemo,
  "tooltip": tooltipDemo,
  "tabs": tabsDemo,
  "badge": badgeDemo,
  "card": cardDemo,
  "separator": separatorDemo,
  "alert": alertDemo,
  "spinner": spinnerDemo,
  "toaster": toasterDemo,
};

export const exampleMap: Record<string, React.ComponentType> = {
  "button-sizes": buttonbuttonSizesExample,
  "select-field": selectselectFieldExample,
  "tabs-settings": tabstabsSettingsExample,
  "card-profile": cardcardProfileExample,
  "toast-promise": toastertoastPromiseExample,
};

export function ComponentDemo({ slug }: { slug: string }) {
  const Demo = demoMap[slug];
  return Demo ? <Demo /> : null;
}

export function ExampleDemo({ demoKey }: { demoKey: string }) {
  const Demo = exampleMap[demoKey];
  return Demo ? <Demo /> : null;
}
