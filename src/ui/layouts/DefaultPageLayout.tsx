"use client";
/*
 * Documentation:
 * Default Page Layout — https://app.subframe.com/002445ea7110/library?component=Default+Page+Layout_a57b1c43-310a-493f-b807-8cc88e2452cf
 * Sidebar Collapsible — https://app.subframe.com/002445ea7110/library?component=Sidebar+Collapsible_e9a2b1a3-fe9c-49bc-8cd5-e54e02de5efb
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { SidebarCollapsible } from "../components/SidebarCollapsible";

interface DefaultPageLayoutRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const DefaultPageLayoutRoot = React.forwardRef<
  HTMLElement,
  DefaultPageLayoutRootProps
>(function DefaultPageLayoutRoot(
  { children, className, ...otherProps }: DefaultPageLayoutRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex h-screen w-full items-start bg-neutral-50 mobile:flex-col mobile:flex-nowrap mobile:gap-0",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      <SidebarCollapsible
        className="h-auto w-16 flex-none self-stretch mobile:h-auto mobile:w-full mobile:flex-none hidden md:flex"
        expanded={false}
      />
      {children ? (
        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 self-stretch overflow-y-auto bg-background-primary">
          {children}
        </div>
      ) : null}
    </div>
  );
});

export const DefaultPageLayout = DefaultPageLayoutRoot;
