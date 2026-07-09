import LoadingScreen from "@/components/LoadingScreen";
import DynamicBackground from "@/components/DynamicBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WinnersPodium from "@/components/WinnersPodium";
import Leaderboard from "@/components/Leaderboard";
import Stats from "@/components/Stats";
import Rewards from "@/components/Rewards";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Absolute / Fixed Elements */}
      <LoadingScreen />
      <DynamicBackground />
      <Navbar />

      {/* Main Content Flow */}
      <Hero />
      <WinnersPodium />
      <Leaderboard />
      <Stats />
      <Rewards />
      <Timeline />

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 text-center relative z-10 glass">
         <p className="text-gray-500 text-sm">
           &copy; {new Date().getFullYear()} Apex Leaderboard. All rights reserved.
         </p>
      </footer>
    </main>
  );
}
