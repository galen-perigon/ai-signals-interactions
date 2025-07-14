"use client";

import React, { useState, useEffect, useRef } from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import * as SubframeCore from "@subframe/core";
import { FeatherPenLine, FeatherStar, FeatherBell, FeatherSlidersHorizontal, FeatherArrowUp, FeatherPaperclip, FeatherChevronDown, FeatherFileText, FeatherX } from "@subframe/core";
import { Breadcrumbs } from "@/ui/components/Breadcrumbs";
import { IconButton } from "@/ui/components/IconButton";
import { Badge } from "@/ui/components/Badge";
import { Badges } from "@/ui/components/Badges";
import { SignalCard } from "@/ui/components/SignalCard";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { Button } from "@/ui/components/Button";
import { SkeletonText } from "@/ui/components/SkeletonText";
import { SkeletonCircle } from "@/ui/components/SkeletonCircle";
import { BuilderPreview } from "@/ui/components/BuilderPreview";
import { Dialog } from "@/ui/components/Dialog";
import { AttachmentsModal } from "@/ui/components/AttachmentsModal";
import { MobileToggle } from "@/ui/components/MobileToggle";
import { ThemeToggle } from "@/ui/components/ThemeToggle";
import { useAIChat } from "../hooks/useAIChat";

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface SignalCardData {
  id: string;
  variant: "default" | "approved" | "old-version";
  timestamp: Date;
  isLoading: boolean;
  isRestored?: boolean;
  originalTimestamp?: Date;
  isEditingApproved?: boolean;
  aiGeneratedContent?: string;
}

interface MilestoneData {
  id: string;
  timestamp: Date;
  isFirst: boolean;
  isApproval?: boolean;
  isRestore?: boolean;
  isUpdate?: boolean;
}

interface UpdateMessageData {
  id: string;
  text: string;
  timestamp: Date;
}

interface ChatItem {
  id: string;
  type: 'message' | 'signal' | 'milestone' | 'update-message';
  data: ChatMessage | SignalCardData | MilestoneData | UpdateMessageData;
  timestamp: Date;
  isNew?: boolean; // For animation purposes
}

