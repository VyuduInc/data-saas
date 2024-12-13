'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  PlusIcon, 
  ChevronUpDownIcon, 
  QuestionMarkCircleIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ChatBubbleLeftIcon,
  CircleStackIcon
} from '@heroicons/react/24/outline';

interface Chat {
  id: number;
  name: string;
  timestamp: Date;
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
  const [isChatsExpanded, setIsChatsExpanded] = useState(true);

  const createNewChat = () => {
    const newChat = {
      id: chats.length + 1,
      name: "New Chat",
      timestamp: new Date(),
    };
    setChats([newChat, ...chats]);
  };

  return (
    <div className="w-64 bg-gray-50 border-r flex flex-col h-full">
      <div className="p-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">
          Vizly
        </Link>
        <button className="p-1 hover:bg-gray-200 rounded">
          <ChatBubbleLeftIcon className="h-5 w-5" />
        </button>
      </div>
      
      <div className="p-4">
        <button 
          onClick={createNewChat}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        >
          <PlusIcon className="h-5 w-5" />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="px-4 py-2">
          <button 
            onClick={() => setIsChatsExpanded(!isChatsExpanded)}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 w-full"
          >
            <ChevronUpDownIcon className="h-4 w-4" />
            Chats
          </button>
        </div>

        {isChatsExpanded && (
          <nav className="flex-1 overflow-y-auto px-2">
            <div className="space-y-1">
              <div className="px-2 py-1 text-xs text-gray-500">Older</div>
              {chats.map((chat) => (
                <a
                  key={chat.id}
                  href="#"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-200"
                >
                  {chat.name}
                </a>
              ))}
            </div>
          </nav>
        )}

        <div className="p-2">
          <div className="border-t border-gray-200 pt-2">
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-200 w-full">
              <CircleStackIcon className="h-5 w-5" />
              Data
            </button>
            <div className="px-4 py-1 text-xs text-gray-500">
              Files are deleted after 1 hour of inactivity.
            </div>
            <div className="px-4 py-1 text-xs text-purple-600 hover:underline cursor-pointer">
              View data →
            </div>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-purple-600">⚡</span>
                <span className="font-medium">Upgrade your plan</span>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <div>Free messages</div>
              <div className="flex justify-between">
                <span>0/10</span>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              Upgrade for better data analysis with unlimited queries and more features.
            </div>
            <button className="w-full bg-purple-600 text-white rounded-md py-2 text-sm hover:bg-purple-700">
              Upgrade now
            </button>
          </div>

          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-200 w-full">
            <UserGroupIcon className="h-5 w-5" />
            Refer and Earn
          </button>
          
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-200 w-full">
            <QuestionMarkCircleIcon className="h-5 w-5" />
            Help
          </button>

          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-200 w-full">
            <svg className="h-5 w-5" viewBox="0 0 127 96" xmlns="http://www.w3.org/2000/svg">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" fill="currentColor"/>
            </svg>
            Join our Discord
          </button>

          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-200 w-full">
            <Cog6ToothIcon className="h-5 w-5" />
            Settings
          </button>
        </div>

        <div className="p-4 border-t">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-200 w-full">
            <img src="https://github.com/jeremywilliams.png" alt="Profile" className="h-6 w-6 rounded-full" />
            Jeremy Williams
          </button>
        </div>
      </div>
    </div>
  );
}