"use client";
/*
 * Documentation:
 * Button — https://app.subframe.com/002445ea7110/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface ButtonRootProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "brand-primary"
    | "brand-secondary"
    | "brand-tertiary"
    | "neutral-primary"
    | "neutral-secondary"
    | "neutral-tertiary"
    | "destructive-primary"
    | "destructive-secondary"
    | "destructive-tertiary"
    | "inverse";
  size?: "large" | "medium" | "small";
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const ButtonRoot = React.forwardRef<HTMLElement, ButtonRootProps>(
  function ButtonRoot(
    {
      variant = "brand-primary",
      size = "medium",
      children,
      icon = null,
      iconRight = null,
      loading = false,
      className,
      type = "button",
      ...otherProps
    }: ButtonRootProps,
    ref,
  ) {
    return (
      <button
        className={SubframeUtils.twClassNames(
          "group/3b777358 flex h-8 cursor-pointer items-center justify-center gap-2 border-none px-3 rounded-lg bg-button-primary hover:bg-button-primary-bright active:bg-button-primary-dim disabled:cursor-default disabled:bg-background-disabled hover:disabled:cursor-default hover:disabled:bg-background-disabled active:disabled:cursor-default active:disabled:bg-background-disabled",
          {
            "h-6 w-auto flex-row flex-nowrap gap-1 rounded-md px-2 py-0":
              size === "small",
            "h-10 w-auto px-4 py-0": size === "large",
            "border border-solid border-neutral-alpha-16 bg-transparent text-inherit hover:bg-neutral-alpha-6 active:bg-neutral-alpha-12":
              variant === "inverse",
            "bg-transparent hover:bg-red-50 active:bg-red-100":
              variant === "destructive-tertiary",
            "bg-red-50 hover:bg-red-100 active:bg-red-50":
              variant === "destructive-secondary",
            "bg-red-600 hover:bg-red-500 active:bg-red-600":
              variant === "destructive-primary",
            "border border-solid border-brand-200 bg-button-secondary shadow-shadow-tight hover:bg-button-secondary-bright active:bg-button-secondary-dim":
              variant === "neutral-tertiary" ||
              variant === "neutral-secondary" ||
              variant === "neutral-primary" ||
              variant === "brand-secondary",
            "bg-button-tertiary hover:bg-button-tertiary-bright active:bg-button-tertiary-dim":
              variant === "brand-tertiary",
          },
          className,
        )}
        ref={ref as any}
        type={type}
        {...otherProps}
      >
        {icon ? (
          <SubframeCore.IconWrapper
            className={SubframeUtils.twClassNames(
              "text-body font-body text-text-primary group-disabled/3b777358:text-text-disabled",
              {
                hidden: loading,
                "text-body font-body": size === "small",
                "text-h3 font-h3": size === "large",
                "text-white": variant === "inverse",
                "text-red-700":
                  variant === "destructive-tertiary" ||
                  variant === "destructive-secondary",
                "text-text-inverted group-hover/3b777358:text-text-inverted group-active/3b777358:text-text-inverted":
                  variant === "destructive-primary",
                "text-neutral-700":
                  variant === "neutral-tertiary" ||
                  variant === "neutral-secondary" ||
                  variant === "neutral-primary",
                "text-text-inverted": variant === "brand-tertiary",
                "text-text-primary": variant === "brand-secondary",
              },
            )}
          >
            {icon}
          </SubframeCore.IconWrapper>
        ) : null}
        <div
          className={SubframeUtils.twClassNames(
            "hidden h-4 w-4 flex-none items-center justify-center gap-2",
            {
              flex: loading,
              "h-3 w-3 flex-none": size === "small",
              hidden: variant === "brand-tertiary",
            },
          )}
        >
          <SubframeCore.Loader
            className={SubframeUtils.twClassNames(
              "text-caption font-caption text-white group-disabled/3b777358:text-neutral-400",
              {
                "inline-block font-['Inter'] text-[12px] font-[400] leading-[20px] tracking-normal text-text-primary":
                  loading,
                "text-caption font-caption": size === "small",
                "text-red-700":
                  variant === "destructive-tertiary" ||
                  variant === "destructive-secondary",
                "text-neutral-700":
                  variant === "neutral-tertiary" ||
                  variant === "neutral-secondary" ||
                  variant === "neutral-primary",
                "text-brand-600":
                  variant === "brand-tertiary" || variant === "brand-secondary",
              },
            )}
          />
        </div>
        {children ? (
          <span
            className={SubframeUtils.twClassNames(
              "whitespace-nowrap text-body-bold font-body-bold text-text-primary group-disabled/3b777358:text-text-disabled group-hover/3b777358:group-disabled/3b777358:text-text-disabled group-active/3b777358:group-disabled/3b777358:text-text-disabled",
              {
                hidden: loading,
                "text-caption-bold font-caption-bold": size === "small",
                "text-body-bold font-body-bold": size === "large",
                "text-text-primary":
                  variant === "inverse" ||
                  variant === "neutral-tertiary" ||
                  variant === "neutral-secondary" ||
                  variant === "neutral-primary",
                "text-red-700":
                  variant === "destructive-tertiary" ||
                  variant === "destructive-secondary",
                "text-text-inverted group-hover/3b777358:text-text-inverted group-active/3b777358:text-text-inverted":
                  variant === "destructive-primary" ||
                  variant === "brand-tertiary",
                "text-text-primary group-active/3b777358:text-text-primary":
                  variant === "brand-secondary",
              },
            )}
          >
            {children}
          </span>
        ) : null}
        {iconRight ? (
          <SubframeCore.IconWrapper
            className={SubframeUtils.twClassNames(
              "text-body font-body text-text-primary group-disabled/3b777358:text-text-disabled",
              {
                "text-body font-body text-text-primary": size === "small",
                "text-h3 font-h3 text-text-primary": size === "large",
                "text-white": variant === "inverse",
                "text-red-700":
                  variant === "destructive-tertiary" ||
                  variant === "destructive-secondary",
                "text-text-inverted group-hover/3b777358:text-text-inverted group-active/3b777358:text-text-inverted":
                  variant === "destructive-primary",
                "text-text-primary":
                  variant === "neutral-tertiary" ||
                  variant === "neutral-secondary" ||
                  variant === "neutral-primary" ||
                  variant === "brand-secondary",
                "text-text-inverted": variant === "brand-tertiary",
              },
            )}
          >
            {iconRight}
          </SubframeCore.IconWrapper>
        ) : null}
      </button>
    );
  },
);

export const Button = ButtonRoot;
