"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 10) + 1;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => setLoading(false), 500); // Wait a bit before fading out
      }
      setProgress(currentProgress);
    }, 150); // Speed of the loading bar

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black bg-noise"
        >
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-12 relative"
          >
            <div className="absolute inset-0 blur-3xl bg-neon-purple opacity-30 rounded-full w-40 h-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-widest text-glow uppercase z-10 relative">
              Apex
            </h1>
            <p className="text-neon-cyan tracking-[0.5em] text-center text-sm md:text-base mt-2 z-10 relative">
              Leaderboard
            </p>
          </motion.div>

          {/* Progress Container */}
          <div className="w-64 md:w-96 flex flex-col items-center">
            <div className="flex justify-between w-full mb-3 text-sm font-mono text-gray-400">
              <span>SYSTEM_INITIALIZING</span>
              <span className="text-neon-cyan">{progress}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.8)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>

             {/* Particles below progress bar */}
            <motion.div
               className="mt-4 flex space-x-2"
               initial={{opacity: 0}}
               animate={{opacity: progress > 50 ? 1 : 0}}
            >
               {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 bg-neon-gold rounded-full"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
               ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
