"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface CounterProps {
  from: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

function AnimatedCounter({ from, to, duration = 2, prefix = "", suffix = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const currentCount = Math.floor(easeProgress * (to - from) + from);
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCounter);
      }
    };

    animationFrame = requestAnimationFrame(updateCounter);

    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration, isInView]);

  // Format large numbers
  const formattedCount = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(count);

  return (
    <span ref={ref} className="font-mono text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
      {prefix}{formattedCount}{suffix}
    </span>
  );
}

const statsData = [
  { id: 1, label: "Total Spending", to: 12500000, prefix: "$", color: "text-neon-cyan", border: "border-neon-cyan/20" },
  { id: 2, label: "Active Participants", to: 124500, suffix: "+", color: "text-neon-purple", border: "border-neon-purple/20" },
  { id: 3, label: "Rewards Distributed", to: 8500, color: "text-neon-gold", border: "border-neon-gold/20" },
  { id: 4, label: "Countries Represented", to: 142, color: "text-white", border: "border-white/20" },
];

export default function Stats() {
  return (
    <section className="py-24 relative z-10" id="stats">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`glass p-8 rounded-2xl border-t-2 ${stat.border} flex flex-col items-center justify-center text-center relative overflow-hidden group hover:bg-white/10 transition-colors`}
            >
              {/* Background Glow */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 ${stat.color.replace('text', 'bg')}/20 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              <AnimatedCounter from={0} to={stat.to} prefix={stat.prefix} suffix={stat.suffix} />

              <span className={`mt-4 text-sm uppercase tracking-widest font-bold ${stat.color}`}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
