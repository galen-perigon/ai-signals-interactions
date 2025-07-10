"use client";
/*
 * Documentation:
 * Badges — https://app.subframe.com/002445ea7110/library?component=Badges_fe21e192-d060-4f96-a72b-78303a9df519
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface BadgesRootProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "brand" | "neutral" | "error" | "warning" | "success" | "info";
  children?: React.ReactNode;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  className?: string;
}

const BadgesRoot = React.forwardRef<HTMLElement, BadgesRootProps>(
  function BadgesRoot(
    {
      variant = "brand",
      children,
      leftSlot,
      rightSlot,
      className,
      ...otherProps
    }: BadgesRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/fe21e192 flex h-6 items-center gap-2 rounded-md border border-solid border-border-primary px-2",
          {
            "border-none bg-sapphire-100": variant === "info",
            "border border-solid border-green-100 bg-green-100":
              variant === "success",
            "border border-solid border-gold-100 bg-gold-100":
              variant === "warning",
            "border border-solid border-red-100 bg-red-100":
              variant === "error",
            "border border-solid border-neutral-100 bg-neutral-100":
              variant === "neutral",
          },
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        {leftSlot ? (
          <div className="flex h-4 w-4 flex-none items-center">{leftSlot}</div>
        ) : null}
        {children ? (
          <span
            className={SubframeUtils.twClassNames(
              "whitespace-nowrap text-caption font-caption text-text-primary",
              {
                "text-sapphire-800": variant === "info",
                "text-green-800": variant === "success",
                "text-gold-800": variant === "warning",
                "text-red-800": variant === "error",
                "text-neutral-700": variant === "neutral",
              }
            )}
          >
            {children}
          </span>
        ) : null}
        {rightSlot ? (
          <div className="flex items-center gap-0.5">{rightSlot}</div>
        ) : null}
      </div>
    );
  }
);

export const Badges = BadgesRoot;
