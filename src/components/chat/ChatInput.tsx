'use client';

import { useState, useRef } from 'react';
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
      <button
        type="button"
        onClick={handlePlusClick}
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
      >
        <PlusIcon className="h-5 w-5" />
      </button>
      <div className="flex-1 relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me anything about your data..."
          className="w-full p-3 pr-10 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          rows={1}
          style={{ minHeight: '44px', maxHeight: '200px' }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !message.trim()}
        className={`p-2 rounded-lg ${
          isLoading || !message.trim()
            ? 'text-gray-400 bg-gray-100'
            : 'text-white bg-purple-600 hover:bg-purple-700'
        }`}
      >
        <PaperAirplaneIcon className="h-5 w-5" />
      </button>
    </form>
  );
}