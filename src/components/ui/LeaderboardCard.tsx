"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Hexagon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface LeaderboardCardProps {
  rank: number;
  username: string;
  avatar: string;
  country: string;
  level: number;
  spending: string;
  progress: number;
  trend: "up" | "down" | "same";
}

export default function LeaderboardCard({
  rank,
  username,
  avatar,
  country,
  level,
  spending,
  progress,
  trend,
}: LeaderboardCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -5;
    const rotateYValue = ((x - centerX) / centerX) * 5;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: rank * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      className="relative group w-full mb-4 cursor-none"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 to-neon-cyan/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

      <div className="relative z-10 glass rounded-2xl p-4 flex items-center justify-between border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden bg-black/40">

        {/* Animated border line on hover */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-purple to-neon-cyan transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>

        <div className="flex items-center space-x-4 md:space-x-6 w-full md:w-auto">
          {/* Rank */}
          <div className="w-8 md:w-12 text-center">
            <span className={cn(
              "text-xl md:text-2xl font-black font-mono",
              rank <= 3 ? "text-transparent bg-clip-text bg-gradient-to-r from-neon-gold to-yellow-500" : "text-gray-500"
            )}>
              #{rank}
            </span>
          </div>

          {/* Trend Indicator */}
          <div className="hidden sm:flex items-center justify-center w-6">
            {trend === "up" && <TrendingUp className="w-4 h-4 text-green-400" />}
            {trend === "down" && <TrendingDown className="w-4 h-4 text-red-400" />}
            {trend === "same" && <Minus className="w-4 h-4 text-gray-500" />}
          </div>

          {/* Avatar */}
          <div className="relative">
            <img src={avatar} alt={username} className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20" />
            <div className="absolute -bottom-1 -right-1 bg-black text-[10px] rounded px-1 border border-white/20">
              {country}
            </div>
          </div>

          {/* User Info */}
          <div>
            <h4 className="text-white font-bold text-sm md:text-base group-hover:text-neon-cyan transition-colors">
              {username}
            </h4>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-gray-400">Lv.{level}</span>
              <Hexagon className="w-3 h-3 text-neon-purple fill-current" />
            </div>
          </div>
        </div>

        {/* Progress & Spending */}
        <div className="flex flex-col items-end space-y-2">
          <span className="text-lg md:text-xl font-mono font-bold text-white group-hover:text-glow-gold transition-all">
            {spending}
          </span>
          <div className="w-24 md:w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan"
            />
          </div>
        </div>

      </div>
    </motion.div>
  );
}
