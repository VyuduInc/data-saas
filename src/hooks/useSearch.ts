import { create } from 'zustand';
import { Message } from '@prisma/client';
import debounce from 'lodash/debounce';

interface SearchState {
  query: string;
  results: Message[];
  isSearching: boolean;
  error: string | null;
  filters: {
    type: 'all' | 'text' | 'code' | 'image';
    dateRange: 'all' | 'today' | 'week' | 'month';
  };
  setQuery: (query: string) => void;
  setFilter: (key: keyof SearchState['filters'], value: string) => void;
  search: (chatId: string) => Promise<void>;
  reset: () => void;
}

const initialFilters = {
  type: 'all',
  dateRange: 'all',
} as const;

export const useSearch = create<SearchState>((set, get) => ({
  query: '',
  results: [],
  isSearching: false,
  error: null,
  filters: initialFilters,

  setQuery: (query: string) => {
    set({ query });
    debouncedSearch(get().search);
  },

  setFilter: (key, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    }));
    get().search();
  },

  search: async (chatId: string) => {
    const { query, filters } = get();
    if (!query.trim() && filters.type === 'all' && filters.dateRange === 'all') {
      set({ results: [], isSearching: false });
      return;
    }

    try {
      set({ isSearching: true, error: null });

      const searchParams = new URLSearchParams({
        query: query.trim(),
        type: filters.type,
        dateRange: filters.dateRange,
      });

      const response = await fetch(
        `/api/chats/${chatId}/search?${searchParams.toString()}`
      );

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      set({ results: data.messages });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isSearching: false });
    }
  },

  reset: () => {
    set({
      query: '',
      results: [],
      isSearching: false,
      error: null,
      filters: initialFilters,
    });
  },
}));

const debouncedSearch = debounce((searchFn) => {
  searchFn();
}, 300);
