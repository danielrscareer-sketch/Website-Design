"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Magnetic Button Wrapper
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 }); // 0.2 is the magnetic strength
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative cursor-none"
    >
      {children}
    </motion.div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Leaderboard", href: "#leaderboard" },
    { name: "Stats", href: "#stats" },
    { name: "Rewards", href: "#rewards" },
    { name: "Timeline", href: "#timeline" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 1 }} // delayed to wait for loading screen
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4 border-b border-transparent",
        scrolled
          ? "glass-glow py-3 bg-black/40 border-white/10"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <MagneticButton>
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-neon-purple to-neon-cyan flex items-center justify-center font-bold text-white shadow-[0_0_10px_rgba(189,0,255,0.5)] group-hover:shadow-[0_0_20px_rgba(0,240,255,0.8)] transition-all">
              T
            </div>
            <span className="font-bold text-xl text-white tracking-widest hidden md:block">
              SPENDERS
            </span>
          </Link>
        </MagneticButton>

        <ul className="flex items-center space-x-8 hidden md:flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              <MagneticButton>
                <Link
                  href={link.href}
                  className="text-sm text-gray-300 hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-cyan transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(0,240,255,0.8)]"></span>
                </Link>
              </MagneticButton>
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-4">
          <MagneticButton>
            <button className="px-6 py-2 rounded-full border border-white/20 text-sm font-medium hover:bg-white/10 transition-colors glass cursor-none">
              Login
            </button>
          </MagneticButton>
          <MagneticButton>
            <button className="px-6 py-2 rounded-full bg-white text-black text-sm font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all cursor-none">
              Join Event
            </button>
          </MagneticButton>
        </div>
      </div>
    </motion.nav>
  );
}
