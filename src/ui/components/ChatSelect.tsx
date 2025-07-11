"use client";
/*
 * Documentation:
 * Chat Select — https://app.subframe.com/002445ea7110/library?component=Chat+Select_06e247f1-1170-4661-bc10-1634551a38c2
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface ChatSelectRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const ChatSelectRoot = React.forwardRef<HTMLElement, ChatSelectRootProps>(
  function ChatSelectRoot(
    { children, className, ...otherProps }: ChatSelectRootProps,
    ref,
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/06e247f1 flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 hover:bg-neutral-100",
          className,
        )}
        ref={ref as any}
        {...otherProps}
      >
        <div className="flex flex-col items-start gap-2">
          {children ? (
            <span className="text-h2 font-h2 text-text-secondary">
              {children}
            </span>
          ) : null}
        </div>
        <SubframeCore.Icon
          className="text-h2 font-h2 text-text-secondary"
          name="FeatherChevronDown"
        />
      </div>
    );
  },
);

export const ChatSelect = ChatSelectRoot;
