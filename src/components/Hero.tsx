"use client";

import { motion } from "framer-motion";
import Trophy3D from "./3D/Trophy";
import { ArrowRight, Trophy } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col items-start space-y-6"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border-neon-cyan/30">
             <Trophy className="w-4 h-4 text-neon-gold" />
             <span className="text-sm font-medium text-neon-cyan tracking-wider uppercase">Season 4 is Live</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter">
            <span className="block text-white">THE ULTIMATE</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple text-glow">
              TOP SPENDER
            </span>
            <span className="block text-white">LEADERBOARD</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed">
            Ascend the ranks in our exclusive digital arena. Compete globally, showcase your status, and unlock legendary rewards in the most premium event of the year.
          </p>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
            <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden w-full sm:w-auto">
              <span className="relative z-10 flex items-center justify-center">
                View Ranking
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-neon-cyan transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out z-0"></div>
            </button>

            <button className="px-8 py-4 rounded-full glass text-white font-medium hover:bg-white/10 transition-colors border border-white/20 w-full sm:w-auto">
              Join Event
            </button>
          </div>

          <div className="flex items-center space-x-8 pt-8 border-t border-white/10 w-full">
             <div>
                <p className="text-3xl font-bold text-white">124K+</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Participants</p>
             </div>
             <div>
                <p className="text-3xl font-bold text-neon-gold">$5M+</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Reward Pool</p>
             </div>
          </div>
        </motion.div>

        {/* 3D Holographic Trophy */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="relative w-full h-[50vh] lg:h-full flex items-center justify-center"
        >
          {/* Ambient Glow behind trophy */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon-cyan/20 rounded-full blur-[100px]"></div>
          <Trophy3D />
        </motion.div>

      </div>
    </section>
  );
}
