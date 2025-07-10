"use client";
/*
 * Documentation:
 * Signal Card — https://app.subframe.com/002445ea7110/library?component=Signal+Card_74d5fb4a-3122-4504-b777-4b4648fecb15
 * Button — https://app.subframe.com/002445ea7110/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 * Badges — https://app.subframe.com/002445ea7110/library?component=Badges_fe21e192-d060-4f96-a72b-78303a9df519
 * Icon Button — https://app.subframe.com/002445ea7110/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 * Avatar — https://app.subframe.com/002445ea7110/library?component=Avatar_bec25ae6-5010-4485-b46b-cf79e3943ab2
 * Icon with background — https://app.subframe.com/002445ea7110/library?component=Icon+with+background_c5d68c0e-4c0c-4cff-8d8c-6ff334859b3a
 * Badge — https://app.subframe.com/002445ea7110/library?component=Badge_97bdb082-1124-4dd7-a335-b14b822d0157
 * Accordion — https://app.subframe.com/002445ea7110/library?component=Accordion_d2e81e20-863a-4027-826a-991d8910efd9
 * Table — https://app.subframe.com/002445ea7110/library?component=Table_142dfde7-d0cc-48a1-a04c-a08ab2252633
 * Text Field — https://app.subframe.com/002445ea7110/library?component=Text+Field_be48ca43-f8e7-4c0e-8870-d219ea11abfe
 * Tooltip — https://app.subframe.com/002445ea7110/library?component=Tooltip_ccebd1e9-f6ac-4737-8376-0dfacd90c9f3
 * Dropdown Menu — https://app.subframe.com/002445ea7110/library?component=Dropdown+Menu_99951515-459b-4286-919e-a89e7549b43b
 */

import React, { useState, useEffect } from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";
import { Button } from "./Button";
import { Badges } from "./Badges";
import { IconButton } from "./IconButton";
import { Avatar } from "./Avatar";
import { IconWithBackground } from "./IconWithBackground";
import { Badge } from "./Badge";
import { Accordion } from "./Accordion";
import { Table } from "./Table";
import { TextField } from "./TextField";
import { Tooltip } from "./Tooltip";
import { DropdownMenu } from "./DropdownMenu";

interface DataField {
  id: string;
  fieldName: string;
  description: string;
}

interface SignalCardRootProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: SubframeCore.IconName;
  text?: React.ReactNode;
  text2?: React.ReactNode;
  text3?: React.ReactNode;
  text4?: React.ReactNode;
  text5?: React.ReactNode;
  text6?: React.ReactNode;
  text7?: React.ReactNode;
  text8?: React.ReactNode;
  icon2?: SubframeCore.IconName;
  text9?: React.ReactNode;
  text10?: React.ReactNode;
  text11?: React.ReactNode;
  text12?: React.ReactNode;
  text13?: React.ReactNode;
  text14?: React.ReactNode;
  text15?: React.ReactNode;
  variant?: "default" | "approved" | "old-version";
  onSavePreview?: () => void;
  onRestore?: (originalTimestamp: Date) => void;
  onEdit?: () => void;
  originalTimestamp?: Date;
  isEditingApprovedCard?: boolean;
  className?: string;
}

