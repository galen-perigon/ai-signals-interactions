"use client";
/*
 * Documentation:
 * Pie Chart — https://app.subframe.com/002445ea7110/library?component=Pie+Chart_0654ccc7-054c-4f3a-8e9a-b7c81dd3963c
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface PieChartRootProps
  extends React.ComponentProps<typeof SubframeCore.PieChart> {
  className?: string;
}

const PieChartRoot = React.forwardRef<HTMLElement, PieChartRootProps>(
  function PieChartRoot({ className, ...otherProps }: PieChartRootProps, ref) {
    return (
      <SubframeCore.PieChart
        className={SubframeUtils.twClassNames("h-52 w-52", className)}
        ref={ref as any}
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

export const PieChart = PieChartRoot;
