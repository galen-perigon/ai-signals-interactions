"use client";
/*
 * Documentation:
 * Checkbox Card — https://app.subframe.com/002445ea7110/library?component=Checkbox+Card_de0b4dfb-3946-4702-be52-5678dd71925a
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface CheckboxCardRootProps
  extends React.ComponentProps<typeof SubframeCore.Checkbox.Root> {
  hideCheckbox?: boolean;
  children?: React.ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

const CheckboxCardRoot = React.forwardRef<HTMLElement, CheckboxCardRootProps>(
  function CheckboxCardRoot(
    {
      hideCheckbox = false,
      children,
      className,
      ...otherProps
    }: CheckboxCardRootProps,
    ref,
  ) {
    return (
      <SubframeCore.Checkbox.Root asChild={true} {...otherProps}>
        <button
          className={SubframeUtils.twClassNames(
            "group/de0b4dfb flex cursor-pointer items-center gap-4 rounded-md border border-solid border-border-primary bg-background-primary px-4 py-3 hover:border hover:border-solid hover:border-border-primary hover:bg-background-tertiary aria-[checked=true]:border aria-[checked=true]:border-solid aria-[checked=true]:border-border-secondary aria-[checked=true]:bg-background-tertiary hover:aria-[checked=true]:border hover:aria-[checked=true]:border-solid hover:aria-[checked=true]:border-border-secondary hover:aria-[checked=true]:bg-background-tertiary disabled:cursor-default disabled:border disabled:border-solid disabled:border-neutral-100 disabled:bg-neutral-100 hover:disabled:cursor-default hover:disabled:border hover:disabled:border-solid hover:disabled:border-neutral-100 hover:disabled:bg-neutral-100",
            className,
          )}
          ref={ref as any}
        >
          <div
            className={SubframeUtils.twClassNames(
              "flex h-4 w-4 flex-none flex-col items-center justify-center gap-2 rounded-[2px] border-2 border-solid border-neutral-300 group-aria-[checked=true]/de0b4dfb:border group-aria-[checked=true]/de0b4dfb:border-solid group-aria-[checked=true]/de0b4dfb:border-brand-500 group-aria-[checked=true]/de0b4dfb:bg-brand-500 group-disabled/de0b4dfb:border-2 group-disabled/de0b4dfb:border-solid group-disabled/de0b4dfb:border-neutral-200 group-disabled/de0b4dfb:bg-neutral-100",
              { hidden: hideCheckbox },
            )}
          >
            <SubframeCore.Icon
              className="hidden font-['Inter'] text-[14px] font-[400] leading-[14px] text-white group-aria-[checked=true]/de0b4dfb:inline-flex group-aria-[checked=true]/de0b4dfb:font-['Inter'] group-aria-[checked=true]/de0b4dfb:text-[16px] group-aria-[checked=true]/de0b4dfb:font-[400] group-aria-[checked=true]/de0b4dfb:leading-[16px] group-aria-[checked=true]/de0b4dfb:tracking-normal group-disabled/de0b4dfb:text-neutral-400"
              name="FeatherCheck"
            />
          </div>
          {children ? (
            <div className="flex grow shrink-0 basis-0 items-center gap-4">
              {children}
            </div>
          ) : null}
        </button>
      </SubframeCore.Checkbox.Root>
    );
  },
);

export const CheckboxCard = CheckboxCardRoot;
