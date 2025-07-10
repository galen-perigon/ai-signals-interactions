"use client";
/*
 * Documentation:
 * Sidebar Nav — https://app.subframe.com/002445ea7110/library?component=Sidebar+Nav_43849915-3938-4cac-a70a-ec9cdd0c4402
 * Button — https://app.subframe.com/002445ea7110/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 * Link Button — https://app.subframe.com/002445ea7110/library?component=Link+Button_a4ee726a-774c-4091-8c49-55b659356024
 * Icon Button — https://app.subframe.com/002445ea7110/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { Button } from "./Button";
import { LinkButton } from "./LinkButton";
import { IconButton } from "./IconButton";

interface SidebarNavRootProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: React.ReactNode;
  text2?: React.ReactNode;
  text3?: React.ReactNode;
  image?: string;
  text4?: React.ReactNode;
  text5?: React.ReactNode;
  className?: string;
}

const SidebarNavRoot = React.forwardRef<HTMLElement, SidebarNavRootProps>(
  function SidebarNavRoot(
    {
      text,
      text2,
      text3,
      image,
      text4,
      text5,
      className,
      ...otherProps
    }: SidebarNavRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "flex h-full w-64 flex-col items-start gap-6 border-r border-solid border-brand-200 bg-background-primary px-4 py-6 fixed left-0 top-0",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <div className="flex w-full items-center gap-2">
          {text ? (
            <span className="text-h2 font-h2 text-text-primary">{text}</span>
          ) : null}
          {text2 ? (
            <span className="text-caption font-caption text-sapphire-400">
              {text2}
            </span>
          ) : null}
        </div>
        <div className="flex w-full items-center gap-2">
          <Button
            className="grow"
            variant="neutral-tertiary"
            icon="FeatherPlus"
          >
            New Search
          </Button>
        </div>
        <div className="flex w-full flex-col items-start gap-4">
          <LinkButton icon="FeatherTrendingUp">Trending</LinkButton>
          <LinkButton icon="FeatherZap">Signals</LinkButton>
          <div className="flex h-px w-full flex-none items-start bg-brand-200" />
          <div className="flex w-full items-center justify-between">
            <LinkButton icon="FeatherBook">Library</LinkButton>
            <div className="flex items-center gap-2">
              <IconButton icon="FeatherMaximize2" />
              <IconButton icon="FeatherFilter" />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-4">
          {text3 ? (
            <span className="text-caption font-caption text-text-secondary">
              {text3}
            </span>
          ) : null}
          <div className="flex w-full flex-col items-start gap-2">
            <LinkButton icon="FeatherSearch">Untitled</LinkButton>
            <LinkButton
              className="h-auto w-full flex-none"
              icon="FeatherMessageSquare"
            >
              Apple Investments in AI
            </LinkButton>
            <LinkButton
              className="h-auto w-full flex-none"
              icon="FeatherMessageSquare"
            >
              AI Advancements in Healthca...
            </LinkButton>
            <LinkButton
              className="h-auto w-full flex-none"
              icon="FeatherSearch"
            >
              Who is Ilya Sutskever?
            </LinkButton>
            <LinkButton
              className="h-auto w-full flex-none"
              icon="FeatherSearch"
            >
              Analytical Search Ex
            </LinkButton>
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-end gap-4 grow">
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex h-px w-full flex-none items-start bg-brand-200" />
            <LinkButton icon="FeatherCode">Developers</LinkButton>
            <LinkButton icon="FeatherSettings">Settings</LinkButton>
          </div>
          <div className="flex w-full items-center gap-3">
            {image ? (
              <img
                className="h-8 w-8 flex-none rounded-full object-cover"
                src={image}
              />
            ) : null}
            <div className="flex flex-col items-start grow">
              {text4 ? (
                <span className="w-full text-body-bold font-body-bold text-text-primary">
                  {text4}
                </span>
              ) : null}
              {text5 ? (
                <span className="text-caption font-caption text-text-secondary">
                  {text5}
                </span>
              ) : null}
            </div>
          </div>
          <IconButton icon="FeatherChevronsLeft" />
        </div>
      </div>
    );
  }
);

export const SidebarNav = SidebarNavRoot;
