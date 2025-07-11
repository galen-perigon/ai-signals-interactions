import { useState, useCallback } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface UseAIChatOptions {
  apiUrl?: string;
  onStreamStart?: () => void;
  onStreamEnd?: () => void;
  onError?: (error: Error) => void;
}

export function useAIChat(options: UseAIChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentStreamContent, setCurrentStreamContent] = useState('');

  const apiUrl = options.apiUrl || import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const streamMessage = useCallback(async (
    userMessage: string,
    endpoint: string = '/api/chat',
    additionalData?: Record<string, any>
  ): Promise<string> => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsStreaming(true);
    setCurrentStreamContent('');
    options.onStreamStart?.();

    try {
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            role: m.role,
            content: m.content,
          })),
          ...additionalData,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          accumulatedContent += chunk;
          setCurrentStreamContent(accumulatedContent);
        }
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: accumulatedContent,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMsg]);
      setCurrentStreamContent('');
      options.onStreamEnd?.();

      return accumulatedContent;

    } catch (error) {
      console.error('Streaming error:', error);
      options.onError?.(error as Error);
      return '';
    } finally {
      setIsStreaming(false);
    }
  }, [messages, apiUrl, options]);

  const generateSignal = useCallback(async (topic: string, location: string, requirements: string) => {
    return streamMessage(
      `Generate a monitoring signal for: ${topic}`,
      '/api/generate-signal',
      { topic, location, requirements }
    );
  }, [streamMessage]);

  const generatePreview = useCallback(async (signalConfig: any) => {
    return streamMessage(
      'Generate preview data',
      '/api/generate-preview',
      { signalConfig }
    );
  }, [streamMessage]);

  const enhanceMessage = useCallback(async (message: string, context?: string) => {
    return streamMessage(
      message,
      '/api/enhance-message',
      { message, context }
    );
  }, [streamMessage]);

  return {
    messages,
    isStreaming,
    currentStreamContent,
    streamMessage,
    generateSignal,
    generatePreview,
    enhanceMessage,
    clearMessages: () => setMessages([]),
  };
} 