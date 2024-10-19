import React from 'react';
import { motion } from "framer-motion";
import { X } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../../types';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import Loader from '../ui/Loader';
import SuggestedQuestions from './SuggestedQuestions'; // Import the new component

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

/**
 * ChatView component
 * 
 * This component renders the chat view with the given chat messages, 
 * loading state, and search query. It also handles the search functionality 
 * and resetting the chat to the initial screen.
 * 
 * The chat view is a motion.div that animates from 0 opacity to 1 opacity when 
 * mounted. It contains a button to close the chat and return to the initial 
 * screen, a div with a flex-grow class to take up the rest of the available space, 
 * and a sticky footer with a chat input and suggested questions.
 * 
 * The chat messages are rendered as a list of ChatMessage components inside the 
 * flex-grow div. If the chat is loading, a loader is rendered instead.
 * 
 * The suggested questions are rendered as a SuggestedQuestions component below the
 * chat messages.
 * 
 * @param {ChatMessageType[]} chatMessages - The chat messages to render
 * @param {boolean} isLoading - Whether the chat is currently loading
 * @param {React.RefObject<HTMLDivElement>} chatContainerRef - The ref to the chat container
 * @param {string} searchQuery - The current search query
 * @param {(query: string) => void} setSearchQuery - The function to set the search query
 * @param {() => void} handleSearch - The function to handle the search
 * @param {string[]} suggestions - The suggested questions
 * @param {() => void} resetToInitialScreen - The function to reset the chat to the initial screen
 */
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
        <SuggestedQuestions 
          suggestions={suggestions} 
          handleSearch={handleSearch} 
        />
        <div className="sticky bottom-0 z-20 w-full bg-gray-900 py-4">
          <div className="max-w-3xl mx-auto px-4">
            <ChatInput 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              handleSearch={() => handleSearch()}
              isLoading={isLoading}
              suggestions={[]} // No need to pass suggestions here
            />
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default ChatView;