"use client";
/*
 * Documentation:
 * Icon with background — https://app.subframe.com/002445ea7110/library?component=Icon+with+background_c5d68c0e-4c0c-4cff-8d8c-6ff334859b3a
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface IconWithBackgroundRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "brand" | "neutral" | "error" | "success" | "warning";
  size?: "x-large" | "large" | "medium" | "small" | "x-small";
  icon?: SubframeCore.IconName;
  square?: boolean;
  className?: string;
}

const IconWithBackgroundRoot = React.forwardRef<
  HTMLElement,
  IconWithBackgroundRootProps
>(function IconWithBackgroundRoot(
  {
    variant = "brand",
    size = "x-small",
    icon = "FeatherCheck",
    square = false,
    className,
    ...otherProps
  }: IconWithBackgroundRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/c5d68c0e flex h-5 w-5 items-center justify-center gap-2 rounded-full bg-background-primary",
        {
          "rounded-md": square,
          "h-6 w-6": size === "small",
          "h-8 w-8": size === "medium",
          "h-12 w-12": size === "large",
          "h-16 w-16": size === "x-large",
          "bg-gold-100": variant === "warning",
          "bg-green-100": variant === "success",
          "bg-red-100": variant === "error",
          "bg-neutral-100": variant === "neutral",
        },
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      <SubframeCore.Icon
        className={SubframeUtils.twClassNames(
          "font-['Inter'] text-[10px] font-[400] leading-[12px] inline-flex text-text-primary",
          {
            "text-caption font-caption": size === "small",
            "text-body font-body": size === "medium",
            "text-h2 font-h2": size === "large",
            "text-h1 font-h1": size === "x-large",
            "text-gold-800": variant === "warning",
            "text-green-800": variant === "success",
            "text-red-800": variant === "error",
            "text-neutral-700": variant === "neutral",
          }
        )}
        name={icon}
      />
    </div>
  );
});

export const IconWithBackground = IconWithBackgroundRoot;
