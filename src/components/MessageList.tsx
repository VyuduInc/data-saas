import { useEffect, useRef, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { Message } from '@prisma/client';
import { useMessages, subscribeToChat } from '@/hooks/useMessages';
import { useToast } from '@/hooks/useToast';

interface MessageItemProps {
  message: Message & {
    user: {
      id: string;
      name: string | null;
      image: string | null;
    };
  };
}

const MessageItem = ({ message }: MessageItemProps) => {
  return (
    <div className="flex items-start gap-3 p-4">
      {message.user.image ? (
        <img
          src={message.user.image}
          alt={message.user.name || 'User'}
          className="w-8 h-8 rounded-full"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          {message.user.name?.[0] || '?'}
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{message.user.name}</span>
          <span className="text-sm text-gray-500">
            {new Date(message.createdAt).toLocaleTimeString()}
          </span>
        </div>
        {message.type === 'text' && (
          <p className="mt-1 text-gray-700">{message.content}</p>
        )}
        {message.type === 'code' && (
          <pre className="mt-1 p-3 bg-gray-100 rounded-md overflow-x-auto">
            <code>{message.content}</code>
          </pre>
        )}
        {message.type === 'image' && (
          <img
            src={message.content}
            alt="Message attachment"
            className="mt-1 max-w-sm rounded-md"
          />
        )}
      </div>
    </div>
  );
};

interface MessageListProps {
  chatId: string;
}

export const MessageList = ({ chatId }: MessageListProps) => {
  const {
    messages,
    hasMore,
    isLoading,
    error,
    currentPage,
    loadMessages,
    reset,
  } = useMessages();
  const { toast } = useToast();
  const { ref, inView } = useInView();
  const prevChatIdRef = useRef<string>();

  // Load initial messages
  useEffect(() => {
    if (chatId !== prevChatIdRef.current) {
      reset();
      loadMessages(chatId);
      prevChatIdRef.current = chatId;
    }
  }, [chatId, reset, loadMessages]);

  // Subscribe to real-time updates
  useEffect(() => {
    const unsubscribe = subscribeToChat(chatId);
    return () => unsubscribe();
  }, [chatId]);

  // Load more messages when scrolling up
  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMessages(chatId, currentPage + 1);
    }
  }, [inView, hasMore, isLoading, chatId, currentPage, loadMessages]);

  // Show error if any
  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        type: 'error',
      });
    }
  }, [error, toast]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No messages yet
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse h-full overflow-y-auto">
      {messages.map((message, i) => (
        <MessageItem key={message.id} message={message} />
      ))}
      {hasMore && (
        <div ref={ref} className="h-10 flex items-center justify-center">
          {isLoading && <div className="loader" />}
        </div>
      )}
    </div>
  );
};
