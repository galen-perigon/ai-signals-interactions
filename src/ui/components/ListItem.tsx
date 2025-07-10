"use client";
/*
 * Documentation:
 * List Item — https://app.subframe.com/002445ea7110/library?component=List+Item_4e9ab2f8-0095-4157-93b9-d2c150269440
 * Avatar — https://app.subframe.com/002445ea7110/library?component=Avatar_bec25ae6-5010-4485-b46b-cf79e3943ab2
 * Badge — https://app.subframe.com/002445ea7110/library?component=Badge_97bdb082-1124-4dd7-a335-b14b822d0157
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { Badge } from "./Badge";

interface ListItemRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  avatar?: boolean;
  title?: React.ReactNode;
  titleDescription?: React.ReactNode;
  count?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const ListItemRoot = React.forwardRef<HTMLElement, ListItemRootProps>(
  function ListItemRoot(
    {
      avatar = false,
      title,
      titleDescription,
      count,
      children,
      className,
      ...otherProps
    }: ListItemRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/4e9ab2f8 flex w-full items-center justify-between",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <div className="flex items-center gap-4">
          {children ? (
            <div className="flex items-center gap-4">{children}</div>
          ) : null}
          <div className="flex flex-col items-start">
            {title ? (
              <span
                className={SubframeUtils.twClassNames(
                  "font-['Px_Grotesk'] text-[16px] font-[400] leading-[20px] text-text-primary",
                  {
                    "font-['Px_Grotesk'] text-[16px] font-[400] leading-[20px] tracking-normal":
                      avatar,
                  }
                )}
              >
                {title}
              </span>
            ) : null}
            {titleDescription ? (
              <span className="text-caption font-caption text-text-secondary">
                {titleDescription}
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {count ? (
            <span className="text-h3 font-h3 text-text-primary">{count}</span>
          ) : null}
          <Badge variant="success">60%</Badge>
        </div>
      </div>
    );
  }
);

export const ListItem = ListItemRoot;
