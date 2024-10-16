import React from 'react'
import { motion } from "framer-motion"
import { TypeAnimation } from 'react-type-animation'
import ChatInput from './chat/ChatInput'

interface InitialSearchViewProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (query?: string) => void;
  isLoading: boolean;
  suggestions: string[];
}

const InitialSearchView: React.FC<InitialSearchViewProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  isLoading,
  suggestions
}) => {
  const initialSuggestions = [
    "How proficient are you with Python?",
    "Tell me your experience in frontend development?",
    "What is your educational background?"
  ];

  return (
    <motion.div
      className="w-full max-w-md flex flex-col items-center relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-zinc-300 mb-8 h-20">
        <TypeAnimation
          sequence={[
            'Satyam GPT',
            2000,
            '',
            500,
            'Recruiter\'s Assistant',
            2000,
            '',
            500,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </h2>
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
          handleSearch={() => handleSearch(searchQuery)}
          isLoading={isLoading}
          suggestions={suggestions}
        />
      </div>
      <div className="mt-8 w-full mb-6">
        <p className="text-zinc-400 mb-2 text-sm">Try asking:</p>
        <div className="flex flex-col space-y-2">
          {initialSuggestions.map((suggestion, index) => (
            <button
              key={index}
              className="px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 rounded-lg transition-colors duration-200 text-sm text-left"
              onClick={() => {
                setSearchQuery(suggestion);
                handleSearch(suggestion);
              }}
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
        <span className="font-bold text-zinc-300">Unlock the power of AI-driven career matching!</span> Curious about Satyam Sharma&apos;s fit for your role? Wondering about his resume match percentage? 
        <span className="italic"> Simply ask, and watch as the future of recruitment unfolds before your eyes.</span> 
        <span className="block mt-2 text-zinc-500">🚀 Welcome to the next generation of talent discovery.</span>
      </motion.p>
    </motion.div>
  )
}

export default InitialSearchView