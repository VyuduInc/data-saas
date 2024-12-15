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
        `/api/chats/${chatId}/messages?page=${page}&limit=${MESSAGES_PER_PAGE}`
      );
      
      if (!response.ok) throw new Error('Failed to load messages');
      
      const data = await response.json();
      
      set((state) => ({
        messages: page === 1 
          ? data.messages 
          : [...state.messages, ...data.messages],
        hasMore: data.messages.length === MESSAGES_PER_PAGE,
        currentPage: page,
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  addMessage: (message: Message) => {
    set((state) => ({
      messages: [message, ...state.messages],
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
  const channel = pusherClient.subscribe(`chat-${chatId}`);
  
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
    pusherClient.unsubscribe(`chat-${chatId}`);
  };
};
