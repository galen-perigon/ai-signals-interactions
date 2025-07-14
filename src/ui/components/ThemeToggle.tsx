"use client";

import React, { useState } from "react";
import { useTheme, type Theme } from "../../hooks/useTheme";
import { IconButton } from "./IconButton";
import * as SubframeCore from "@subframe/core";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeOptions = [
    {
      value: 'light' as Theme,
      label: 'Light',
      icon: <SubframeCore.Icon className="h-4 w-4" name="FeatherSun" />,
    },
    {
      value: 'dark' as Theme,
      label: 'Dark',
      icon: <SubframeCore.Icon className="h-4 w-4" name="FeatherMoon" />,
    },
    {
      value: 'system' as Theme,
      label: 'System',
      icon: <SubframeCore.Icon className="h-4 w-4" name="FeatherMonitor" />,
    },
  ];

  const displayIcon = resolvedTheme === 'dark' 
    ? <SubframeCore.Icon className="h-4 w-4" name="FeatherMoon" />
    : <SubframeCore.Icon className="h-4 w-4" name="FeatherSun" />;

  const handleOptionClick = (value: Theme) => {
    setTheme(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <IconButton
        icon={displayIcon}
        className={className}
        variant="neutral-tertiary"
        size="small"
        onClick={() => setIsOpen(!isOpen)}
      />
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 top-full mt-2 z-20 min-w-[140px] flex flex-col items-start rounded-md border border-solid border-brand-200 bg-background-primary px-1 py-1 shadow-lg">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className="flex h-8 w-full cursor-pointer items-center gap-2 rounded-md px-3 hover:bg-neutral-100 active:bg-neutral-50 text-left"
              >
                {option.icon}
                <span className="text-body font-body text-text-primary">
                  {option.label}
                </span>
                {theme === option.value && (
                  <SubframeCore.Icon 
                    className="h-4 w-4 ml-auto text-brand-600" 
                    name="FeatherCheck" 
                  />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
} 