function MonitoringChatPane1() {
  const [chatItems, setChatItems] = useState<ChatItem[]>([
    {
      id: "1",
      type: 'message',
      data: {
        id: "1",
        text: "I want to track AI startup acquisitions in California",
        isUser: true,
        timestamp: new Date(Date.now() - 3 * 60 * 1000),
      },
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
    },
    {
      id: "2",
      type: 'message',
      data: {
        id: "2",
        text: "Got it. I spun up a dedicated plan to track AI startup acquisitions in California, covering announcement news, M&A developments, and related filings so we capture every significant move in this fast-moving sector.",
        isUser: false,
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
      },
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
    },
    {
      id: "3",
      type: 'signal',
      data: {
        id: "3",
        variant: "default",
        timestamp: new Date(Date.now() - 2 * 60 * 1000 + 1000),
        isLoading: false,
      },
      timestamp: new Date(Date.now() - 2 * 60 * 1000 + 1000),
    },
    {
      id: "4",
      type: 'milestone',
      data: {
        id: "4",
        timestamp: new Date(Date.now() - 2 * 60 * 1000 + 2000),
        isFirst: true,
      },
      timestamp: new Date(Date.now() - 2 * 60 * 1000 + 2000),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [mobileViewMode, setMobileViewMode] = useState<"chat" | "preview">("chat");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [chatItemsCount, setChatItemsCount] = useState(0);
  const [isAttachmentsModalOpen, setIsAttachmentsModalOpen] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  // AI Chat Integration
  const { streamMessage, isStreaming: aiIsStreaming, currentStreamContent, generateSignal, generatePreview } = useAIChat({
    onStreamStart: () => setIsGenerating(true),
    onStreamEnd: () => setIsGenerating(false),
    onError: (error) => console.error('AI Streaming error:', error),
  });

  // Add state for storing AI-generated signal content
  const [aiGeneratedSignalContent, setAiGeneratedSignalContent] = useState<string>('');

  const scrollToBottom = () => {
    if (chatContainerRef.current && shouldAutoScroll) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Check if user has scrolled up manually
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 50;
      setShouldAutoScroll(isAtBottom);
    }
  };

  // Only auto-scroll when new items are added (not when existing items change)
  useEffect(() => {
    if (chatItems.length > chatItemsCount) {
      scrollToBottom();
      setChatItemsCount(chatItems.length);
    } else if (chatItems.length !== chatItemsCount) {
      setChatItemsCount(chatItems.length);
    }
  }, [chatItems, chatItemsCount, shouldAutoScroll]);

  // Remove isNew flag after animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setChatItems(prev => 
        prev.map(item => ({ ...item, isNew: false }))
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, [chatItems]);

  const handleSavePreview = async () => {
    const currentTime = new Date();

    // Check if we're editing an approved card before state changes
    const wasEditingApproved = chatItems.some(
      (item) =>
        item.type === "signal" &&
        (item.data as SignalCardData).variant === "default" &&
        (item.data as SignalCardData).isEditingApproved
    );

    // IMMEDIATELY change SignalCard to approved state
    setChatItems((prev) =>
      prev.map((item) => {
        if (
          item.type === "signal" &&
          (item.data as SignalCardData).variant === "default"
        ) {
          const signalData = item.data as SignalCardData;
          return {
            ...item,
            data: {
              ...signalData,
              variant: "approved" as const,
              isLoading: false,
              isEditingApproved: false,
            },
            isNew: true,
          };
        }
        return item;
      })
    );

    // Enable preview mode and switch to preview on mobile
    setIsPreviewMode(true);
    setMobileViewMode("preview");

    // Start preview loading for 15 seconds (duration of 3D animation)
    setIsPreviewLoading(true);
    
    // Use AI to generate preview content (async, happens in background)
    try {
      const signalConfig = {
        title: "AI Startup Acquisition Tracker",
        location: "California",
        focus: "artificial intelligence startup acquisitions and mergers",
        dataTypes: "funding events, strategic partnerships, market developments"
      };
      
      await generatePreview(signalConfig);
    } catch (error) {
      console.error('Failed to generate AI preview:', error);
    }

    if (wasEditingApproved) {
      const messageTime = new Date(currentTime.getTime() + 1);
      const updateMessage: ChatItem = {
        id: messageTime.toISOString(),
        type: "update-message",
        data: {
          id: messageTime.toISOString(),
          text: "Perfect! Your updates have been saved and are now reflected in the preview to the right. The data source is already working with your refreshed parameters.",
          timestamp: messageTime,
        },
        timestamp: messageTime,
        isNew: true,
      };

      const milestoneTime = new Date(currentTime.getTime() + 2);
      const milestoneItem: ChatItem = {
        id: milestoneTime.toISOString(),
        type: "milestone",
        data: {
          id: milestoneTime.toISOString(),
          timestamp: milestoneTime,
          isFirst: false,
          isUpdate: true,
        },
        timestamp: milestoneTime,
        isNew: true,
      };

      setTimeout(() => {
        setChatItems((prev) => [...prev, updateMessage]);
        setTimeout(() => {
          setChatItems((prev) => [...prev, milestoneItem]);
        }, 2500); // Wait for message to stream
      }, 500);
    }

    setIsPreviewMode(true);
  };

  // Handle 3D animation completion
  const handleAnimationComplete = () => {
    // Switch back to normal content after 3D animation completes
    setIsPreviewLoading(false);
  };

  const handleEdit = (signalCardId: string) => {
    setChatItems(prev => 
      prev.map(item => {
        if (item.type === 'signal' && item.id === signalCardId) {
          const signalData = item.data as SignalCardData;
          return {
            ...item,
            data: { 
              ...signalData, 
              variant: "default",
              isEditingApproved: signalData.variant === "approved" // Track if we're editing an approved card
            },
            isNew: true, // Trigger transition animation
          };
        }
        return item;
      })
    );
  };

  // Function to detect if a message is requesting signal modification
  const isSignalModificationRequest = (message: string): boolean => {
    const signalKeywords = [
      'track', 'monitor', 'watch', 'signal', 'create', 'generate', 'want to', 'change to', 'switch to', 'modify', 'update', 'instead'
    ];
    return signalKeywords.some(keyword => message.toLowerCase().includes(keyword));
  };

  // Function to extract signal parameters from user message
  const extractSignalParams = (message: string) => {
    // Extract topic, location, and requirements from the message
    const topicMatch = message.match(/track|monitor|watch|signal.*?([\w\s]+?)(?:\sin\s|\sfor\s|\sat\s|$)/i);
    const locationMatch = message.match(/\sin\s([\w\s]+?)(?:\s|$)/i);
    
    return {
      topic: topicMatch ? topicMatch[1].trim() : message,
      location: locationMatch ? locationMatch[1].trim() : 'California',
      requirements: message
    };
  };

  const handleSendMessage = async () => {
    if ((!inputValue.trim() && !attachedFile) || isGenerating) return;

    // Trigger loading animation if preview mode is active
    if (isPreviewMode) {
      setIsPreviewLoading(true);
      setTimeout(() => setIsPreviewLoading(false), 600);
    }

    const currentTime = new Date();
    
    // Add user message with animation
    const messageText = attachedFile 
      ? inputValue.trim() 
        ? `${inputValue}\n\n📎 Attached: ${attachedFile.name} (${formatFileSize(attachedFile.size)})`
        : `📎 Attached: ${attachedFile.name} (${formatFileSize(attachedFile.size)})`
      : inputValue;

    const userMessageItem: ChatItem = {
      id: Date.now().toString(),
      type: 'message',
      data: {
        id: Date.now().toString(),
        text: messageText,
        isUser: true,
        timestamp: currentTime,
      },
      timestamp: currentTime,
      isNew: true,
    };

    setChatItems(prev => {
      // Change existing signal cards to old-version with animation
      const updatedItems = prev.map(item => {
        if (item.type === 'signal') {
          const signalData = item.data as SignalCardData;
          return {
            ...item,
            data: { ...signalData, variant: "old-version" as const },
            isNew: true, // Trigger transition animation
          };
        }
        return item;
      });
      
      return [...updatedItems, userMessageItem];
    });

    const inputValueCopy = inputValue;
    setInputValue("");
    setAttachedFile(null);

    try {
      // Detect if this is a signal modification request
      const isSignalRequest = isSignalModificationRequest(inputValueCopy);
      
      if (isSignalRequest) {
        // For signal requests, use both chat and signal generation
        const signalParams = extractSignalParams(inputValueCopy);
        
        // First, get the AI chat response
        const chatResponse = await streamMessage(inputValueCopy);
        
        // Add AI chat response as a message
        setTimeout(() => {
          if (chatResponse) {
            const aiResponseTime = new Date();
            const aiMessageItem: ChatItem = {
              id: (Date.now() + 1).toString(),
              type: 'message',
              data: {
                id: (Date.now() + 1).toString(),
                text: chatResponse,
                isUser: false,
                timestamp: aiResponseTime,
              },
              timestamp: aiResponseTime,
              isNew: true,
            };

            setChatItems(prev => [...prev, aiMessageItem]);
          }
        }, 500);

        // Then generate the signal configuration
        setTimeout(async () => {
          // Add loading signal card
          const loadingTime = new Date();
          const loadingSignalId = Date.now().toString();

          const loadingSignalItem: ChatItem = {
            id: loadingSignalId,
            type: 'signal',
            data: {
              id: loadingSignalId,
              variant: "default",
              timestamp: loadingTime,
              isLoading: true,
              aiGeneratedContent: '',
            },
            timestamp: loadingTime,
            isNew: true,
          };

          setChatItems(prev => [...prev, loadingSignalItem]);

          try {
            // Generate signal content
            const signalResponse = await generateSignal(signalParams.topic, signalParams.location, signalParams.requirements);

            // After loading, show the actual signal card with AI-generated content
            setTimeout(() => {
              const finalTime = new Date();
              
              setChatItems(prev => {
                const updatedItems = prev.map(item => {
                  if (item.id === loadingSignalId) {
                    const signalData = item.data as SignalCardData;
                    return {
                      ...item,
                      data: { 
                        ...signalData, 
                        isLoading: false,
                        aiGeneratedContent: signalResponse || `AI Startup Funding Tracker\nMonitoring funding rounds and investment activity in California`, // Store AI-generated content
                      },
                      isNew: true, // Trigger completion animation
                    };
                  }
                  return item;
                });

                return updatedItems;
              });

              // Add milestone marker with 300ms delay for organic timing
              setTimeout(() => {
                const milestoneItem: ChatItem = {
                  id: (Date.now() + 100).toString(),
                  type: 'milestone',
                  data: {
                    id: (Date.now() + 100).toString(),
                    timestamp: finalTime,
                    isFirst: false,
                  },
                  timestamp: finalTime,
                  isNew: true,
                };

                setChatItems(prev => [...prev, milestoneItem]);
              }, 300);
            }, 2000);
          } catch (error) {
            console.error('Failed to generate signal:', error);
            // Show signal card with fallback content
            setChatItems(prev => {
              const updatedItems = prev.map(item => {
                if (item.id === loadingSignalId) {
                  const signalData = item.data as SignalCardData;
                  return {
                    ...item,
                    data: { 
                      ...signalData, 
                      isLoading: false,
                      aiGeneratedContent: `AI Startup Funding Tracker\nReal-time monitoring of California tech funding rounds`,
                    },
                    isNew: true,
                  };
                }
                return item;
              });
              return updatedItems;
            });
          }
        }, 800);
      } else {
        // Regular chat message - use existing flow
        const aiResponse = await streamMessage(inputValueCopy);
        
        // Get the latest response and add it as a chat item
        setTimeout(() => {
          if (aiResponse) {
            const aiResponseTime = new Date();
            const aiMessageItem: ChatItem = {
              id: (Date.now() + 1).toString(),
              type: 'message',
              data: {
                id: (Date.now() + 1).toString(),
                text: aiResponse,
                isUser: false,
                timestamp: aiResponseTime,
              },
              timestamp: aiResponseTime,
              isNew: true,
            };

            setChatItems(prev => [...prev, aiMessageItem]);
          }
        }, 500);
      }
    } catch (error) {
      console.error('Message sending error:', error);
    }
  };

  const handleRestore = (originalTimestamp: Date) => {
    const currentTime = new Date();
    const minutesAgo = Math.max(1, Math.floor((currentTime.getTime() - originalTimestamp.getTime()) / (1000 * 60)));
    
    setChatItems(prev => {
      // Set all existing signal cards to old-version
      const updatedItems = prev.map(item => {
        if (item.type === 'signal') {
          const signalData = item.data as SignalCardData;
          return {
            ...item,
            data: { ...signalData, variant: "old-version" as const },
            isNew: true, // Trigger transition animation
          };
        }
        return item;
      });
      
      // Add new restored signal card
      const restoredSignalCard: ChatItem = {
        id: Date.now().toString(),
        type: 'signal',
        data: {
          id: Date.now().toString(),
          variant: "default",
          timestamp: currentTime,
          isLoading: false,
          isRestored: true,
          originalTimestamp: originalTimestamp,
        },
        timestamp: currentTime,
        isNew: true,
      };
      
      return [...updatedItems, restoredSignalCard];
    });

    // Add "Plan restored" milestone marker with 300ms delay
    setTimeout(() => {
      const milestoneItem: ChatItem = {
        id: (Date.now() + 1).toString(),
        type: 'milestone',
        data: {
          id: (Date.now() + 1).toString(),
          timestamp: currentTime,
          isFirst: false,
          isRestore: true,
        },
        timestamp: currentTime,
        isNew: true,
      };

      setChatItems(prev => [...prev, milestoneItem]);
    }, 300);
  };

  const handleOpenAttachmentsModal = () => {
    setIsAttachmentsModalOpen(true);
  };

  const handleCloseAttachmentsModal = () => {
    setIsAttachmentsModalOpen(false);
  };

  const handleFileAttach = (file: File) => {
    setAttachedFile(file);
  };

  const handleRemoveAttachedFile = () => {
    setAttachedFile(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getSignalCardTimestampText = (signalData: SignalCardData) => {
    if (signalData.isRestored && signalData.originalTimestamp) {
      const currentTime = new Date();
      const minutesAgo = Math.max(1, Math.floor((currentTime.getTime() - signalData.originalTimestamp.getTime()) / (1000 * 60)));
      return `Restored ${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`;
    }
    return "Updated 2min ago";
  };

  // Function to extract signal title from AI-generated content
  const getSignalTitle = (signalData: SignalCardData): string => {
    if (signalData.aiGeneratedContent) {
      // Try to extract title from structured AI response
      const titleMatch = signalData.aiGeneratedContent.match(/TITLE:\s*([^\n]+)/i);
      if (titleMatch) {
        return titleMatch[1].trim();
      }
      // Fallback: try general title pattern
      const generalTitleMatch = signalData.aiGeneratedContent.match(/title[:\s]+([^\n]+)/i);
      if (generalTitleMatch) {
        return generalTitleMatch[1].trim();
      }
      // Final fallback: extract first meaningful line
      const lines = signalData.aiGeneratedContent.split('\n').filter(line => line.trim());
      if (lines.length > 0) {
        return lines[0].replace(/^\d+\.\s*/, '').trim();
      }
    }
    return "AI Startup Acquisition Tracker";
  };

  // Function to extract signal description from AI-generated content
  const getSignalDescription = (signalData: SignalCardData): string => {
    if (signalData.aiGeneratedContent) {
      // Try to extract description from structured AI response
      const descMatch = signalData.aiGeneratedContent.match(/DESCRIPTION:\s*([^\n]+)/i);
      if (descMatch) {
        return descMatch[1].trim();
      }
      // Fallback: try general description pattern
      const generalDescMatch = signalData.aiGeneratedContent.match(/description[:\s]+([^\n]+)/i);
      if (generalDescMatch) {
        return generalDescMatch[1].trim();
      }
      // Final fallback: extract second meaningful line or part of content
      const lines = signalData.aiGeneratedContent.split('\n').filter(line => line.trim());
      if (lines.length > 1) {
        return lines[1].replace(/^\d+\.\s*/, '').trim();
      }
    }
    return "Real-time monitoring of California tech acquisitions";
  };

  // Skeleton SignalCard component with pulse animation
  const SkeletonSignalCard = () => (
    <div className="flex w-full flex-col items-start gap-4 rounded-rounded-x-large border border-solid border-brand-200 bg-background-primary px-6 py-6 shadow-md animate-pulse">
      <div className="flex w-full items-center gap-4">
        <div className="flex grow shrink-0 basis-0 items-center gap-2">
          <SkeletonCircle />
          <SkeletonText className="w-24" />
        </div>
        <SkeletonText className="w-20" />
        <SkeletonText className="w-12" />
      </div>
      <div className="flex w-full items-center gap-4">
        <SkeletonCircle />
        <div className="flex flex-col items-start gap-2">
          <SkeletonText className="w-64" />
          <SkeletonText className="w-80" />
        </div>
      </div>
      <div className="flex w-full flex-col gap-4">
        <SkeletonText className="w-full" />
        <SkeletonText className="w-full" />
        <SkeletonText className="w-3/4" />
      </div>
    </div>
  );

  // Sort chat items by timestamp to ensure chronological order
  const sortedChatItems = [...chatItems].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  return (
    <DefaultPageLayout>
      <div className="flex h-screen w-full flex-col bg-neutral-50">
        {/* Header */}
        <div className="flex w-full items-center gap-2 px-4 py-2 bg-white border-b">
          <div className="flex grow shrink-0 basis-0 items-center gap-2">
            <Breadcrumbs className="h-auto grow shrink-0 basis-0">
              <SubframeCore.Icon
                className="text-body font-body text-text-secondary w-4 h-4"
                name="FeatherHome"
              />
              <Breadcrumbs.Item className="font-light" active={true}>
                /
              </Breadcrumbs.Item>
              <Breadcrumbs.Item active={true}>
                AI startup acquisitions in California
              </Breadcrumbs.Item>
              <IconButton
                variant="neutral-tertiary"
                size="small"
                icon={<FeatherPenLine />}
                onClick={() => {}}
              />
              <Badges variant="neutral">Draft</Badges>
            </Breadcrumbs>
            <IconButton
              size="small"
              icon={<FeatherStar />}
              onClick={() => {}}
            />
            <IconButton
              size="small"
              icon={<FeatherBell />}
              onClick={() => {}}
            />
                        <IconButton
              size="small"
              icon={<FeatherSlidersHorizontal />}
              onClick={() => {}}
            />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Toggle - Only visible on mobile */}
        <div className="md:hidden w-full px-4 py-1 bg-neutral-100 border-b">
          <MobileToggle 
            activeMode={mobileViewMode} 
            onModeChange={setMobileViewMode}
          />
        </div>

        {/* Main Content - Responsive Layout */}
        <div className="flex-1 relative overflow-hidden">
          <div className={`flex h-full transition-all duration-700 ease-out ${
            isPreviewMode ? 'gap-4 p-4' : 'gap-0 p-0'
          }`}>
            
            {/* Chat Panel */}
            <div className={`relative transition-all duration-700 ease-out ${
              isPreviewMode 
                ? 'w-full md:w-2/5 transform translate-x-0' 
                : 'w-full transform translate-x-0'
            } ${
              // Mobile responsive classes
              mobileViewMode === "chat" ? "block" : "hidden md:block"
            }`}>
              <div
                ref={chatContainerRef}
                className={`h-full overflow-y-auto px-2 md:px-4 transition-all duration-700 ${
                  isPreviewMode ? 'pb-40' : 'pb-80'
                }`}
                onScroll={handleScroll}
              >
                <div className={`mx-auto py-6 space-y-6 transition-all duration-700 ${
                  isPreviewMode ? 'max-w-full md:max-w-xl' : 'max-w-full md:max-w-2xl'
                }`}>
                  {sortedChatItems.map((item) => (
                    <div 
                      key={item.id}
                      className={`transition-all duration-700 ease-out ${
                        item.isNew 
                          ? 'animate-in fade-in-0 slide-in-from-bottom-4 duration-500'
                          : ''
                      }`}
                    >
                      {item.type === 'message' && (
                        <div
                          className={`flex w-full flex-col ${
                            (item.data as ChatMessage).isUser ? "items-end" : "items-start"
                          } justify-center gap-1`}
                        >
                          <div className="flex flex-col items-start justify-center gap-1">
                            <div
                              className={`flex w-full max-w-full md:max-w-[576px] flex-col items-start gap-2 rounded-lg px-4 py-3 transition-all duration-300 transform hover:scale-[1.01] ${
                                (item.data as ChatMessage).isUser
                                  ? "bg-sapphire-600 shadow-lg hover:shadow-xl"
                                  : "border border-solid border-brand-200 bg-background-tertiary shadow-sm hover:shadow-md"
                              } ${
                                item.isNew ? 'animate-in zoom-in-95 duration-300 delay-100' : ''
                              }`}
                            >
                              <span
                                className={`text-body font-body transition-colors duration-200 ${
                                  (item.data as ChatMessage).isUser ? "text-white" : "text-text-primary"
                                }`}
                              >
                                {(item.data as ChatMessage).text}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {item.type === 'signal' && (
                        <div className={`flex w-full flex-col items-start gap-4 transition-all duration-500 ${
                          item.isNew ? 'animate-in slide-in-from-bottom-6 fade-in-0 duration-600' : ''
                        }`}>
                          {(item.data as SignalCardData).isLoading ? (
                            <div className="animate-in fade-in-0 duration-400">
                              <SkeletonSignalCard />
                            </div>
                          ) : (
                            <div className={`w-full transition-all duration-500 ease-out transform hover:scale-[1.01] ${
                              (item.data as SignalCardData).variant === 'old-version' 
                                ? 'opacity-60 scale-95 grayscale-[0.3]' 
                                : 'opacity-100 scale-100'
                            } ${
                              item.isNew ? 'animate-in zoom-in-95 slide-in-from-bottom-4 duration-500' : ''
                            }`}>
                              <SignalCard
                                className="h-auto w-full flex-none transition-all duration-500 hover:shadow-lg"
                                variant={(item.data as SignalCardData).variant}
                                text="YOUR SIGNAL"
                                text2={getSignalCardTimestampText(item.data as SignalCardData)}
                                text3={getSignalTitle(item.data as SignalCardData)}
                                text4={getSignalDescription(item.data as SignalCardData)}
                                text5="Research Scope"
                                text6="Data Sources"
                                text7="Your custom data points"
                                text8="Define the fields your signal will track and update in real time"
                                text9="Filter presets"
                                text10="United States Sources"
                                text11="Limit search to US-based sources only"
                                text12="English Content"
                                text13="Filter for articles written in English"
                                text14="Industry Focus"
                                text15="Narrow search to specific technology sectors"
                                onSavePreview={(item.data as SignalCardData).variant === 'default' ? () => handleSavePreview() : undefined}
                                onRestore={(item.data as SignalCardData).variant === 'old-version' ? () => handleRestore((item.data as SignalCardData).originalTimestamp!) : undefined}
                                onEdit={(item.data as SignalCardData).variant === 'approved' ? () => handleEdit(item.id) : undefined}
                                originalTimestamp={(item.data as SignalCardData).timestamp}
                                aiGeneratedContent={(item.data as SignalCardData).aiGeneratedContent}
                              />
                            </div>
                          )}
                        </div>
                      )}
                      
                      {item.type === 'update-message' && (
                        <UpdateMessage 
                          text={(item.data as UpdateMessageData).text} 
                          isNew={item.isNew} 
                        />
                      )}

                      {item.type === 'milestone' && (
                        <div className={`flex w-full items-center gap-4 transition-all duration-700 ease-out opacity-70 hover:opacity-100 ${
                          item.isNew ? 'animate-in fade-in-0 slide-in-from-bottom-3 duration-600 delay-300' : ''
                        }`}>
                          <div className={`flex h-px grow shrink-0 basis-0 flex-col items-center gap-2 bg-border-primary transition-all duration-500 ${
                            item.isNew ? 'animate-in fade-in-0 slide-in-from-left-2 duration-400 delay-500' : ''
                          }`} />
                          <div className={`flex items-center gap-2 relative transition-all duration-500 hover:scale-105 ${
                            item.isNew ? 'animate-in zoom-in-90 fade-in-0 duration-500 delay-700' : ''
                          }`}>
                            <IconWithBackground variant="neutral" className={`transition-all duration-400 ${
                              item.isNew ? 'animate-in scale-in-95 duration-400 delay-1000' : ''
                            }`} />
                            <span className={`text-body font-body text-text-secondary transition-all duration-300 ${
                              item.isNew ? 'animate-in fade-in-0 slide-in-from-right-2 duration-400 delay-1000' : ''
                            }`}>
                              {(item.data as MilestoneData).isRestore
                                ? "Plan restored"
                                : (item.data as MilestoneData).isApproval 
                                  ? "Plan approved"
                                  : (item.data as MilestoneData).isUpdate
                                    ? "Signal updated"
                                    : (item.data as MilestoneData).isFirst 
                                      ? "Plan created" 
                                      : "Plan updated"} {formatTimestamp(item.timestamp)}
                            </span>
                          </div>
                          <div className={`flex h-px grow shrink-0 basis-0 flex-col items-center gap-2 bg-border-primary transition-all duration-500 ${
                            item.isNew ? 'animate-in fade-in-0 slide-in-from-right-2 duration-400 delay-500' : ''
                          }`} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Fixed Input */}
              <div className={`absolute bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-neutral-50 via-neutral-50 to-transparent pt-8 pb-6 px-2 md:px-4 ${
                // Hide input on mobile when in preview mode
                mobileViewMode === "preview" ? "hidden md:block" : "block"
              }`}>
                  <div className="max-w-full md:max-w-2xl mx-auto">
                    <div className="flex w-full flex-col items-center justify-end rounded-lg border border-solid border-brand-200 bg-background-primary px-1 py-1 shadow-lg transition-all duration-300 hover:shadow-xl backdrop-blur-sm">
                      <div className="flex w-full items-center gap-2 rounded-t-md px-3 pt-1 pb-2">
                        <div className="flex grow shrink-0 basis-0 items-center justify-between">
                          <div className="flex h-6 items-center gap-1 rounded-md border-0 border-solid border-border-primary">
                            <SubframeCore.Icon
                              className={`text-caption font-caption text-brand-600 transition-all duration-300 ${
                                isGenerating ? "animate-spin" : ""
                              }`}
                              name={isGenerating ? "FeatherLoader" : "FeatherCheck"}
                            />
                            <span className="whitespace-nowrap text-caption font-caption text-text-primary transition-all duration-200">
                              {isGenerating ? "Generating monitoring plan..." : "Ready to refine your plan"}
                            </span>
                          </div>
                          <Button
                            variant="brand-secondary"
                            size="small"
                            iconRight={<FeatherChevronDown />}
                            className="transition-all duration-200 hover:scale-105"
                          >
                            Details
                          </Button>
                        </div>
                      </div>
                      
                      {/* Attached File Display */}
                      {attachedFile && (
                        <div className="w-full px-3 py-2 border-b border-solid border-border-primary">
                          <div className="flex items-center">
                            <div className="flex h-6 items-center gap-1 rounded-md border border-solid border-brand-200 bg-neutral-100 px-2">
                              <SubframeCore.Icon
                                className="text-caption font-caption text-neutral-700"
                                name="FeatherFileText"
                              />
                              <span className="whitespace-nowrap text-caption font-caption text-neutral-700">
                                {attachedFile.name} ({formatFileSize(attachedFile.size)})
                              </span>
                              <button
                                onClick={handleRemoveAttachedFile}
                                className="ml-1 flex h-4 w-4 items-center justify-center rounded-sm hover:bg-neutral-200 transition-colors"
                              >
                                <SubframeCore.Icon
                                  className="text-caption font-caption text-neutral-500 hover:text-neutral-700"
                                  name="FeatherX"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="h-36 w-full flex-none relative">
                        <textarea
                          className="min-h-[96px] w-full grow shrink-0 basis-0 resize-none rounded-md border-0 bg-transparent px-3 py-2 text-body font-body text-text-primary placeholder:text-text-secondary focus:outline-none transition-all duration-200 focus:bg-neutral-50/50"
                          placeholder="Any changes to the plan?"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          disabled={isGenerating}
                        />
                        <div className="flex w-full items-start justify-between px-2 pb-2 absolute bottom-0">
                          <div className="flex gap-1">
                            <IconButton 
                              icon={<FeatherPaperclip />} 
                              className="transition-all duration-200 hover:scale-110" 
                              onClick={handleOpenAttachmentsModal}
                            />
                          </div>
                          <div className="flex gap-1">
                            <Button
                              className="h-8 w-8 flex-none"
                              variant="brand-tertiary"
                              iconRight={<FeatherArrowUp />}
                              onClick={handleSendMessage}
                              disabled={(!inputValue.trim() && !attachedFile) || isGenerating}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            {/* Preview Panel - Slides in from right */}
            <div className={`h-full overflow-hidden ${
              // Desktop: 3/5 width when preview mode is on, Mobile: always full width
              isPreviewMode || mobileViewMode === "preview" ? "w-full md:w-3/5" : "w-0"
            } ${
              // Mobile responsive classes
              mobileViewMode === "preview" ? "block" : "hidden md:block"
            }`} style={{
              transition: 'all 450ms cubic-bezier(0.165, 0.84, 0.44, 1)'
            }}>
              <div className={`h-full ${
                isPreviewMode || mobileViewMode === "preview"
                  ? "transform translate-x-0 opacity-100" 
                  : "transform translate-x-full opacity-0 pointer-events-none"
              }`} style={{
                transition: 'all 450ms cubic-bezier(0.165, 0.84, 0.44, 1)'
              }}>
                <div className="h-full overflow-hidden p-3 md:p-2 relative">
                  {/* BuilderPreview Content */}
                  <BuilderPreview
                    loading={isPreviewLoading}
                    onAnimationComplete={handleAnimationComplete}
                    className="h-full w-full"
                    text="Signal Preview"
                    text2="AI Startup Acquisition Tracker"
                    text3="California-based artificial intelligence startup acquisitions and mergers, covering funding events, strategic partnerships, and market developments in the tech sector."
                    text4="Monitoring active"
                    text5="Last updated 2min ago"
                    text6="Sources"
                    text7="2,341 active sources"
                    text8="Found"
                    text9="8 relevant events"
                    text10="Geographic: California only"
                    text11="Industry: AI/ML companies"
                    text12="Event types: Acquisitions, mergers"
                    text13="Data points"
                    text14="Company details, funding information, leadership data, performance metrics, deal terms, strategic rationale"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Attachments Modal */}
      <Dialog open={isAttachmentsModalOpen} onOpenChange={setIsAttachmentsModalOpen}>
        <Dialog.Content>
          <AttachmentsModal
            text="Attachments"
            text2="Upload files to enhance your monitoring plan"
            text3="Drag and drop files here or click to browse"
            text4="Download template for bulk uploads"
            onClose={handleCloseAttachmentsModal}
            onFileAttach={handleFileAttach}
          />
        </Dialog.Content>
      </Dialog>
    </DefaultPageLayout>
  );
}

const UpdateMessage = ({ text, isNew }: { text: string, isNew?: boolean }) => {
  const [streamedText, setStreamedText] = useState("");
  const [isStreaming, setIsStreaming] = useState(true);

  useEffect(() => {
    // Use simple character-by-character streaming animation
    const streamText = async () => {
      setStreamedText("");
      setIsStreaming(true);
      for (let i = 0; i < text.length; i++) {
        await new Promise(res => setTimeout(res, 15));
        setStreamedText(text.substring(0, i + 1));
      }
      setIsStreaming(false);
    };

    streamText();
  }, [text]);

  const displayText = streamedText;
  const showCursor = isStreaming;

  return (
    <div className={`flex w-full flex-col items-start justify-center gap-1`}>
      <div className="flex flex-col items-start justify-center gap-1">
        <div
          className={`flex w-full max-w-full md:max-w-[576px] flex-col items-start gap-2 rounded-lg px-4 py-3 transition-all duration-300 transform hover:scale-[1.01] border border-solid border-brand-200 bg-background-tertiary shadow-sm hover:shadow-md ${
            isNew ? 'animate-in zoom-in-95 duration-300 delay-100' : ''
          }`}
        >
          <span className="text-body font-body text-text-primary">
            {displayText || text}
            {showCursor && (
              <span className="inline-block w-2 h-4 bg-gray-600 ml-1 animate-pulse" />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MonitoringChatPane1; 