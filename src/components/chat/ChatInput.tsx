import React, { useState } from 'react'; // Added useState for managing input validity
import { Search, Send } from "lucide-react";
import DOMPurify from 'dompurify'; // Import DOMPurify

interface ChatInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  isLoading: boolean;
  suggestions: string[];
}

/**
 * A ChatInput component for the chat interface. It handles user input and shows a warning message if the input exceeds 300 words.
 *
 * @param {string} searchQuery The current search query input by the user.
 * @param {function} setSearchQuery A function to update the search query state.
 * @param {function} handleSearch A function to handle the search query.
 * @param {boolean} isLoading A boolean indicating if the component is currently loading.
 * @param {string[]} suggestions An array of suggested search queries.
 *
 * @returns A JSX element representing the chat input component.
 */
const ChatInput: React.FC<ChatInputProps> = ({ searchQuery, setSearchQuery, handleSearch, isLoading, suggestions }) => {
    const [isInvalid, setIsInvalid] = useState(false); // State to track input validity
    const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

    const wordCount = searchQuery.trim().split(/\s+/).length; // Count words

    /**
     * Sanitizes a given input string to prevent XSS attacks and
     * strip out dangerous protocols from URLs.
     *
     * @param {string} input The input string to be sanitized.
     *
     * @returns {string} The sanitized input string.
     */
    const sanitizeInput = (input: string) => {
        // Sanitize input to prevent XSS
        const sanitizedInput = DOMPurify.sanitize(input);
        // Strip dangerous protocols from URLs
        return sanitizedInput.replace(/(javascript:|data:|vbscript:)/gi, '');
    };

    /**
     * Handles the keydown event of the chat input. If the Enter key is pressed,
     * it checks if the input is valid and not empty. If the input word count
     * exceeds 300, it shows a warning message to the user. If the input is valid,
     * it hides the warning message and fires the handleSearch function.
     *
     * @param {React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>} e The event object.
     */
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

    /**
     * Handles the change event of the chat input. It sanitizes the input to prevent XSS
     * and strips out dangerous protocols from URLs. It also updates the invalid state and
     * shows or hides the popup message based on the word count.
     *
     * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} e The event object.
     */
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const userInput = e.target.value;
        const cleanedInput = sanitizeInput(userInput); // Sanitize user input
        setSearchQuery(cleanedInput);
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
