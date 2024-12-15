'use client';

import { useState, useEffect } from 'react';
import { Spinner, Card } from '@nextui-org/react';
import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';
import { useSettings } from '@/hooks/useSettings';
import { useToast } from '@/hooks/useToast';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  files?: string[];
  createdAt: string;
}

interface ChatContainerProps {
  chatId?: string;
}

export function ChatContainer({ chatId }: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { settings } = useSettings();
  const { showToast } = useToast();

  useEffect(() => {
    if (chatId) {
      loadMessages();
    } else {
      setMessages([]);
    }
  }, [chatId]);

  const loadMessages = async () => {
    try {
      const response = await fetch(`/api/chat/${chatId}/messages`);
      if (!response.ok) throw new Error('Failed to load messages');
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError('Failed to load chat messages');
      showToast({
        title: 'Error',
        description: 'Failed to load chat messages',
        type: 'error',
      });
    }
  };

  const handleSendMessage = async (content: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const formData = new FormData();
      formData.append('message', content);
      formData.append('model', settings.model || 'gpt-3.5-turbo');

      const response = await fetch('/api/chat', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      const data = await response.json();
      setMessages(prev => [...prev, data.message, data.response]);
    } catch (err) {
      setError('Failed to send message');
      showToast({
        title: 'Error',
        description: 'Failed to send message',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (files: FileList) => {
    try {
      setIsLoading(true);
      setError(null);

      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch('/api/chat/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload files');

      showToast({
        title: 'Success',
        description: 'Files uploaded successfully',
        type: 'success',
      });
    } catch (err) {
      setError('Failed to upload files');
      showToast({
        title: 'Error',
        description: 'Failed to upload files',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <Card className="p-4 m-4 text-center text-red-500">
        {error}
      </Card>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-center p-4">
            <Spinner />
          </div>
        )}
      </div>
      <ChatInput
        onSendMessage={handleSendMessage}
        onFileUpload={handleFileUpload}
        isLoading={isLoading}
      />
    </div>
  );
}
