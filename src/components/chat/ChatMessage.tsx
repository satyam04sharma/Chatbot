import React from 'react';
import TypewriterEffect from '../ui/TypewriterEffect';

interface ChatMessageProps {
  type: 'user' | 'bot';
  content: string;
}

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