'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlusIcon, FolderIcon, CogIcon } from '@heroicons/react/24/outline';

export function Sidebar() {
  const [chats] = useState([
    { id: 1, name: "HubSpot's Impressive Revenue" },
    { id: 2, name: "Retail and Commercial Real Estate" },
    { id: 3, name: "Current Trends in Holiday Spending" },
  ]);

  return (
    <div className="w-64 bg-white border-r flex flex-col h-full">
      <div className="p-4 border-b">
        <Link href="/" className="text-xl font-semibold text-purple-600">
          Vizly
        </Link>
      </div>
      
      <div className="p-4">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500">
          <PlusIcon className="h-5 w-5" />
          New Chat
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {chats.map((chat) => (
            <a
              key={chat.id}
              href="#"
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100"
            >
              <FolderIcon className="h-5 w-5" />
              {chat.name}
            </a>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t">
        <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 w-full">
          <CogIcon className="h-5 w-5" />
          Settings
        </button>
      </div>
    </div>
  );
}