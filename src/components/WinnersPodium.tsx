"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Crown, Hexagon } from "lucide-react";

type Winner = {
  rank: 1 | 2 | 3;
  username: string;
  avatar: string;
  spending: string;
  country: string;
  badge: string;
};

const winners: Winner[] = [
  {
    rank: 2,
    username: "NeonNinja",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    spending: "$420,500",
    country: "🇯🇵",
    badge: "Platinum",
  },
  {
    rank: 1,
    username: "CyberQueen",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    spending: "$850,000",
    country: "🇺🇸",
    badge: "Diamond",
  },
  {
    rank: 3,
    username: "ZeroCool",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    spending: "$310,200",
    country: "🇬🇧",
    badge: "Gold",
  },
];

const rankStyles = {
  1: {
    height: "h-64",
    color: "from-neon-gold via-yellow-600 to-yellow-900",
    glow: "shadow-[0_0_30px_rgba(255,215,0,0.4)]",
    border: "border-neon-gold",
    text: "text-neon-gold",
    delay: 0.2,
    scale: 1.1,
  },
  2: {
    height: "h-48",
    color: "from-gray-300 via-gray-500 to-gray-700",
    glow: "shadow-[0_0_20px_rgba(200,200,200,0.3)]",
    border: "border-gray-300",
    text: "text-gray-300",
    delay: 0.4,
    scale: 1,
  },
  3: {
    height: "h-40",
    color: "from-orange-400 via-orange-600 to-orange-800",
    glow: "shadow-[0_0_20px_rgba(217,119,6,0.3)]",
    border: "border-orange-400",
    text: "text-orange-400",
    delay: 0.6,
    scale: 0.95,
  },
};

export default function WinnersPodium() {
  return (
    <section className="py-24 relative overflow-hidden" id="leaderboard">
      <div className="max-w-5xl mx-auto px-6 relative z-10">

        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-gold to-white">Legends</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            The elite tier. Only the most dedicated make it to the podium.
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row items-end justify-center space-y-8 md:space-y-0 md:space-x-4 mt-20">
          {winners.map((winner) => {
            const style = rankStyles[winner.rank];
            return (
              <motion.div
                key={winner.rank}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: style.delay, ease: "easeOut" }}
                className={cn(
                  "relative flex flex-col items-center w-full md:w-1/3",
                  winner.rank === 1 ? "order-first md:order-none z-10" : "z-0"
                )}
                style={{ scale: style.scale }}
              >
                {/* Avatar & Info */}
                <motion.div
                  className="flex flex-col items-center mb-6 relative"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: winner.rank * 0.5 }}
                >
                  {winner.rank === 1 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1, type: "spring" }}
                      className="absolute -top-12 text-neon-gold"
                    >
                      <Crown className="w-10 h-10 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
                    </motion.div>
                  )}

                  <div className={cn("relative rounded-full p-1 border-2 bg-black", style.border, style.glow)}>
                    <img
                      src={winner.avatar}
                      alt={winner.username}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-3 -right-2 bg-black border border-white/20 px-2 py-1 rounded text-xs">
                      {winner.country}
                    </div>
                  </div>

                  <div className="text-center mt-4 glass px-4 py-2 rounded-xl">
                    <h3 className="font-bold text-lg text-white">{winner.username}</h3>
                    <div className="flex items-center justify-center space-x-1 mt-1">
                      <Hexagon className={cn("w-3 h-3", style.text, "fill-current")} />
                      <span className={cn("text-xs font-medium uppercase tracking-wider", style.text)}>
                        {winner.badge}
                      </span>
                    </div>
                    <p className="text-xl font-mono font-bold text-white mt-2">{winner.spending}</p>
                  </div>
                </motion.div>

                {/* Podium Block */}
                <div className="w-full relative group perspective-1000">
                  <div className={cn(
                    "w-full rounded-t-xl transition-all duration-500 bg-gradient-to-b relative overflow-hidden",
                    style.height,
                    style.color
                  )}>
                    {/* Inner glowing edge */}
                    <div className="absolute inset-0 border-t-2 border-white/40 rounded-t-xl"></div>
                    {/* Glass reflection */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-black text-black/20 mix-blend-overlay">
                        {winner.rank}
                      </span>
                    </div>
                  </div>

                  {/* Base reflection shadow */}
                  <div className="h-4 w-full bg-black/50 rounded-[100%] blur-md mt-2"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
