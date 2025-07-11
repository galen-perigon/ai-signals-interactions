"use client";
/*
 * Documentation:
 * Chat Input — https://app.subframe.com/002445ea7110/library?component=Chat+Input_bf9d5156-8328-4c63-9c8c-2c24d3e3f9e7
 * Button — https://app.subframe.com/002445ea7110/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 * Text Area — https://app.subframe.com/002445ea7110/library?component=Text+Area_4ec05ee8-8f1c-46b2-b863-5419aa7f5cce
 * Icon Button — https://app.subframe.com/002445ea7110/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";
import { FeatherEdit, FeatherCheck, FeatherLoader, FeatherChevronDown, FeatherPaperclip, FeatherArrowUp } from "@subframe/core";
import { Button } from "./Button";
import { TextArea } from "./TextArea";
import { IconButton } from "./IconButton";

interface ChatInputRootProps extends React.HTMLAttributes<HTMLDivElement> {
  statusLabel?: React.ReactNode;
  icon?: SubframeCore.IconName;
  variant?: "default" | "approval" | "no-banner";
  className?: string;
}

const ChatInputRoot = React.forwardRef<HTMLElement, ChatInputRootProps>(
  function ChatInputRoot(
    {
      statusLabel,
      icon = "FeatherLoader",
      variant = "default",
      className,
      ...otherProps
    }: ChatInputRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/bf9d5156 flex h-52 w-112 flex-col items-center justify-end pt-4",
          { "h-52 w-112": variant === "no-banner" },
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <div
          className={SubframeUtils.twClassNames(
            "hidden w-full flex-col items-start rounded-lg border border-solid border-border-focused bg-background-primary shadow-[0px_12px_32px_-4px_#d1f0ffff,0px_4px_8px_-2px_#00000014]",
            { "flex h-auto w-full flex-none": variant === "approval" }
          )}
        >
          <div className="flex w-full items-center justify-between border-b border-dashed border-border-primary px-4 py-4">
            <span className="text-body-bold font-body-bold text-text-primary">
              {variant === "approval"
                ? "Your plan is ready"
                : "Your plan is ready to be updated"}
            </span>
          </div>
          <div className="flex w-full items-center justify-between px-4 py-3">
            <span className="text-body font-body text-text-secondary">
              Review the plan to make sure everything looks as you expect. You
              can also make revisions by chatting with me.
            </span>
          </div>
          <div className="flex w-full items-center justify-end gap-4 px-4 pt-2 pb-3">
            <Button variant="brand-secondary" size="large" icon={<FeatherEdit />}>
              {variant === "approval" ? "Request edits" : "Continue chatting"}
            </Button>
            <Button size="large" icon={<FeatherCheck />}>
              {variant === "approval" ? "Generate preview" : "Approve plan"}
            </Button>
          </div>
        </div>
        <div
          className={SubframeUtils.twClassNames(
            "flex w-full flex-col items-center justify-end rounded-lg border border-solid border-brand-200 bg-background-primary px-1 py-1",
            { hidden: variant === "approval" }
          )}
        >
          <div
            className={SubframeUtils.twClassNames(
              "flex w-full items-center gap-2 rounded-t-md px-3 pt-1 pb-2",
              { hidden: variant === "no-banner" || variant === "approval" }
            )}
          >
            <div className="flex grow shrink-0 basis-0 items-center justify-between">
              <div className="flex h-6 items-center gap-1 rounded-md border-0 border-solid border-border-primary">
                <SubframeCore.Icon
                  className="text-caption font-caption text-brand-600"
                  name={icon}
                />
                {statusLabel ? (
                  <span className="whitespace-nowrap text-caption font-caption text-text-primary">
                    {statusLabel}
                  </span>
                ) : null}
              </div>
              <Button
                variant="brand-secondary"
                size="small"
                iconRight={<FeatherChevronDown />}
              >
                Details
              </Button>
            </div>
          </div>
          <TextArea
            className={SubframeUtils.twClassNames(
              "h-36 w-full flex-none relative",
              { hidden: variant === "approval" }
            )}
            label=""
            helpText=""
          >
            <TextArea.Input
              className="min-h-[96px] w-full grow shrink-0 basis-0"
              placeholder="Any changes to the plan?"
            />
            <div className="flex w-full items-start justify-between px-2 pb-2">
              <IconButton icon={<FeatherPaperclip />} />
              <Button
                className="h-8 w-8 flex-none"
                variant="brand-tertiary"
                iconRight={<FeatherArrowUp />}
              />
            </div>
          </TextArea>
        </div>
      </div>
    );
  }
);

export const ChatInput = ChatInputRoot;
