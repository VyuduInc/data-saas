'use client';

import { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Switch,
  Select,
  SelectItem,
  Textarea,
  Input,
  Spinner,
} from "@nextui-org/react";
import { XMarkIcon } from '@heroicons/react/24/outline';
import { SparklesIcon, Cog6ToothIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useSettings } from '@/hooks/useSettings';
import { useToast } from '@/hooks/useToast';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Settings({ isOpen, onClose }: SettingsProps) {
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const { settings, setSettings } = useSettings();
  const { showToast } = useToast();

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/settings');
        if (!response.ok) throw new Error('Failed to load settings');
        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error('Error loading settings:', error);
        showToast({
          title: 'Error',
          description: 'Failed to load settings',
          type: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      loadSettings();
    }
  }, [isOpen, setSettings, showToast]);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error('Failed to save settings');

      showToast({
        title: 'Success',
        description: 'Settings saved successfully',
        type: 'success',
      });
      onClose();
    } catch (error) {
      console.error('Error saving settings:', error);
      showToast({
        title: 'Error',
        description: 'Failed to save settings',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <div className="p-8 flex justify-center items-center">
            <Spinner size="lg" />
          </div>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="md"
      scrollBehavior="inside"
    >
      <ModalContent>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Settings</h2>
            <Button isIconOnly variant="light" onClick={onClose}>
              <XMarkIcon className="h-5 w-5" />
            </Button>
          </div>

          {!settings.isPremium && (
            <div className="bg-purple-50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <SparklesIcon className="h-5 w-5 text-purple-600" />
                <Button
                  color="secondary"
                  variant="flat"
                  size="sm"
                  href="/pricing"
                >
                  Upgrade
                </Button>
              </div>
              <p className="text-sm text-purple-600 mt-1">
                Upgrade now to unlock all settings
              </p>
            </div>
          )}

          <div className="flex mb-6">
            <button
              className={`px-4 py-2 flex items-center gap-2 ${
                activeTab === 'general' ? 'bg-gray-100 rounded-lg' : ''
              }`}
              onClick={() => setActiveTab('general')}
            >
              <Cog6ToothIcon className="h-5 w-5" />
              <span>General</span>
            </button>
            <button
              className={`px-4 py-2 flex items-center gap-2 ${
                activeTab === 'customization' ? 'bg-gray-100 rounded-lg' : ''
              }`}
              onClick={() => setActiveTab('customization')}
            >
              <PencilIcon className="h-5 w-5" />
              <span>Customization</span>
            </button>
          </div>

          {activeTab === 'general' ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-1">Appearance</h3>
                <p className="text-sm text-gray-500">Choose your preferred theme</p>
                <div className="mt-2 flex justify-end">
                  <Switch
                    defaultSelected={settings.theme === 'dark'}
                    size="lg"
                    color="secondary"
                    onChange={(e) => setSettings({ theme: e.target.checked ? 'dark' : 'light' })}
                    thumbIcon={({ isSelected }) => (isSelected ? '🌙' : '☀️')}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Model</h3>
                <p className="text-sm text-gray-500">Choose the AI model you would like to use</p>
                <Select
                  selectedKeys={[settings.model]}
                  className="mt-2"
                  size="sm"
                  variant="bordered"
                  onChange={(e) => setSettings({ model: e.target.value as 'gpt-4' | 'gpt-3.5-turbo' })}
                >
                  <SelectItem key="gpt-4" startContent="🤖">GPT-4</SelectItem>
                  <SelectItem key="gpt-3.5-turbo" startContent="🤖">GPT-3.5</SelectItem>
                </Select>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Runtime</h3>
                <p className="text-sm text-gray-500">Choose the code you would like to see</p>
                <Select
                  selectedKeys={[settings.runtime]}
                  className="mt-2"
                  size="sm"
                  variant="bordered"
                  onChange={(e) => setSettings({ runtime: e.target.value as 'Python' | 'JavaScript' })}
                >
                  <SelectItem key="Python" startContent="🐍">Python</SelectItem>
                  <SelectItem key="JavaScript" startContent="⚡">JavaScript</SelectItem>
                </Select>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Always show code</h3>
                <p className="text-sm text-gray-500">Show code blocks by default in responses</p>
                <div className="mt-2 flex justify-end">
                  <Switch
                    isSelected={settings.alwaysShowCode}
                    size="lg"
                    color="secondary"
                    onChange={(e) => setSettings({ alwaysShowCode: e.target.checked })}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-medium">Context</h3>
                  {!settings.isPremium && <span className="text-purple-600">🔒</span>}
                </div>
                <p className="text-sm text-gray-500">What would you like the AI to know?</p>
                <Textarea
                  value={settings.context}
                  onChange={(e) => setSettings({ context: e.target.value })}
                  placeholder="Include instructions you would like the AI to remember throughout your conversations."
                  className="mt-2"
                  maxRows={4}
                  isDisabled={!settings.isPremium}
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {settings.context.length}/1000
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-medium">Response style</h3>
                  {!settings.isPremium && <span className="text-purple-600">🔒</span>}
                </div>
                <p className="text-sm text-gray-500">How would you like the AI to respond?</p>
                <Input
                  value={settings.responseStyle}
                  onChange={(e) => setSettings({ responseStyle: e.target.value })}
                  placeholder="e.g., Concise and technical"
                  className="mt-2"
                  isDisabled={!settings.isPremium}
                />
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="secondary" onPress={handleSave} isLoading={isLoading}>
              Save Changes
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
