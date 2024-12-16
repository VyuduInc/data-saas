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
import { SparklesIcon, Cog6ToothIcon, PencilIcon, UsersIcon, ShieldCheckIcon, ArrowDownTrayIcon, QueueListIcon } from '@heroicons/react/24/outline';
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
    { id: 'general', label: 'General', icon: Cog6ToothIcon },
    { id: 'ml', label: 'Machine Learning', icon: SparklesIcon },
    { id: 'collaboration', label: 'Collaboration', icon: UsersIcon },
    { id: 'security', label: 'Security', icon: ShieldCheckIcon },
    { id: 'export', label: 'Export', icon: ArrowDownTrayIcon },
    { id: 'batch', label: 'Batch Processing', icon: QueueListIcon },
  ];

  const [localSettings, setLocalSettings] = useState({
    general: {
      theme: 'light',
      language: 'en',
      notifications: true,
      autoSave: true
    },
    ml: {
      defaultAlgorithm: 'kmeans',
      maxThreads: 4,
      modelCacheSize: 1000,
      defaultBatchSize: 100,
      enableAutoML: false
    },
    collaboration: {
      showCursors: true,
      showPresence: true,
      autoSync: true,
      changeBufferTimeout: 500
    },
    security: {
      mfaEnabled: false,
      encryptExports: true,
      auditLogging: true,
      passwordExpiration: 90
    },
    export: {
      defaultFormat: 'pdf',
      includeMetadata: true,
      compression: true,
      watermark: false
    },
    batch: {
      maxConcurrentJobs: 3,
      autoRetry: true,
      maxRetries: 3,
      notifyOnCompletion: true
    }
  });

  const updateSettings = (category: string, key: string, value: any) => {
    setLocalSettings((prevSettings) => ({ ...prevSettings, [category]: { ...prevSettings[category], [key]: value } }));
  };

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/settings');
        if (!response.ok) throw new Error('Failed to load settings');
        const data = await response.json();
        setLocalSettings(data);
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
  }, [isOpen, setLocalSettings, showToast]);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localSettings),
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
          <div className="space-y-4">
            <Select
              label="Theme"
              value={localSettings.general.theme}
              onChange={(e) => updateSettings('general', 'theme', e.target.value)}
            >
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </Select>
            <Select
              label="Language"
              value={localSettings.general.language}
              onChange={(e) => updateSettings('general', 'language', e.target.value)}
            >
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </Select>
            <Switch
              checked={localSettings.general.notifications}
              onChange={(e) => updateSettings('general', 'notifications', e.target.checked)}
            >
              Enable Notifications
            </Switch>
            <Switch
              checked={localSettings.general.autoSave}
              onChange={(e) => updateSettings('general', 'autoSave', e.target.checked)}
            >
              Auto Save
            </Switch>
          </div>
        );

      case 'ml':
        return (
          <div className="space-y-4">
            <Select
              label="Default Algorithm"
              value={localSettings.ml.defaultAlgorithm}
              onChange={(e) => updateSettings('ml', 'defaultAlgorithm', e.target.value)}
            >
              <SelectItem value="kmeans">K-means Clustering</SelectItem>
              <SelectItem value="hierarchical">Hierarchical Clustering</SelectItem>
              <SelectItem value="dbscan">DBSCAN</SelectItem>
              <SelectItem value="linear">Linear Regression</SelectItem>
              <SelectItem value="polynomial">Polynomial Regression</SelectItem>
              <SelectItem value="logistic">Logistic Regression</SelectItem>
              <SelectItem value="svm">SVM</SelectItem>
              <SelectItem value="decision_tree">Decision Tree</SelectItem>
              <SelectItem value="random_forest">Random Forest</SelectItem>
            </Select>
            <Input
              type="number"
              label="Max Threads"
              value={localSettings.ml.maxThreads}
              onChange={(e) => updateSettings('ml', 'maxThreads', parseInt(e.target.value))}
            />
            <Input
              type="number"
              label="Model Cache Size (MB)"
              value={localSettings.ml.modelCacheSize}
              onChange={(e) => updateSettings('ml', 'modelCacheSize', parseInt(e.target.value))}
            />
            <Switch
              checked={localSettings.ml.enableAutoML}
              onChange={(e) => updateSettings('ml', 'enableAutoML', e.target.checked)}
            >
              Enable AutoML
            </Switch>
          </div>
        );

      case 'collaboration':
        return (
          <div className="space-y-4">
            <Switch
              checked={localSettings.collaboration.showCursors}
              onChange={(e) => updateSettings('collaboration', 'showCursors', e.target.checked)}
            >
              Show Collaborator Cursors
            </Switch>
            <Switch
              checked={localSettings.collaboration.showPresence}
              onChange={(e) => updateSettings('collaboration', 'showPresence', e.target.checked)}
            >
              Show Online Presence
            </Switch>
            <Switch
              checked={localSettings.collaboration.autoSync}
              onChange={(e) => updateSettings('collaboration', 'autoSync', e.target.checked)}
            >
              Auto Sync Changes
            </Switch>
            <Input
              type="number"
              label="Change Buffer Timeout (ms)"
              value={localSettings.collaboration.changeBufferTimeout}
              onChange={(e) => updateSettings('collaboration', 'changeBufferTimeout', parseInt(e.target.value))}
            />
          </div>
        );

      case 'security':
        return (
          <div className="space-y-4">
            <Switch
              checked={localSettings.security.mfaEnabled}
              onChange={(e) => updateSettings('security', 'mfaEnabled', e.target.checked)}
            >
              Enable MFA
            </Switch>
            <Switch
              checked={localSettings.security.encryptExports}
              onChange={(e) => updateSettings('security', 'encryptExports', e.target.checked)}
            >
              Encrypt Exports
            </Switch>
            <Switch
              checked={localSettings.security.auditLogging}
              onChange={(e) => updateSettings('security', 'auditLogging', e.target.checked)}
            >
              Enable Audit Logging
            </Switch>
            <Input
              type="number"
              label="Password Expiration (days)"
              value={localSettings.security.passwordExpiration}
              onChange={(e) => updateSettings('security', 'passwordExpiration', parseInt(e.target.value))}
            />
          </div>
        );

      case 'export':
        return (
          <div className="space-y-4">
            <Select
              label="Default Export Format"
              value={localSettings.export.defaultFormat}
              onChange={(e) => updateSettings('export', 'defaultFormat', e.target.value)}
            >
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="docx">DOCX</SelectItem>
              <SelectItem value="html">HTML</SelectItem>
              <SelectItem value="md">Markdown</SelectItem>
              <SelectItem value="latex">LaTeX</SelectItem>
              <SelectItem value="xml">XML</SelectItem>
              <SelectItem value="sql">SQL</SelectItem>
              <SelectItem value="py">Python Script</SelectItem>
            </Select>
            <Switch
              checked={localSettings.export.includeMetadata}
              onChange={(e) => updateSettings('export', 'includeMetadata', e.target.checked)}
            >
              Include Metadata
            </Switch>
            <Switch
              checked={localSettings.export.compression}
              onChange={(e) => updateSettings('export', 'compression', e.target.checked)}
            >
              Enable Compression
            </Switch>
            <Switch
              checked={localSettings.export.watermark}
              onChange={(e) => updateSettings('export', 'watermark', e.target.checked)}
            >
              Add Watermark
            </Switch>
          </div>
        );

      case 'batch':
        return (
          <div className="space-y-4">
            <Input
              type="number"
              label="Max Concurrent Jobs"
              value={localSettings.batch.maxConcurrentJobs}
              onChange={(e) => updateSettings('batch', 'maxConcurrentJobs', parseInt(e.target.value))}
            />
            <Switch
              checked={localSettings.batch.autoRetry}
              onChange={(e) => updateSettings('batch', 'autoRetry', e.target.checked)}
            >
              Auto Retry Failed Jobs
            </Switch>
            <Input
              type="number"
              label="Max Retries"
              value={localSettings.batch.maxRetries}
              onChange={(e) => updateSettings('batch', 'maxRetries', parseInt(e.target.value))}
            />
            <Switch
              checked={localSettings.batch.notifyOnCompletion}
              onChange={(e) => updateSettings('batch', 'notifyOnCompletion', e.target.checked)}
            >
              Notify on Job Completion
            </Switch>
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
                <span>{tab.label}</span>
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
