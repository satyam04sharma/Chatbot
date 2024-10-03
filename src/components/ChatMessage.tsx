import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  type: 'user' | 'bot';
  content: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ type, content }) => (
  <div className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div
      className={`max-w-sm p-3 rounded-lg ${
        type === 'user' ? 'bg-zinc-700 text-zinc-200' : 'bg-zinc-800 text-zinc-300'
      }`}
    >
      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => <p className="mb-2" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2" {...props} />,
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          a: ({ node, ...props }) => <a className="text-blue-400 hover:underline" {...props} />,
          strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
          em: ({ node, ...props }) => <em className="italic" {...props} />,
          code: ({ node, inline, ...props }) => 
            inline ? (
              <code className="bg-zinc-700 px-1 rounded" {...props} />
            ) : (
              <code className="block bg-zinc-700 p-2 rounded my-2 overflow-x-auto" {...props} />
            ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  </div>
);

export default ChatMessage;