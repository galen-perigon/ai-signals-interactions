"use client";
/*
 * Documentation:
 * Custom component — https://app.subframe.com/002445ea7110/library?component=Custom+component_c0ef1046-52c2-4642-92d9-41a20ae5aa99
 * Loader — https://app.subframe.com/002445ea7110/library?component=Loader_f2e570c8-e463-45c2-aae9-a960146bc5d5
 * Icon with background — https://app.subframe.com/002445ea7110/library?component=Icon+with+background_c5d68c0e-4c0c-4cff-8d8c-6ff334859b3a
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { Loader } from "./Loader";
import { IconWithBackground } from "./IconWithBackground";

interface CustomComponentRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  text?: React.ReactNode;
  text2?: React.ReactNode;
  text3?: React.ReactNode;
  text4?: React.ReactNode;
  text5?: React.ReactNode;
  text6?: React.ReactNode;
  text7?: React.ReactNode;
  text8?: React.ReactNode;
  className?: string;
}

const CustomComponentRoot = React.forwardRef<
  HTMLElement,
  CustomComponentRootProps
>(function CustomComponentRoot(
  {
    text,
    text2,
    text3,
    text4,
    text5,
    text6,
    text7,
    text8,
    className,
    ...otherProps
  }: CustomComponentRootProps,
  ref,
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full flex-col items-start gap-4 rounded-lg border border-solid border-brand-200 bg-background-secondary px-4 py-4 shadow-md",
        className,
      )}
      ref={ref as any}
      {...otherProps}
    >
      <div className="flex w-full items-start gap-4">
        <div className="flex items-center gap-3">
          <Loader />
          <div className="flex flex-col items-start">
            {text ? (
              <span className="text-h3 font-h3 text-text-primary">{text}</span>
            ) : null}
            {text2 ? (
              <span className="text-body font-body text-text-secondary">
                {text2}
              </span>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2">
            <IconWithBackground variant="success" icon="FeatherCircle" />

            <div className="flex flex-col items-start">
              {text3 ? (
                <span className="text-caption font-caption text-text-secondary">
                  {text3}
                </span>
              ) : null}
              {text4 ? (
                <span className="text-body-bold font-body-bold text-text-primary">
                  {text4}
                </span>
              ) : null}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <IconWithBackground variant="success" icon="FeatherCircle" />

            <div className="flex flex-col items-start">
              {text5 ? (
                <span className="text-caption font-caption text-text-secondary">
                  {text5}
                </span>
              ) : null}
              {text6 ? (
                <span className="text-body-bold font-body-bold text-text-primary">
                  {text6}
                </span>
              ) : null}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <IconWithBackground variant="success" icon="FeatherCircle" />

            <div className="flex flex-col items-start">
              {text7 ? (
                <span className="text-caption font-caption text-text-secondary">
                  {text7}
                </span>
              ) : null}
              {text8 ? (
                <span className="text-body-bold font-body-bold text-text-primary">
                  {text8}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const CustomComponent = CustomComponentRoot;
