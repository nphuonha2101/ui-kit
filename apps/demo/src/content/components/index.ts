import { meta as buttonMeta } from "./button/meta";
import { meta as iconButtonMeta } from "./icon-button/meta";
import { meta as toggleGroupMeta } from "./toggle-group/meta";
import { meta as checkboxMeta } from "./checkbox/meta";
import { meta as fieldMeta } from "./field/meta";
import { meta as inputMeta } from "./input/meta";
import { meta as labelMeta } from "./label/meta";
import { meta as numberFieldMeta } from "./number-field/meta";
import { meta as radioGroupMeta } from "./radio-group/meta";
import { meta as selectMeta } from "./select/meta";
import { meta as sliderMeta } from "./slider/meta";
import { meta as switchMeta } from "./switch/meta";
import { meta as textareaMeta } from "./textarea/meta";
import { meta as alertDialogMeta } from "./alert-dialog/meta";
import { meta as dialogMeta } from "./dialog/meta";
import { meta as popoverMeta } from "./popover/meta";
import { meta as sheetMeta } from "./sheet/meta";
import { meta as tooltipMeta } from "./tooltip/meta";
import { meta as bottomNavMeta } from "./bottom-nav/meta";
import { meta as breadcrumbMeta } from "./breadcrumb/meta";
import { meta as desktopNavMeta } from "./desktop-nav/meta";
import { meta as paginationMeta } from "./pagination/meta";
import { meta as tabsMeta } from "./tabs/meta";
import { meta as badgeMeta } from "./badge/meta";
import { meta as cardMeta } from "./card/meta";
import { meta as kbdMeta } from "./kbd/meta";
import { meta as scrollAreaMeta } from "./scroll-area/meta";
import { meta as separatorMeta } from "./separator/meta";
import { meta as tableMeta } from "./table/meta";
import { meta as alertMeta } from "./alert/meta";
import { meta as emptyStateMeta } from "./empty-state/meta";
import { meta as spinnerMeta } from "./spinner/meta";
import { meta as toasterMeta } from "./toaster/meta";

import type { ComponentCategory, ComponentMeta } from "@/content/types";

export const registry: ComponentMeta[] = [
  buttonMeta,
  iconButtonMeta,
  toggleGroupMeta,
  checkboxMeta,
  fieldMeta,
  inputMeta,
  labelMeta,
  numberFieldMeta,
  radioGroupMeta,
  selectMeta,
  sliderMeta,
  switchMeta,
  textareaMeta,
  alertDialogMeta,
  dialogMeta,
  popoverMeta,
  sheetMeta,
  tooltipMeta,
  bottomNavMeta,
  breadcrumbMeta,
  desktopNavMeta,
  paginationMeta,
  tabsMeta,
  badgeMeta,
  cardMeta,
  kbdMeta,
  scrollAreaMeta,
  separatorMeta,
  tableMeta,
  alertMeta,
  emptyStateMeta,
  spinnerMeta,
  toasterMeta,
];

export const categories: ComponentCategory[] = [
  "Actions",
  "Forms",
  "Overlays",
  "Navigation",
  "Data Display",
  "Feedback"
];

export const searchIndex = registry.map(({ slug, title, description, category }) => ({
  slug,
  title,
  description,
  category,
}));

export const componentGroups = categories.map((category) => ({
  category,
  components: registry.filter((entry) => entry.category === category),
}));

export function getComponent(slug: string) {
  return registry.find((entry) => entry.slug === slug);
}
