import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; // Import arrow icons

interface SuggestedQuestionsProps {
  suggestions: string[];
  handleSearch: (query?: string) => void;
}

  /**
   * SuggestedQuestions component renders a list of suggested questions that the user can ask
   * The list is initially open and can be toggled by clicking on the button
   * Each suggested question is a button that when clicked will call the handleSearch function
   * with the question as the argument
   *
   * @param {{ suggestions: string[]; handleSearch: (query?: string) => void; }}
   * @returns {React.ReactElement}
   */
const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ suggestions, handleSearch }) => {
  const [isOpen, setIsOpen] = useState(true); // Default opened

  const toggleSuggestions = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4 px-4">
      <button
        onClick={toggleSuggestions}
        className="flex items-center text-zinc-400 hover:text-zinc-200 transition-colors duration-200"
        aria-label={isOpen ? "Hide suggested questions" : "Show suggested questions"}
      >
        {isOpen ?<ChevronDown className="mr-2" /> : <ChevronUp className="mr-2" /> } {/* Arrow icon */}
        {isOpen ? "Hide Suggested Questions" : "Show Suggested Questions"}
      </button>
      {isOpen && (
        <div className="flex flex-col space-y-2 mt-2">
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
      )}
    </div>
  );
};

export default SuggestedQuestions;