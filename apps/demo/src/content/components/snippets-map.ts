import type { ComponentSnippets } from "@/content/types";

import { snippets as buttonSnippets } from "./button/snippets";
import { snippets as buttonLinkSnippets } from "./button-link/snippets";
import { snippets as iconButtonSnippets } from "./icon-button/snippets";
import { snippets as toggleSnippets } from "./toggle/snippets";
import { snippets as toggleGroupSnippets } from "./toggle-group/snippets";
import { snippets as checkboxSnippets } from "./checkbox/snippets";
import { snippets as fieldSnippets } from "./field/snippets";
import { snippets as inputSnippets } from "./input/snippets";
import { snippets as labelSnippets } from "./label/snippets";
import { snippets as numberFieldSnippets } from "./number-field/snippets";
import { snippets as radioGroupSnippets } from "./radio-group/snippets";
import { snippets as selectSnippets } from "./select/snippets";
import { snippets as sliderSnippets } from "./slider/snippets";
import { snippets as switchSnippets } from "./switch/snippets";
import { snippets as textareaSnippets } from "./textarea/snippets";
import { snippets as alertDialogSnippets } from "./alert-dialog/snippets";
import { snippets as dialogSnippets } from "./dialog/snippets";
import { snippets as popoverSnippets } from "./popover/snippets";
import { snippets as sheetSnippets } from "./sheet/snippets";
import { snippets as tooltipSnippets } from "./tooltip/snippets";
import { snippets as bottomNavSnippets } from "./bottom-nav/snippets";
import { snippets as breadcrumbSnippets } from "./breadcrumb/snippets";
import { snippets as desktopNavSnippets } from "./desktop-nav/snippets";
import { snippets as mobileNavSnippets } from "./mobile-nav/snippets";
import { snippets as paginationSnippets } from "./pagination/snippets";
import { snippets as tabsSnippets } from "./tabs/snippets";
import { snippets as accordionSnippets } from "./accordion/snippets";
import { snippets as avatarSnippets } from "./avatar/snippets";
import { snippets as badgeSnippets } from "./badge/snippets";
import { snippets as cardSnippets } from "./card/snippets";
import { snippets as kbdSnippets } from "./kbd/snippets";
import { snippets as scrollAreaSnippets } from "./scroll-area/snippets";
import { snippets as separatorSnippets } from "./separator/snippets";
import { snippets as tableSnippets } from "./table/snippets";
import { snippets as alertSnippets } from "./alert/snippets";
import { snippets as emptyStateSnippets } from "./empty-state/snippets";
import { snippets as progressSnippets } from "./progress/snippets";
import { snippets as skeletonSnippets } from "./skeleton/snippets";
import { snippets as spinnerSnippets } from "./spinner/snippets";
import { snippets as toasterSnippets } from "./toaster/snippets";

const snippetsMap: Record<string, ComponentSnippets> = {
  "button": buttonSnippets,
  "button-link": buttonLinkSnippets,
  "icon-button": iconButtonSnippets,
  "toggle": toggleSnippets,
  "toggle-group": toggleGroupSnippets,
  "checkbox": checkboxSnippets,
  "field": fieldSnippets,
  "input": inputSnippets,
  "label": labelSnippets,
  "number-field": numberFieldSnippets,
  "radio-group": radioGroupSnippets,
  "select": selectSnippets,
  "slider": sliderSnippets,
  "switch": switchSnippets,
  "textarea": textareaSnippets,
  "alert-dialog": alertDialogSnippets,
  "dialog": dialogSnippets,
  "popover": popoverSnippets,
  "sheet": sheetSnippets,
  "tooltip": tooltipSnippets,
  "bottom-nav": bottomNavSnippets,
  "breadcrumb": breadcrumbSnippets,
  "desktop-nav": desktopNavSnippets,
  "mobile-nav": mobileNavSnippets,
  "pagination": paginationSnippets,
  "tabs": tabsSnippets,
  "accordion": accordionSnippets,
  "avatar": avatarSnippets,
  "badge": badgeSnippets,
  "card": cardSnippets,
  "kbd": kbdSnippets,
  "scroll-area": scrollAreaSnippets,
  "separator": separatorSnippets,
  "table": tableSnippets,
  "alert": alertSnippets,
  "empty-state": emptyStateSnippets,
  "progress": progressSnippets,
  "skeleton": skeletonSnippets,
  "spinner": spinnerSnippets,
  "toaster": toasterSnippets,
};

export function getSnippets(slug: string) {
  return snippetsMap[slug];
}
