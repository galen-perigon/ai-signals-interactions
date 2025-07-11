"use client";
/*
 * Documentation:
 * Badge — https://app.subframe.com/002445ea7110/library?component=Badge_97bdb082-1124-4dd7-a335-b14b822d0157
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface BadgeRootProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "brand" | "neutral" | "error" | "warning" | "success";
  icon?: SubframeCore.IconName;
  children?: React.ReactNode;
  iconRight?: SubframeCore.IconName;
  className?: string;
}

const BadgeRoot = React.forwardRef<HTMLElement, BadgeRootProps>(
  function BadgeRoot(
    {
      variant = "brand",
      icon = null,
      children,
      iconRight = null,
      className,
      ...otherProps
    }: BadgeRootProps,
    ref,
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/97bdb082 flex h-6 items-center gap-1 rounded-md border border-solid px-2 border-border-primary bg-transparent",
          {
            "border border-solid border-green-100 bg-green-100":
              variant === "success",
            "border border-solid border-gold-100 bg-gold-100":
              variant === "warning",
            "border border-solid border-red-100 bg-red-100":
              variant === "error",
            "border border-solid border-neutral-100 bg-neutral-100":
              variant === "neutral",
          },
          className,
        )}
        ref={ref as any}
        {...otherProps}
      >
        <SubframeCore.Icon
          className={SubframeUtils.twClassNames(
            "text-caption font-caption text-brand-600",
            {
              "text-green-800": variant === "success",
              "text-gold-800": variant === "warning",
              "text-red-700": variant === "error",
              "text-neutral-700": variant === "neutral",
            },
          )}
          name={icon}
        />

        {children ? (
          <span
            className={SubframeUtils.twClassNames(
              "whitespace-nowrap text-caption font-caption text-text-primary",
              {
                "text-green-800": variant === "success",
                "text-gold-800": variant === "warning",
                "text-red-800": variant === "error",
                "text-neutral-700": variant === "neutral",
              },
            )}
          >
            {children}
          </span>
        ) : null}
        <SubframeCore.Icon
          className={SubframeUtils.twClassNames(
            "text-caption font-caption text-brand-600",
            {
              "text-green-800": variant === "success",
              "text-gold-800": variant === "warning",
              "text-red-700": variant === "error",
              "text-neutral-700": variant === "neutral",
            },
          )}
          name={iconRight}
        />
      </div>
    );
  },
);

export const Badge = BadgeRoot;
