import React, { useState } from 'react'; // Added useState for managing input validity
import { Search, Send } from "lucide-react";

interface ChatInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  isLoading: boolean;
  suggestions: string[];
}

const ChatInput: React.FC<ChatInputProps> = ({ searchQuery, setSearchQuery, handleSearch, isLoading, suggestions }) => {
    const [isInvalid, setIsInvalid] = useState(false); // State to track input validity
    const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

    const wordCount = searchQuery.trim().split(/\s+/).length; // Count words

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (e.key === 'Enter' && searchQuery.trim() && !isLoading) {
            if (wordCount > 300) {
                setIsInvalid(true); // Set invalid state if word count exceeds 300
                setShowPopup(true); // Show popup message
            } else {
                setIsInvalid(false);
                setShowPopup(false); // Hide popup message
                handleSearch();
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        if (wordCount > 300) {
            setIsInvalid(true); // Update invalid state based on word count
            setShowPopup(true); // Show popup message
        } else {
            setIsInvalid(false); // Reset invalid state
            setShowPopup(false); // Hide popup message
        }
    };

    return (
        <div className="w-full max-w-3xl relative">
            {wordCount > 20 ? ( // Render textarea if word count exceeds 20
                <textarea
                    id="chat-input"
                    name="chat-input"
                    placeholder="Continue the conversation..."
                    value={searchQuery}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className={`w-full py-3 pl-12 pr-4 text-zinc-300 bg-zinc-800 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ease-in-out placeholder-zinc-500 ${isInvalid ? 'border-red-500' : 'border-zinc-600'}`}
                    disabled={isLoading}
                    rows={4} // Set rows for textarea
                />
            ) : (
                <input
                    type="text"
                    id="chat-input"
                    name="chat-input"
                    placeholder="Continue the conversation..."
                    value={searchQuery}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className={`w-full py-3 pl-12 pr-4 text-zinc-300 bg-zinc-800 border-2 rounded-full focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-400 focus:ring-opacity-50 transition-all duration-300 ease-in-out placeholder-zinc-500 ${isInvalid ? 'border-red-500' : 'border-zinc-600'}`}
                    disabled={isLoading}
                />
            )}
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400" aria-hidden="true" />
            <button
                onClick={handleSearch}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 rounded-full p-2 transition-all duration-300 ease-in-out ${
                    isInvalid || !searchQuery.trim() || isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isInvalid || !searchQuery.trim() || isLoading}
                aria-label="Send message"
                title="Send message"
            >
                <Send className="h-4 w-4" aria-hidden="true" />
            </button>
            {showPopup && ( // Display popup message if input exceeds 300 words
                <div className="absolute top-full mt-2 bg-red-500 text-white text-sm rounded p-2">
                    Input should be less than 300 words.
                </div>
            )}
            {wordCount > 20 && ( // Show word count only if greater than 20
                <div className="absolute bottom-0 right-0 text-zinc-400 text-sm">
                    {wordCount}/300
                </div>
            )}
        </div>
    );
};

export default ChatInput;