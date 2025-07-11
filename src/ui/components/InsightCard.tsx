"use client";
/*
 * Documentation:
 * Insight Card — https://app.subframe.com/002445ea7110/library?component=Insight+Card_46eabf28-0a4c-4cc2-b81b-3078114e415c
 * Badge — https://app.subframe.com/002445ea7110/library?component=Badge_97bdb082-1124-4dd7-a335-b14b822d0157
 * Avatar — https://app.subframe.com/002445ea7110/library?component=Avatar_bec25ae6-5010-4485-b46b-cf79e3943ab2
 * List Item — https://app.subframe.com/002445ea7110/library?component=List+Item_4e9ab2f8-0095-4157-93b9-d2c150269440
 * Button — https://app.subframe.com/002445ea7110/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 * Icon Button — https://app.subframe.com/002445ea7110/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { Badge } from "./Badge";
import { Avatar } from "./Avatar";
import { ListItem } from "./ListItem";
import { Button } from "./Button";
import { IconButton } from "./IconButton";

interface InsightCardRootProps extends React.HTMLAttributes<HTMLDivElement> {
  headline?: React.ReactNode;
  className?: string;
}

const InsightCardRoot = React.forwardRef<HTMLElement, InsightCardRootProps>(
  function InsightCardRoot(
    { headline, className, ...otherProps }: InsightCardRootProps,
    ref,
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "flex w-full max-w-[448px] flex-col items-start gap-4 rounded-lg border border-solid border-brand-200 bg-background-primary px-6 py-6 shadow-sm",
          className,
        )}
        ref={ref as any}
        {...otherProps}
      >
        <div className="flex w-full flex-col items-start gap-4">
          <Badge variant="neutral" icon="FeatherStar">
            TOP MENTIONS
          </Badge>
          {headline ? (
            <span className="text-h2 font-h2 text-text-primary">
              {headline}
            </span>
          ) : null}
        </div>
        <div className="flex w-full flex-col items-start gap-4">
          <ListItem
            avatar={true}
            title="Coinbase"
            titleDescription="Crypto partnerships, user policy"
            count="148"
          >
            <Avatar variant="warning" image="">
              C
            </Avatar>
          </ListItem>
          <ListItem
            avatar={true}
            title="Apple"
            titleDescription="Crypto partnerships, user policy"
            count="148"
          >
            <Avatar variant="neutral" image="">
              A
            </Avatar>
          </ListItem>
          <ListItem
            avatar={true}
            title="Microstrategy"
            titleDescription="Crypto partnerships, user policy"
            count="148"
          >
            <Avatar variant="error" image="">
              M
            </Avatar>
          </ListItem>
        </div>
        <div className="flex w-full items-center justify-between pt-2">
          <span className="text-caption font-caption text-text-secondary">
            15m ago
          </span>
          <div className="flex items-center gap-2">
            <Button variant="neutral-secondary" icon="FeatherBarChart2">
              Analyze
            </Button>
            <IconButton icon="FeatherMoreHorizontal" />
          </div>
        </div>
      </div>
    );
  },
);

export const InsightCard = InsightCardRoot;
