"use client";

import * as React from "react";
import {
  CaretLeftIcon,
  CaretRightIcon,
  CaretUpDownIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon,
  SpinnerIcon,
  XIcon,
} from "@phosphor-icons/react";

export type KitIconName =
  | "check"
  | "minus"
  | "plus"
  | "chevron"
  | "chevronLeft"
  | "chevronRight"
  | "close"
  | "spinner";

export type KitIcon = React.ComponentType<
  { size?: number } & React.SVGProps<SVGSVGElement>
>;

const defaultIcons: Record<KitIconName, KitIcon> = {
  check: (props) => <CheckIcon {...props} weight="bold" />,
  minus: (props) => <MinusIcon {...props} weight="bold" />,
  plus: (props) => <PlusIcon {...props} weight="bold" />,
  chevron: (props) => <CaretUpDownIcon {...props} weight="bold" />,
  chevronLeft: (props) => <CaretLeftIcon {...props} weight="bold" />,
  chevronRight: (props) => <CaretRightIcon {...props} weight="bold" />,
  close: (props) => <XIcon {...props} weight="bold" />,
  spinner: SpinnerIcon,
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
