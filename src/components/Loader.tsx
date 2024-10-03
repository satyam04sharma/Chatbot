import React from 'react';

const Loader: React.FC = () => (
  <div className="flex items-center justify-center space-x-2 animate-pulse">
    <div className="w-2 h-2 bg-zinc-400 rounded-full"></div>
    <div className="w-2 h-2 bg-zinc-400 rounded-full"></div>
    <div className="w-2 h-2 bg-zinc-400 rounded-full"></div>
  </div>
);

export default Loader;