"use client";

import LeaderboardCard from "./ui/LeaderboardCard";
import { motion } from "framer-motion";

const leaderboardData = [
  { rank: 4, username: "GhostProtocol", avatar: "https://i.pravatar.cc/150?u=1", country: "🇩🇪", level: 99, spending: "$245,100", progress: 85, trend: "up" as const },
  { rank: 5, username: "ShadowBroker", avatar: "https://i.pravatar.cc/150?u=2", country: "🇨🇦", level: 92, spending: "$198,050", progress: 75, trend: "down" as const },
  { rank: 6, username: "PixelPioneer", avatar: "https://i.pravatar.cc/150?u=3", country: "🇦🇺", level: 88, spending: "$176,400", progress: 70, trend: "up" as const },
  { rank: 7, username: "VoidWalker", avatar: "https://i.pravatar.cc/150?u=4", country: "🇫🇷", level: 85, spending: "$152,900", progress: 60, trend: "same" as const },
  { rank: 8, username: "NeonSamurai", avatar: "https://i.pravatar.cc/150?u=5", country: "🇯🇵", level: 81, spending: "$140,200", progress: 55, trend: "up" as const },
  { rank: 9, username: "CryptoKing", avatar: "https://i.pravatar.cc/150?u=6", country: "🇧🇷", level: 79, spending: "$125,000", progress: 45, trend: "down" as const },
  { rank: 10, username: "StarGazer", avatar: "https://i.pravatar.cc/150?u=7", country: "🇮🇳", level: 75, spending: "$110,500", progress: 40, trend: "same" as const },
];

export default function Leaderboard() {
  return (
    <section className="py-20 relative z-10">
      <div className="max-w-4xl mx-auto px-6">

        <div className="flex items-center justify-between mb-10">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold uppercase tracking-widest text-white flex items-center space-x-2"
          >
            <span className="w-2 h-8 bg-neon-cyan inline-block rounded-sm"></span>
            <span>Global Top 10</span>
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass px-4 py-2 rounded-lg text-sm text-gray-400"
          >
            Live Updates <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse ml-2"></span>
          </motion.div>
        </div>

        <div className="flex flex-col">
          {leaderboardData.map((user) => (
            <LeaderboardCard key={user.rank} {...user} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <button className="px-8 py-3 rounded-full border border-white/20 glass text-white hover:bg-white/10 transition-colors cursor-none group">
            <span className="group-hover:text-neon-cyan transition-colors">View Full Ranking</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
