"use client";
/*
 * Documentation:
 * Chat Sent — https://app.subframe.com/002445ea7110/library?component=Chat+Sent_8206bfc1-a590-434f-9706-c81a8bc60827
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface ChatSentRootProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: React.ReactNode;
  message?: React.ReactNode;
  timestamp?: React.ReactNode;
  className?: string;
}

const ChatSentRoot = React.forwardRef<HTMLElement, ChatSentRootProps>(
  function ChatSentRoot(
    { name, message, timestamp, className, ...otherProps }: ChatSentRootProps,
    ref,
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/8206bfc1 flex w-full flex-col items-end justify-center gap-1",
          className,
        )}
        ref={ref as any}
        {...otherProps}
      >
        <div className="flex flex-col items-start justify-center gap-1">
          <div className="flex flex-wrap items-center gap-2">
            {name ? (
              <span className="text-body-bold font-body-bold text-text-primary">
                {name}
              </span>
            ) : null}
            {timestamp ? (
              <span className="text-caption font-caption text-text-secondary">
                {timestamp}
              </span>
            ) : null}
          </div>
          <div className="flex w-full max-w-[576px] flex-col items-start gap-2 rounded-md px-3 py-2 bg-sapphire-600">
            {message ? (
              <span className="text-body font-body text-white">{message}</span>
            ) : null}
          </div>
        </div>
      </div>
    );
  },
);

export const ChatSent = ChatSentRoot;
