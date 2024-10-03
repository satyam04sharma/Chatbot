import React from 'react';
import { Search, Send } from "lucide-react";

interface ChatInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  isLoading: boolean;
  suggestions: string[];
}

const ChatInput: React.FC<ChatInputProps> = ({ searchQuery, setSearchQuery, handleSearch, isLoading, suggestions }) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim() && !isLoading) {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-3xl relative">
      <input
        type="text"
        id="chat-input"
        name="chat-input"
        placeholder="Continue the conversation..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className="w-full py-3 pl-12 pr-4 text-zinc-300 bg-zinc-800 border-2 border-zinc-600 rounded-full focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-400 focus:ring-opacity-50 transition-all duration-300 ease-in-out placeholder-zinc-500"
        disabled={isLoading}
      />
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400" aria-hidden="true" />
      <button
        onClick={handleSearch}
        className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 rounded-full p-2 transition-all duration-300 ease-in-out ${
          !searchQuery.trim() || isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={!searchQuery.trim() || isLoading}
        aria-label="Send message"
        title="Send message"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
};

export default ChatInput;