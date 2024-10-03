import React from 'react';
import { motion } from "framer-motion";

const RadiatingParticles: React.FC = () => (
  <div className="fixed inset-0 z-[-1] pointer-events-none">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-zinc-400 rounded-full"
        initial={{
          x: "50%",
          y: "50%",
          scale: 0,
          opacity: 1,
        }}
        animate={{
          x: `${50 + (Math.random() - 0.5) * 150}%`,
          y: `${50 + (Math.random() - 0.5) * 150}%`,
          scale: [0, 1.5, 0],
          opacity: [1, 0.8, 0],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
    ))}
  </div>
);

export default RadiatingParticles;