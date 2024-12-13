'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

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
    // Save settings logic here
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-medium">Settings</Dialog.Title>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="bg-purple-100 rounded-md p-3 mb-4">
            <div className="flex items-center space-x-2 text-purple-700 font-medium">
              <span className="text-sm">⚡</span>
              <span>Upgrade</span>
            </div>
            <p className="text-sm text-purple-700 mt-1">Upgrade now to unlock all settings</p>
          </div>

          <div className="flex mb-6">
            <div className="w-1/3">
              <button
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === 'general' ? 'bg-gray-100' : ''
                }`}
                onClick={() => setActiveTab('general')}
              >
                <span className="flex items-center space-x-2">
                  <span>⚙️</span>
                  <span>General</span>
                </span>
              </button>
              <button
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === 'customization' ? 'bg-gray-100' : ''
                }`}
                onClick={() => setActiveTab('customization')}
              >
                <span className="flex items-center space-x-2">
                  <span>✏️</span>
                  <span>Customization</span>
                </span>
              </button>
            </div>

            <div className="w-2/3 pl-4">
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Appearance</h3>
                    <p className="text-sm text-gray-500">Choose your preferred theme</p>
                    <div className="mt-2 flex justify-end">
                      <button 
                        className={`p-2 rounded-full ${
                          settings.theme === 'dark' ? 'bg-purple-100' : 'bg-gray-100'
                        }`}
                        onClick={() => setSettings(s => ({ ...s, theme: s.theme === 'light' ? 'dark' : 'light' }))}
                      >
                        {settings.theme === 'light' ? '🌙' : '☀️'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-1">Model</h3>
                    <p className="text-sm text-gray-500">Choose the AI model you would like to use</p>
                    <div className="mt-2">
                      <button className="px-3 py-1.5 rounded-md border flex items-center justify-between w-32">
                        <span className="flex items-center space-x-2">
                          <span>🤖</span>
                          <span>GPT-4o</span>
                        </span>
                        <span>▼</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-1">Runtime</h3>
                    <p className="text-sm text-gray-500">Choose the code you would like to see</p>
                    <div className="mt-2">
                      <button className="px-3 py-1.5 rounded-md border flex items-center justify-between w-32">
                        <span className="flex items-center space-x-2">
                          <span>🐍</span>
                          <span>Python</span>
                        </span>
                        <span>▼</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-1">Always show code</h3>
                    <p className="text-sm text-gray-500">Show code blocks by default in responses</p>
                    <div className="mt-2 flex justify-end">
                      <button
                        onClick={() => setSettings(s => ({ ...s, alwaysShowCode: !s.alwaysShowCode }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.alwaysShowCode ? 'bg-purple-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.alwaysShowCode ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'customization' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Context</h3>
                    <p className="text-sm text-gray-500">What would you like Vizly to know?</p>
                    <textarea
                      value={settings.context}
                      onChange={(e) => setSettings(s => ({ ...s, context: e.target.value }))}
                      className="mt-2 w-full p-2 border rounded-md"
                      placeholder="Include instructions you would like Vizly to remember throughout your conversations."
                      rows={4}
                      maxLength={1000}
                    />
                    <div className="text-right text-xs text-gray-500 mt-1">
                      {settings.context.length}/1000
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-1">Response style</h3>
                    <p className="text-sm text-gray-500">How would you like Vizly to respond?</p>
                    <input
                      type="text"
                      value={settings.responseStyle}
                      onChange={(e) => setSettings(s => ({ ...s, responseStyle: e.target.value }))}
                      className="mt-2 w-full p-2 border rounded-md"
                      placeholder="e.g. professional, friendly, succinct, French"
                      maxLength={50}
                    />
                    <div className="text-right text-xs text-gray-500 mt-1">
                      {settings.responseStyle.length}/50
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button 
                      onClick={handleSave}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200"
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
