'use client';

import { useState } from 'react';
import { FileUpload } from './FileUpload';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  type?: 'text' | 'plot';
  plotData?: any;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(true);

  const handleSendMessage = async (message: string) => {
    try {
      setIsLoading(true);
      // Add user message immediately
      setMessages(prev => [...prev, { role: 'user', content: message }]);
      setShowFileUpload(false);

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

      // If the response includes a plot, add it as a separate message
      if (data.plot) {
        setMessages(prev => [...prev, { role: 'assistant', type: 'plot', content: '', plotData: data.plot }]);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error processing your message.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileAnalysis = async (analysisResult: any) => {
    setMessages([
      { 
        role: 'assistant', 
        content: 'I\'ve analyzed your file. What would you like to know about it?' 
      }
    ]);
    setShowFileUpload(false);
  };

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-semibold">Vaydr</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm text-gray-600">Connected</span>
            </span>
            <select className="bg-white border rounded px-2 py-1 text-sm">
              <option>GPT-4o</option>
            </select>
            <select className="bg-white border rounded px-2 py-1 text-sm">
              <option>Python</option>
            </select>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-md">
            <Cog6ToothIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {showFileUpload && messages.length === 0 ? (
          <>
            <div className="flex justify-center space-x-4 mb-4">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-b-2 border-purple-600">
                Getting started
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                Examples
              </button>
            </div>
            <h2 className="text-2xl font-semibold text-center mb-4">
              What would you like to analyze?
            </h2>
            <FileUpload onAnalyzing={setIsAnalyzing} onAnalysisComplete={handleFileAnalysis} />
          </>
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))}
            {isLoading && (
              <div className="flex justify-center">
                <div className="animate-pulse text-gray-500">Processing...</div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <ChatInput 
          onSend={handleSendMessage}
          disabled={isAnalyzing || isLoading}
          placeholder={
            messages.length === 0 
              ? "I would like to..." 
              : "Ask a question about your data..."
          }
        />
        {!showFileUpload && (
          <div className="mt-2 flex justify-center">
            <button
              onClick={() => setShowFileUpload(true)}
              className="text-sm text-purple-600 hover:underline"
            >
              Upload another file
            </button>
          </div>
        )}
      </div>
    </div>
  );
}