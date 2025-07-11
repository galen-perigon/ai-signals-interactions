"use client";
/*
 * Documentation:
 * Notification Card — https://app.subframe.com/002445ea7110/library?component=Notification+Card_0b04f334-454c-4c26-9b1b-a17577d415e1
 * Icon with background — https://app.subframe.com/002445ea7110/library?component=Icon+with+background_c5d68c0e-4c0c-4cff-8d8c-6ff334859b3a
 * Badge — https://app.subframe.com/002445ea7110/library?component=Badge_97bdb082-1124-4dd7-a335-b14b822d0157
 * Button — https://app.subframe.com/002445ea7110/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface NotificationCardRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  leftSlot?: React.ReactNode;
  actions?: React.ReactNode;
  state?: "default" | "warning";
  className?: string;
}

const NotificationCardRoot = React.forwardRef<
  HTMLElement,
  NotificationCardRootProps
>(function NotificationCardRoot(
  {
    children,
    leftSlot,
    actions,
    state = "default",
    className,
    ...otherProps
  }: NotificationCardRootProps,
  ref,
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/0b04f334 flex w-full items-start gap-4 rounded-md border border-solid border-brand-200 bg-background-primary px-4 py-4",
        {
          "border border-solid border-gold-100 bg-gold-50": state === "warning",
        },
        className,
      )}
      ref={ref as any}
      {...otherProps}
    >
      {leftSlot ? (
        <div className="flex items-start gap-4">{leftSlot}</div>
      ) : null}
      {children ? (
        <div className="flex flex-col items-start gap-2 grow">{children}</div>
      ) : null}
    </div>
  );
});

export const NotificationCard = NotificationCardRoot;
