import { useSearch } from '@/hooks/useSearch';
import { Message } from '@prisma/client';

interface SearchResultProps {
  message: Message & {
    user: {
      id: string;
      name: string | null;
      image: string | null;
    };
  };
  query: string;
}

const SearchResult = ({ message, query }: SearchResultProps) => {
  const highlightText = (text: string) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-yellow-200">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="p-4 hover:bg-gray-50 cursor-pointer">
      <div className="flex items-center gap-2 mb-1">
        {message.user.image ? (
          <img
            src={message.user.image}
            alt={message.user.name || 'User'}
            className="w-6 h-6 rounded-full"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm">
            {message.user.name?.[0] || '?'}
          </div>
        )}
        <span className="font-medium text-sm">{message.user.name}</span>
        <span className="text-xs text-gray-500">
          {new Date(message.createdAt).toLocaleString()}
        </span>
      </div>
      <div className="pl-8">
        {message.type === 'text' && (
          <p className="text-gray-700">{highlightText(message.content)}</p>
        )}
        {message.type === 'code' && (
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
            <code>{highlightText(message.content)}</code>
          </pre>
        )}
        {message.type === 'image' && (
          <div className="mt-1">
            <img
              src={message.content}
              alt="Message attachment"
              className="max-w-xs rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
};

interface ChatSearchProps {
  chatId: string;
  onResultClick?: (messageId: string) => void;
}

export const ChatSearch = ({ chatId, onResultClick }: ChatSearchProps) => {
  const {
    query,
    results,
    isSearching,
    error,
    filters,
    setQuery,
    setFilter,
  } = useSearch();

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search messages..."
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-4 mt-2">
          <select
            value={filters.type}
            onChange={(e) => setFilter('type', e.target.value)}
            className="px-2 py-1 border rounded text-sm"
          >
            <option value="all">All Types</option>
            <option value="text">Text</option>
            <option value="code">Code</option>
            <option value="image">Images</option>
          </select>
          <select
            value={filters.dateRange}
            onChange={(e) => setFilter('dateRange', e.target.value)}
            className="px-2 py-1 border rounded text-sm"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isSearching ? (
          <div className="flex items-center justify-center h-32">
            <div className="loader" />
          </div>
        ) : error ? (
          <div className="p-4 text-red-500 text-center">{error}</div>
        ) : results.length === 0 ? (
          <div className="p-4 text-gray-500 text-center">
            {query ? 'No messages found' : 'Enter a search term to begin'}
          </div>
        ) : (
          results.map((message) => (
            <div
              key={message.id}
              onClick={() => onResultClick?.(message.id)}
              className="border-b last:border-b-0"
            >
              <SearchResult message={message} query={query} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
