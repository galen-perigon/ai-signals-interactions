"use client";
/*
 * Documentation:
 * Loader — https://app.subframe.com/002445ea7110/library?component=Loader_f2e570c8-e463-45c2-aae9-a960146bc5d5
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface LoaderRootProps
  extends React.ComponentProps<typeof SubframeCore.Loader> {
  size?: "small" | "medium" | "large";
  className?: string;
}

const LoaderRoot = React.forwardRef<HTMLElement, LoaderRootProps>(
  function LoaderRoot(
    { size = "medium", className, ...otherProps }: LoaderRootProps,
    ref,
  ) {
    return (
      <SubframeCore.Loader
        className={SubframeUtils.twClassNames(
          "group/f2e570c8 text-body font-body text-brand-500",
          {
            "text-h2 font-h2": size === "large",
            "text-caption font-caption": size === "small",
          },
          className,
        )}
        ref={ref as any}
        {...otherProps}
      />
    );
  },
);

export const Loader = LoaderRoot;
