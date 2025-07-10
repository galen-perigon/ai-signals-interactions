"use client";
/*
 * Documentation:
 * Info Card — https://app.subframe.com/002445ea7110/library?component=Info+Card_0502fb14-56c8-48a0-b67c-216f8daed6ce
 * Icon Button — https://app.subframe.com/002445ea7110/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { IconButton } from "./IconButton";

interface InfoCardImageProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: string;
  className?: string;
}

const InfoCardImage = React.forwardRef<HTMLElement, InfoCardImageProps>(
  function InfoCardImage(
    { image, className, ...otherProps }: InfoCardImageProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "flex w-full flex-col items-start gap-2",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        {image ? <img className="w-full flex-none" src={image} /> : null}
        <IconButton size="small" icon="FeatherArrowUpRight" />
      </div>
    );
  }
);

interface InfoCardRootProps extends React.HTMLAttributes<HTMLDivElement> {
  messageSlot?: React.ReactNode;
  className?: string;
}

const InfoCardRoot = React.forwardRef<HTMLElement, InfoCardRootProps>(
  function InfoCardRoot(
    { messageSlot, className, ...otherProps }: InfoCardRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "flex w-52 flex-col items-start rounded-lg border border-solid border-brand-200 bg-background-primary",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <div className="flex w-full flex-col items-start gap-2 relative">
          <img
            className="w-full flex-none"
            src="https://res.cloudinary.com/subframe/image/upload/v1750955423/uploads/5484/cqe3dsoeyakof0satrtl.png"
          />
          <IconButton
            className="absolute top-2 right-2"
            size="small"
            icon="FeatherArrowUpRight"
          />
        </div>
        {messageSlot ? (
          <div className="flex w-52 flex-col items-start gap-1 px-3 py-3">
            {messageSlot}
          </div>
        ) : null}
      </div>
    );
  }
);

export const InfoCard = Object.assign(InfoCardRoot, {
  InfoCardImage,
});
