'use client';

import { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface Chat {
  id: string;
  title: string;
  active: boolean;
  createdAt: string;
}

export function ChatList() {
  const [chats, setChats] = useState<Chat[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await fetch('/api/chats');
      if (response.ok) {
        const data = await response.json();
        setChats(data);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const deleteChat = async (chatId: string) => {
    try {
      const response = await fetch(`/api/chat/${chatId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setChats(chats.filter(chat => chat.id !== chatId));
        if (window.location.pathname.includes(chatId)) {
          router.push('/');
        }
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <Button
            variant="light"
            className="flex-1 justify-start"
            onClick={() => router.push(`/chat/${chat.id}`)}
          >
            {chat.title || 'New Chat'}
          </Button>
          <Button
            isIconOnly
            variant="light"
            onClick={() => deleteChat(chat.id)}
            className="text-gray-500 hover:text-red-500"
          >
            <TrashIcon className="h-5 w-5" />
          </Button>
        </div>
      ))}
    </div>
  );
}
