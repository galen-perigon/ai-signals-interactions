"use client";
/*
 * Documentation:
 * Link Button — https://app.subframe.com/002445ea7110/library?component=Link+Button_a4ee726a-774c-4091-8c49-55b659356024
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface LinkButtonRootProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "brand" | "neutral" | "inverse";
  size?: "large" | "medium" | "small";
  icon?: SubframeCore.IconName;
  children?: React.ReactNode;
  iconRight?: SubframeCore.IconName;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const LinkButtonRoot = React.forwardRef<HTMLElement, LinkButtonRootProps>(
  function LinkButtonRoot(
    {
      variant = "neutral",
      size = "medium",
      icon = null,
      children,
      iconRight = null,
      className,
      type = "button",
      ...otherProps
    }: LinkButtonRootProps,
    ref
  ) {
    return (
      <button
        className={SubframeUtils.twClassNames(
          "group/a4ee726a flex cursor-pointer items-center gap-1 border-none bg-transparent",
          { "flex-row flex-nowrap gap-1": size === "large" },
          className
        )}
        ref={ref as any}
        type={type}
        {...otherProps}
      >
        <SubframeCore.Icon
          className={SubframeUtils.twClassNames(
            "text-body font-body text-neutral-700 group-hover/a4ee726a:text-brand-600 group-disabled/a4ee726a:text-neutral-400 group-hover/a4ee726a:group-disabled/a4ee726a:text-neutral-400",
            {
              "text-caption font-caption": size === "small",
              "text-h3 font-h3": size === "large",
              "text-white group-hover/a4ee726a:text-white":
                variant === "inverse",
              "text-brand-600 group-hover/a4ee726a:text-brand-600":
                variant === "brand",
            }
          )}
          name={icon}
        />
        {children ? (
          <span
            className={SubframeUtils.twClassNames(
              "text-neutral-700 text-body-bold font-body-bold group-hover/a4ee726a:text-brand-600 group-hover/a4ee726a:underline group-disabled/a4ee726a:text-neutral-400 group-hover/a4ee726a:group-disabled/a4ee726a:text-neutral-400 group-hover/a4ee726a:group-disabled/a4ee726a:no-underline",
              {
                "text-caption font-caption": size === "small",
                "text-h3 font-h3": size === "large",
                "text-white group-hover/a4ee726a:text-white":
                  variant === "inverse",
                "text-brand-600 group-hover/a4ee726a:text-brand-600":
                  variant === "brand",
              }
            )}
          >
            {children}
          </span>
        ) : null}
        <SubframeCore.Icon
          className={SubframeUtils.twClassNames(
            "text-body font-body text-neutral-700 group-hover/a4ee726a:text-brand-600 group-disabled/a4ee726a:text-neutral-400 group-hover/a4ee726a:group-disabled/a4ee726a:text-neutral-400",
            {
              "text-caption font-caption": size === "small",
              "text-h3 font-h3": size === "large",
              "text-white group-hover/a4ee726a:text-white":
                variant === "inverse",
              "text-brand-600 group-hover/a4ee726a:text-brand-600":
                variant === "brand",
            }
          )}
          name={iconRight}
        />
      </button>
    );
  }
);

export const LinkButton = LinkButtonRoot;
