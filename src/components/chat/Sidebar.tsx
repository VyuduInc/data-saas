'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button, Input, Listbox, ListboxItem, Accordion, AccordionItem, Avatar, Chip } from "@nextui-org/react";
import { 
  PlusIcon, 
  ChevronUpDownIcon, 
  QuestionMarkCircleIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ChatBubbleLeftIcon,
  CircleStackIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

interface Chat {
  id: number;
  name: string;
  timestamp: Date;
  isEditing?: boolean;
}

export function Sidebar() {
  const [chats, setChats] = useState<Chat[]>([
    { id: 1, name: "HubSpot's Impressive Revenue", timestamp: new Date() },
    { id: 2, name: "Estimating Revenue Increases for a Beauty SaaS Platform", timestamp: new Date() },
    { id: 3, name: "Retail and Commercial Real Estate", timestamp: new Date() },
    { id: 4, name: "Current Trends in Holiday Spending", timestamp: new Date() },
    { id: 5, name: "Insights and Predictions for the US", timestamp: new Date() },
    { id: 6, name: "Overview of Black-Owned Skinc", timestamp: new Date() },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingId]);

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      name: "New Chat",
      timestamp: new Date(),
      isEditing: true,
    };
    setChats([newChat, ...chats]);
    setEditingId(newChat.id);
  };

  const startEditing = (chatId: number) => {
    setEditingId(chatId);
  };

  const handleNameChange = (chatId: number, newName: string) => {
    setChats(chats.map(chat => 
      chat.id === chatId ? { ...chat, name: newName } : chat
    ));
  };

  const finishEditing = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e && e.key !== 'Enter') {
      return;
    }
    setEditingId(null);
  };

  return (
    <div className="w-64 bg-content1 border-r flex flex-col h-full">
      <div className="p-4">
        <Button
          startContent={<PlusIcon className="h-5 w-5" />}
          onClick={createNewChat}
          className="w-full"
          color="default"
          variant="flat"
        >
          New Chat
        </Button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <Accordion>
          <AccordionItem
            key="chats"
            aria-label="Chats"
            title={
              <div className="flex items-center gap-2">
                <ChevronUpDownIcon className="h-4 w-4" />
                <span>Chats</span>
              </div>
            }
          >
            <Listbox aria-label="Chat list" className="p-0 gap-0">
              {chats.map((chat) => (
                <ListboxItem
                  key={chat.id}
                  className="px-2"
                  startContent={<ChatBubbleLeftIcon className="h-4 w-4" />}
                  endContent={
                    !editingId && (
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onClick={(e) => {
                          e.preventDefault();
                          startEditing(chat.id);
                        }}
                        className="opacity-0 group-hover:opacity-100"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                    )
                  }
                >
                  {editingId === chat.id ? (
                    <Input
                      ref={editInputRef}
                      value={chat.name}
                      onChange={(e) => handleNameChange(chat.id, e.target.value)}
                      onKeyDown={(e) => finishEditing(e as any)}
                      onBlur={() => finishEditing()}
                      size="sm"
                      classNames={{
                        input: "text-sm",
                        inputWrapper: "h-8"
                      }}
                    />
                  ) : (
                    chat.name
                  )}
                </ListboxItem>
              ))}
            </Listbox>
          </AccordionItem>
        </Accordion>

        <div className="mt-auto p-4 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <CircleStackIcon className="h-4 w-4" />
              <span>Data</span>
            </div>
            <p className="text-xs text-gray-500">
              Files are retained for 30 days
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Free</span>
              <Chip size="sm" color="secondary">10 left</Chip>
            </div>
            <Button
              size="sm"
              color="secondary"
              variant="flat"
              className="w-full"
            >
              Upgrade plan
            </Button>
          </div>

          <div className="space-y-2">
            <Button
              startContent={<UserGroupIcon className="h-4 w-4" />}
              variant="light"
              className="w-full justify-start"
              size="sm"
            >
              Refer and Earn
            </Button>
            <Button
              startContent={<QuestionMarkCircleIcon className="h-4 w-4" />}
              variant="light"
              className="w-full justify-start"
              size="sm"
            >
              Help
            </Button>
            <Button
              startContent={<ChatBubbleLeftIcon className="h-4 w-4" />}
              variant="light"
              className="w-full justify-start"
              size="sm"
            >
              Join Discord
            </Button>
            <Button
              startContent={<Cog6ToothIcon className="h-4 w-4" />}
              variant="light"
              className="w-full justify-start"
              size="sm"
            >
              Settings
            </Button>
          </div>

          <div className="flex items-center gap-3 px-2">
            <Avatar
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              className="flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-gray-500 truncate">john@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}