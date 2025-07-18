"use client";
/*
 * Documentation:
 * Breadcrumbs — https://app.subframe.com/002445ea7110/library?component=Breadcrumbs_8898334b-a66f-4ee8-8bd1-afcfa8e37cc0
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface ItemProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  active?: boolean;
  className?: string;
}

const Item = React.forwardRef<HTMLElement, ItemProps>(function Item(
  { children, active = false, className, ...otherProps }: ItemProps,
  ref,
) {
  return children ? (
    <span
      className={SubframeUtils.twClassNames(
        "group/bbdc1640 line-clamp-1 cursor-pointer break-words text-h3 font-h3 text-text-primary hover:text-text-primary hover:underline",
        { "text-h3 font-h3 text-text-primary": active },
        className,
      )}
      ref={ref as any}
      {...otherProps}
    >
      {children}
    </span>
  ) : null;
});

interface DividerProps
  extends SubframeCore.TypescriptHelpers.Optional<
    React.ComponentProps<typeof SubframeCore.Icon>,
    "name"
  > {
  className?: string;
}

const Divider = React.forwardRef<HTMLElement, DividerProps>(function Divider(
  { className, ...otherProps }: DividerProps,
  ref,
) {
  return (
    <SubframeCore.Icon
      className={SubframeUtils.twClassNames(
        "text-body font-body text-text-secondary",
        className,
      )}
      name="FeatherChevronRight"
      ref={ref as any}
      {...otherProps}
    />
  );
});

interface BreadcrumbsRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const BreadcrumbsRoot = React.forwardRef<HTMLElement, BreadcrumbsRootProps>(
  function BreadcrumbsRoot(
    { children, className, ...otherProps }: BreadcrumbsRootProps,
    ref,
  ) {
    return children ? (
      <div
        className={SubframeUtils.twClassNames(
          "group/8898334b flex items-center gap-2 flex-row flex-nowrap",
          className,
        )}
        ref={ref as any}
        {...otherProps}
      >
        {children}
      </div>
    ) : null;
  },
);

export const Breadcrumbs = Object.assign(BreadcrumbsRoot, {
  Item,
  Divider,
});
