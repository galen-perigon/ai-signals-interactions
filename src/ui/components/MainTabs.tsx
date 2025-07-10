"use client";
/*
 * Documentation:
 * Main Tabs — https://app.subframe.com/002445ea7110/library?component=Main+Tabs_2c44e402-6bdd-4304-8ac9-50537218c226
 * Icon Button — https://app.subframe.com/002445ea7110/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 * Breadcrumbs — https://app.subframe.com/002445ea7110/library?component=Breadcrumbs_8898334b-a66f-4ee8-8bd1-afcfa8e37cc0
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";
import { Breadcrumbs } from "./Breadcrumbs";

interface MainTabItemProps extends React.HTMLAttributes<HTMLDivElement> {
  rightSlot?: React.ReactNode;
  leftSlot?: React.ReactNode;
  selected?: boolean;
  tabTitle?: React.ReactNode;
  className?: string;
}

const MainTabItem = React.forwardRef<HTMLElement, MainTabItemProps>(
  function MainTabItem(
    {
      rightSlot,
      leftSlot,
      selected = false,
      tabTitle,
      className,
      ...otherProps
    }: MainTabItemProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/abba57f2 flex w-36 cursor-pointer items-center gap-1 rounded-md px-2 py-1 hover:bg-background-tertiary active:bg-background-selected",
          { "bg-background-selected": selected },
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        {leftSlot ? (
          <div className="flex h-4 w-4 flex-none items-center gap-1">
            {leftSlot}
          </div>
        ) : null}
        {tabTitle ? (
          <span
            className={SubframeUtils.twClassNames(
              "line-clamp-1 max-w-[128px] grow shrink-0 basis-0 text-body font-body text-text-secondary group-hover/abba57f2:line-clamp-1 group-hover/abba57f2:h-auto group-hover/abba57f2:grow group-hover/abba57f2:shrink-0 group-hover/abba57f2:basis-0 group-hover/abba57f2:whitespace-normal group-hover/abba57f2:break-normal group-hover/abba57f2:text-text-primary group-active/abba57f2:h-auto group-active/abba57f2:w-auto group-active/abba57f2:flex-none group-active/abba57f2:self-stretch group-active/abba57f2:text-text-primary",
              { "text-body-bold font-body-bold text-text-primary": selected }
            )}
          >
            {tabTitle}
          </span>
        ) : null}
        {rightSlot ? (
          <div
            className={SubframeUtils.twClassNames(
              "flex h-4 w-4 flex-none items-center gap-1",
              { flex: selected }
            )}
          >
            {rightSlot}
          </div>
        ) : null}
      </div>
    );
  }
);

interface MainTabsRootProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: React.ReactNode;
  mobile?: "default";
  children?: React.ReactNode;
  breadcrumbs?: "default";
  breadcrumb?: boolean;
  mainTabItems?: React.ReactNode;
  className?: string;
}

const MainTabsRoot = React.forwardRef<HTMLElement, MainTabsRootProps>(
  function MainTabsRoot(
    {
      text,
      mobile = "default",
      children,
      breadcrumbs = "default",
      breadcrumb = false,
      mainTabItems,
      className,
      ...otherProps
    }: MainTabsRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/2c44e402 flex w-full flex-col items-start",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        {children ? (
          <div
            className={SubframeUtils.twClassNames(
              "flex w-full items-center gap-2 border-b border-solid border-brand-200 bg-background-secondary px-4 pt-3 pb-2",
              {
                "border-b border-solid border-background-secondary": breadcrumb,
              }
            )}
          >
            {children}
          </div>
        ) : null}
        <div
          className={SubframeUtils.twClassNames(
            "hidden w-full flex-col items-start justify-end gap-2 pl-4 pr-1 py-1.5",
            {
              "flex border-b border-solid border-brand-200 bg-background-secondary":
                breadcrumb,
            }
          )}
        >
          <Breadcrumbs>
            <Breadcrumbs.Item>Breadcrumb</Breadcrumbs.Item>
            <SubframeCore.Icon
              className="text-body font-body text-text-secondary"
              name={breadcrumb ? "FeatherSlash" : "FeatherChevronRight"}
            />
            <Breadcrumbs.Item active={true}>Breadcrumb</Breadcrumbs.Item>
          </Breadcrumbs>
        </div>
      </div>
    );
  }
);

export const MainTabs = Object.assign(MainTabsRoot, {
  MainTabItem,
});
