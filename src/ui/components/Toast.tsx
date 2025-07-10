"use client";
/*
 * Documentation:
 * Toast — https://app.subframe.com/002445ea7110/library?component=Toast_2c7966c2-a95d-468a-83fe-bf196b95be7a
 * Button — https://app.subframe.com/002445ea7110/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface ToastRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: "brand" | "neutral" | "error" | "success";
  icon?: SubframeCore.IconName;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const ToastRoot = React.forwardRef<HTMLElement, ToastRootProps>(
  function ToastRoot(
    {
      variant = "neutral",
      icon = "FeatherInfo",
      title,
      description,
      actions,
      className,
      ...otherProps
    }: ToastRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/2c7966c2 flex w-80 items-center gap-4 rounded-md bg-background-primary px-4 py-3 shadow-lg",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <SubframeCore.Icon
          className={SubframeUtils.twClassNames(
            "text-h3 font-h3 text-neutral-700",
            {
              "text-green-700": variant === "success",
              "text-red-700": variant === "error",
              "text-brand-500": variant === "brand",
            }
          )}
          name={icon}
        />
        <div className="flex grow shrink-0 basis-0 flex-col items-start">
          {title ? (
            <span
              className={SubframeUtils.twClassNames(
                "w-full text-body-bold font-body-bold text-text-primary",
                {
                  "text-text-primary":
                    variant === "success" ||
                    variant === "error" ||
                    variant === "brand",
                }
              )}
            >
              {title}
            </span>
          ) : null}
          {description ? (
            <span className="w-full text-caption font-caption text-text-secondary">
              {description}
            </span>
          ) : null}
        </div>
        {actions ? (
          <div className="flex items-center justify-end gap-1">{actions}</div>
        ) : null}
      </div>
    );
  }
);

export const Toast = ToastRoot;
