"use client";

import * as React from "react";
import { useRender } from "@base-ui/react/use-render";
import { cn, type IconComponent } from "../../../lib/utils";
import { buttonVariants, type ButtonVariants } from "./button-variants";

/**
 * @docs href Destination URL. Renders a native anchor by default.
 * @docs target Native anchor target. Use _blank with rel="noreferrer" for external links.
 */
export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    ButtonVariants {
  /** Icon rendered before the label. */
  startIcon?: IconComponent;
  /** Icon rendered after the label. */
  endIcon?: IconComponent;
  /**
   * Render a custom link component, such as Next.js Link, while keeping the button styles.
   */
  render?: useRender.RenderProp;
}

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      startIcon: StartIcon,
      endIcon: EndIcon,
      children,
      render,
      ...props
    },
    ref,
  ) => {
    const iconOnly = size === "icon" || size === "icon-sm";

    return useRender({
      render,
      ref,
      defaultTagName: "a",
      props: {
        ...props,
        className: cn(buttonVariants({ variant, size, shape }), className),
        children: (
          <>
            {StartIcon ? <StartIcon size={16} className="shrink-0" /> : null}
            {children != null && children !== "" ? (
              iconOnly ? (
                <span aria-hidden="true" className="inline-flex items-center justify-center">
                  {children}
                </span>
              ) : (
                <span className="truncate">{children}</span>
              )
            ) : null}
            {EndIcon ? <EndIcon size={16} className="shrink-0" /> : null}
          </>
        ),
      },
    });
  },
);
ButtonLink.displayName = "ButtonLink";
