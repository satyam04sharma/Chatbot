"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TypeAnimation } from 'react-type-animation'
import { sendMessageToOpenAI } from '../utils/api'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import RadiatingParticles from './RadiatingParticles'
import Loader from './Loader'
import { X } from 'lucide-react'  // Import the X icon
import { ChatMessage as ChatMessageType } from '../types'

export default function EnhancedFuturisticPortfolio() {
  const [searchQuery, setSearchQuery] = useState("")
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([])
  const [isInitialSearch, setIsInitialSearch] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const handleSearch = async (query: string = searchQuery) => {
    if (!query.trim() || isLoading) return

    setIsLoading(true)
    setChatMessages(prev => [...prev, { type: 'user', content: query }])
    setIsInitialSearch(false)

    try {
      const { candidateResponse, suggestions } = await sendMessageToOpenAI(query, chatMessages)
      setChatMessages(prev => [...prev, { type: 'bot', content: candidateResponse }])
      setSuggestions(suggestions)
    } catch (error) {
      console.error("Error fetching search results:", error)
      setChatMessages(prev => [...prev, { type: 'bot', content: "An error occurred while fetching results." }])
    } finally {
      setIsLoading(false)
      setSearchQuery("")
    }
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatMessages])

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 to-zinc-900 flex flex-col items-center justify-center p-4 overflow-hidden">
      <RadiatingParticles />
      <AnimatePresence>
        {isInitialSearch ? (
          <InitialSearchView 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            handleSearch={handleSearch}
            isLoading={isLoading}
            suggestions={suggestions}
          />
        ) : (
          <ChatView 
            chatMessages={chatMessages} 
            isLoading={isLoading} 
            chatContainerRef={chatContainerRef}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            suggestions={suggestions}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

interface InitialSearchViewProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (query: string) => void;
  isLoading: boolean;
  suggestions: string[];
}

const InitialSearchView: React.FC<InitialSearchViewProps> = ({ searchQuery, setSearchQuery, handleSearch, isLoading, suggestions }) => {
  const [showPrompt, setShowPrompt] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null)
  const initialSuggestions = [
    "How proficient are you with Python?",
    "Tell me your experience in frontend development?",
    "What is your educational background?"
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    setSelectedSuggestion(suggestion)
    setShowPrompt(true)
    handleSearch(suggestion)  // This line was missing
  };

  return (
    <motion.div
      className="w-full max-w-md flex flex-col items-center relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-zinc-300 mb-8 h-20 z-10">
        <TypeAnimation
          sequence={[
            'Satyam GPT',
            2000,
            '',
            500,
            'Portfolio GPT',
            2000,
            '',
            500,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </h1>
      <div className="relative w-full z-20">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-zinc-600 to-zinc-400 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <ChatInput 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          handleSearch={() => {
            handleSearch(searchQuery)
            setSelectedSuggestion(null)
            setShowPrompt(false)
          }} 
          isLoading={isLoading}
          suggestions={suggestions}
        />
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-0 right-0 text-center mt-2 text-zinc-300 text-sm"
          >
            <span className="hidden md:inline">Press Enter to send</span>
            <span className="md:hidden">Click send button to continue</span>
          </motion.div>
        )}
      </div>
      <div className="mt-8 w-full mb-6">
        <p className="text-zinc-400 mb-2 text-sm">Try asking:</p>
        <div className="flex flex-col space-y-2">
          {initialSuggestions.map((suggestion, index) => (
            <button
              key={index}
              className={`px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 rounded-lg transition-colors duration-200 text-sm text-left cursor-pointer ${
                selectedSuggestion && suggestion !== selectedSuggestion ? 'opacity-50 pointer-events-none' : ''
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
              aria-label={`Ask: ${suggestion}`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
      <motion.p
        className="text-zinc-400 text-center mt-4 max-w-md z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <span className="font-bold text-zinc-300">Unlock the power of AI-driven career matching!</span> Curious about Satyam Sharma's fit for your role? Wondering about his resume match percentage? 
        <span className="italic"> Simply ask, and watch as the future of recruitment unfolds before your eyes.</span> 
        <span className="block mt-2 text-zinc-500">🚀 Welcome to the next generation of talent discovery.</span>
      </motion.p>
    </motion.div>
  );
};

interface ChatViewProps {
  chatMessages: ChatMessageType[];
  isLoading: boolean;
  chatContainerRef: React.RefObject<HTMLDivElement>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (query?: string) => void;
  suggestions: string[];
}

const ChatView: React.FC<ChatViewProps> = ({ chatMessages, isLoading, chatContainerRef, searchQuery, setSearchQuery, handleSearch, suggestions }) => (
  <motion.div 
    className="flex flex-col h-full w-full max-w-3xl mx-auto relative"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <button
      onClick={() => window.location.reload()}  // This will refresh the page, returning to the initial screen
      className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-200 transition-colors duration-200"
      aria-label="Close chat and return to initial screen"
    >
      <X size={24} />
    </button>
    <div
      ref={chatContainerRef}
      className="flex-grow overflow-y-auto mb-4 space-y-4 p-4 mt-12"  // Added mt-12 to account for the close button
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
    <div className="sticky bottom-0 z-20 w-full p-4 bg-gray-900">
      <ChatInput 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        handleSearch={() => handleSearch()}
        isLoading={isLoading}
        suggestions={[]}
      />
    </div>
  </motion.div>
)