"use client";

import React from "react";
import * as SubframeUtils from "../utils";

interface MobileToggleProps {
  activeMode: "chat" | "preview";
  onModeChange: (mode: "chat" | "preview") => void;
  className?: string;
}

export const MobileToggle: React.FC<MobileToggleProps> = ({
  activeMode,
  onModeChange,
  className,
}) => {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full items-center justify-center bg-neutral-100",
        className
      )}
    >
      <div className="flex w-full max-w-xs relative">
        {/* Background slider */}
        <div
          className={SubframeUtils.twClassNames(
            "absolute top-0 bottom-0 w-1/2 bg-white rounded-md shadow-sm border border-solid border-neutral-200 transition-transform duration-200 ease-out",
            {
              "translate-x-0": activeMode === "chat",
              "translate-x-full": activeMode === "preview",
            }
          )}
        />
        
        {/* Chat button */}
        <button
          className={SubframeUtils.twClassNames(
            "flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-md transition-colors duration-200 relative z-10",
            {
              "text-text-primary": activeMode === "chat",
              "text-text-secondary": activeMode === "preview",
            }
          )}
          onClick={() => onModeChange("chat")}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span className="text-body font-body">Chat</span>
        </button>
        
        {/* Preview button */}
        <button
          className={SubframeUtils.twClassNames(
            "flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-md transition-colors duration-200 relative z-10",
            {
              "text-text-primary": activeMode === "preview",
              "text-text-secondary": activeMode === "chat",
            }
          )}
          onClick={() => onModeChange("preview")}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <span className="text-body font-body">Preview</span>
        </button>
      </div>
    </div>
  );
}; 