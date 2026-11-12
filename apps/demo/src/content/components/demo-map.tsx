"use client";

import type * as React from "react";
import dynamic from "next/dynamic";

const buttonDemo = dynamic(() => import("./button/demo").then((module) => module.demo));
const buttonLinkDemo = dynamic(() => import("./button-link/demo").then((module) => module.demo));
const contextMenuDemo = dynamic(() => import("./context-menu/demo").then((module) => module.demo));
const iconButtonDemo = dynamic(() => import("./icon-button/demo").then((module) => module.demo));
const menuDemo = dynamic(() => import("./menu/demo").then((module) => module.demo));
const toggleDemo = dynamic(() => import("./toggle/demo").then((module) => module.demo));
const toggleGroupDemo = dynamic(() => import("./toggle-group/demo").then((module) => module.demo));
const toolbarDemo = dynamic(() => import("./toolbar/demo").then((module) => module.demo));
const calendarDemo = dynamic(() => import("./calendar/demo").then((module) => module.demo));
const checkboxDemo = dynamic(() => import("./checkbox/demo").then((module) => module.demo));
const checkboxGroupDemo = dynamic(() => import("./checkbox-group/demo").then((module) => module.demo));
const colorPickerDemo = dynamic(() => import("./color-picker/demo").then((module) => module.demo));
const comboboxDemo = dynamic(() => import("./combobox/demo").then((module) => module.demo));
const datePickerDemo = dynamic(() => import("./date-picker/demo").then((module) => module.demo));
const dateTimePickerDemo = dynamic(() => import("./date-time-picker/demo").then((module) => module.demo));
const fieldDemo = dynamic(() => import("./field/demo").then((module) => module.demo));
const fieldsetDemo = dynamic(() => import("./fieldset/demo").then((module) => module.demo));
const fileUploadDemo = dynamic(() => import("./file-upload/demo").then((module) => module.demo));
const inputDemo = dynamic(() => import("./input/demo").then((module) => module.demo));
const labelDemo = dynamic(() => import("./label/demo").then((module) => module.demo));
const numberFieldDemo = dynamic(() => import("./number-field/demo").then((module) => module.demo));
const otpFieldDemo = dynamic(() => import("./otp-field/demo").then((module) => module.demo));
const radioGroupDemo = dynamic(() => import("./radio-group/demo").then((module) => module.demo));
const selectDemo = dynamic(() => import("./select/demo").then((module) => module.demo));
const sliderDemo = dynamic(() => import("./slider/demo").then((module) => module.demo));
const switchDemo = dynamic(() => import("./switch/demo").then((module) => module.demo));
const textareaDemo = dynamic(() => import("./textarea/demo").then((module) => module.demo));
const timeFieldDemo = dynamic(() => import("./time-field/demo").then((module) => module.demo));
const alertDialogDemo = dynamic(() => import("./alert-dialog/demo").then((module) => module.demo));
const dialogDemo = dynamic(() => import("./dialog/demo").then((module) => module.demo));
const popoverDemo = dynamic(() => import("./popover/demo").then((module) => module.demo));
const previewCardDemo = dynamic(() => import("./preview-card/demo").then((module) => module.demo));
const sheetDemo = dynamic(() => import("./sheet/demo").then((module) => module.demo));
const tooltipDemo = dynamic(() => import("./tooltip/demo").then((module) => module.demo));
const bottomNavDemo = dynamic(() => import("./bottom-nav/demo").then((module) => module.demo));
const breadcrumbDemo = dynamic(() => import("./breadcrumb/demo").then((module) => module.demo));
const desktopNavDemo = dynamic(() => import("./desktop-nav/demo").then((module) => module.demo));
const mobileNavDemo = dynamic(() => import("./mobile-nav/demo").then((module) => module.demo));
const paginationDemo = dynamic(() => import("./pagination/demo").then((module) => module.demo));
const tabsDemo = dynamic(() => import("./tabs/demo").then((module) => module.demo));
const accordionDemo = dynamic(() => import("./accordion/demo").then((module) => module.demo));
const avatarDemo = dynamic(() => import("./avatar/demo").then((module) => module.demo));
const badgeDemo = dynamic(() => import("./badge/demo").then((module) => module.demo));
const cardDemo = dynamic(() => import("./card/demo").then((module) => module.demo));
const collapsibleDemo = dynamic(() => import("./collapsible/demo").then((module) => module.demo));
const dataTableDemo = dynamic(() => import("./data-table/demo").then((module) => module.demo));
const kbdDemo = dynamic(() => import("./kbd/demo").then((module) => module.demo));
const scrollAreaDemo = dynamic(() => import("./scroll-area/demo").then((module) => module.demo));
const separatorDemo = dynamic(() => import("./separator/demo").then((module) => module.demo));
const tableDemo = dynamic(() => import("./table/demo").then((module) => module.demo));
const alertDemo = dynamic(() => import("./alert/demo").then((module) => module.demo));
const emptyStateDemo = dynamic(() => import("./empty-state/demo").then((module) => module.demo));
const meterDemo = dynamic(() => import("./meter/demo").then((module) => module.demo));
const progressDemo = dynamic(() => import("./progress/demo").then((module) => module.demo));
const skeletonDemo = dynamic(() => import("./skeleton/demo").then((module) => module.demo));
const spinnerDemo = dynamic(() => import("./spinner/demo").then((module) => module.demo));
const toasterDemo = dynamic(() => import("./toaster/demo").then((module) => module.demo));

