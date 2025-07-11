"use client";
/*
 * Documentation:
 * Bar Chart — https://app.subframe.com/002445ea7110/library?component=Bar+Chart_4d4f30e7-1869-4980-8b96-617df3b37912
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface BarChartRootProps
  extends React.ComponentProps<typeof SubframeCore.BarChart> {
  stacked?: boolean;
  className?: string;
}

const BarChartRoot = React.forwardRef<HTMLElement, BarChartRootProps>(
  function BarChartRoot(
    { stacked = false, className, ...otherProps }: BarChartRootProps,
    ref,
  ) {
    return (
      <SubframeCore.BarChart
        className={SubframeUtils.twClassNames("h-80 w-full", className)}
        ref={ref as any}
        stacked={stacked}
        colors={[
          "#828282",
          "#f6f6f4",
          "#505050",
          "#e4e4e4",
          "#454545",
          "#9d9d9d",
        ]}
        {...otherProps}
      />
    );
  },
);

export const BarChart = BarChartRoot;
