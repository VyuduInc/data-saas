'use client';

import { useState } from 'react';
import { FileUpload } from './FileUpload';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

export function ChatInterface() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    try {
      setIsLoading(true);
      // Add user message immediately
      setMessages(prev => [...prev, { role: 'user', content: message }]);

      // Send message to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      
      // Add assistant's response
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Add error message
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error processing your message.' }]);
    } finally {
      setIsLoading(false);
    }
  };

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
          onSend={handleSendMessage}
          disabled={isAnalyzing || isLoading}
        />
      </div>
    </div>
  );
}