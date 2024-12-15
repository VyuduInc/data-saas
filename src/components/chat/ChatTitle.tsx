'use client';

import { useState, useEffect, useRef } from 'react';
import { Input, Button } from '@nextui-org/react';
import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ChatTitleProps {
  chatId: string;
  initialTitle: string;
  onTitleChange?: (newTitle: string) => void;
}

export function ChatTitle({ chatId, initialTitle, onTitleChange }: ChatTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (!title.trim() || title === initialTitle) {
      setTitle(initialTitle);
      setIsEditing(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/api/chat/${chatId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title.trim() }),
      });

      if (!response.ok) throw new Error('Failed to update title');

      onTitleChange?.(title.trim());
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating chat title:', error);
      setTitle(initialTitle);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle(initialTitle);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <Input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          size="sm"
          placeholder="Enter chat title"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSave();
            } else if (e.key === 'Escape') {
              handleCancel();
            }
          }}
          disabled={isLoading}
        />
        <Button
          isIconOnly
          size="sm"
          variant="light"
          onClick={handleSave}
          isLoading={isLoading}
        >
          <CheckIcon className="h-4 w-4" />
        </Button>
        <Button
          isIconOnly
          size="sm"
          variant="light"
          onClick={handleCancel}
          disabled={isLoading}
        >
          <XMarkIcon className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium truncate">{title}</span>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        onClick={() => setIsEditing(true)}
      >
        <PencilIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
