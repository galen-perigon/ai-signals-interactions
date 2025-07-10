"use client";
/*
 * Documentation:
 * Alert — https://app.subframe.com/002445ea7110/library?component=Alert_3a65613d-d546-467c-80f4-aaba6a7edcd5
 * Icon Button — https://app.subframe.com/002445ea7110/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface AlertRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: "brand" | "neutral" | "error" | "success" | "warning";
  icon?: SubframeCore.IconName;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const AlertRoot = React.forwardRef<HTMLElement, AlertRootProps>(
  function AlertRoot(
    {
      variant = "neutral",
      icon = "FeatherInfo",
      title,
      description,
      actions,
      className,
      ...otherProps
    }: AlertRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/3a65613d flex w-full flex-col items-start gap-2 rounded-md border border-solid border-neutral-200 pl-4 pr-3 py-3 bg-background-primary",
          {
            "border border-solid border-gold-100 bg-gold-50":
              variant === "warning",
            "border border-solid border-green-100 bg-green-50":
              variant === "success",
            "border border-solid border-red-100 bg-red-50": variant === "error",
            "border border-solid border-border-primary bg-brand-950":
              variant === "brand",
          },
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <div className="flex w-full items-center gap-4">
          <SubframeCore.Icon
            className={SubframeUtils.twClassNames(
              "text-h3 font-h3 text-neutral-800",
              {
                "text-gold-800": variant === "warning",
                "text-green-800": variant === "success",
                "text-red-800": variant === "error",
                "text-white": variant === "brand",
              }
            )}
            name={icon}
          />
          <div className="flex grow shrink-0 basis-0 flex-col items-start flex-nowrap gap-1">
            {title ? (
              <span
                className={SubframeUtils.twClassNames(
                  "w-full whitespace-pre-wrap text-body-bold font-body-bold text-text-primary",
                  {
                    "text-gold-900": variant === "warning",
                    "text-green-900": variant === "success",
                    "text-red-900": variant === "error",
                    "text-text-inverted": variant === "brand",
                  }
                )}
              >
                {title}
              </span>
            ) : null}
            {description ? (
              <span
                className={SubframeUtils.twClassNames(
                  "w-full whitespace-pre-wrap text-caption font-caption text-text-secondary",
                  {
                    "text-gold-800": variant === "warning",
                    "text-green-800": variant === "success",
                    "text-red-800": variant === "error",
                    "text-text-inverted": variant === "brand",
                  }
                )}
              >
                {description}
              </span>
            ) : null}
          </div>
          {actions ? (
            <div className="flex items-center justify-end gap-1">{actions}</div>
          ) : null}
        </div>
      </div>
    );
  }
);

export const Alert = AlertRoot;
