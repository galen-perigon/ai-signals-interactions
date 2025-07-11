"use client";
/*
 * Documentation:
 * Filter Badge — https://app.subframe.com/002445ea7110/library?component=Filter+Badge_9f379f68-a795-4bb7-a975-8b10f72f2f30
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface FilterBadgeRootProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  count?: React.ReactNode;
  selected?: boolean;
  className?: string;
}

const FilterBadgeRoot = React.forwardRef<HTMLElement, FilterBadgeRootProps>(
  function FilterBadgeRoot(
    {
      label,
      count,
      selected = false,
      className,
      ...otherProps
    }: FilterBadgeRootProps,
    ref,
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/9f379f68 flex cursor-pointer items-center overflow-hidden rounded-md border border-solid border-border-primary px-1 py-1 hover:bg-neutral-50",
          {
            "border border-solid border-brand-50 bg-brand-0 hover:bg-brand-50":
              selected,
          },
          className,
        )}
        ref={ref as any}
        {...otherProps}
      >
        <div className="flex items-center gap-2 px-2">
          {label ? (
            <span
              className={SubframeUtils.twClassNames(
                "text-caption-bold font-caption-bold text-text-primary",
                { "text-brand-600": selected },
              )}
            >
              {label}
            </span>
          ) : null}
        </div>
        <div
          className={SubframeUtils.twClassNames(
            "flex min-w-[24px] items-center justify-center gap-2 rounded-md bg-neutral-100 px-1 py-1",
            { "bg-brand-50 group-hover/9f379f68:bg-brand-100": selected },
          )}
        >
          {count ? (
            <span
              className={SubframeUtils.twClassNames(
                "text-caption-bold font-caption-bold text-text-primary text-center",
                { "text-brand-600": selected },
              )}
            >
              {count}
            </span>
          ) : null}
        </div>
      </div>
    );
  },
);

export const FilterBadge = FilterBadgeRoot;