const SignalCardRoot = React.forwardRef<HTMLElement, SignalCardRootProps>(
  function SignalCardRoot(
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
      icon2 = "FeatherFilter",
      text9,
      text10,
      text11,
      text12,
      text13,
      text14,
      text15,
      variant = "default",
      onSavePreview,
      onRestore,
      onEdit,
      originalTimestamp,
      isEditingApprovedCard = false,
      className,
      ...otherProps
    }: SignalCardRootProps,
    ref
  ) {
    // State for managing dynamic table rows
    const [dataFields, setDataFields] = useState<DataField[]>([
      {
        id: "1",
        fieldName: "Event Type",
        description: "Type of business event",
      },
      {
        id: "2",
        fieldName: "Acquirer Name",
        description: "Name of the acquiring company",
      },
      {
        id: "3",
        fieldName: "Startup Name",
        description: "Name of the startup being acquired",
      },
      {
        id: "4",
        fieldName: "Startup Location",
        description: "Geographic location of the startup",
      },
      {
        id: "5",
        fieldName: "Deal Value",
        description: "Total monetary value of the deal",
      },
      {
        id: "6",
        fieldName: "Deal Terms",
        description: "Specific conditions of the transaction",
      },
      {
        id: "7",
        fieldName: "Strategic Rationale",
        description: "Reason behind the acquisition",
      },
    ]);

    // State for streaming message functionality
    const [isStreaming, setIsStreaming] = useState(false);
    const [streamingMessage, setStreamingMessage] = useState("");
    const [showMilestone, setShowMilestone] = useState(false);
    const [hasShownUpdateMessage, setHasShownUpdateMessage] = useState(false);

    // Function to add a new empty field
    const addNewField = () => {
      const newField: DataField = {
        id: Date.now().toString(),
        fieldName: "",
        description: "",
      };
      setDataFields([...dataFields, newField]);
    };

    // Function to add a field from suggestions
    const addFieldFromSuggestion = (fieldName: string, description: string) => {
      const newField: DataField = {
        id: Date.now().toString(),
        fieldName: fieldName,
        description: description,
      };
      setDataFields([...dataFields, newField]);
    };

    // Function to remove a field
    const removeField = (id: string) => {
      setDataFields(dataFields.filter((field) => field.id !== id));
    };

    // Function to update a field
    const updateField = (id: string, fieldName: string, description: string) => {
      setDataFields(
        dataFields.map((field) =>
          field.id === id ? { ...field, fieldName, description } : field
        )
      );
    };

    // Field suggestions with descriptions
    const fieldSuggestions = [
      { fieldName: "Company Details", description: "Basic information about the company" },
      { fieldName: "Funding Information", description: "Details about funding rounds and investors" },
      { fieldName: "Leadership Data", description: "Information about key executives and founders" },
      { fieldName: "Performance Metrics", description: "Financial and operational performance data" },
    ];

    // Handle restore button click
    const handleRestoreClick = () => {
      if (onRestore && originalTimestamp) {
        onRestore(originalTimestamp);
      }
    };

    // Handle streaming message for approved card updates
    const streamUpdateMessage = async () => {
      const fullMessage = "Perfect! Your updates have been saved and are now reflected in the preview to the right. The data source is already working with your refreshed parameters. 🎉";
      setIsStreaming(true);
      setStreamingMessage("");
      
      // Stream the message character by character
      for (let i = 0; i <= fullMessage.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 20)); // 20ms delay between characters
        setStreamingMessage(fullMessage.slice(0, i));
      }
      
      setIsStreaming(false);
      
      // Show milestone marker after a short delay
      setTimeout(() => {
        setShowMilestone(true);
      }, 500);
    };

    // Handle save with streaming for approved cards
    const handleSavePreview = () => {
      if (onSavePreview) {
        onSavePreview();
      }
      
      // If this is an approved card being edited, show streaming message
      if (isEditingApprovedCard && !hasShownUpdateMessage) {
        setHasShownUpdateMessage(true);
        setTimeout(() => {
          streamUpdateMessage();
        }, 300); // Small delay to feel natural
      }
    };

    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/74d5fb4a flex w-144 flex-col items-start gap-4 rounded-rounded-x-large border border-solid border-brand-200 bg-background-primary px-6 py-6 shadow-md relative z-10",
          {
            "px-4 py-4": variant === "old-version",
            "px-6 py-6": variant === "approved",
          },
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        {/* Header Section */}
        <div
          className={SubframeUtils.twClassNames(
            "flex w-full items-center gap-4",
            { "flex-row flex-nowrap gap-4": variant === "approved" }
          )}
        >
          <div className="flex grow shrink-0 basis-0 items-center gap-2">
            <SubframeCore.Icon
              className="text-caption font-caption text-text-secondary"
              name={icon}
            />
            {text ? (
              <span className="text-caption-bold font-caption-bold text-text-secondary">
                {text}
              </span>
            ) : null}
          </div>
          {text2 ? (
            <span className="text-caption font-caption text-text-primary">
              {text2}
            </span>
          ) : null}
          <Button
            className={SubframeUtils.twClassNames("hidden", {
              flex: variant === "old-version",
            })}
            variant={
              variant === "old-version" ? "brand-secondary" : "brand-secondary"
            }
            size={variant === "old-version" ? "small" : "small"}
            onClick={handleRestoreClick}
          >
            {variant === "old-version" ? "Restore" : "Button"}
          </Button>
          <Badges
            className={SubframeUtils.twClassNames({
              hidden: variant === "old-version",
            })}
            variant={variant === "approved" ? "warning" : "info"}
          >
            {variant === "approved" ? "Saved" : "Draft"}
          </Badges>
          <IconButton
            className={SubframeUtils.twClassNames("hidden", {
              hidden: variant === "old-version",
              flex: variant === "approved",
            })}
            size={variant === "approved" ? "small" : "small"}
            icon={variant === "approved" ? "FeatherEdit" : undefined}
            onClick={onEdit}
          />
        </div>

        {/* Title Section */}
        <div
          className={SubframeUtils.twClassNames(
            "flex w-full items-center justify-between",
            { hidden: variant === "old-version" }
          )}
        >
          <div className="flex items-center gap-4">
            <Avatar
              size="large"
              image="https://res.cloudinary.com/subframe/image/upload/v1751982003/uploads/5484/vukamvk3a4viihbhnrfy.jpg"
              square={true}
            >
              A
            </Avatar>
            <div className="flex flex-col items-start gap-1">
              <div className="flex w-full items-center gap-2">
                {text3 ? (
                  <span className="text-h3 font-h3 text-text-primary">
                    {text3}
                  </span>
                ) : null}
              </div>
              {text4 ? (
                <span className="w-full text-caption font-caption text-text-secondary">
                  {text4}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {/* Hidden Research Scope Section */}
        <div className="hidden w-full flex-col items-start gap-2 mt-2">
          <div className="flex items-center gap-2">
            <IconWithBackground icon="FeatherTrello" />
            {text5 ? (
              <span className="text-caption font-caption text-text-secondary">
                {text5}
              </span>
            ) : null}
            <Badge variant="neutral">California AI Startups</Badge>
          </div>
          <div className="flex w-full items-center gap-2">
            <IconWithBackground icon="FeatherDatabase" />
            {text6 ? (
              <span className="text-caption font-caption text-text-secondary">
                {text6}
              </span>
            ) : null}
            <Badge>Crunchbase, PitchBook, +235</Badge>
          </div>
        </div>

        {/* Main Content - Filter and Data Sections */}
        <div
          className={SubframeUtils.twClassNames(
            "flex w-full flex-col items-start gap-2 mt-2",
            { hidden: variant === "old-version" || variant === "approved" }
          )}
        >
          <div className="flex w-full flex-col items-start gap-4 rounded-lg relative z-10">
            {/* #Filter Section */}
            <div className="flex w-full flex-col items-start gap-2">
              <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-border-primary" />
              <div className="flex w-full flex-col items-start gap-4 px-1 py-1">
                <Accordion
                  trigger={
                    <div className="flex w-full items-center gap-2">
                      <SubframeCore.Icon
                        className="text-body font-body text-text-secondary"
                        name={icon2}
                      />
                      {text9 ? (
                        <span className="grow shrink-0 basis-0 text-body-bold font-body-bold text-text-primary">
                          {text9}
                        </span>
                      ) : null}
                      <Accordion.Chevron />
                    </div>
                  }
                >
                  <div className="flex w-full flex-col items-start gap-2 px-2 py-2">
                    <div className="flex w-full flex-col items-start gap-2 px-2 py-2">
                      <div className="flex flex-col items-start">
                        {text10 ? (
                          <span className="text-body-bold font-body-bold text-text-primary">
                            {text10}
                          </span>
                        ) : null}
                        {text11 ? (
                          <span className="text-caption font-caption text-text-secondary">
                            {text11}
                          </span>
                        ) : null}
                      </div>
                      <div className="flex flex-col items-start">
                        {text12 ? (
                          <span className="text-body-bold font-body-bold text-text-primary">
                            {text12}
                          </span>
                        ) : null}
                        {text13 ? (
                          <span className="text-caption font-caption text-text-secondary">
                            {text13}
                          </span>
                        ) : null}
                      </div>
                      <div className="flex flex-col items-start">
                        {text14 ? (
                          <span className="text-body-bold font-body-bold text-text-primary">
                            {text14}
                          </span>
                        ) : null}
                        {text15 ? (
                          <span className="text-caption font-caption text-text-secondary">
                            {text15}
                          </span>
                        ) : null}
                      </div>
                      <Button variant="brand-secondary">Filters</Button>
                    </div>
                  </div>
                </Accordion>
              </div>
              <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-border-primary" />
            </div>

            {/* #Data Section */}
            <div className="flex w-full flex-col items-start gap-1 px-1 py-1">
              <div className="flex items-center gap-2">
                <SubframeCore.Icon
                  className="text-body font-body text-text-secondary"
                  name="FeatherTable"
                />
                {text7 ? (
                  <span className="text-body-bold font-body-bold text-text-primary">
                    {text7}
                  </span>
                ) : null}
              </div>
              {text8 ? (
                <span className="text-body font-body text-text-secondary">
                  {text8}
                </span>
              ) : null}
            </div>

            {/* Dynamic Table */}
            <Table
              header={
                <Table.HeaderRow>
                  <Table.HeaderCell>Field Name</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.HeaderRow>
              }
            >
              {dataFields.map((field) => (
                <Table.Row key={field.id}>
                  <Table.Cell>
                    <TextField variant="filled" label="" helpText="">
                      <TextField.Input
                        placeholder="Enter field name"
                        value={field.fieldName}
                        onChange={(e) =>
                          updateField(field.id, e.target.value, field.description)
                        }
                      />
                    </TextField>
                  </Table.Cell>
                  <Table.Cell>
                    <TextField variant="filled" label="" helpText="">
                      <TextField.Input
                        placeholder="Enter description"
                        value={field.description}
                        onChange={(e) =>
                          updateField(field.id, field.fieldName, e.target.value)
                        }
                      />
                    </TextField>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <SubframeCore.Tooltip.Provider>
                        <SubframeCore.Tooltip.Root>
                          <SubframeCore.Tooltip.Trigger asChild={true}>
                            <IconButton size="small" icon="FeatherStar" />
                          </SubframeCore.Tooltip.Trigger>
                          <SubframeCore.Tooltip.Portal>
                            <SubframeCore.Tooltip.Content
                              side="bottom"
                              align="start"
                              sideOffset={4}
                              asChild={true}
                            >
                              <Tooltip>enhance with AI</Tooltip>
                            </SubframeCore.Tooltip.Content>
                          </SubframeCore.Tooltip.Portal>
                        </SubframeCore.Tooltip.Root>
                      </SubframeCore.Tooltip.Provider>
                      <SubframeCore.Tooltip.Provider>
                        <SubframeCore.Tooltip.Root>
                          <SubframeCore.Tooltip.Trigger asChild={true}>
                            <IconButton
                              size="small"
                              icon="FeatherTrash"
                              onClick={() => removeField(field.id)}
                            />
                          </SubframeCore.Tooltip.Trigger>
                          <SubframeCore.Tooltip.Portal>
                            <SubframeCore.Tooltip.Content
                              side="top"
                              align="center"
                              sideOffset={4}
                              asChild={true}
                            >
                              <Tooltip>Remove data point</Tooltip>
                            </SubframeCore.Tooltip.Content>
                          </SubframeCore.Tooltip.Portal>
                        </SubframeCore.Tooltip.Root>
                      </SubframeCore.Tooltip.Provider>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table>

            {/* Action Buttons */}
            <div className="flex w-full items-center gap-2">
              <div className="flex grow shrink-0 basis-0 items-start gap-2">
                <Button
                  variant="brand-secondary"
                  size="small"
                  icon="FeatherPlus"
                  onClick={addNewField}
                >
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
                      className="z-[9999]"
                      asChild={true}
                    >
                      <DropdownMenu>
                        {fieldSuggestions.map((suggestion, index) => (
                          <DropdownMenu.DropdownItem
                            key={index}
                            icon="FeatherColumns"
                            onClick={() =>
                              addFieldFromSuggestion(
                                suggestion.fieldName,
                                suggestion.description
                              )
                            }
                          >
                            {suggestion.fieldName}
                          </DropdownMenu.DropdownItem>
                        ))}
                      </DropdownMenu>
                    </SubframeCore.DropdownMenu.Content>
                  </SubframeCore.DropdownMenu.Portal>
                </SubframeCore.DropdownMenu.Root>
              </div>
              <Button onClick={handleSavePreview}>Save + preview</Button>
            </div>
          </div>
        </div>

        {/* Streaming Update Message */}
        {(isStreaming || streamingMessage) && (
          <div className="flex w-full flex-col items-start gap-3 mt-4 p-4 bg-success-50 border border-success-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <IconWithBackground variant="success" icon="FeatherCheckCircle" />
              </div>
              <div className="flex-1">
                <p className="text-body font-body text-success-800">
                  {streamingMessage}
                  {isStreaming && (
                    <span className="inline-block w-2 h-5 bg-success-600 ml-1 animate-pulse" />
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Milestone Marker */}
        {showMilestone && (
          <div className="flex w-full items-center gap-3 mt-4 p-3 bg-brand-50 border border-brand-200 rounded-lg">
            <div className="flex items-center gap-2">
              <IconWithBackground variant="brand" icon="FeatherFlag" />
              <span className="text-body-bold font-body-bold text-brand-800">
                Milestone: Signal Updated
              </span>
            </div>
            <div className="flex-1 h-px bg-brand-200"></div>
            <span className="text-caption font-caption text-brand-600">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        )}
      </div>
    );
  }
);

export const SignalCard = SignalCardRoot;