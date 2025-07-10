"use client";
/*
 * Documentation:
 * Plan Widget — https://app.subframe.com/002445ea7110/library?component=Plan+Widget_4782b0ea-0f1f-4199-afa4-475fdf5232aa
 * Badges — https://app.subframe.com/002445ea7110/library?component=Badges_fe21e192-d060-4f96-a72b-78303a9df519
 * Button — https://app.subframe.com/002445ea7110/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 * Avatar — https://app.subframe.com/002445ea7110/library?component=Avatar_bec25ae6-5010-4485-b46b-cf79e3943ab2
 * Icon with background — https://app.subframe.com/002445ea7110/library?component=Icon+with+background_c5d68c0e-4c0c-4cff-8d8c-6ff334859b3a
 * Badge — https://app.subframe.com/002445ea7110/library?component=Badge_97bdb082-1124-4dd7-a335-b14b822d0157
 * Accordion — https://app.subframe.com/002445ea7110/library?component=Accordion_d2e81e20-863a-4027-826a-991d8910efd9
 * Table — https://app.subframe.com/002445ea7110/library?component=Table_142dfde7-d0cc-48a1-a04c-a08ab2252633
 * Text Field — https://app.subframe.com/002445ea7110/library?component=Text+Field_be48ca43-f8e7-4c0e-8870-d219ea11abfe
 * Dropdown Menu — https://app.subframe.com/002445ea7110/library?component=Dropdown+Menu_99951515-459b-4286-919e-a89e7549b43b
 * Select — https://app.subframe.com/002445ea7110/library?component=Select_bb88f90b-8c43-4b73-9c2f-3558ce7838f3
 * Tooltip — https://app.subframe.com/002445ea7110/library?component=Tooltip_ccebd1e9-f6ac-4737-8376-0dfacd90c9f3
 * Icon Button — https://app.subframe.com/002445ea7110/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 * Checkbox Card — https://app.subframe.com/002445ea7110/library?component=Checkbox+Card_de0b4dfb-3946-4702-be52-5678dd71925a
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";
import { Avatar } from "./Avatar";
import { IconWithBackground } from "./IconWithBackground";
import { Badge } from "./Badge";
import { Accordion } from "./Accordion";
import { Button } from "./Button";
import { Table } from "./Table";
import { TextField } from "./TextField";
import { DropdownMenu } from "./DropdownMenu";
import { Select } from "./Select";
import { Tooltip } from "./Tooltip";
import { IconButton } from "./IconButton";
import { CheckboxCard } from "./CheckboxCard";

interface SubcomponentProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: SubframeCore.IconName;
  text?: React.ReactNode;
  text2?: React.ReactNode;
  text3?: React.ReactNode;
  text4?: React.ReactNode;
  text5?: React.ReactNode;
  text6?: React.ReactNode;
  text7?: React.ReactNode;
  text8?: React.ReactNode;
  variant?: "default" | "variation";
  className?: string;
}

const Subcomponent = React.forwardRef<HTMLElement, SubcomponentProps>(
  function Subcomponent(
    {
      icon = "FeatherTableProperties",
      text,
      text2,
      text3,
      text4,
      text5,
      text6,
      text7,
      text8,
      variant = "default",
      className,
      ...otherProps
    }: SubcomponentProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/6d5db97a flex w-full flex-col items-start gap-4 rounded-lg bg-background-primary pt-2 relative z-10",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <SubframeCore.Icon
              className="text-body font-body text-text-primary"
              name={icon}
            />
            {text ? (
              <span className="text-h3 font-h3 text-text-primary">{text}</span>
            ) : null}
          </div>
          <IconButton size="small" icon="FeatherEdit2" />
        </div>
        {text2 ? (
          <span className="text-body font-body text-text-primary">{text2}</span>
        ) : null}
        <Table
          header={
            <Table.HeaderRow>
              <Table.HeaderCell>Field Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
            </Table.HeaderRow>
          }
        >
          <Table.Row>
            <Table.Cell>
              {text3 ? (
                <span
                  className={SubframeUtils.twClassNames(
                    "text-body font-body text-text-primary",
                    { inline: variant === "variation" }
                  )}
                >
                  {text3}
                </span>
              ) : null}
            </Table.Cell>
            <Table.Cell>
              {text4 ? (
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  {text4}
                </span>
              ) : null}
            </Table.Cell>
            <Table.Cell>
              <SubframeCore.DropdownMenu.Root>
                <SubframeCore.DropdownMenu.Trigger asChild={true}>
                  <Button
                    variant="neutral-primary"
                    size="small"
                    iconRight="FeatherChevronDown"
                  >
                    String
                  </Button>
                </SubframeCore.DropdownMenu.Trigger>
                <SubframeCore.DropdownMenu.Portal>
                  <SubframeCore.DropdownMenu.Content
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    asChild={true}
                  >
                    <DropdownMenu>
                      <DropdownMenu.DropdownItem>
                        String
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem>
                        Number
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem>
                        Date
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem>
                        Boolean
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem>
                        JSON
                      </DropdownMenu.DropdownItem>
                    </DropdownMenu>
                  </SubframeCore.DropdownMenu.Content>
                </SubframeCore.DropdownMenu.Portal>
              </SubframeCore.DropdownMenu.Root>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell
              className={SubframeUtils.twClassNames({
                "h-12 w-auto flex-none": variant === "variation",
              })}
            >
              {text5 ? (
                <span
                  className={SubframeUtils.twClassNames(
                    "text-body font-body text-text-primary",
                    { inline: variant === "variation" }
                  )}
                >
                  {text5}
                </span>
              ) : null}
            </Table.Cell>
            <Table.Cell>
              {text6 ? (
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  {text6}
                </span>
              ) : null}
            </Table.Cell>
            <Table.Cell>
              <SubframeCore.DropdownMenu.Root>
                <SubframeCore.DropdownMenu.Trigger asChild={true}>
                  <Button
                    variant="neutral-primary"
                    size="small"
                    iconRight="FeatherChevronDown"
                  >
                    Number
                  </Button>
                </SubframeCore.DropdownMenu.Trigger>
                <SubframeCore.DropdownMenu.Portal>
                  <SubframeCore.DropdownMenu.Content
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    asChild={true}
                  >
                    <DropdownMenu>
                      <DropdownMenu.DropdownItem>
                        String
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem>
                        Number
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem>
                        Date
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem>
                        Boolean
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem>
                        JSON
                      </DropdownMenu.DropdownItem>
                    </DropdownMenu>
                  </SubframeCore.DropdownMenu.Content>
                </SubframeCore.DropdownMenu.Portal>
              </SubframeCore.DropdownMenu.Root>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {text7 ? (
                <span className="text-body font-body text-text-primary">
                  {text7}
                </span>
              ) : null}
            </Table.Cell>
            <Table.Cell>
              {text8 ? (
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  {text8}
                </span>
              ) : null}
            </Table.Cell>
            <Table.Cell>
              <SubframeCore.DropdownMenu.Root>
                <SubframeCore.DropdownMenu.Trigger asChild={true}>
                  <Button
                    variant="neutral-primary"
                    size="small"
                    iconRight="FeatherChevronDown"
                  >
                    Date
                  </Button>
                </SubframeCore.DropdownMenu.Trigger>
                <SubframeCore.DropdownMenu.Portal>
                  <SubframeCore.DropdownMenu.Content
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    asChild={true}
                  >
                    <DropdownMenu>
                      <DropdownMenu.DropdownItem>
                        String
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem>
                        Number
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem>
                        Date
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem>
                        Boolean
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem>
                        JSON
                      </DropdownMenu.DropdownItem>
                    </DropdownMenu>
                  </SubframeCore.DropdownMenu.Content>
                </SubframeCore.DropdownMenu.Portal>
              </SubframeCore.DropdownMenu.Root>
            </Table.Cell>
          </Table.Row>
        </Table>
        <div className="flex items-start gap-2">
          <Button variant="brand-secondary" size="small" icon="FeatherPlus">
            Add new field
          </Button>
          <SubframeCore.DropdownMenu.Root>
            <SubframeCore.DropdownMenu.Trigger asChild={true}>
              <Button
                variant="brand-secondary"
                size="small"
                icon="FeatherSparkle"
              >
                Field suggestions
              </Button>
            </SubframeCore.DropdownMenu.Trigger>
            <SubframeCore.DropdownMenu.Portal>
              <SubframeCore.DropdownMenu.Content
                side="bottom"
                align="start"
                sideOffset={4}
                asChild={true}
              >
                <DropdownMenu>
                  <DropdownMenu.DropdownItem icon="FeatherColumns">
                    Company Details
                  </DropdownMenu.DropdownItem>
                  <DropdownMenu.DropdownItem icon="FeatherTrello">
                    Funding Information
                  </DropdownMenu.DropdownItem>
                  <DropdownMenu.DropdownItem icon="FeatherUsers">
                    Leadership Data
                  </DropdownMenu.DropdownItem>
                  <DropdownMenu.DropdownItem icon="FeatherTrendingUp">
                    Performance Metrics
                  </DropdownMenu.DropdownItem>
                </DropdownMenu>
              </SubframeCore.DropdownMenu.Content>
            </SubframeCore.DropdownMenu.Portal>
          </SubframeCore.DropdownMenu.Root>
        </div>
      </div>
    );
  }
);

interface PlanWidgetRootProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "new"
    | "new-closed"
    | "new-closed-approved"
    | "new-open-approved";
  topRightSlot?: React.ReactNode;
  buttons?: React.ReactNode;
  dataPointActionSlot?: React.ReactNode;
  className?: string;
}

const PlanWidgetRoot = React.forwardRef<HTMLElement, PlanWidgetRootProps>(
  function PlanWidgetRoot(
    {
      variant = "default",
      topRightSlot,
      buttons,
      dataPointActionSlot,
      className,
      ...otherProps
    }: PlanWidgetRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/4782b0ea flex w-144 flex-col items-start overflow-hidden rounded-rounded-x-large border border-solid border-brand-200 bg-background-primary",
          { "h-auto w-144": variant === "new" },
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <div
          className={SubframeUtils.twClassNames(
            "hidden w-full flex-col items-start gap-4 rounded-lg border border-solid border-brand-200 bg-background-primary px-6 py-6 shadow-sm relative z-10",
            {
              "flex border-none":
                variant === "new-open-approved" || variant === "new",
              "flex flex-col flex-nowrap gap-4 border-none px-6 py-6":
                variant === "new-closed-approved",
              "flex flex-col flex-nowrap gap-0 rounded-rounded-x-large border-none px-6 py-4 shadow-sm":
                variant === "new-closed",
            }
          )}
        >
          <div className="flex w-full items-center gap-4">
            <div className="flex grow shrink-0 basis-0 items-center gap-2">
              <SubframeCore.Icon
                className="text-caption font-caption text-text-secondary"
                name="FeatherZap"
              />
              <span className="text-caption-bold font-caption-bold text-text-secondary">
                {variant === "new-open-approved"
                  ? "YOUR SIGNAL"
                  : variant === "new-closed-approved"
                  ? "YOUR SIGNAL"
                  : variant === "new-closed"
                  ? "YOUR SIGNAL"
                  : variant === "new"
                  ? "YOUR SIGNAL"
                  : "MONITORING PLAN"}
              </span>
            </div>
            <span
              className={SubframeUtils.twClassNames(
                "text-caption font-caption text-text-primary",
                { "text-text-secondary": variant === "new" }
              )}
            >
              Updated 2min ago
            </span>
            {topRightSlot ? (
              <div className="flex items-center gap-4">{topRightSlot}</div>
            ) : null}
          </div>
          <div
            className={SubframeUtils.twClassNames(
              "flex w-full items-center justify-between",
              {
                "items-end justify-between":
                  variant === "new-open-approved" ||
                  variant === "new-closed-approved",
                hidden: variant === "new-closed",
              }
            )}
          >
            <div className="flex items-center gap-2">
              <Avatar
                className={SubframeUtils.twClassNames({
                  flex: variant === "new",
                })}
                size="large"
                image="https://res.cloudinary.com/subframe/image/upload/v1751982003/uploads/5484/vukamvk3a4viihbhnrfy.jpg"
                square={true}
              >
                A
              </Avatar>
              <div className="flex flex-col items-start gap-1">
                <div className="flex w-full items-center gap-2">
                  <span
                    className={SubframeUtils.twClassNames(
                      "text-h3 font-h3 text-text-primary",
                      { "text-h2 font-h2": variant === "new" }
                    )}
                  >
                    AI Startup Acquisition Tracker
                  </span>
                </div>
                <span className="w-full text-caption font-caption text-text-secondary">
                  Real-time monitoring of California tech acquisitions
                </span>
              </div>
            </div>
          </div>
          <div className="hidden w-full flex-col items-start gap-2 mt-2">
            <div className="flex items-center gap-2">
              <IconWithBackground icon="FeatherTrello" />
              <span className="text-caption font-caption text-text-secondary">
                Research Scope
              </span>
              <Badge variant="neutral">California AI Startups</Badge>
            </div>
            <div className="flex w-full items-center gap-2">
              <IconWithBackground icon="FeatherDatabase" />
              <span className="text-caption font-caption text-text-secondary">
                Data Sources
              </span>
              <Badge>Crunchbase, PitchBook, +235</Badge>
            </div>
          </div>
          <div
            className={SubframeUtils.twClassNames(
              "flex w-full flex-col items-start gap-4 mt-2",
              {
                hidden:
                  variant === "new-closed-approved" || variant === "new-closed",
              }
            )}
          >
            <Accordion
              trigger={
                <div className="flex w-full items-center gap-2">
                  <SubframeCore.Icon
                    className="text-body font-body text-text-secondary"
                    name="FeatherFilter"
                  />
                  <span className="grow shrink-0 basis-0 text-body-bold font-body-bold text-text-secondary">
                    Filter presets
                  </span>
                  <Accordion.Chevron />
                </div>
              }
            >
              <div className="flex w-full flex-col items-start gap-2 px-2 py-2">
                <div className="flex w-full flex-col items-start gap-2 px-2 py-2">
                  <div className="flex flex-col items-start">
                    <span className="text-body-bold font-body-bold text-text-primary">
                      United States Sources
                    </span>
                    <span className="text-caption font-caption text-text-secondary">
                      Limit search to US-based sources only
                    </span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-body-bold font-body-bold text-text-primary">
                      English Content
                    </span>
                    <span className="text-caption font-caption text-text-secondary">
                      Filter for articles written in English
                    </span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-body-bold font-body-bold text-text-primary">
                      Industry Focus
                    </span>
                    <span className="text-caption font-caption text-text-secondary">
                      Narrow search to specific technology sectors
                    </span>
                  </div>
                  <Button variant="brand-secondary">Filters</Button>
                </div>
              </div>
            </Accordion>
            <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-border-primary" />
            <div className="flex w-full flex-col items-start gap-4 rounded-lg bg-background-primary relative z-10">
              <div
                className={SubframeUtils.twClassNames(
                  "flex w-full items-center justify-between",
                  { "h-6 w-full flex-none": variant === "new" }
                )}
              >
                <div className="flex items-center gap-2">
                  <SubframeCore.Icon
                    className="text-body font-body text-text-secondary"
                    name="FeatherTableProperties"
                  />
                  <span className="text-body-bold font-body-bold text-text-secondary">
                    Your custom data points
                  </span>
                </div>
                {dataPointActionSlot ? (
                  <div
                    className={SubframeUtils.twClassNames(
                      "flex items-center justify-between",
                      { flex: variant === "new" }
                    )}
                  >
                    {dataPointActionSlot}
                  </div>
                ) : null}
              </div>
              <span className="text-body font-body text-text-primary">
                Configure the schema fields to structure how your signal data
                will be presented.
              </span>
              <Table
                header={
                  <Table.HeaderRow
                    className={SubframeUtils.twClassNames({
                      "h-auto w-auto flex-none": variant === "new",
                    })}
                  >
                    <Table.HeaderCell>Field Name</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>
                      {variant === "new" ? "" : "Type"}
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      {variant === "new" ? "" : "Type"}
                    </Table.HeaderCell>
                  </Table.HeaderRow>
                }
              >
                <Table.Row>
                  <Table.Cell
                    className={SubframeUtils.twClassNames({
                      "h-12 w-auto flex-none": variant === "new",
                    })}
                  >
                    <TextField
                      className={SubframeUtils.twClassNames({
                        "h-auto w-auto flex-none": variant === "new",
                      })}
                      label=""
                      helpText=""
                    >
                      <TextField.Input
                        className={SubframeUtils.twClassNames({
                          "w-full grow shrink-0 basis-0": variant === "new",
                        })}
                        placeholder={variant === "new" ? "Company" : ""}
                      />
                    </TextField>
                  </Table.Cell>
                  <Table.Cell>
                    <TextField
                      className={SubframeUtils.twClassNames({
                        "h-auto grow shrink-0 basis-0": variant === "new",
                      })}
                      label=""
                      helpText=""
                    >
                      <TextField.Input
                        className={SubframeUtils.twClassNames({
                          "w-80 grow shrink-0 basis-0": variant === "new",
                        })}
                        placeholder={
                          variant === "new"
                            ? "Unique identifier for the company"
                            : ""
                        }
                      />
                    </TextField>
                  </Table.Cell>
                  <Table.Cell>
                    <SubframeCore.Icon
                      className="text-body font-body text-text-primary"
                      name={
                        variant === "new" ? "FeatherSparkle" : "FeatherText"
                      }
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <SubframeCore.Icon
                      className="text-body font-body text-text-primary"
                      name={variant === "new" ? "FeatherTrash" : "FeatherText"}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <TextField label="" helpText="">
                      <TextField.Input
                        placeholder={variant === "new" ? "Value" : ""}
                      />
                    </TextField>
                  </Table.Cell>
                  <Table.Cell>
                    <TextField label="" helpText="">
                      <TextField.Input
                        placeholder={
                          variant === "new" ? "Total company valuation" : ""
                        }
                      />
                    </TextField>
                  </Table.Cell>
                  <Table.Cell>
                    <SubframeCore.Icon
                      className="text-body font-body text-text-primary"
                      name={
                        variant === "new" ? "FeatherSparkle" : "FeatherText"
                      }
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <SubframeCore.Icon
                      className="text-body font-body text-text-primary"
                      name={variant === "new" ? "FeatherTrash" : "FeatherText"}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <TextField label="" helpText="">
                      <TextField.Input
                        placeholder={variant === "new" ? "Date" : ""}
                      />
                    </TextField>
                  </Table.Cell>
                  <Table.Cell>
                    <TextField label="" helpText="">
                      <TextField.Input
                        placeholder={
                          variant === "new" ? "Date of company acquisition" : ""
                        }
                      />
                    </TextField>
                  </Table.Cell>
                  <Table.Cell>
                    <SubframeCore.Icon
                      className="text-body font-body text-text-primary"
                      name={
                        variant === "new" ? "FeatherSparkle" : "FeatherText"
                      }
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <SubframeCore.Icon
                      className="text-body font-body text-text-primary"
                      name={variant === "new" ? "FeatherTrash" : "FeatherText"}
                    />
                  </Table.Cell>
                </Table.Row>
              </Table>
              {buttons ? (
                <div className="flex items-start gap-2">{buttons}</div>
              ) : null}
            </div>
          </div>
        </div>
        <div
          className={SubframeUtils.twClassNames(
            "flex w-full flex-col items-start",
            {
              hidden:
                variant === "new-open-approved" ||
                variant === "new-closed-approved" ||
                variant === "new-closed",
            }
          )}
        >
          <div
            className={SubframeUtils.twClassNames(
              "flex w-full items-center justify-between px-4 py-4",
              { hidden: variant === "new" }
            )}
          >
            <div className="flex grow shrink-0 basis-0 items-center gap-2">
              <SubframeCore.Icon
                className="text-body font-body text-text-primary"
                name="FeatherRadio"
              />
              <span className="text-h3 font-h3 text-text-primary">
                Monitoring Plan
              </span>
              <div className="flex items-center gap-2 rounded-md bg-background-selected px-2 py-0.5">
                <span className="text-caption-bold font-caption-bold text-text-primary">
                  v1
                </span>
              </div>
              <span className="text-caption font-caption text-text-primary">
                Updated 2h ago
              </span>
            </div>
          </div>
          <div
            className={SubframeUtils.twClassNames(
              "flex flex-col items-start overflow-hidden",
              { hidden: variant === "new" }
            )}
          >
            <div className="flex w-full flex-col items-start gap-4 border-y border-solid border-brand-200 bg-background-primary shadow-sm">
              <Accordion
                trigger={
                  <div className="flex w-full items-center gap-2 px-4 py-4">
                    <div className="flex grow shrink-0 basis-0 items-center gap-2">
                      <SubframeCore.Icon
                        className="text-body font-body text-text-primary"
                        name="FeatherEye"
                      />
                      <span className="text-body-bold font-body-bold text-text-primary">
                        Events we will track
                      </span>
                    </div>
                    <Accordion.Chevron />
                  </div>
                }
              >
                <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-4 px-4 py-4">
                  <div className="flex flex-col items-start">
                    <span className="text-body-bold font-body-bold text-text-primary">
                      Fundraising
                    </span>
                    <span className="text-body font-body text-text-secondary">
                      A new funding round (like Seed or Series A) signals
                      traction and momentum.
                    </span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-body-bold font-body-bold text-text-primary">
                      Product launches
                    </span>
                    <span className="text-body font-body text-text-secondary">
                      New features, launches, or rebrands reveal where the
                      product and company are heading.
                    </span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-body-bold font-body-bold text-text-primary">
                      Key hires
                    </span>
                    <span className="text-body font-body text-text-secondary">
                      Strategic hires like CTOs or founding engineers often mark
                      a shift in capability or focus.
                    </span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-body-bold font-body-bold text-text-primary">
                      Partnerships
                    </span>
                    <span className="text-body font-body text-text-secondary">
                      New partnerships or integrations show how a startup is
                      expanding its reach or building distribution.
                    </span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-body-bold font-body-bold text-text-primary">
                      M&amp;A Activity
                    </span>
                    <span className="text-body font-body text-text-secondary">
                      Acquisitions—whether acquiring or being acquired—signal
                      strategic shifts or consolidation plays
                    </span>
                  </div>
                </div>
              </Accordion>
            </div>
            <div className="flex w-full flex-col items-start gap-4 border-b border-solid border-brand-200 bg-background-primary">
              <Accordion
                trigger={
                  <div className="flex w-full items-center gap-2 px-4 py-4">
                    <div className="flex grow shrink-0 basis-0 items-center gap-2">
                      <SubframeCore.Icon
                        className="text-body font-body text-text-primary"
                        name="FeatherLightbulb"
                      />
                      <span className="text-body-bold font-body-bold text-text-primary">
                        Assumptions to filter for
                      </span>
                    </div>
                    <Accordion.Chevron />
                  </div>
                }
              >
                <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-4 pl-5 pr-4 pt-1 pb-4">
                  <span className="text-body font-body text-text-primary">
                    1. I&#39;m only going to look at sources in the United
                    States
                  </span>
                  <span className="text-body font-body text-text-primary">
                    2. I&#39;m looking for article content in English
                  </span>
                  <span className="text-body font-body text-text-primary">
                    3. I&#39;m going to limit my search to [industry],
                    [industry], and [industry]
                  </span>
                  <Button variant="brand-secondary">Filters</Button>
                </div>
              </Accordion>
            </div>
            <div className="flex w-full flex-col items-start gap-4 px-4 py-4">
              <div className="flex items-center gap-2">
                <SubframeCore.Icon
                  className="text-body font-body text-text-primary"
                  name="FeatherFileText"
                />
                <span className="text-body-bold font-body-bold text-text-primary">
                  Data points we&#39;ll capture
                </span>
              </div>
              <span className="text-body font-body text-text-primary">
                We&#39;ll structure each event to highlight the most important
                details. Configure the schema fields to structure how your
                signal data will be presented.
              </span>
              <div className="flex w-full flex-col items-start gap-4 rounded-sm border border-solid border-brand-200 bg-background-tertiary">
                <Table
                  header={
                    <Table.HeaderRow>
                      <Table.HeaderCell>Field</Table.HeaderCell>
                      <Table.HeaderCell>Description</Table.HeaderCell>
                      <Table.HeaderCell>Type</Table.HeaderCell>
                      <Table.HeaderCell />
                    </Table.HeaderRow>
                  }
                >
                  <Table.Row className="h-8 w-full flex-none">
                    <Table.Cell className="h-12 w-auto flex-none">
                      <TextField label="" helpText="">
                        <TextField.Input placeholder="Event type" />
                      </TextField>
                    </Table.Cell>
                    <Table.Cell>
                      <TextField
                        className="h-auto grow shrink-0 basis-0"
                        variant="filled"
                        label=""
                        helpText=""
                      >
                        <TextField.Input placeholder="Category of the business event" />
                      </TextField>
                    </Table.Cell>
                    <Table.Cell>
                      <Select
                        className="h-auto grow shrink-0 basis-0"
                        variant="filled"
                        label=""
                        placeholder="Type"
                        helpText=""
                      >
                        <Select.Item value="string">string</Select.Item>
                        <Select.Item value="number">number</Select.Item>
                        <Select.Item value="boolean">boolean</Select.Item>
                        <Select.Item value="date">date</Select.Item>
                      </Select>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex grow shrink-0 basis-0 items-center justify-end gap-2">
                        <SubframeCore.Tooltip.Provider>
                          <SubframeCore.Tooltip.Root>
                            <SubframeCore.Tooltip.Trigger asChild={true}>
                              <IconButton icon="FeatherSparkles" />
                            </SubframeCore.Tooltip.Trigger>
                            <SubframeCore.Tooltip.Portal>
                              <SubframeCore.Tooltip.Content
                                side="bottom"
                                align="center"
                                sideOffset={4}
                                asChild={true}
                              >
                                <Tooltip>Enhance with AI</Tooltip>
                              </SubframeCore.Tooltip.Content>
                            </SubframeCore.Tooltip.Portal>
                          </SubframeCore.Tooltip.Root>
                        </SubframeCore.Tooltip.Provider>
                        <SubframeCore.Tooltip.Provider>
                          <SubframeCore.Tooltip.Root>
                            <SubframeCore.Tooltip.Trigger asChild={true}>
                              <IconButton icon="FeatherTrash" />
                            </SubframeCore.Tooltip.Trigger>
                            <SubframeCore.Tooltip.Portal>
                              <SubframeCore.Tooltip.Content
                                side="bottom"
                                align="center"
                                sideOffset={4}
                                asChild={true}
                              >
                                <Tooltip>Delete field</Tooltip>
                              </SubframeCore.Tooltip.Content>
                            </SubframeCore.Tooltip.Portal>
                          </SubframeCore.Tooltip.Root>
                        </SubframeCore.Tooltip.Provider>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="h-8 w-full flex-none">
                    <Table.Cell className="h-12 w-auto flex-none">
                      <TextField variant="filled" label="" helpText="">
                        <TextField.Input placeholder="Company" />
                      </TextField>
                    </Table.Cell>
                    <Table.Cell>
                      <TextField
                        className="h-auto grow shrink-0 basis-0"
                        variant="filled"
                        label=""
                        helpText=""
                      >
                        <TextField.Input placeholder="Name of company associated with the event" />
                      </TextField>
                    </Table.Cell>
                    <Table.Cell>
                      <Select
                        className="h-auto grow shrink-0 basis-0"
                        variant="filled"
                        label=""
                        placeholder="Type"
                        helpText=""
                      >
                        <Select.Item value="string">string</Select.Item>
                        <Select.Item value="number">number</Select.Item>
                        <Select.Item value="boolean">boolean</Select.Item>
                        <Select.Item value="date">date</Select.Item>
                      </Select>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex grow shrink-0 basis-0 items-center justify-end gap-2">
                        <SubframeCore.Tooltip.Provider>
                          <SubframeCore.Tooltip.Root>
                            <SubframeCore.Tooltip.Trigger asChild={true}>
                              <IconButton icon="FeatherSparkles" />
                            </SubframeCore.Tooltip.Trigger>
                            <SubframeCore.Tooltip.Portal>
                              <SubframeCore.Tooltip.Content
                                side="bottom"
                                align="center"
                                sideOffset={4}
                                asChild={true}
                              >
                                <Tooltip>Enhance with AI</Tooltip>
                              </SubframeCore.Tooltip.Content>
                            </SubframeCore.Tooltip.Portal>
                          </SubframeCore.Tooltip.Root>
                        </SubframeCore.Tooltip.Provider>
                        <SubframeCore.Tooltip.Provider>
                          <SubframeCore.Tooltip.Root>
                            <SubframeCore.Tooltip.Trigger asChild={true}>
                              <IconButton icon="FeatherTrash" />
                            </SubframeCore.Tooltip.Trigger>
                            <SubframeCore.Tooltip.Portal>
                              <SubframeCore.Tooltip.Content
                                side="bottom"
                                align="center"
                                sideOffset={4}
                                asChild={true}
                              >
                                <Tooltip>Delete field</Tooltip>
                              </SubframeCore.Tooltip.Content>
                            </SubframeCore.Tooltip.Portal>
                          </SubframeCore.Tooltip.Root>
                        </SubframeCore.Tooltip.Provider>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="h-8 w-full flex-none">
                    <Table.Cell className="h-12 w-auto flex-none">
                      <TextField variant="filled" label="" helpText="">
                        <TextField.Input placeholder="Summary" />
                      </TextField>
                    </Table.Cell>
                    <Table.Cell>
                      <TextField
                        className="h-auto grow shrink-0 basis-0"
                        variant="filled"
                        label=""
                        helpText=""
                      >
                        <TextField.Input placeholder="Key information about the event" />
                      </TextField>
                    </Table.Cell>
                    <Table.Cell>
                      <Select
                        className="h-auto grow shrink-0 basis-0"
                        variant="filled"
                        label=""
                        placeholder="Type"
                        helpText=""
                      >
                        <Select.Item value="string">string</Select.Item>
                        <Select.Item value="number">number</Select.Item>
                        <Select.Item value="boolean">boolean</Select.Item>
                        <Select.Item value="date">date</Select.Item>
                      </Select>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex grow shrink-0 basis-0 items-center justify-end gap-2">
                        <SubframeCore.Tooltip.Provider>
                          <SubframeCore.Tooltip.Root>
                            <SubframeCore.Tooltip.Trigger asChild={true}>
                              <IconButton icon="FeatherSparkles" />
                            </SubframeCore.Tooltip.Trigger>
                            <SubframeCore.Tooltip.Portal>
                              <SubframeCore.Tooltip.Content
                                side="bottom"
                                align="center"
                                sideOffset={4}
                                asChild={true}
                              >
                                <Tooltip>Enhance with AI</Tooltip>
                              </SubframeCore.Tooltip.Content>
                            </SubframeCore.Tooltip.Portal>
                          </SubframeCore.Tooltip.Root>
                        </SubframeCore.Tooltip.Provider>
                        <SubframeCore.Tooltip.Provider>
                          <SubframeCore.Tooltip.Root>
                            <SubframeCore.Tooltip.Trigger asChild={true}>
                              <IconButton icon="FeatherTrash" />
                            </SubframeCore.Tooltip.Trigger>
                            <SubframeCore.Tooltip.Portal>
                              <SubframeCore.Tooltip.Content
                                side="bottom"
                                align="center"
                                sideOffset={4}
                                asChild={true}
                              >
                                <Tooltip>Delete field</Tooltip>
                              </SubframeCore.Tooltip.Content>
                            </SubframeCore.Tooltip.Portal>
                          </SubframeCore.Tooltip.Root>
                        </SubframeCore.Tooltip.Provider>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="h-8 w-auto flex-none">
                    <Table.Cell className="h-10 w-auto flex-none">
                      <TextField variant="filled" label="" helpText="">
                        <TextField.Input placeholder="Timestamp" />
                      </TextField>
                    </Table.Cell>
                    <Table.Cell className="h-10 w-auto flex-none">
                      <TextField
                        className="h-auto grow shrink-0 basis-0"
                        variant="filled"
                        label=""
                        helpText=""
                      >
                        <TextField.Input placeholder="Date when the event occurred" />
                      </TextField>
                    </Table.Cell>
                    <Table.Cell className="h-10 w-auto flex-none">
                      <Select
                        className="h-auto grow shrink-0 basis-0"
                        variant="filled"
                        label=""
                        placeholder="Type"
                        helpText=""
                      >
                        <Select.Item value="string">string</Select.Item>
                        <Select.Item value="number">number</Select.Item>
                        <Select.Item value="boolean">boolean</Select.Item>
                        <Select.Item value="date">date</Select.Item>
                      </Select>
                    </Table.Cell>
                    <Table.Cell className="h-10 w-auto flex-none">
                      <div className="flex grow shrink-0 basis-0 items-center justify-end gap-2">
                        <SubframeCore.Tooltip.Provider>
                          <SubframeCore.Tooltip.Root>
                            <SubframeCore.Tooltip.Trigger asChild={true}>
                              <IconButton icon="FeatherSparkles" />
                            </SubframeCore.Tooltip.Trigger>
                            <SubframeCore.Tooltip.Portal>
                              <SubframeCore.Tooltip.Content
                                side="bottom"
                                align="center"
                                sideOffset={4}
                                asChild={true}
                              >
                                <Tooltip>Enhance with AI</Tooltip>
                              </SubframeCore.Tooltip.Content>
                            </SubframeCore.Tooltip.Portal>
                          </SubframeCore.Tooltip.Root>
                        </SubframeCore.Tooltip.Provider>
                        <SubframeCore.Tooltip.Provider>
                          <SubframeCore.Tooltip.Root>
                            <SubframeCore.Tooltip.Trigger asChild={true}>
                              <IconButton icon="FeatherTrash" />
                            </SubframeCore.Tooltip.Trigger>
                            <SubframeCore.Tooltip.Portal>
                              <SubframeCore.Tooltip.Content
                                side="bottom"
                                align="center"
                                sideOffset={4}
                                asChild={true}
                              >
                                <Tooltip>Delete field</Tooltip>
                              </SubframeCore.Tooltip.Content>
                            </SubframeCore.Tooltip.Portal>
                          </SubframeCore.Tooltip.Root>
                        </SubframeCore.Tooltip.Provider>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="h-8 w-auto flex-none">
                    <Table.Cell className="h-10 w-auto flex-none">
                      <Button
                        variant="brand-tertiary"
                        size="small"
                        icon="FeatherPlus"
                      >
                        Add custom column
                      </Button>
                    </Table.Cell>
                    <Table.Cell className="hidden h-10 w-auto flex-none">
                      <TextField
                        className="h-auto grow shrink-0 basis-0"
                        variant="filled"
                        label=""
                        helpText=""
                      >
                        <TextField.Input placeholder="Date when the event occurred" />
                      </TextField>
                    </Table.Cell>
                    <Table.Cell className="hidden h-10 w-auto flex-none">
                      <Select
                        variant="filled"
                        label=""
                        placeholder="Type"
                        helpText=""
                      >
                        <Select.Item value="string">string</Select.Item>
                        <Select.Item value="number">number</Select.Item>
                        <Select.Item value="boolean">boolean</Select.Item>
                        <Select.Item value="date">date</Select.Item>
                      </Select>
                    </Table.Cell>
                    <Table.Cell className="hidden h-10 w-auto flex-none">
                      <div className="flex grow shrink-0 basis-0 items-center justify-end gap-2">
                        <SubframeCore.Tooltip.Provider>
                          <SubframeCore.Tooltip.Root>
                            <SubframeCore.Tooltip.Trigger asChild={true}>
                              <IconButton icon="FeatherSparkles" />
                            </SubframeCore.Tooltip.Trigger>
                            <SubframeCore.Tooltip.Portal>
                              <SubframeCore.Tooltip.Content
                                side="bottom"
                                align="center"
                                sideOffset={4}
                                asChild={true}
                              >
                                <Tooltip>Enhance with AI</Tooltip>
                              </SubframeCore.Tooltip.Content>
                            </SubframeCore.Tooltip.Portal>
                          </SubframeCore.Tooltip.Root>
                        </SubframeCore.Tooltip.Provider>
                        <SubframeCore.Tooltip.Provider>
                          <SubframeCore.Tooltip.Root>
                            <SubframeCore.Tooltip.Trigger asChild={true}>
                              <IconButton icon="FeatherX" />
                            </SubframeCore.Tooltip.Trigger>
                            <SubframeCore.Tooltip.Portal>
                              <SubframeCore.Tooltip.Content
                                side="bottom"
                                align="center"
                                sideOffset={4}
                                asChild={true}
                              >
                                <Tooltip>Delete field</Tooltip>
                              </SubframeCore.Tooltip.Content>
                            </SubframeCore.Tooltip.Portal>
                          </SubframeCore.Tooltip.Root>
                        </SubframeCore.Tooltip.Provider>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                </Table>
              </div>
            </div>
            <div className="flex w-full flex-col items-start gap-4 border-t border-solid border-brand-200 bg-background-primary px-4 pt-4 pb-5">
              <Accordion
                trigger={
                  <div className="flex w-full items-center gap-4 px-1 py-1">
                    <div className="flex grow shrink-0 basis-0 items-center gap-2">
                      <SubframeCore.Icon
                        className="text-body font-body text-text-primary"
                        name="FeatherZap"
                      />
                      <span className="grow shrink-0 basis-0 text-body-bold font-body-bold text-text-primary">
                        Suggestions to enhance your plan
                      </span>
                    </div>
                    <Accordion.Chevron />
                  </div>
                }
              >
                <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 rounded-b-md bg-background-primary px-2 py-2">
                  <CheckboxCard className="h-auto w-full flex-none">
                    <div className="flex flex-col items-start">
                      <span className="text-body-bold font-body-bold text-text-primary">
                        Acquired company valuation
                      </span>
                      <span className="text-caption font-caption text-text-secondary">
                        Provides financial context for deal size
                      </span>
                    </div>
                  </CheckboxCard>
                  <CheckboxCard className="h-auto w-full flex-none">
                    <div className="flex flex-col items-start">
                      <span className="text-body-bold font-body-bold text-text-primary">
                        Strategic rationale for acquisition
                      </span>
                      <span className="text-caption font-caption text-text-secondary">
                        Explains motivation for transaction
                      </span>
                    </div>
                  </CheckboxCard>
                  <CheckboxCard className="h-auto w-full flex-none">
                    <div className="flex flex-col items-start">
                      <span className="text-body-bold font-body-bold text-text-primary">
                        Key personnel changes post-acquisition
                      </span>
                      <span className="text-caption font-caption text-text-secondary">
                        Leadership transitions and integrations
                      </span>
                    </div>
                  </CheckboxCard>
                </div>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export const PlanWidget = Object.assign(PlanWidgetRoot, {
  Subcomponent,
});
