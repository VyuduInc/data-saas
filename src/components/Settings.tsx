'use client';

import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Tabs,
  Tab,
  Card,
  CardBody,
  Switch,
  Select,
  SelectItem,
  Textarea,
  Input,
  Chip
} from "@nextui-org/react";
import { XMarkIcon } from '@heroicons/react/24/outline';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Settings({ isOpen, onClose }: SettingsProps) {
  const [settings, setSettings] = useState({
    theme: 'light',
    model: 'GPT-4',
    runtime: 'Python',
    alwaysShowCode: false,
    context: '',
    responseStyle: '',
  });

  const handleSave = () => {
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="2xl"
      scrollBehavior="inside"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader className="flex justify-between items-center">
          <span>Settings</span>
          <Button isIconOnly variant="light" onClick={onClose}>
            <XMarkIcon className="h-5 w-5" />
          </Button>
        </ModalHeader>
        <ModalBody className="gap-4">
          <Card className="bg-purple-50 border-none">
            <CardBody className="gap-2">
              <div className="flex items-center gap-2">
                <span className="text-purple-600">⚡</span>
                <span className="font-medium text-purple-600">Upgrade</span>
              </div>
              <p className="text-sm text-purple-600">
                Upgrade now to unlock all settings
              </p>
            </CardBody>
          </Card>

          <Tabs aria-label="Settings tabs" color="secondary" variant="underlined">
            <Tab key="general" title={
              <div className="flex items-center gap-2">
                <span>⚙️</span>
                <span>General</span>
              </div>
            }>
              <div className="space-y-6 py-4">
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
                    onChange={(e) => setSettings(s => ({ ...s, model: e.target.value }))}
                  >
                    <SelectItem key="GPT-4" startContent="🤖">GPT-4</SelectItem>
                    <SelectItem key="GPT-3.5" startContent="🤖">GPT-3.5</SelectItem>
                  </Select>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-1">Runtime</h3>
                  <p className="text-sm text-gray-500">Choose the code you would like to see</p>
                  <Select
                    defaultSelectedKeys={[settings.runtime]}
                    className="mt-2"
                    size="sm"
                    variant="bordered"
                  >
                    <SelectItem key="Python" startContent="🐍">Python</SelectItem>
                    <SelectItem key="JavaScript" startContent="📜">JavaScript</SelectItem>
                  </Select>
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
            </Tab>
            <Tab key="customization" title={
              <div className="flex items-center gap-2">
                <span>✏️</span>
                <span>Customization</span>
              </div>
            }>
              <div className="space-y-6 py-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Context</h3>
                  <p className="text-sm text-gray-500">What would you like Vaydr to know?</p>
                  <Textarea
                    value={settings.context}
                    onChange={(e) => setSettings(s => ({ ...s, context: e.target.value }))}
                    placeholder="Include instructions you would like Vaydr to remember throughout your conversations."
                    className="mt-2"
                    maxRows={4}
                    maxLength={1000}
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {settings.context.length}/1000
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-1">Response style</h3>
                  <p className="text-sm text-gray-500">How would you like Vaydr to respond?</p>
                  <Input
                    value={settings.responseStyle}
                    onChange={(e) => setSettings(s => ({ ...s, responseStyle: e.target.value }))}
                    placeholder="e.g. professional, friendly, succinct, French"
                    className="mt-2"
                    maxLength={50}
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {settings.responseStyle.length}/50
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    color="secondary"
                    variant="flat"
                    onClick={handleSave}
                  >
                    Save changes
                  </Button>
                </div>
              </div>
            </Tab>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
