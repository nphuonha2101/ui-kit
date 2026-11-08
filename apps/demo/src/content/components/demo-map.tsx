"use client";

import type * as React from "react";
import dynamic from "next/dynamic";

const buttonDemo = dynamic(() => import("./button/demo").then((module) => module.demo));
const iconButtonDemo = dynamic(() => import("./icon-button/demo").then((module) => module.demo));
const toggleGroupDemo = dynamic(() => import("./toggle-group/demo").then((module) => module.demo));
const checkboxDemo = dynamic(() => import("./checkbox/demo").then((module) => module.demo));
const fieldDemo = dynamic(() => import("./field/demo").then((module) => module.demo));
const inputDemo = dynamic(() => import("./input/demo").then((module) => module.demo));
const labelDemo = dynamic(() => import("./label/demo").then((module) => module.demo));
const numberFieldDemo = dynamic(() => import("./number-field/demo").then((module) => module.demo));
const radioGroupDemo = dynamic(() => import("./radio-group/demo").then((module) => module.demo));
const selectDemo = dynamic(() => import("./select/demo").then((module) => module.demo));
const sliderDemo = dynamic(() => import("./slider/demo").then((module) => module.demo));
const switchDemo = dynamic(() => import("./switch/demo").then((module) => module.demo));
const textareaDemo = dynamic(() => import("./textarea/demo").then((module) => module.demo));
const alertDialogDemo = dynamic(() => import("./alert-dialog/demo").then((module) => module.demo));
const dialogDemo = dynamic(() => import("./dialog/demo").then((module) => module.demo));
const popoverDemo = dynamic(() => import("./popover/demo").then((module) => module.demo));
const sheetDemo = dynamic(() => import("./sheet/demo").then((module) => module.demo));
const tooltipDemo = dynamic(() => import("./tooltip/demo").then((module) => module.demo));
const bottomNavDemo = dynamic(() => import("./bottom-nav/demo").then((module) => module.demo));
const breadcrumbDemo = dynamic(() => import("./breadcrumb/demo").then((module) => module.demo));
const desktopNavDemo = dynamic(() => import("./desktop-nav/demo").then((module) => module.demo));
const paginationDemo = dynamic(() => import("./pagination/demo").then((module) => module.demo));
const tabsDemo = dynamic(() => import("./tabs/demo").then((module) => module.demo));
const badgeDemo = dynamic(() => import("./badge/demo").then((module) => module.demo));
const cardDemo = dynamic(() => import("./card/demo").then((module) => module.demo));
const kbdDemo = dynamic(() => import("./kbd/demo").then((module) => module.demo));
const scrollAreaDemo = dynamic(() => import("./scroll-area/demo").then((module) => module.demo));
const separatorDemo = dynamic(() => import("./separator/demo").then((module) => module.demo));
const tableDemo = dynamic(() => import("./table/demo").then((module) => module.demo));
const alertDemo = dynamic(() => import("./alert/demo").then((module) => module.demo));
const emptyStateDemo = dynamic(() => import("./empty-state/demo").then((module) => module.demo));
const spinnerDemo = dynamic(() => import("./spinner/demo").then((module) => module.demo));
const toasterDemo = dynamic(() => import("./toaster/demo").then((module) => module.demo));

const buttonbuttonSizesExample = dynamic(() =>
  import("./button/demo").then((module) => module.examples["button-sizes"]),
);
const toggleGrouptoggleGroupMultipleExample = dynamic(() =>
  import("./toggle-group/demo").then((module) => module.examples["toggle-group-multiple"]),
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
  "toggle-group": toggleGroupDemo,
  "checkbox": checkboxDemo,
  "field": fieldDemo,
  "input": inputDemo,
  "label": labelDemo,
  "number-field": numberFieldDemo,
  "radio-group": radioGroupDemo,
  "select": selectDemo,
  "slider": sliderDemo,
  "switch": switchDemo,
  "textarea": textareaDemo,
  "alert-dialog": alertDialogDemo,
  "dialog": dialogDemo,
  "popover": popoverDemo,
  "sheet": sheetDemo,
  "tooltip": tooltipDemo,
  "bottom-nav": bottomNavDemo,
  "breadcrumb": breadcrumbDemo,
  "desktop-nav": desktopNavDemo,
  "pagination": paginationDemo,
  "tabs": tabsDemo,
  "badge": badgeDemo,
  "card": cardDemo,
  "kbd": kbdDemo,
  "scroll-area": scrollAreaDemo,
  "separator": separatorDemo,
  "table": tableDemo,
  "alert": alertDemo,
  "empty-state": emptyStateDemo,
  "spinner": spinnerDemo,
  "toaster": toasterDemo,
};

export const exampleMap: Record<string, React.ComponentType> = {
  "button-sizes": buttonbuttonSizesExample,
  "toggle-group-multiple": toggleGrouptoggleGroupMultipleExample,
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
