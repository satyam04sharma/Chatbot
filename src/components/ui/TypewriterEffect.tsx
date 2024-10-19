import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { CodeProps } from 'react-markdown/lib/ast-to-react'; // Adjust the import based on your setup

interface TypewriterEffectProps {
  content: string;
  speed?: number; // Speed in milliseconds
}

/**
 * A TypewriterEffect component for rendering a string with a typewriter effect.
 * It takes a `content` string as a prop and renders it with a typewriter effect at a given `speed` in milliseconds.
 * The effect is achieved by using the `setInterval` function to incrementally update the state of the component.
 * The component also accepts a `components` object as a prop, which allows you to customize the rendering of the string.
 * The `components` object should contain React components that correspond to the Markdown elements (e.g. `p`, `ul`, `ol`, etc.).
 * The default `components` object is exported as `TypewriterEffectComponents`.
 *
 * @param {TypewriterEffectProps} props
 * @prop {string} content - The string to render with the typewriter effect.
 * @prop {number} [speed=15] - The speed of the typewriter effect in milliseconds.
 * @prop {object} [components=TypewriterEffectComponents] - An object containing React components to customize the rendering of the string.
 *
 * @example
 * <TypewriterEffect content="Hello, world!" />
 */
const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ content, speed = 15 }) => { // Decrease the default speed for faster typing
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

  const components = {
    p: ({ node, ...props }) => <p className="mb-2" {...props} />,
    ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2" {...props} />,
    ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2" {...props} />,
    li: ({ node, ordered, ...props }) => (
      <li className="ml-4 list-disc" {...props}>
        {props.children}
      </li>
    ),
    a: ({ node, ...props }) => <a className="text-blue-400 hover:underline" {...props} />,
    strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
    em: ({ node, ...props }) => <em className="italic" {...props} />,
    code: ({ node, inline, ...props }: CodeProps) => 
      inline ? (
        <code className="bg-zinc-700 px-1 rounded" {...props} />
      ) : (
        <code className="block bg-zinc-700 p-2 rounded my-2 overflow-x-auto" {...props} />
      ),
  };

  return (
    <ReactMarkdown
      components={components}
    >
      {displayedContent}
    </ReactMarkdown>
  );
};

export default TypewriterEffect;