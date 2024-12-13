import { ChatInterface } from '@/components/chat/ChatInterface';
import { Sidebar } from '@/components/chat/Sidebar';

export default function ChatPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <ChatInterface />
      </main>
    </div>
  );
}