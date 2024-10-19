import React from 'react';

/**
 * A simple loader component that displays three small, pulsing dots.
 *
 * This component is used to indicate that some data is being loaded. It
 * should be used in place of a spinner, which can be distracting. The
 * dots are small and unobtrusive, and can be placed anywhere in the
 * app.
 *
 * @example
 * <Loader />
 */
const Loader: React.FC = () => (
  <div className="flex items-center justify-center space-x-2 animate-pulse">
    <div className="w-2 h-2 bg-zinc-400 rounded-full"></div>
    <div className="w-2 h-2 bg-zinc-400 rounded-full"></div>
    <div className="w-2 h-2 bg-zinc-400 rounded-full"></div>
  </div>
);

export default Loader;