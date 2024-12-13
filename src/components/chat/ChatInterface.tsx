'use client';

import { useState } from 'react';
import { FileUpload } from './FileUpload';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

export function ChatInterface() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <FileUpload onAnalyzing={setIsAnalyzing} />
        ) : (
          messages.map((message, index) => (
            <ChatMessage key={index} role={message.role} content={message.content} />
          ))
        )}
      </div>
      <div className="border-t p-4">
        <ChatInput 
          onSend={(message) => setMessages([...messages, { role: 'user', content: message }])}
          disabled={isAnalyzing}
        />
      </div>
    </div>
  );
}