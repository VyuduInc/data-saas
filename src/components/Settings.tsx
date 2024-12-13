'use client';

import { useState } from 'react';
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
} from "@nextui-org/react";
import { XMarkIcon } from '@heroicons/react/24/outline';
import { SparklesIcon, Cog6ToothIcon, PencilIcon } from '@heroicons/react/24/outline';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Settings({ isOpen, onClose }: SettingsProps) {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    theme: 'light',
    model: 'GPT-4o',
    runtime: 'Python',
    alwaysShowCode: false,
    context: '',
    responseStyle: '',
  });

  const handleSave = () => {
    // Save settings to backend/localStorage
    onClose();
  };

  const renderTooltip = (text: string) => {
    return (
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1">
        {text}
      </div>
    );
  };

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

          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <SparklesIcon className="h-5 w-5 text-purple-600" />
              <Button
                color="secondary"
                variant="flat"
                size="sm"
              >
                Upgrade
              </Button>
            </div>
            <p className="text-sm text-purple-600 mt-1">
              Upgrade now to unlock all settings
            </p>
          </div>

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
                    onChange={(e) => setSettings(s => ({ ...s, theme: e.target.checked ? 'dark' : 'light' }))}
                    thumbIcon={({ isSelected }) => (isSelected ? '🌙' : '☀️')}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Model</h3>
                <p className="text-sm text-gray-500">Choose the AI model you would like to use</p>
                <Select
                  defaultSelectedKeys={[settings.model]}
                  className="mt-2"
                  size="sm"
                  variant="bordered"
                  startContent={<span className="text-xl">🤖</span>}
                >
                  <SelectItem key="GPT-4o">GPT-4o</SelectItem>
                  <SelectItem key="GPT-3.5">GPT-3.5</SelectItem>
                </Select>
                <div className="relative mt-1">
                  {settings.model === 'GPT-4o' && (
                    <div className="absolute top-0 right-0 bg-gray-900 text-white text-xs rounded px-2 py-1">
                      Using GPT-4o model for analysis
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Runtime</h3>
                <p className="text-sm text-gray-500">Choose the code you would like to see</p>
                <Select
                  defaultSelectedKeys={[settings.runtime]}
                  className="mt-2"
                  size="sm"
                  variant="bordered"
                  startContent={<span className="text-xl">🐍</span>}
                >
                  <SelectItem key="Python">Python</SelectItem>
                  <SelectItem key="JavaScript">JavaScript</SelectItem>
                </Select>
                <div className="relative mt-1">
                  {settings.runtime === 'Python' && (
                    <div className="absolute top-0 right-0 bg-gray-900 text-white text-xs rounded px-2 py-1">
                      Using Python for analysis
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Always show code</h3>
                <p className="text-sm text-gray-500">Show code blocks by default in responses</p>
                <div className="mt-2 flex justify-end">
                  <Switch
                    defaultSelected={settings.alwaysShowCode}
                    size="lg"
                    color="secondary"
                    onChange={(e) => setSettings(s => ({ ...s, alwaysShowCode: e.target.checked }))}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-medium">Context</h3>
                  <span className="text-purple-600">🔒</span>
                </div>
                <p className="text-sm text-gray-500">What would you like Vaydr to know?</p>
                <Textarea
                  value={settings.context}
                  onChange={(e) => setSettings(s => ({ ...s, context: e.target.value }))}
                  placeholder="Include instructions you would like Vaydr to remember throughout your conversations."
                  className="mt-2"
                  maxRows={4}
                  isDisabled
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {settings.context.length}/1000
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-medium">Response style</h3>
                  <span className="text-purple-600">🔒</span>
                </div>
                <p className="text-sm text-gray-500">How would you like Vaydr to respond?</p>
                <Input
                  value={settings.responseStyle}
                  onChange={(e) => setSettings(s => ({ ...s, responseStyle: e.target.value }))}
                  placeholder="e.g. professional, friendly, succinct, French"
                  className="mt-2"
                  maxLength={50}
                  isDisabled
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {settings.responseStyle.length}/50
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  color="secondary"
                  className="mt-4"
                  onClick={handleSave}
                >
                  Save changes
                </Button>
              </div>
            </div>
          )}
        </div>
      </ModalContent>
    </Modal>
  );
}
