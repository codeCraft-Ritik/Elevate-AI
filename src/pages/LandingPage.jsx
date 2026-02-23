import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Zap, Globe } from "lucide-react";
import Footer from "../components/layout/Footer"; // Ensure path is correct

const LandingPage = ({ onNext }) => {
  // --- EXISTING MOUSE ANIMATION LOGIC ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const glowX = useTransform(springX, [0, window.innerWidth], ["-10%", "10%"]);
  const glowY = useTransform(springY, [0, window.innerHeight], ["-10%", "10%"]);

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0a0a0c] text-white flex flex-col relative overflow-x-hidden font-sans"
    >
      {/* 1. DYNAMIC BACKGROUND GLOW */}
      <motion.div 
        style={{ x: glowX, y: glowY }}
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
      >
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-600/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/20 blur-[150px] rounded-full" />
      </motion.div>

      {/* 2. HERO CONTENT SECTION */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-32 pb-20 relative z-10 text-center">
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-8 max-w-5xl"
        >
          {/* NEON BADGE */}
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-xs font-black uppercase tracking-[0.4em] shadow-[0_0_20px_rgba(37,99,235,0.1)]">
            <Sparkles size={14} className="animate-pulse" /> AI Evolution is Here
          </div>

          <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter leading-[0.85] uppercase">
            Elevate <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-400 animate-gradient">
              Your Career.
            </span>
          </h1>

          <p className="text-zinc-500 text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed border-l-2 border-blue-600/20 pl-6">
            Unlock the science of high-performance hiring. Our neural engine builds, simulates, and optimizes your professional narrative.
          </p>

          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(37,99,235,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-4 bg-white text-black px-10 py-6 rounded-2xl font-black text-xl md:text-2xl uppercase tracking-tighter italic transition-all"
          >
            Enter the Simulation
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </motion.div>

        {/* FEATURE PREVIEWS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 w-full max-w-6xl">
          {[
            { icon: <Shield />, title: "ATS Proof", desc: "Neural keyword mapping." },
            { icon: <Zap />, title: "Instant", desc: "Real-time AI feedback." },
            { icon: <Globe />, title: "Global", desc: "Industry cluster analysis." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="p-8 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-[2.5rem] text-left group hover:border-blue-500/30 transition-all"
            >
              <div className="p-3 w-fit bg-zinc-800 rounded-xl text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h4 className="text-xl font-black italic uppercase tracking-tighter mb-2">{feature.title}</h4>
              <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* --- IMPLEMENTED FOOTER --- */}
      <Footer />
    </motion.div>
  );
};

export default LandingPage;