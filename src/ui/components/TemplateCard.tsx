"use client";
/*
 * Documentation:
 * Template Card — https://app.subframe.com/002445ea7110/library?component=Template+Card_dfab6ff2-88f1-46c8-b784-253abe92f4fb
 * Icon Button — https://app.subframe.com/002445ea7110/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { IconButton } from "./IconButton";

interface TemplateCardRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  content?: React.ReactNode;
  className?: string;
}

const TemplateCardRoot = React.forwardRef<HTMLElement, TemplateCardRootProps>(
  function TemplateCardRoot(
    { content, className, ...otherProps }: TemplateCardRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/dfab6ff2 flex cursor-pointer items-start justify-between rounded-md border border-solid border-brand-200 bg-background-primary px-4 py-3 hover:flex-row hover:flex-nowrap hover:justify-between hover:px-4 hover:py-3 hover:shadow-sm",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        {content ? (
          <span className="grow shrink-0 basis-0 text-body font-body text-text-primary">
            {content}
          </span>
        ) : null}
        <IconButton
          disabled={false}
          variant="neutral-tertiary"
          size="small"
          icon="FeatherArrowUp"
          loading={false}
        />
      </div>
    );
  }
);

export const TemplateCard = TemplateCardRoot;
