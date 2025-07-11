"use client";
/*
 * Documentation:
 * Builder Preview — https://app.subframe.com/002445ea7110/library?component=Builder+Preview_c628679f-6915-4a8f-882c-1946fce2af1c
 * Button — https://app.subframe.com/002445ea7110/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 * Loader — https://app.subframe.com/002445ea7110/library?component=Loader_f2e570c8-e463-45c2-aae9-a960146bc5d5
 * Icon with background — https://app.subframe.com/002445ea7110/library?component=Icon+with+background_c5d68c0e-4c0c-4cff-8d8c-6ff334859b3a
 * Table — https://app.subframe.com/002445ea7110/library?component=Table_142dfde7-d0cc-48a1-a04c-a08ab2252633
 * HEY LOG, BUDDY GUYS, I'M WORKING ON THE BUILDER PREVIEW COMPONENT. I'M NOT SURE IF I'M DOING IT CORRECTLY.

*/

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";
import { FeatherPlay } from "@subframe/core";
import { Button } from "./Button";
import { Loader } from "./Loader";
import { IconWithBackground } from "./IconWithBackground";
import { Table } from "./Table";

interface BuilderPreviewRootProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: SubframeCore.IconName;
  text?: React.ReactNode;
  text2?: React.ReactNode;
  text3?: React.ReactNode;
  text4?: React.ReactNode;
  text5?: React.ReactNode;
  text6?: React.ReactNode;
  text7?: React.ReactNode;
  text8?: React.ReactNode;
  text9?: React.ReactNode;
  icon2?: SubframeCore.IconName;
  text10?: React.ReactNode;
  text11?: React.ReactNode;
  text12?: React.ReactNode;
  text13?: React.ReactNode;
  text14?: React.ReactNode;
  text15?: React.ReactNode;
  text16?: React.ReactNode;
  text17?: React.ReactNode;
  text18?: React.ReactNode;
  text19?: React.ReactNode;
  text20?: React.ReactNode;
  text21?: React.ReactNode;
  text22?: React.ReactNode;
  text23?: React.ReactNode;
  text24?: React.ReactNode;
  text25?: React.ReactNode;
  text26?: React.ReactNode;
  text27?: React.ReactNode;
  text28?: React.ReactNode;
  text29?: React.ReactNode;
  text30?: React.ReactNode;
  text31?: React.ReactNode;
  text32?: React.ReactNode;
  text33?: React.ReactNode;
  text34?: React.ReactNode;
  text35?: React.ReactNode;
  text36?: React.ReactNode;
  text37?: React.ReactNode;
  text38?: React.ReactNode;
  text39?: React.ReactNode;
  text40?: React.ReactNode;
  text41?: React.ReactNode;
  text42?: React.ReactNode;
  text43?: React.ReactNode;
  text44?: React.ReactNode;
  text45?: React.ReactNode;
  text46?: React.ReactNode;
  text47?: React.ReactNode;
  loading?: boolean;
  className?: string;
}

const BuilderPreviewRoot = React.forwardRef<
  HTMLElement,
  BuilderPreviewRootProps
