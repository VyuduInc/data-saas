'use client';

import { useState } from 'react';
import {
  Card,
  CardBody,
  Switch,
  Select,
  SelectItem,
  Button,
  Divider,
} from "@nextui-org/react";
import { SparklesIcon, Cog6ToothIcon, PencilIcon } from '@heroicons/react/24/outline';
import { AppLayout } from '@/components/layout/AppLayout';

export default function SettingsPage() {
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
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
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
            <Card>
              <CardBody>
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
              </CardBody>
            </Card>

            <Card>
              <CardBody>
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
                      <div className="text-xs text-gray-500">
                        Using GPT-4o model for analysis
                      </div>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
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
                      <div className="text-xs text-gray-500">
                        Using Python for analysis
                      </div>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardBody>
                <div>
                  <h3 className="text-sm font-medium mb-1">Code Display</h3>
                  <p className="text-sm text-gray-500">Configure how code is displayed</p>
                  <div className="mt-2">
                    <Switch
                      defaultSelected={settings.alwaysShowCode}
                      size="sm"
                      color="secondary"
                      onChange={(e) => setSettings(s => ({ ...s, alwaysShowCode: e.target.checked }))}
                    >
                      Always show code
                    </Switch>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <div>
                  <h3 className="text-sm font-medium mb-1">Context</h3>
                  <p className="text-sm text-gray-500">Add custom context for analysis</p>
                  <textarea
                    value={settings.context}
                    onChange={(e) => setSettings(s => ({ ...s, context: e.target.value }))}
                    className="mt-2 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    rows={3}
                    placeholder="Add any specific context or instructions..."
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <Button
            color="primary"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
