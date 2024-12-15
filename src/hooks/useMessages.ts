import { create } from 'zustand';
import { Message } from '@prisma/client';
import { pusherClient, EVENTS } from '@/lib/pusher';

const MESSAGES_PER_PAGE = 50;

interface MessagesState {
  messages: Message[];
  hasMore: boolean;
  isLoading: boolean;
  currentPage: number;
  error: string | null;
  activeChat: string | null;
  loadMessages: (chatId: string, page?: number) => Promise<void>;
  addMessage: (message: Message) => void;
  updateMessage: (messageId: string, updates: Partial<Message>) => void;
  deleteMessage: (messageId: string) => void;
  reset: () => void;
}

export const useMessages = create<MessagesState>((set, get) => ({
  messages: [],
  hasMore: true,
  isLoading: false,
  currentPage: 1,
  error: null,
  activeChat: null,

  loadMessages: async (chatId: string, page = 1) => {
    try {
      set({ isLoading: true, error: null });
      
      if (page === 1) {
        set({ messages: [], activeChat: chatId });
      }

      const response = await fetch(
        `/api/chats/${chatId}/messages?page=${page}&limit=${MESSAGES_PER_PAGE}`,
        { credentials: 'include' }
      );
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to load messages');
      }
      
      const data = await response.json();
      
      set((state) => ({
        messages: page === 1 
          ? data.messages 
          : [...state.messages, ...data.messages],
        hasMore: data.messages.length === MESSAGES_PER_PAGE,
        currentPage: page,
        isLoading: false,
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false 
      });
    }
  },

  addMessage: (message: Message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },

  updateMessage: (messageId: string, updates: Partial<Message>) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === messageId ? { ...msg, ...updates } : msg
      ),
    }));
  },

  deleteMessage: (messageId: string) => {
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== messageId),
    }));
  },

  reset: () => {
    const channel = pusherClient.channel(get().activeChat || '');
    if (channel) {
      channel.unbind_all();
      pusherClient.unsubscribe(get().activeChat || '');
    }
    set({
      messages: [],
      hasMore: true,
      isLoading: false,
      currentPage: 1,
      error: null,
      activeChat: null,
    });
  },
}));

// Subscribe to real-time updates
export const subscribeToChat = (chatId: string) => {
  const channel = pusherClient.subscribe(chatId);
  
  channel.bind(EVENTS.MESSAGE_SENT, (message: Message) => {
    useMessages.getState().addMessage(message);
  });

  channel.bind(EVENTS.MESSAGE_UPDATED, (data: { id: string; updates: Partial<Message> }) => {
    useMessages.getState().updateMessage(data.id, data.updates);
  });

  channel.bind(EVENTS.MESSAGE_DELETED, (messageId: string) => {
    useMessages.getState().deleteMessage(messageId);
  });

  return () => {
    channel.unbind_all();
    pusherClient.unsubscribe(chatId);
  };
};
