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

  const tabs = [
    { id: 'general', name: 'General', icon: Cog6ToothIcon },
    { id: 'security', name: 'Security', icon: XMarkIcon },
    { id: 'files', name: 'File Types', icon: PencilIcon },
    { id: 'ml', name: 'ML Features', icon: SparklesIcon },
    { id: 'export', name: 'Export', icon: PencilIcon },
  ];

  const updateSettings = (key: string, value: any) => {
    setSettings((prevSettings) => ({ ...prevSettings, [key]: value }));
  };

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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-1">Appearance</h3>
              <p className="text-sm text-gray-500">Choose your preferred theme</p>
              <div className="mt-2 flex justify-end">
                <Switch
                  defaultSelected={settings.theme === 'dark'}
                  size="lg"
                  color="secondary"
                  onChange={(e) => updateSettings('theme', e.target.checked ? 'dark' : 'light')}
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
                onChange={(e) => updateSettings('model', e.target.value as 'gpt-4' | 'gpt-3.5-turbo')}
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
                onChange={(e) => updateSettings('runtime', e.target.value as 'Python' | 'JavaScript')}
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
                  onChange={(e) => updateSettings('alwaysShowCode', e.target.checked)}
                />
              </div>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Data Encryption</h3>
                <p className="text-sm text-gray-500">Enable encryption for sensitive data</p>
              </div>
              <Switch
                checked={settings?.security?.encryptData || false}
                onChange={(e) => updateSettings('security.encryptData', e.target.checked)}
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Auto Delete Data</h3>
              <p className="text-sm text-gray-500">Days to keep inactive data (0 for never)</p>
              <Input
                type="number"
                min={0}
                max={365}
                value={settings?.security?.autoDeleteDays || 30}
                onChange={(e) => updateSettings('security.autoDeleteDays', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Max File Size</h3>
              <p className="text-sm text-gray-500">Maximum file size in MB (1-50)</p>
              <Input
                type="number"
                min={1}
                max={50}
                value={settings?.security?.maxFileSize || 10}
                onChange={(e) => updateSettings('security.maxFileSize', parseInt(e.target.value))}
              />
            </div>
          </div>
        );
      case 'files':
        return (
          <div className="space-y-4">
            {['Pdf', 'Image', 'Csv', 'Json', 'Excel'].map((type) => (
              <div key={type} className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">{type} Files</h3>
                  <p className="text-sm text-gray-500">Allow {type.toLowerCase()} file uploads</p>
                </div>
                <Switch
                  checked={settings?.fileTypes?.[`allow${type}`] || false}
                  onChange={(e) => updateSettings(`fileTypes.allow${type}`, e.target.checked)}
                />
              </div>
            ))}
          </div>
        );
      case 'ml':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Data Clustering</h3>
                <p className="text-sm text-gray-500">Enable automatic data clustering</p>
              </div>
              <Switch
                checked={settings?.mlFeatures?.enableClustering || false}
                onChange={(e) => updateSettings('mlFeatures.enableClustering', e.target.checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Predictions</h3>
                <p className="text-sm text-gray-500">Enable predictive analytics</p>
              </div>
              <Switch
                checked={settings?.mlFeatures?.enablePrediction || false}
                onChange={(e) => updateSettings('mlFeatures.enablePrediction', e.target.checked)}
              />
            </div>
          </div>
        );
      case 'export':
        return (
          <div className="space-y-4">
            {['Docx', 'Pdf', 'Html'].map((format) => (
              <div key={format} className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">{format} Export</h3>
                  <p className="text-sm text-gray-500">Allow export to {format.toLowerCase()}</p>
                </div>
                <Switch
                  checked={settings?.export?.[`allow${format}`] || false}
                  onChange={(e) => updateSettings(`export.allow${format}`, e.target.checked)}
                />
              </div>
            ))}
          </div>
        );
      default:
        return null;
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
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 flex items-center gap-2 ${
                  activeTab === tab.id ? 'bg-gray-100 rounded-lg' : ''
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {renderTabContent()}

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
