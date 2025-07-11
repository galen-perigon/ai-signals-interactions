"use client";
/*
 * Documentation:
 * Icon Button — https://app.subframe.com/002445ea7110/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";
import { FeatherPlus } from "@subframe/core";

interface IconButtonRootProps
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
  icon?: React.ReactNode;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const IconButtonRoot = React.forwardRef<HTMLElement, IconButtonRootProps>(
  function IconButtonRoot(
    {
      variant = "neutral-tertiary",
      size = "medium",
      icon = <FeatherPlus />,
      loading = false,
      className,
      type = "button",
      ...otherProps
    }: IconButtonRootProps,
    ref
  ) {
    return (
      <button
        className={SubframeUtils.twClassNames(
          "group/af9405b1 flex h-8 w-8 cursor-pointer items-center justify-center gap-2 border-none bg-transparent rounded-lg shadow-none hover:bg-background-tertiary active:bg-background-selected disabled:cursor-default disabled:bg-background-disabled hover:disabled:cursor-default hover:disabled:bg-background-disabled active:disabled:cursor-default active:disabled:bg-background-disabled",
          {
            "h-6 w-6": size === "small",
            "h-10 w-10": size === "large",
            "rounded-md border-none bg-transparent shadow-none hover:border-none hover:bg-background-tertiary hover:shadow-none active:border-none active:bg-background-selected active:shadow-none":
              variant === "inverse",
            "hover:bg-red-50 active:bg-red-100":
              variant === "destructive-tertiary",
            "bg-red-50 hover:bg-red-100 active:bg-red-50":
              variant === "destructive-secondary",
            "bg-red-600 hover:bg-red-500 active:bg-red-600":
              variant === "destructive-primary",
            "border border-solid border-brand-200 bg-button-secondary shadow-shadow-tight hover:bg-button-secondary-bright active:bg-button-secondary-dim":
              variant === "neutral-secondary" ||
              variant === "neutral-primary" ||
              variant === "brand-secondary",
            "bg-button-tertiary hover:bg-button-tertiary-bright active:bg-button-tertiary-bright":
              variant === "brand-tertiary",
            "border border-solid border-brand-200 bg-button-primary hover:bg-button-primary-bright active:bg-button-primary-dim":
              variant === "brand-primary",
          },
          className
        )}
        ref={ref as any}
        type={type}
        {...otherProps}
      >
        {icon ? (
          <SubframeCore.IconWrapper
            className={SubframeUtils.twClassNames(
              "text-h3 font-h3 text-text-primary group-hover/af9405b1:text-text-primary group-active/af9405b1:text-text-primary group-disabled/af9405b1:text-text-disabled group-hover/af9405b1:group-disabled/af9405b1:text-text-disabled group-active/af9405b1:group-disabled/af9405b1:text-text-disabled",
              {
                hidden: loading,
                "text-body font-body": size === "small",
                "text-h3 font-h3": size === "large",
                "text-text-secondary group-hover/af9405b1:text-text-primary":
                  variant === "inverse",
                "text-red-700 group-hover/af9405b1:text-red-700 group-active/af9405b1:text-red-700":
                  variant === "destructive-tertiary" ||
                  variant === "destructive-secondary",
                "text-white group-hover/af9405b1:text-white group-active/af9405b1:text-white":
                  variant === "destructive-primary",
                "text-neutral-700": variant === "neutral-secondary",
                "text-neutral-700 group-hover/af9405b1:text-neutral-700 group-active/af9405b1:text-neutral-700":
                  variant === "neutral-primary",
                "text-text-inverted group-hover/af9405b1:text-text-inverted group-active/af9405b1:text-text-inverted":
                  variant === "brand-tertiary",
                "text-text-primary group-hover/af9405b1:text-text-primary group-active/af9405b1:text-text-primary":
                  variant === "brand-secondary" || variant === "brand-primary",
              }
            )}
          >
            {icon}
          </SubframeCore.IconWrapper>
        ) : null}
        <SubframeCore.Loader
          className={SubframeUtils.twClassNames(
            "hidden text-caption font-caption text-neutral-700 group-disabled/af9405b1:text-neutral-400",
            {
              "inline-block": loading,
              "text-caption font-caption": size === "small",
              "text-white":
                variant === "inverse" ||
                variant === "destructive-primary" ||
                variant === "brand-primary",
              "text-red-700":
                variant === "destructive-tertiary" ||
                variant === "destructive-secondary",
              "text-neutral-700": variant === "neutral-primary",
              "text-brand-600":
                variant === "brand-tertiary" || variant === "brand-secondary",
            }
          )}
        />
      </button>
    );
  }
);

export const IconButton = IconButtonRoot;