>(function BuilderPreviewRoot(
  {
    icon = "FeatherZap",
    text,
    text2,
    text3,
    text4,
    text5,
    text6,
    text7,
    text8,
    text9,
    icon2 = "FeatherZap",
    text10,
    text11,
    text12,
    text13,
    text14,
    text15,
    text16,
    text17,
    text18,
    text19,
    text20,
    text21,
    text22,
    text23,
    text24,
    text25,
    text26,
    text27,
    text28,
    text29,
    text30,
    text31,
    text32,
    text33,
    text34,
    text35,
    text36,
    text37,
    text38,
    text39,
    text40,
    text41,
    text42,
    text43,
    text44,
    text45,
    text46,
    text47,
    loading = false,
    className,
    ...otherProps
  }: BuilderPreviewRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full flex-col items-start gap-6 rounded-rounded-x-large border border-solid border-brand-200 bg-white px-3 py-6 md:px-6 shadow-md",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      {loading ? (
        // Loading State - Lightning Zap Loader
        <div className="flex w-full h-full items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <SubframeCore.Icon
                className="text-6xl text-brand-500 animate-pulse"
                name="FeatherZap"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.5))',
                  animation: 'pulse 1.5s ease-in-out infinite alternate'
                }}
              />
              <div className="absolute inset-0 bg-brand-500/20 rounded-full animate-ping"></div>
            </div>
            <div className="text-body-bold font-body-bold text-text-secondary animate-pulse">
              Loading preview...
            </div>
          </div>
        </div>
      ) : (
        // Normal Content
        <>
          <div className="flex w-full items-center justify-between">
            <div className="flex grow shrink-0 basis-0 items-center gap-2 min-w-0">
              <SubframeCore.Icon
                className="text-body font-body text-text-primary flex-shrink-0"
                name={icon}
              />
              {text ? (
                <span className="text-h3 font-h3 text-text-primary truncate">{text}</span>
              ) : null}
            </div>
            <div className="flex items-start justify-end flex-shrink-0">
              <Button variant="brand-tertiary" size="large" icon={<FeatherPlay />}>
                <span className="hidden md:inline">Start Monitoring</span>
                <span className="md:hidden">Start</span>
              </Button>
            </div>
          </div>
          <div className="flex w-full flex-col items-stretch justify-start gap-4 overflow-auto flex-1 px-2 md:px-8 min-w-0">
            <div className="flex w-full flex-col items-stretch justify-start gap-4 py-6 relative flex-1">
              <div className="flex w-full flex-col items-start gap-6 z-10">
                <div
                  id="stats"
                  className="flex w-full flex-col items-start gap-4 rounded-lg border border-solid border-brand-200 bg-background-secondary px-4 py-4 shadow-md flex-shrink-0"
                >
                  <div className="flex w-full items-start gap-4">
                    <div className="flex items-center gap-3">
                      <Loader />
                      <div className="flex flex-col items-start">
                        {text2 ? (
                          <span className="text-h3 font-h3 text-text-primary">
                            {text2}
                          </span>
                        ) : null}
                        {text3 ? (
                          <span className="text-body font-body text-text-secondary">
                            {text3}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex w-full items-center gap-4 overflow-x-auto">
                      <div className="flex min-w-[180px] flex-shrink-0 items-center gap-2">
                        <IconWithBackground
                          variant="success"
                          icon="FeatherSearch"
                          className="min-h-[32px] min-w-[32px]"
                        />
                        <div className="flex flex-col items-start">
                          {text4 ? (
                            <span className="text-caption font-caption text-text-secondary whitespace-nowrap">
                              {text4}
                            </span>
                          ) : null}
                          {text5 ? (
                            <span className="text-body-bold font-body-bold text-text-primary whitespace-nowrap">
                              {text5}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex min-w-[180px] flex-shrink-0 items-center gap-2">
                        <IconWithBackground
                          variant="success"
                          icon="FeatherFileText"
                          className="min-h-[32px] min-w-[32px]"
                        />
                        <div className="flex flex-col items-start">
                          {text6 ? (
                            <span className="text-caption font-caption text-text-secondary whitespace-nowrap">
                              {text6}
                            </span>
                          ) : null}
                          {text7 ? (
                            <span className="text-body-bold font-body-bold text-text-primary whitespace-nowrap">
                              {text7}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex min-w-[180px] flex-shrink-0 items-center gap-2">
                        <IconWithBackground
                          variant="success"
                          icon="FeatherCheckCircle"
                          className="min-h-[32px] min-w-[32px]"
                        />
                        <div className="flex flex-col items-start">
                          {text8 ? (
                            <span className="text-caption font-caption text-text-secondary whitespace-nowrap">
                              {text8}
                            </span>
                          ) : null}
                          {text9 ? (
                            <span className="text-body-bold font-body-bold text-text-primary whitespace-nowrap">
                              {text9}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="table"
                className="flex w-full flex-col items-start gap-2 rounded-lg border border-solid border-brand-200 bg-background-secondary shadow-md flex-1"
              >
                <div className="flex w-full items-center justify-between border-b border-solid border-brand-200 px-6 py-6">
                  <div className="flex items-center gap-2">
                    <SubframeCore.Icon
                      className="text-caption font-caption text-text-secondary"
                      name={icon2}
                    />
                    {text10 ? (
                      <span className="text-caption-bold font-caption-bold text-text-secondary">
                        {text10}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="flex w-full items-center gap-6 px-4 py-4">
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                    {text11 ? (
                      <span className="text-body-bold font-body-bold text-text-primary">
                        {text11}
                      </span>
                    ) : null}
                    {text12 ? (
                      <span className="text-body font-body text-text-secondary">
                        {text12}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="w-full overflow-x-auto overflow-y-hidden">
                  <Table
                    className="h-auto w-full table-auto min-w-[800px] md:min-w-[1200px]"
                    header={
                      <Table.HeaderRow>
                        <Table.HeaderCell className="min-w-[120px]">Event type</Table.HeaderCell>
                        <Table.HeaderCell className="min-w-[160px]">Acquirer name</Table.HeaderCell>
                        <Table.HeaderCell className="min-w-[140px]">Startup name</Table.HeaderCell>
                        <Table.HeaderCell className="min-w-[140px]">Startup location</Table.HeaderCell>
                        <Table.HeaderCell className="min-w-[100px]">Deal value</Table.HeaderCell>
                        <Table.HeaderCell className="min-w-[120px]">Deal terms</Table.HeaderCell>
                        <Table.HeaderCell className="min-w-[200px]">Strategic rationale</Table.HeaderCell>
                        <Table.HeaderCell className="min-w-[160px]">Source URL</Table.HeaderCell>
                      </Table.HeaderRow>
                    }
                  >
                    <Table.Row className="transition-colors duration-200 cursor-pointer">
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          Acquisition
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          Microsoft Corporation
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          AI Dynamics
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          San Francisco, CA
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          $2.4B
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          All cash
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          Enhance AI capabilities in cloud services
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <a
                          className="text-body font-body text-text-primary hover:underline whitespace-nowrap"
                          href="https://example.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          https://example.com
                        </a>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row className="transition-colors duration-200 cursor-pointer">
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          Strategic Investment
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          Google (Alphabet Inc.)
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          DataFlow Technologies
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          Austin, TX
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          $850M
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          70% cash, 30% stock
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          Expand data analytics platform
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <a
                          className="text-body font-body text-text-primary hover:underline whitespace-nowrap"
                          href="https://example.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          https://example.com
                        </a>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row className="transition-colors duration-200 cursor-pointer">
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          Merger
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          Amazon Web Services
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          CloudSecure
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          Boston, MA
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          $1.2B
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          Stock swap
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          Strengthen cybersecurity offerings
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <a
                          className="text-body font-body text-text-primary hover:underline whitespace-nowrap"
                          href="https://example.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          https://example.com
                        </a>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row className="transition-colors duration-200 cursor-pointer">
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          Acquisition
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          Salesforce Inc.
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          ConnectHub
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          New York, NY
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          $650M
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          50% cash, 50% stock
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          Enhance CRM integration capabilities
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <a
                          className="text-body font-body text-text-primary hover:underline whitespace-nowrap"
                          href="https://example.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          https://example.com
                        </a>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row className="transition-colors duration-200 cursor-pointer">
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          Strategic Partnership
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          Meta Platforms
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          VirtureSpace
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          Seattle, WA
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          $420M
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          Phased investment
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-text-primary whitespace-nowrap">
                          Accelerate metaverse development
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <a
                          className="text-body font-body text-text-primary hover:underline whitespace-nowrap"
                          href="https://example.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          https://example.com
                        </a>
                      </Table.Cell>
                    </Table.Row>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

export const BuilderPreview = BuilderPreviewRoot;
