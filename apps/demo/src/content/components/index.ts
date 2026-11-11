import { meta as buttonMeta } from "./button/meta";
import { meta as buttonLinkMeta } from "./button-link/meta";
import { meta as iconButtonMeta } from "./icon-button/meta";
import { meta as menuMeta } from "./menu/meta";
import { meta as toggleMeta } from "./toggle/meta";
import { meta as toggleGroupMeta } from "./toggle-group/meta";
import { meta as toolbarMeta } from "./toolbar/meta";
import { meta as calendarMeta } from "./calendar/meta";
import { meta as checkboxMeta } from "./checkbox/meta";
import { meta as checkboxGroupMeta } from "./checkbox-group/meta";
import { meta as colorPickerMeta } from "./color-picker/meta";
import { meta as comboboxMeta } from "./combobox/meta";
import { meta as datePickerMeta } from "./date-picker/meta";
import { meta as dateTimePickerMeta } from "./date-time-picker/meta";
import { meta as fieldMeta } from "./field/meta";
import { meta as fieldsetMeta } from "./fieldset/meta";
import { meta as fileUploadMeta } from "./file-upload/meta";
import { meta as inputMeta } from "./input/meta";
import { meta as labelMeta } from "./label/meta";
import { meta as numberFieldMeta } from "./number-field/meta";
import { meta as otpFieldMeta } from "./otp-field/meta";
import { meta as radioGroupMeta } from "./radio-group/meta";
import { meta as selectMeta } from "./select/meta";
import { meta as sliderMeta } from "./slider/meta";
import { meta as switchMeta } from "./switch/meta";
import { meta as textareaMeta } from "./textarea/meta";
import { meta as timeFieldMeta } from "./time-field/meta";
import { meta as alertDialogMeta } from "./alert-dialog/meta";
import { meta as dialogMeta } from "./dialog/meta";
import { meta as popoverMeta } from "./popover/meta";
import { meta as previewCardMeta } from "./preview-card/meta";
import { meta as sheetMeta } from "./sheet/meta";
import { meta as tooltipMeta } from "./tooltip/meta";
import { meta as bottomNavMeta } from "./bottom-nav/meta";
import { meta as breadcrumbMeta } from "./breadcrumb/meta";
import { meta as desktopNavMeta } from "./desktop-nav/meta";
import { meta as mobileNavMeta } from "./mobile-nav/meta";
import { meta as paginationMeta } from "./pagination/meta";
import { meta as tabsMeta } from "./tabs/meta";
import { meta as accordionMeta } from "./accordion/meta";
import { meta as avatarMeta } from "./avatar/meta";
import { meta as badgeMeta } from "./badge/meta";
import { meta as cardMeta } from "./card/meta";
import { meta as collapsibleMeta } from "./collapsible/meta";
import { meta as dataTableMeta } from "./data-table/meta";
import { meta as kbdMeta } from "./kbd/meta";
import { meta as scrollAreaMeta } from "./scroll-area/meta";
import { meta as separatorMeta } from "./separator/meta";
import { meta as tableMeta } from "./table/meta";
import { meta as alertMeta } from "./alert/meta";
import { meta as emptyStateMeta } from "./empty-state/meta";
import { meta as meterMeta } from "./meter/meta";
import { meta as progressMeta } from "./progress/meta";
import { meta as skeletonMeta } from "./skeleton/meta";
import { meta as spinnerMeta } from "./spinner/meta";
import { meta as toasterMeta } from "./toaster/meta";

import type { ComponentCategory, ComponentMeta } from "@/content/types";

export const registry: ComponentMeta[] = [
  buttonMeta,
  buttonLinkMeta,
  iconButtonMeta,
  menuMeta,
  toggleMeta,
  toggleGroupMeta,
  toolbarMeta,
  calendarMeta,
  checkboxMeta,
  checkboxGroupMeta,
  colorPickerMeta,
  comboboxMeta,
  datePickerMeta,
  dateTimePickerMeta,
  fieldMeta,
  fieldsetMeta,
  fileUploadMeta,
  inputMeta,
  labelMeta,
  numberFieldMeta,
  otpFieldMeta,
  radioGroupMeta,
  selectMeta,
  sliderMeta,
  switchMeta,
  textareaMeta,
  timeFieldMeta,
  alertDialogMeta,
  dialogMeta,
  popoverMeta,
  previewCardMeta,
  sheetMeta,
  tooltipMeta,
  bottomNavMeta,
  breadcrumbMeta,
  desktopNavMeta,
  mobileNavMeta,
  paginationMeta,
  tabsMeta,
  accordionMeta,
  avatarMeta,
  badgeMeta,
  cardMeta,
  collapsibleMeta,
  dataTableMeta,
  kbdMeta,
  scrollAreaMeta,
  separatorMeta,
  tableMeta,
  alertMeta,
  emptyStateMeta,
  meterMeta,
  progressMeta,
  skeletonMeta,
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
