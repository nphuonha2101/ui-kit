"use client";

import * as React from "react";
import {
  CalendarBlankIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CaretUpDownIcon,
  CheckIcon,
  ClockIcon,
  EyedropperIcon,
  FileIcon,
  ListIcon,
  MinusIcon,
  PlusIcon,
  SpinnerIcon,
  UploadSimpleIcon,
  UserIcon,
  XIcon,
} from "@phosphor-icons/react";

export type KitIconName =
  | "calendar"
  | "check"
  | "minus"
  | "plus"
  | "chevron"
  | "chevronDown"
  | "chevronLeft"
  | "chevronRight"
  | "close"
  | "clock"
  | "eyedropper"
  | "file"
  | "menu"
  | "spinner"
  | "upload"
  | "user";

export type KitIcon = React.ComponentType<
  { size?: number } & React.SVGProps<SVGSVGElement>
>;

const defaultIcons: Record<KitIconName, KitIcon> = {
  calendar: CalendarBlankIcon,
  check: (props) => <CheckIcon {...props} weight="bold" />,
  minus: (props) => <MinusIcon {...props} weight="bold" />,
  plus: (props) => <PlusIcon {...props} weight="bold" />,
  chevron: (props) => <CaretUpDownIcon {...props} weight="bold" />,
  chevronDown: (props) => <CaretDownIcon {...props} weight="bold" />,
  chevronLeft: (props) => <CaretLeftIcon {...props} weight="bold" />,
  chevronRight: (props) => <CaretRightIcon {...props} weight="bold" />,
  close: (props) => <XIcon {...props} weight="bold" />,
  clock: ClockIcon,
  eyedropper: EyedropperIcon,
  file: FileIcon,
  menu: (props) => <ListIcon {...props} weight="bold" />,
  spinner: SpinnerIcon,
  upload: UploadSimpleIcon,
  user: UserIcon,
};

const IconContext = React.createContext<Partial<Record<KitIconName, KitIcon>>>({});

export interface IconProviderProps {
  icons?: Partial<Record<KitIconName, KitIcon>>;
  children: React.ReactNode;
}

/**
 * Default internal icons come from Phosphor. Swap any of them for another pack:
 *
 *   <IconProvider icons={{ check: LucideCheck, close: LucideX }}>
 *     <App />
 *   </IconProvider>
 */
export function IconProvider({ icons, children }: IconProviderProps) {
  return <IconContext.Provider value={icons ?? {}}>{children}</IconContext.Provider>;
}

export function useKitIcon(name: KitIconName): KitIcon {
  const icons = React.useContext(IconContext);
  return icons[name] ?? defaultIcons[name];
}
