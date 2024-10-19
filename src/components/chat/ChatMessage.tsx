import React from 'react';
import TypewriterEffect from '../ui/TypewriterEffect';

interface ChatMessageProps {
  type: 'user' | 'bot';
  content: string;
}

/**
 * A component to render a chat message in the chat window.
 * If the message is from the user, it will be rendered directly.
 * If the message is from the bot, it will be rendered with a typewriter effect.
 *
 * @param {ChatMessageProps} props
 * @prop {string} type - The type of the message, either 'user' or 'bot'.
 * @prop {string} content - The content of the message.
 * @returns {React.ReactElement} A JSX element representing the chat message.
 */
const ChatMessage: React.FC<ChatMessageProps> = ({ type, content }) => (
  <div className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div
      className={`max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl p-3 rounded-lg ${
        type === 'user' ? 'bg-zinc-700 text-zinc-200' : 'bg-zinc-800 text-zinc-300'
      }`}
    >
      {type === 'user' ? content : <TypewriterEffect content={content} />}
    </div>
  </div>
);

export default ChatMessage;