import { Card, Image, Spinner } from '@nextui-org/react';
import { DocumentIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  type?: 'text' | 'plot';
  plotData?: any;
  files?: string[];
}

export function ChatMessage({ role, content, type, plotData, files }: ChatMessageProps) {
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (url: string) => {
    setLoadingImages(prev => ({ ...prev, [url]: false }));
  };

  const handleImageError = (url: string) => {
    setLoadingImages(prev => ({ ...prev, [url]: false }));
  };

  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  };

  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <Card 
        className={`max-w-3xl px-4 py-2 ${
          role === 'user'
            ? 'bg-purple-600 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{content}</p>
        
        {files && files.length > 0 && (
          <div className="mt-2 space-y-2">
            {files.map((url, index) => (
              <div key={index} className="flex items-center gap-2">
                {isImage(url) ? (
                  <div className="relative">
                    {loadingImages[url] && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Spinner size="sm" />
                      </div>
                    )}
                    <Image
                      src={url}
                      alt="Uploaded image"
                      className="max-w-sm rounded"
                      onLoad={() => handleImageLoad(url)}
                      onError={() => handleImageError(url)}
                    />
                  </div>
                ) : (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600"
                  >
                    <DocumentIcon className="h-4 w-4" />
                    {url.split('/').pop()}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}