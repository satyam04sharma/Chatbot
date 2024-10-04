import React from 'react'
import { motion } from "framer-motion"
import { X } from 'lucide-react'
import { ChatMessage as ChatMessageType } from '../../types'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import Loader from '../ui/Loader'

interface ChatViewProps {
  chatMessages: ChatMessageType[];
  isLoading: boolean;
  chatContainerRef: React.RefObject<HTMLDivElement>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (query?: string) => void;
  suggestions: string[];
  resetToInitialScreen: () => void;
}

const ChatView: React.FC<ChatViewProps> = ({ 
  chatMessages, 
  isLoading, 
  chatContainerRef, 
  searchQuery, 
  setSearchQuery, 
  handleSearch, 
  suggestions,
  resetToInitialScreen
}) => (
  <motion.div 
    className="flex flex-col h-full w-full max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto relative"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <button
      onClick={resetToInitialScreen}
      className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-200 transition-colors duration-200"
      aria-label="Close chat and return to initial screen"
    >
      <X size={24} />
    </button>
    <div className="flex flex-col h-full">
      <div
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto mb-4 space-y-4 p-4 mt-12"
      >
        {chatMessages.map((message, index) => (
          <ChatMessage key={index} type={message.type} content={message.content} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-sm p-3 rounded-lg bg-zinc-800 text-zinc-300 flex items-center space-x-2">
              <span>Thinking</span>
              <Loader />
            </div>
          </div>
        )}
      </div>
      <div className="mt-auto">
        {!isLoading && suggestions.length > 0 && (
          <div className="mb-4 px-4">
            <p className="text-zinc-400 mb-2 text-sm">Ask me about...</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 rounded-lg transition-colors duration-200 text-sm"
                  onClick={() => handleSearch(suggestion)}
                  aria-label={`Ask: ${suggestion}`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="sticky bottom-0 z-20 w-full bg-gray-900 py-4">
          <div className="max-w-3xl mx-auto px-4">
            <ChatInput 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              handleSearch={() => handleSearch()}
              isLoading={isLoading}
              suggestions={[]}
            />
          </div>
        </div>
      </div>
    </div>
  </motion.div>
)

export default ChatView