const buttonbuttonSizesExample = dynamic(() =>
  import("./button/demo").then((module) => module.examples["button-sizes"]),
);
const buttonbuttonStatesExample = dynamic(() =>
  import("./button/demo").then((module) => module.examples["button-states"]),
);
const buttonLinkbuttonLinkNextExample = dynamic(() =>
  import("./button-link/demo").then((module) => module.examples["button-link-next"]),
);
const contextMenucontextMenuSubmenuExample = dynamic(() =>
  import("./context-menu/demo").then((module) => module.examples["context-menu-submenu"]),
);
const menumenuGroupsExample = dynamic(() =>
  import("./menu/demo").then((module) => module.examples["menu-groups"]),
);
const menumenuSubmenuExample = dynamic(() =>
  import("./menu/demo").then((module) => module.examples["menu-submenu"]),
);
const toggletoggleSizesExample = dynamic(() =>
  import("./toggle/demo").then((module) => module.examples["toggle-sizes"]),
);
const toggleGrouptoggleGroupMultipleExample = dynamic(() =>
  import("./toggle-group/demo").then((module) => module.examples["toggle-group-multiple"]),
);
const toolbartoolbarVerticalExample = dynamic(() =>
  import("./toolbar/demo").then((module) => module.examples["toolbar-vertical"]),
);
const toolbartoolbarSearchExample = dynamic(() =>
  import("./toolbar/demo").then((module) => module.examples["toolbar-search"]),
);
const calendarcalendarRangeExample = dynamic(() =>
  import("./calendar/demo").then((module) => module.examples["calendar-range"]),
);
const calendarcalendarCompactExample = dynamic(() =>
  import("./calendar/demo").then((module) => module.examples["calendar-compact"]),
);
const calendarcalendarConstraintsExample = dynamic(() =>
  import("./calendar/demo").then((module) => module.examples["calendar-constraints"]),
);
const checkboxGroupcheckboxGroupHorizontalExample = dynamic(() =>
  import("./checkbox-group/demo").then((module) => module.examples["checkbox-group-horizontal"]),
);
const checkboxGroupcheckboxGroupErrorExample = dynamic(() =>
  import("./checkbox-group/demo").then((module) => module.examples["checkbox-group-error"]),
);
const colorPickercolorPickerPresetsExample = dynamic(() =>
  import("./color-picker/demo").then((module) => module.examples["color-picker-presets"]),
);
const colorPickercolorPickerCustomExample = dynamic(() =>
  import("./color-picker/demo").then((module) => module.examples["color-picker-custom"]),
);
const colorPickercolorPickerStatesExample = dynamic(() =>
  import("./color-picker/demo").then((module) => module.examples["color-picker-states"]),
);
const comboboxcomboboxMultipleExample = dynamic(() =>
  import("./combobox/demo").then((module) => module.examples["combobox-multiple"]),
);
const comboboxcomboboxEmptyExample = dynamic(() =>
  import("./combobox/demo").then((module) => module.examples["combobox-empty"]),
);
const datePickerdatePickerRangeExample = dynamic(() =>
  import("./date-picker/demo").then((module) => module.examples["date-picker-range"]),
);
const datePickerdatePickerClearableExample = dynamic(() =>
  import("./date-picker/demo").then((module) => module.examples["date-picker-clearable"]),
);
const datePickerdatePickerConstraintsExample = dynamic(() =>
  import("./date-picker/demo").then((module) => module.examples["date-picker-constraints"]),
);
const datePickerdatePickerStatesExample = dynamic(() =>
  import("./date-picker/demo").then((module) => module.examples["date-picker-states"]),
);
const dateTimePickerdateTimePickerRangeExample = dynamic(() =>
  import("./date-time-picker/demo").then((module) => module.examples["date-time-picker-range"]),
);
const dateTimePickerdateTimePickerConstraintsExample = dynamic(() =>
  import("./date-time-picker/demo").then((module) => module.examples["date-time-picker-constraints"]),
);
const dateTimePickerdateTimePickerActionsExample = dynamic(() =>
  import("./date-time-picker/demo").then((module) => module.examples["date-time-picker-actions"]),
);
const dateTimePickerdateTimePickerStatesExample = dynamic(() =>
  import("./date-time-picker/demo").then((module) => module.examples["date-time-picker-states"]),
);
const fieldsetfieldsetDisabledExample = dynamic(() =>
  import("./fieldset/demo").then((module) => module.examples["fieldset-disabled"]),
);
const fileUploadfileUploadControlledExample = dynamic(() =>
  import("./file-upload/demo").then((module) => module.examples["file-upload-controlled"]),
);
const fileUploadfileUploadImagesExample = dynamic(() =>
  import("./file-upload/demo").then((module) => module.examples["file-upload-images"]),
);
const fileUploadfileUploadSingleExample = dynamic(() =>
  import("./file-upload/demo").then((module) => module.examples["file-upload-single"]),
);
const otpFieldotpFieldMaskedExample = dynamic(() =>
  import("./otp-field/demo").then((module) => module.examples["otp-field-masked"]),
);
const otpFieldotpFieldErrorExample = dynamic(() =>
  import("./otp-field/demo").then((module) => module.examples["otp-field-error"]),
);
const selectselectFieldExample = dynamic(() =>
  import("./select/demo").then((module) => module.examples["select-field"]),
);
const timeFieldtimeFieldTwelveHourExample = dynamic(() =>
  import("./time-field/demo").then((module) => module.examples["time-field-twelve-hour"]),
);
const timeFieldtimeFieldConstraintsExample = dynamic(() =>
  import("./time-field/demo").then((module) => module.examples["time-field-constraints"]),
);
const timeFieldtimeFieldStatesExample = dynamic(() =>
  import("./time-field/demo").then((module) => module.examples["time-field-states"]),
);
const previewCardpreviewCardIssueExample = dynamic(() =>
  import("./preview-card/demo").then((module) => module.examples["preview-card-issue"]),
);
const previewCardpreviewCardTopExample = dynamic(() =>
  import("./preview-card/demo").then((module) => module.examples["preview-card-top"]),
);
const desktopNavdesktopNavSubmenuExample = dynamic(() =>
  import("./desktop-nav/demo").then((module) => module.examples["desktop-nav-submenu"]),
);
const desktopNavdesktopNavHeaderExample = dynamic(() =>
  import("./desktop-nav/demo").then((module) => module.examples["desktop-nav-header"]),
);
const mobileNavmobileNavLargeExample = dynamic(() =>
  import("./mobile-nav/demo").then((module) => module.examples["mobile-nav-large"]),
);
const tabstabsSettingsExample = dynamic(() =>
  import("./tabs/demo").then((module) => module.examples["tabs-settings"]),
);
const accordionaccordionMultipleExample = dynamic(() =>
  import("./accordion/demo").then((module) => module.examples["accordion-multiple"]),
);
const accordionaccordionSeparatedExample = dynamic(() =>
  import("./accordion/demo").then((module) => module.examples["accordion-separated"]),
);
const avataravatarSizesExample = dynamic(() =>
  import("./avatar/demo").then((module) => module.examples["avatar-sizes"]),
);
const cardcardProfileExample = dynamic(() =>
  import("./card/demo").then((module) => module.examples["card-profile"]),
);
const cardcardElevationExample = dynamic(() =>
  import("./card/demo").then((module) => module.examples["card-elevation"]),
);
const collapsiblecollapsibleSeparatedExample = dynamic(() =>
  import("./collapsible/demo").then((module) => module.examples["collapsible-separated"]),
);
const collapsiblecollapsiblePlainExample = dynamic(() =>
  import("./collapsible/demo").then((module) => module.examples["collapsible-plain"]),
);
const dataTabledataTableSelectionExample = dynamic(() =>
  import("./data-table/demo").then((module) => module.examples["data-table-selection"]),
);
const dataTabledataTableActionsExample = dynamic(() =>
  import("./data-table/demo").then((module) => module.examples["data-table-actions"]),
);
const dataTabledataTableAsyncExample = dynamic(() =>
  import("./data-table/demo").then((module) => module.examples["data-table-async"]),
);
const dataTabledataTableVirtualizedExample = dynamic(() =>
  import("./data-table/demo").then((module) => module.examples["data-table-virtualized"]),
);
const scrollAreascrollAreaHiddenScrollbarExample = dynamic(() =>
  import("./scroll-area/demo").then((module) => module.examples["scroll-area-hidden-scrollbar"]),
);
const metermeterThresholdsExample = dynamic(() =>
  import("./meter/demo").then((module) => module.examples["meter-thresholds"]),
);
const metermeterSizesExample = dynamic(() =>
  import("./meter/demo").then((module) => module.examples["meter-sizes"]),
);
const progressprogressIndeterminateExample = dynamic(() =>
  import("./progress/demo").then((module) => module.examples["progress-indeterminate"]),
);
const progressprogressTonesExample = dynamic(() =>
  import("./progress/demo").then((module) => module.examples["progress-tones"]),
);
const skeletonskeletonLinesExample = dynamic(() =>
  import("./skeleton/demo").then((module) => module.examples["skeleton-lines"]),
);
const skeletonskeletonCardExample = dynamic(() =>
  import("./skeleton/demo").then((module) => module.examples["skeleton-card"]),
);
const toastertoastPromiseExample = dynamic(() =>
  import("./toaster/demo").then((module) => module.examples["toast-promise"]),
);

