"use client";
/*
 * Documentation:
 * Timeline Divider — https://app.subframe.com/002445ea7110/library?component=Timeline+Divider_c388f693-3fdb-4403-b46d-41c16f1b213a
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface TimelineDividerRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const TimelineDividerRoot = React.forwardRef<
  HTMLElement,
  TimelineDividerRootProps
>(function TimelineDividerRoot(
  { children, className, ...otherProps }: TimelineDividerRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full items-center",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      <div className="flex h-px grow shrink-0 basis-0 flex-col items-center gap-2 bg-neutral-200" />
      <div className="flex h-6 items-center gap-1 rounded-md border border-solid border-border-primary bg-background-primary px-2">
        {children ? (
          <span className="whitespace-nowrap text-caption-bold font-caption-bold text-text-secondary">
            {children}
          </span>
        ) : null}
      </div>
      <div className="flex h-px grow shrink-0 basis-0 flex-col items-center gap-2 bg-neutral-200" />
    </div>
  );
});

export const TimelineDivider = TimelineDividerRoot;
