"use client";
/*
 * Documentation:
 * Sidebar Collapsible — https://app.subframe.com/002445ea7110/library?component=Sidebar+Collapsible_e9a2b1a3-fe9c-49bc-8cd5-e54e02de5efb
 * Info Card — https://app.subframe.com/002445ea7110/library?component=Info+Card_0502fb14-56c8-48a0-b67c-216f8daed6ce
 * Avatar — https://app.subframe.com/002445ea7110/library?component=Avatar_bec25ae6-5010-4485-b46b-cf79e3943ab2
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { FeatherPlus } from "@subframe/core";
import { FeatherTrendingUp } from "@subframe/core";
import { FeatherZap } from "@subframe/core";
import { FeatherPanelRight } from "@subframe/core";

interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  rightSlot?: React.ReactNode;
  labelSlot?: React.ReactNode;
  leftSlot?: React.ReactNode;
  size?: "default" | "large" | "small";
  featured?: boolean;
  className?: string;
}

const NavItem = React.forwardRef<HTMLElement, NavItemProps>(function NavItem(
  {
    selected = false,
    rightSlot,
    labelSlot,
    leftSlot,
    size = "default",
    featured = false,
    className,
    ...otherProps
  }: NavItemProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/691beefb flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-1 hover:bg-background-tertiary active:h-auto active:w-full active:items-center active:justify-start active:bg-neutral-100",
        {
          "h-8 w-full items-center justify-start border border-solid border-brand-200 bg-button-secondary px-3 py-0 shadow-shadow-tight":
            featured,
          "h-auto w-auto pl-3 pr-2 py-3": size === "large",
          "bg-background-selected hover:bg-background-tertiary active:bg-background-selected":
            selected,
        },
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      {leftSlot ? (
        <div
          className={SubframeUtils.twClassNames(
            "flex items-center gap-2 group-active/691beefb:h-auto group-active/691beefb:w-auto group-active/691beefb:flex-none",
            { "items-center justify-start": featured }
          )}
        >
          {leftSlot}
        </div>
      ) : null}
      {labelSlot ? (
        <div
          className={SubframeUtils.twClassNames(
            "flex grow shrink-0 basis-0 flex-col items-start group-active/691beefb:h-auto group-active/691beefb:grow group-active/691beefb:shrink-0 group-active/691beefb:basis-0 group-active/691beefb:items-start group-active/691beefb:justify-center",
            {
              "items-start justify-center": featured,
              "items-start justify-start": size === "large",
            }
          )}
        >
          {labelSlot}
        </div>
      ) : null}
      {rightSlot ? <div className="flex items-center">{rightSlot}</div> : null}
    </div>
  );
});

interface SidebarCollapsibleRootProps
  extends React.HTMLAttributes<HTMLElement> {
  expanded?: boolean;
  footer?: React.ReactNode;
  marketingSlot?: React.ReactNode;
  children?: React.ReactNode;
  header?: React.ReactNode;
  controls?: React.ReactNode;
  className?: string;
}

const SidebarCollapsibleRoot = React.forwardRef<
  HTMLElement,
  SidebarCollapsibleRootProps
>(function SidebarCollapsibleRoot(
  {
    expanded = false,
    footer,
    marketingSlot,
    children,
    header,
    controls,
    className,
    ...otherProps
  }: SidebarCollapsibleRootProps,
  ref
) {
  return (
    <nav
      className={SubframeUtils.twClassNames(
        "group/e9a2b1a3 flex h-full w-16 flex-col items-start gap-2 bg-background-secondary cursor-default",
        { "h-full w-56 flex-col flex-nowrap gap-2": expanded },
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      <div
        className={SubframeUtils.twClassNames(
          "flex w-16 grow shrink-0 basis-0 flex-col items-start border-r border-solid border-brand-200 bg-background-secondary absolute top-0 bottom-0 transition-all group-hover/e9a2b1a3:w-56 group-hover/e9a2b1a3:grow group-hover/e9a2b1a3:shrink-0 group-hover/e9a2b1a3:basis-0 group-hover/e9a2b1a3:rounded-r-lg group-hover/e9a2b1a3:border-y group-hover/e9a2b1a3:border-r group-hover/e9a2b1a3:border-solid group-hover/e9a2b1a3:border-brand-200 group-hover/e9a2b1a3:shadow-md",
          { "w-56 grow shrink-0 basis-0": expanded }
        )}
      >
        {header ? (
          <div
            className={SubframeUtils.twClassNames(
              "flex w-full flex-col items-start gap-2 px-4 py-3 group-hover/e9a2b1a3:items-start group-hover/e9a2b1a3:justify-start",
              { "items-start justify-start": expanded }
            )}
          >
            {header}
          </div>
        ) : null}
        {children ? (
          <div
            className={SubframeUtils.twClassNames(
              "flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 px-3 py-4 overflow-auto",
              { "flex-col flex-nowrap gap-2": expanded }
            )}
          >
            {children}
          </div>
        ) : null}
        {marketingSlot ? (
          <div
            className={SubframeUtils.twClassNames(
              "flex w-full items-center justify-center gap-4 overflow-hidden py-4 group-hover/e9a2b1a3:px-2 group-hover/e9a2b1a3:py-2",
              { "border-none px-3 py-4": expanded }
            )}
          >
            {marketingSlot}
          </div>
        ) : null}
        {controls ? (
          <div className="hidden w-full flex-col items-start gap-2 border-t border-solid border-brand-200 px-3 pt-2 overflow-auto">
            {controls}
          </div>
        ) : null}
        {footer ? (
          <div
            className={SubframeUtils.twClassNames(
              "flex w-full flex-col items-center justify-center overflow-hidden border-t border-solid border-brand-200",
              { "h-auto w-full flex-none px-0 py-0": expanded }
            )}
          >
            {footer}
          </div>
        ) : null}
      </div>
    </nav>
  );
});

export const SidebarCollapsible = Object.assign(SidebarCollapsibleRoot, {
  NavItem,
});
