"use client";
/*
 * Documentation:
 * Toggle Group — https://app.subframe.com/002445ea7110/library?component=Toggle+Group_2026f10a-e3cc-4c89-80da-a7259acae3b7
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface ItemProps
  extends React.ComponentProps<typeof SubframeCore.ToggleGroup.Item> {
  disabled?: boolean;
  children?: React.ReactNode;
  icon?: SubframeCore.IconName;
  className?: string;
}

const Item = React.forwardRef<HTMLElement, ItemProps>(function Item(
  {
    disabled = false,
    children,
    icon = "FeatherStar",
    className,
    ...otherProps
  }: ItemProps,
  ref
) {
  return (
    <SubframeCore.ToggleGroup.Item asChild={true} {...otherProps}>
      <div
        className={SubframeUtils.twClassNames(
          "group/56dea6ed flex h-7 w-full cursor-pointer items-center justify-center gap-2 px-2 py-1 rounded-[6px] active:bg-background-primary aria-[checked=true]:bg-background-primary aria-[checked=true]:shadow-sm hover:aria-[checked=true]:bg-background-primary active:aria-[checked=true]:bg-background-primary",
          { "hover:bg-transparent active:bg-transparent": disabled },
          className
        )}
        ref={ref as any}
      >
        <SubframeCore.Icon
          className={SubframeUtils.twClassNames(
            "text-body font-body text-text-secondary group-hover/56dea6ed:text-text-primary group-active/56dea6ed:text-text-primary group-aria-[checked=true]/56dea6ed:text-text-primary",
            {
              "text-text-secondary group-hover/56dea6ed:text-text-secondary group-active/56dea6ed:text-text-primary":
                disabled,
            }
          )}
          name={icon}
        />
        {children ? (
          <span
            className={SubframeUtils.twClassNames(
              "whitespace-nowrap text-caption-bold font-caption-bold text-text-secondary group-hover/56dea6ed:text-text-primary group-active/56dea6ed:text-text-primary group-aria-[checked=true]/56dea6ed:text-text-primary",
              {
                "text-text-primary group-hover/56dea6ed:text-text-secondary group-active/56dea6ed:text-text-primary":
                  disabled,
              }
            )}
          >
            {children}
          </span>
        ) : null}
      </div>
    </SubframeCore.ToggleGroup.Item>
  );
});

interface ToggleGroupRootProps
  extends React.ComponentProps<typeof SubframeCore.ToggleGroup.Root> {
  children?: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

const ToggleGroupRoot = React.forwardRef<HTMLElement, ToggleGroupRootProps>(
  function ToggleGroupRoot(
    { children, className, ...otherProps }: ToggleGroupRootProps,
    ref
  ) {
    return children ? (
      <SubframeCore.ToggleGroup.Root asChild={true} {...otherProps}>
        <div
          className={SubframeUtils.twClassNames(
            "group/2026f10a flex items-center gap-0.5 overflow-hidden bg-neutral-100 px-0.5 py-0.5 rounded-[6px]",
            className
          )}
          ref={ref as any}
        >
          {children}
        </div>
      </SubframeCore.ToggleGroup.Root>
    ) : null;
  }
);

export const ToggleGroup = Object.assign(ToggleGroupRoot, {
  Item,
});
