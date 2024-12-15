'use client';

import { useState, useRef } from 'react';
import { Button, Textarea } from "@nextui-org/react";
import { PlusIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface ChatInputProps {
  onSend: (message: string) => void;
  onFileUpload?: (files: FileList) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, onFileUpload, isLoading, disabled, placeholder }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && onFileUpload) {
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
      {onFileUpload && (
        <>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            multiple
            disabled={disabled}
          />
          <Button
            isIconOnly
            variant="light"
            onClick={handlePlusClick}
            type="button"
            isDisabled={disabled}
          >
            <PlusIcon className="h-5 w-5" />
          </Button>
        </>
      )}
      <div className="flex-1">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder || "Type a message..."}
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
          isDisabled={disabled || isLoading}
        />
      </div>
      <Button
        isIconOnly
        color="secondary"
        type="submit"
        isDisabled={disabled || isLoading || !message.trim()}
        isLoading={isLoading}
      >
        <PaperAirplaneIcon className="h-5 w-5" />
      </Button>
    </form>
  );
}