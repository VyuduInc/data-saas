import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Settings {
  theme: 'light' | 'dark';
  model: 'gpt-4' | 'gpt-3.5-turbo';
  runtime: 'Python' | 'JavaScript';
  alwaysShowCode: boolean;
  context: string;
  responseStyle: string;
  isPremium: boolean;
}

interface SettingsState extends Settings {
  setSettings: (settings: Partial<Settings>) => void;
  resetSettings: () => void;
}

const defaultSettings: Settings = {
  theme: 'light',
  model: 'gpt-3.5-turbo',
  runtime: 'Python',
  alwaysShowCode: false,
  context: '',
  responseStyle: '',
  isPremium: false,
};

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,
      setSettings: (newSettings) => 
        set((state) => ({ ...state, ...newSettings })),
      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'user-settings',
      partialize: (state) => {
        const { setSettings, resetSettings, ...settings } = state;
        return settings;
      },
    }
  )
);
