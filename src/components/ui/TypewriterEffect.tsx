import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface TypewriterEffectProps {
  content: string;
  speed?: number;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ content, speed = 30 }) => {
  const [displayedContent, setDisplayedContent] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < content.length) {
        setDisplayedContent(prev => prev + content.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [content, speed]);

  return (
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
      {displayedContent}
    </ReactMarkdown>
  );
};

export default TypewriterEffect;