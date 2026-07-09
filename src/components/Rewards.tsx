"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Gift, Sparkles, Key, Zap } from "lucide-react";

const rewards = [
  {
    id: 1,
    title: "Legendary Chest",
    icon: Sparkles,
    color: "from-neon-gold via-yellow-500 to-orange-600",
    shadow: "shadow-[0_0_30px_rgba(255,215,0,0.4)]",
    desc: "Top 3 exclusive reward containing rare digital assets.",
  },
  {
    id: 2,
    title: "Diamond Badge",
    icon: Zap,
    color: "from-neon-cyan via-blue-500 to-blue-800",
    shadow: "shadow-[0_0_30px_rgba(0,240,255,0.4)]",
    desc: "Profile verification and exclusive glowing name tag.",
  },
  {
    id: 3,
    title: "VIP Access Key",
    icon: Key,
    color: "from-neon-purple via-purple-600 to-indigo-900",
    shadow: "shadow-[0_0_30px_rgba(189,0,255,0.4)]",
    desc: "Early access to next season's events and drops.",
  },
  {
    id: 4,
    title: "Mystery Box",
    icon: Gift,
    color: "from-gray-300 via-gray-500 to-gray-700",
    shadow: "shadow-[0_0_20px_rgba(200,200,200,0.3)]",
    desc: "Randomized rewards for participants reaching Level 50.",
  },
];

function RewardCard({ reward }: { reward: typeof rewards[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotateX(((y - centerY) / centerY) * -15);
    setRotateY(((x - centerX) / centerX) * 15);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setRotateX(0); setRotateY(0); }}
      style={{ transformStyle: "preserve-3d" }}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative rounded-3xl p-1 bg-gradient-to-br cursor-none",
        reward.color,
        reward.shadow
      )}
    >
      <div className="absolute inset-0 bg-black/50 rounded-3xl mix-blend-overlay"></div>
      <div className="relative h-full bg-black/80 rounded-[23px] p-8 flex flex-col items-center text-center transform-gpu preserve-3d">

        {/* Floating Icon inside the card */}
        <motion.div
          style={{ transform: "translateZ(50px)" }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6 p-4 rounded-full bg-white/5 border border-white/10"
        >
          <reward.icon className="w-12 h-12 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        </motion.div>

        <h3 className="text-2xl font-bold text-white mb-3" style={{ transform: "translateZ(30px)" }}>
          {reward.title}
        </h3>

        <p className="text-gray-400 text-sm" style={{ transform: "translateZ(20px)" }}>
          {reward.desc}
        </p>

      </div>
    </motion.div>
  );
}

export default function Rewards() {
  return (
    <section className="py-24 relative z-10" id="rewards">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider"
          >
            Exclusive <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">Rewards</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
          {rewards.map((reward, i) => (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <RewardCard reward={reward} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
