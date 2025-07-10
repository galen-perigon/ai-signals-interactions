"use client";
/*
 * Documentation:
 * Text Area — https://app.subframe.com/002445ea7110/library?component=Text+Area_4ec05ee8-8f1c-46b2-b863-5419aa7f5cce
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface InputProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "placeholder"
  > {
  placeholder?: React.ReactNode;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const Input = React.forwardRef<HTMLElement, InputProps>(function Input(
  { placeholder, className, ...otherProps }: InputProps,
  ref
) {
  return (
    <textarea
      className={SubframeUtils.twClassNames(
        "min-h-[96px] w-full border-none bg-transparent px-2 py-1.5 text-body font-body text-text-primary outline-none placeholder:text-neutral-400",
        className
      )}
      placeholder={placeholder as string}
      ref={ref as any}
      {...otherProps}
    />
  );
});

interface TextAreaRootProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  error?: boolean;
  variant?: "outline" | "filled";
  label?: React.ReactNode;
  helpText?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const TextAreaRoot = React.forwardRef<HTMLElement, TextAreaRootProps>(
  function TextAreaRoot(
    {
      error = false,
      variant = "outline",
      label,
      helpText,
      children,
      className,
      ...otherProps
    }: TextAreaRootProps,
    ref
  ) {
    return (
      <label
        className={SubframeUtils.twClassNames(
          "group/4ec05ee8 flex flex-col items-start gap-1",
          { "border-none": variant === "filled" },
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        {label ? (
          <span className="text-caption-bold font-caption-bold text-text-primary">
            {label}
          </span>
        ) : null}
        {children ? (
          <div
            className={SubframeUtils.twClassNames(
              "flex w-full grow shrink-0 basis-0 flex-col items-start rounded-md border border-solid pl-1 border-neutral-alpha-16 bg-neutral-100 group-focus-within/4ec05ee8:border group-focus-within/4ec05ee8:border-solid group-focus-within/4ec05ee8:border-border-focused",
              {
                "border border-solid border-neutral-100 bg-neutral-100 group-hover/4ec05ee8:border group-hover/4ec05ee8:border-solid group-hover/4ec05ee8:border-border-primary group-focus-within/4ec05ee8:bg-background-primary":
                  variant === "filled",
                "border border-solid border-red-600": error,
              }
            )}
          >
            {children}
          </div>
        ) : null}
        {helpText ? (
          <span
            className={SubframeUtils.twClassNames(
              "text-caption font-caption text-text-secondary",
              { "text-red-700": error }
            )}
          >
            {helpText}
          </span>
        ) : null}
      </label>
    );
  }
);

export const TextArea = Object.assign(TextAreaRoot, {
  Input,
});
