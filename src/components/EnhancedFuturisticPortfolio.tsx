"use client"

import React, { useState, useEffect, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import { sendMessageToOpenAI } from '../utils/api'
import { ChatMessage as ChatMessageType } from '../types'
import InitialSearchView from './InitialSearchView'
import ChatView from './chat/ChatView'
import { toast } from 'react-toastify';

/**
 * The EnhancedFuturisticPortfolio component is the main entry point for the
 * Futuristic Portfolio application. It handles the initial search view and
 * the chat view. It also handles the logic for sending messages to the OpenAI
 * API and displaying the responses.
 *
 * @returns The JSX for the EnhancedFuturisticPortfolio component.
 */
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
      if (error instanceof Error && error.message.includes("Rate limit exceeded")) {
        toast.error("Rate limit exceeded. Please try again later.");
      } else {
        setChatMessages(prev => [...prev, { type: 'bot', content: "An error occurred while fetching results." }])
      }
    } finally {
      setIsLoading(false)
      setSearchQuery("")
    }
  }

  const resetToInitialScreen = () => {
    setIsInitialSearch(true)
    setChatMessages([])
    setSearchQuery("")
    setSuggestions([])
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatMessages])

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 to-zinc-900 flex flex-col items-center justify-center p-4 overflow-hidden">
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
            resetToInitialScreen={resetToInitialScreen}
          />
        )}
      </AnimatePresence>
    </div>
  )
}