"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flag, Target, Trophy, Gift } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  { id: 1, title: "Registration Opens", date: "Oct 1, 2024", desc: "Join the arena and claim your spot.", icon: Flag },
  { id: 2, title: "Competition Begins", date: "Oct 15, 2024", desc: "Start spending, climb the ranks.", icon: Target },
  { id: 3, title: "Leaderboard Freeze", date: "Nov 30, 2024", desc: "Final standings are locked in.", icon: Trophy },
  { id: 4, title: "Rewards Distributed", date: "Dec 5, 2024", desc: "Claim your digital loot.", icon: Gift },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the vertical line drawing down
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        }
      );

      // Animate items fading in and sliding up
      const items = gsap.utils.toArray<HTMLElement>(".timeline-item");
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 relative z-10 overflow-hidden" id="timeline" ref={containerRef}>
      <div className="max-w-4xl mx-auto px-6 relative">

        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-widest text-glow">
            Event Timeline
          </h2>
        </div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 rounded-full origin-top">
            <div
              ref={lineRef}
              className="w-full h-full bg-gradient-to-b from-neon-purple via-neon-cyan to-neon-gold origin-top shadow-[0_0_15px_rgba(0,240,255,0.8)]"
            ></div>
          </div>

          {timelineEvents.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={event.id} className={`timeline-item relative flex items-center justify-between md:justify-normal mb-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>

                {/* Timeline Node/Icon */}
                <div className="absolute left-4 md:left-1/2 w-10 h-10 -translate-x-1/2 rounded-full bg-black border-2 border-neon-cyan flex items-center justify-center z-10 shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                  <event.icon className="w-5 h-5 text-white" />
                </div>

                {/* Content Box */}
                <div className="w-full pl-12 md:pl-0 md:w-5/12">
                  <div className={`glass p-6 rounded-2xl hover:border-neon-cyan/50 transition-colors duration-300 relative group ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                     <div className="absolute inset-0 bg-neon-cyan/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <span className="text-neon-gold text-sm font-bold tracking-wider uppercase mb-2 block">{event.date}</span>
                     <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                     <p className="text-gray-400 text-sm leading-relaxed">{event.desc}</p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
