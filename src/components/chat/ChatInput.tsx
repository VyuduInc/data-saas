'use client';

import { useState, useRef } from 'react';
import { Button, Textarea } from "@nextui-org/react";
import { PlusIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onFileUpload: (files: FileList) => void;
  isLoading?: boolean;
}

export function ChatInput({ onSendMessage, onFileUpload, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handlePlusClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 p-4 border-t">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
        multiple
      />
      <Button
        isIconOnly
        variant="light"
        onClick={handlePlusClick}
        type="button"
      >
        <PlusIcon className="h-5 w-5" />
      </Button>
      <div className="flex-1">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me anything about your data..."
          minRows={1}
          maxRows={4}
          classNames={{
            input: "resize-none",
            inputWrapper: "!h-auto min-h-[44px]"
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
      </div>
      <Button
        isIconOnly
        color="secondary"
        type="submit"
        isDisabled={isLoading || !message.trim()}
        isLoading={isLoading}
      >
        <PaperAirplaneIcon className="h-5 w-5" />
      </Button>
    </form>
  );
}