export const demoMap: Record<string, React.ComponentType> = {
  "button": buttonDemo,
  "button-link": buttonLinkDemo,
  "context-menu": contextMenuDemo,
  "icon-button": iconButtonDemo,
  "menu": menuDemo,
  "toggle": toggleDemo,
  "toggle-group": toggleGroupDemo,
  "toolbar": toolbarDemo,
  "calendar": calendarDemo,
  "checkbox": checkboxDemo,
  "checkbox-group": checkboxGroupDemo,
  "color-picker": colorPickerDemo,
  "combobox": comboboxDemo,
  "date-picker": datePickerDemo,
  "date-time-picker": dateTimePickerDemo,
  "field": fieldDemo,
  "fieldset": fieldsetDemo,
  "file-upload": fileUploadDemo,
  "input": inputDemo,
  "label": labelDemo,
  "number-field": numberFieldDemo,
  "otp-field": otpFieldDemo,
  "radio-group": radioGroupDemo,
  "select": selectDemo,
  "slider": sliderDemo,
  "switch": switchDemo,
  "textarea": textareaDemo,
  "time-field": timeFieldDemo,
  "alert-dialog": alertDialogDemo,
  "dialog": dialogDemo,
  "popover": popoverDemo,
  "preview-card": previewCardDemo,
  "sheet": sheetDemo,
  "tooltip": tooltipDemo,
  "bottom-nav": bottomNavDemo,
  "breadcrumb": breadcrumbDemo,
  "desktop-nav": desktopNavDemo,
  "mobile-nav": mobileNavDemo,
  "pagination": paginationDemo,
  "tabs": tabsDemo,
  "accordion": accordionDemo,
  "avatar": avatarDemo,
  "badge": badgeDemo,
  "card": cardDemo,
  "collapsible": collapsibleDemo,
  "data-table": dataTableDemo,
  "kbd": kbdDemo,
  "scroll-area": scrollAreaDemo,
  "separator": separatorDemo,
  "table": tableDemo,
  "alert": alertDemo,
  "empty-state": emptyStateDemo,
  "meter": meterDemo,
  "progress": progressDemo,
  "skeleton": skeletonDemo,
  "spinner": spinnerDemo,
  "toaster": toasterDemo,
};

