"use client";
/*
 * Documentation:
 * Attachments Modal — https://app.subframe.com/002445ea7110/library?component=Attachments+Modal_5a15ebab-92ad-4971-a480-08dc68d73d34
 * Icon Button — https://app.subframe.com/002445ea7110/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 * Button — https://app.subframe.com/002445ea7110/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 * Alert — https://app.subframe.com/002445ea7110/library?component=Alert_3a65613d-d546-467c-80f4-aaba6a7edcd5
 */

import React, { useRef, useState } from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";
import { FeatherUploadCloud } from "@subframe/core";
import { FeatherFileText } from "@subframe/core";
import { IconButton } from "./IconButton";
import { FeatherX } from "@subframe/core";
import { Button } from "./Button";
import { FeatherUpload } from "@subframe/core";
import { Alert } from "./Alert";
import { FeatherDownload } from "@subframe/core";

interface AttachmentsModalRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  text?: React.ReactNode;
  icon2?: React.ReactNode;
  text2?: React.ReactNode;
  text3?: React.ReactNode;
  icon3?: React.ReactNode;
  text4?: React.ReactNode;
  onClose?: () => void;
  onFileAttach?: (file: File) => void;
  className?: string;
}

const AttachmentsModalRoot = React.forwardRef<
  HTMLElement,
  AttachmentsModalRootProps
>(function AttachmentsModalRoot(
  {
    icon = <FeatherUploadCloud />,
    text,
    icon2 = <FeatherUploadCloud />,
    text2,
    text3,
    icon3 = <FeatherFileText />,
    text4,
    onClose,
    onFileAttach,
    className,
    ...otherProps
  }: AttachmentsModalRootProps,
  ref,
) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex h-full w-144 flex-col items-start gap-6 bg-background-primary px-6 py-6",
        className,
      )}
      ref={ref as any}
      {...otherProps}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          {icon ? (
            <SubframeCore.IconWrapper className="text-body font-body text-text-primary">
              {icon}
            </SubframeCore.IconWrapper>
          ) : null}
          {text ? (
            <span className="text-h3 font-h3 text-text-primary">{text}</span>
          ) : null}
        </div>
        <IconButton icon={<FeatherX />} onClick={onClose} />
      </div>
      <div
        className={SubframeUtils.twClassNames(
          "flex w-full flex-col items-start gap-4 rounded-lg border-2 border-dashed px-6 py-6 transition-all duration-200",
          {
            "border-brand-400 bg-brand-50": isDragOver,
            "border-brand-200 bg-background-secondary": !isDragOver,
          },
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex w-full flex-col items-center gap-2">
          {icon2 ? (
            <SubframeCore.IconWrapper className="text-h1 font-h1 text-brand-300">
              {icon2}
            </SubframeCore.IconWrapper>
          ) : null}
          {text2 ? (
            <span className="text-body-bold font-body-bold text-text-primary">
              {selectedFile ? "File Selected" : text2}
            </span>
          ) : null}
          {text3 ? (
            <span className="text-body font-body text-text-secondary">
              {selectedFile ? 'Click "Upload File" to proceed' : text3}
            </span>
          ) : null}
        </div>
        <div className="flex w-full items-center justify-center gap-2">
          <Button
            variant="brand-secondary"
            icon={<FeatherUpload />}
            onClick={handleChooseFile}
          >
            Choose File
          </Button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".csv,.xlsx,.xls,.json,.txt"
          onChange={handleFileSelect}
        />

        {/* Selected file display */}
        {selectedFile && (
          <div className="flex w-full items-center justify-between rounded-lg border border-solid border-brand-200 bg-background-primary px-4 py-3">
            <div className="flex items-center gap-2">
              <SubframeCore.IconWrapper className="text-body font-body text-brand-600">
                <FeatherFileText />
              </SubframeCore.IconWrapper>
              <div className="flex flex-col">
                <span className="text-body font-body text-text-primary">
                  {selectedFile.name}
                </span>
                <span className="text-caption font-caption text-text-secondary">
                  {formatFileSize(selectedFile.size)}
                </span>
              </div>
            </div>
            <IconButton
              icon={<FeatherX />}
              size="small"
              onClick={() => setSelectedFile(null)}
            />
          </div>
        )}
      </div>
      <Alert
        title="CSV Format Guidelines"
        description="Your CSV file should include the following columns: ID, Name, Email, Rote. Make sure to use UTF-8 encoding and include headers in the first row."
      />

      <div className="flex w-full items-center gap-2">
        {icon3 ? (
          <SubframeCore.IconWrapper className="text-body font-body text-text-secondary">
            {icon3}
          </SubframeCore.IconWrapper>
        ) : null}
        {text4 ? (
          <span className="text-body font-body text-text-secondary">
            {text4}
          </span>
        ) : null}
        <Button
          variant="neutral-tertiary"
          size="small"
          icon={<FeatherDownload />}
        >
          CSV Template
        </Button>
      </div>
      <div className="flex w-full items-center justify-end gap-2 border-t border-solid border-brand-200 pt-4">
        <Button variant="neutral-secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          icon={<FeatherUpload />}
          disabled={!selectedFile}
          onClick={() => {
            if (selectedFile) {
              // Pass the file to the parent component
              onFileAttach?.(selectedFile);
              // Close the modal after attaching the file
              onClose?.();
            }
          }}
        >
          Upload File
        </Button>
      </div>
    </div>
  );
});

export const AttachmentsModal = AttachmentsModalRoot;
