import { useState, useRef, KeyboardEvent } from 'react';
import { useToast } from '@/hooks/useToast';

interface MessageInputProps {
  chatId: string;
  onSend?: () => void;
}

export const MessageInput = ({ chatId, onSend }: MessageInputProps) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    if (!content.trim() || isLoading) return;

    try {
      setIsLoading(true);
      const response = await fetch(`/api/chats/${chatId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: content.trim(),
          type: 'text',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setContent('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
      onSend?.();
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as Error).message,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-t p-4">
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            adjustTextareaHeight();
          }}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 resize-none rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={1}
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={!content.trim() || isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};