export const exampleMap: Record<string, React.ComponentType> = {
  "button-sizes": buttonbuttonSizesExample,
  "button-states": buttonbuttonStatesExample,
  "button-link-next": buttonLinkbuttonLinkNextExample,
  "context-menu-submenu": contextMenucontextMenuSubmenuExample,
  "menu-groups": menumenuGroupsExample,
  "menu-submenu": menumenuSubmenuExample,
  "toggle-sizes": toggletoggleSizesExample,
  "toggle-group-multiple": toggleGrouptoggleGroupMultipleExample,
  "toolbar-vertical": toolbartoolbarVerticalExample,
  "toolbar-search": toolbartoolbarSearchExample,
  "calendar-range": calendarcalendarRangeExample,
  "calendar-compact": calendarcalendarCompactExample,
  "calendar-constraints": calendarcalendarConstraintsExample,
  "checkbox-group-horizontal": checkboxGroupcheckboxGroupHorizontalExample,
  "checkbox-group-error": checkboxGroupcheckboxGroupErrorExample,
  "color-picker-presets": colorPickercolorPickerPresetsExample,
  "color-picker-custom": colorPickercolorPickerCustomExample,
  "color-picker-states": colorPickercolorPickerStatesExample,
  "combobox-multiple": comboboxcomboboxMultipleExample,
  "combobox-empty": comboboxcomboboxEmptyExample,
  "date-picker-range": datePickerdatePickerRangeExample,
  "date-picker-clearable": datePickerdatePickerClearableExample,
  "date-picker-constraints": datePickerdatePickerConstraintsExample,
  "date-picker-states": datePickerdatePickerStatesExample,
  "date-time-picker-range": dateTimePickerdateTimePickerRangeExample,
  "date-time-picker-constraints": dateTimePickerdateTimePickerConstraintsExample,
  "date-time-picker-actions": dateTimePickerdateTimePickerActionsExample,
  "date-time-picker-states": dateTimePickerdateTimePickerStatesExample,
  "fieldset-disabled": fieldsetfieldsetDisabledExample,
  "file-upload-controlled": fileUploadfileUploadControlledExample,
  "file-upload-images": fileUploadfileUploadImagesExample,
  "file-upload-single": fileUploadfileUploadSingleExample,
  "otp-field-masked": otpFieldotpFieldMaskedExample,
  "otp-field-error": otpFieldotpFieldErrorExample,
  "select-field": selectselectFieldExample,
  "time-field-twelve-hour": timeFieldtimeFieldTwelveHourExample,
  "time-field-constraints": timeFieldtimeFieldConstraintsExample,
  "time-field-states": timeFieldtimeFieldStatesExample,
  "preview-card-issue": previewCardpreviewCardIssueExample,
  "preview-card-top": previewCardpreviewCardTopExample,
  "desktop-nav-submenu": desktopNavdesktopNavSubmenuExample,
  "desktop-nav-header": desktopNavdesktopNavHeaderExample,
  "mobile-nav-large": mobileNavmobileNavLargeExample,
  "tabs-settings": tabstabsSettingsExample,
  "accordion-multiple": accordionaccordionMultipleExample,
  "accordion-separated": accordionaccordionSeparatedExample,
  "avatar-sizes": avataravatarSizesExample,
  "card-profile": cardcardProfileExample,
  "card-elevation": cardcardElevationExample,
  "collapsible-separated": collapsiblecollapsibleSeparatedExample,
  "collapsible-plain": collapsiblecollapsiblePlainExample,
  "data-table-selection": dataTabledataTableSelectionExample,
  "data-table-actions": dataTabledataTableActionsExample,
  "data-table-async": dataTabledataTableAsyncExample,
  "data-table-virtualized": dataTabledataTableVirtualizedExample,
  "scroll-area-hidden-scrollbar": scrollAreascrollAreaHiddenScrollbarExample,
  "meter-thresholds": metermeterThresholdsExample,
  "meter-sizes": metermeterSizesExample,
  "progress-indeterminate": progressprogressIndeterminateExample,
  "progress-tones": progressprogressTonesExample,
  "skeleton-lines": skeletonskeletonLinesExample,
  "skeleton-card": skeletonskeletonCardExample,
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
