import { motion, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Sparkles, Target, Zap, ArrowRight, 
  Star, BrainCircuit, CheckCircle2, 
  Quote, ShieldAlert, Cpu, Search, LogIn 
} from "lucide-react";
import Footer from "../components/layout/Footer"; // Ensure the Footer component exists

const ServicesDiscovery = ({ onStart, onLogin }) => {
  const containerRef = useRef(null);
  const comparisonRef = useRef(null);

  // --- MAGNET MOUSE TRAIL LOGIC ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleGlobalMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const trailBg = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.15), transparent 80%)`
  );

  // --- X-RAY REVEAL LOGIC ---
  const [isHoveringComparison, setIsHoveringComparison] = useState(false);
  const xrayX = useMotionValue(0);
  const xrayY = useMotionValue(0);

  const handleComparisonMove = (e) => {
    const rect = comparisonRef.current.getBoundingClientRect();
    xrayX.set(e.clientX - rect.left);
    xrayY.set(e.clientY - rect.top);
  };

  const xrayClipPath = useTransform(
    [xrayX, xrayY],
    ([x, y]) => `circle(150px at ${x}px ${y}px)`
  );

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const slideIn = (direction) => ({
    initial: { 
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0, 
      y: direction === "bottom" ? 30 : 0,
      opacity: 0 
    },
    whileInView: { x: 0, y: 0, opacity: 1 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  });

  const testimonials = [
    { name: "Sarah K.", role: "Software Engineer @ Google", quote: "The AI feedback on my behavioral round was so accurate, it felt like I had a real mentor." },
    { name: "James L.", role: "Frontend Dev @ Meta", quote: "ElevateAI's resume architect got me through the ATS gate that had been blocking me for months." },
    { name: "Anita R.", role: "SDE @ Amazon", quote: "The mock interview simulation perfectly prepared me for the actual technical pressure." },
    { name: "Vikram S.", role: "Full Stack Dev @ Uber", quote: "I optimized my resume match rate from 20% to 85% using the AI Architect tools." },
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <motion.div 
      ref={containerRef}
      onMouseMove={handleGlobalMouseMove}
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-[#0a0a0c] text-white overflow-x-hidden font-sans selection:bg-blue-500/30 relative"
    >
      {/* 1. MAGNET MOUSE TRAIL LAYER */}
      <motion.div 
        className="pointer-events-none fixed inset-0 z-10"
        style={{ background: trailBg }}
      />

      {/* --- TOP NAVIGATION BAR --- */}
      <nav className="fixed top-0 left-0 right-0 z-[110] px-4 sm:px-8 py-4 flex justify-between items-center backdrop-blur-md bg-black/10 border-b border-white/5">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white">E</div>
           <span className="font-bold tracking-tighter uppercase italic text-sm hidden sm:block">ElevateAI</span>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#000000" }}
          whileTap={{ scale: 0.95 }}
          onClick={onLogin}
          className="flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-xs font-bold uppercase tracking-widest transition-all"
        >
          <LogIn size={14} />
          Account Login
        </motion.button>
      </nav>

      {/* READING PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* --- HERO SECTION --- */}
      <section className="min-h-[90vh] flex flex-col justify-center px-4 sm:px-8 max-w-7xl mx-auto relative pt-24 sm:pt-32 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 items-center">
          <motion.div 
            className="space-y-6 sm:space-y-8 z-10 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <div className="flex items-center justify-center lg:justify-start gap-3 text-blue-500 font-bold">
              <BrainCircuit size={24} className="animate-pulse" />
              <span className="text-lg sm:text-xl tracking-widest uppercase italic">ElevateAI Intelligence</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-tight sm:leading-none">
              THE SCIENCE <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent italic">
                OF GETTING HIRED.
              </span>
            </h1>
            <p className="text-zinc-500 text-lg sm:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed border-l-2 border-blue-600/30 pl-4 sm:pl-6">
              ElevateAI isn't just a toolkit—it's your private career coach, available 24/7 to maximize your market value.
            </p>
          </motion.div>

          <motion.div 
            className="relative hidden lg:flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="w-[300px] h-[300px] xl:w-[450px] xl:h-[450px] rounded-full border border-blue-500/10 flex items-center justify-center relative">
               <div className="absolute inset-0 rounded-full bg-blue-500/5 animate-pulse" />
               <div className="w-48 h-48 xl:w-64 xl:h-64 rounded-full border-2 border-blue-500/40 flex items-center justify-center">
                  <div className="w-24 h-24 xl:w-32 xl:h-32 rounded-full border-4 border-blue-600 shadow-[0_0_50px_rgba(37,99,235,0.3)] flex items-center justify-center">
                    <Cpu size={40} className="text-white" />
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- ANALYZE SECTION --- */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-20">
        <motion.div 
          {...slideIn("bottom")}
          className="border-l-4 border-blue-600 pl-6 sm:pl-8 space-y-4"
        >
          <div className="flex items-center gap-3 sm:gap-4 text-blue-500 mb-2">
            <Search size={28} />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.4em]">Phase 01</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold italic tracking-tighter uppercase">
            Analyze <span className="text-zinc-700">&</span> Deconstruct.
          </h2>
          <p className="text-zinc-500 text-base sm:text-xl max-w-2xl font-medium leading-relaxed">
            Before we build, we analyze. Our neural engine deconstructs industry benchmarks to identify exactly what top-tier recruiters are looking for.
          </p>
        </motion.div>
      </section>

      {/* --- STATS RIBBON --- */}
      <section className="py-12 sm:py-20 border-y border-zinc-800/50 bg-zinc-900/10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 text-center">
           {[
             { label: "Resume Match Rate", val: "+45%", icon: <Zap size={24} /> },
             { label: "Interview Confidence", val: "92%", icon: <Star size={24} /> },
             { label: "ATS Success Rate", val: "3.5x", icon: <Target size={24} /> }
           ].map((s, i) => (
             <motion.div key={i} {...slideIn("bottom")} transition={{ delay: i * 0.1 }}>
                <div className="flex justify-center text-blue-500 mb-3 sm:mb-4">{s.icon}</div>
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 tracking-tight italic">{s.val}</div>
                <div className="text-zinc-500 text-xs sm:text-sm font-bold uppercase tracking-widest">{s.label}</div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* --- X-RAY REVEAL COMPARISON --- */}
      <section className="py-20 sm:py-32 px-4 sm:px-8 max-w-5xl mx-auto relative z-30">
        <motion.h2 
          {...slideIn("bottom")} 
          className="text-3xl sm:text-4xl font-bold mb-10 sm:mb-16 text-center italic"
        >
          Old Way vs. <span className="text-blue-500 tracking-tighter uppercase">ElevateAI</span>
        </motion.h2>
        
        <div 
          ref={comparisonRef}
          onMouseMove={handleComparisonMove}
          onMouseEnter={() => setIsHoveringComparison(true)}
          onMouseLeave={() => setIsHoveringComparison(false)}
          className="relative grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800 rounded-2xl sm:rounded-[3rem] overflow-hidden cursor-crosshair"
        >
           <div className="p-8 sm:p-12 bg-zinc-900/50 space-y-6">
              <h3 className="text-lg sm:text-xl font-bold text-red-500 flex items-center gap-2 italic uppercase tracking-tight">
                <ShieldAlert size={20} /> Traditional Approach
              </h3>
              <ul className="space-y-4 text-zinc-500 text-sm sm:text-base">
                <li>• Static templates everyone uses</li>
                <li>• Manual keyword guessing for ATS</li>
                <li>• Practicing in front of a mirror</li>
                <li>• No data on why you were rejected</li>
              </ul>
           </div>
           <div className="p-8 sm:p-12 bg-blue-600/5 backdrop-blur-xl space-y-6">
              <h3 className="text-lg sm:text-xl font-bold text-blue-500 flex items-center gap-2 italic uppercase tracking-tight">
                <Sparkles size={20} /> The ElevateAI Way
              </h3>
              <ul className="space-y-4 text-zinc-100 font-medium text-sm sm:text-base">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500 shrink-0" /> Neural-engineered narratives</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500 shrink-0" /> Real-time ATS keyword mapping</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500 shrink-0" /> AI-driven behavioral feedback</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500 shrink-0" /> Deep-dive performance analytics</li>
              </ul>
           </div>
           <motion.div 
             className="pointer-events-none absolute inset-0 z-40 bg-blue-500/10"
             style={{
               opacity: isHoveringComparison ? 1 : 0,
               clipPath: xrayClipPath,
               backdropFilter: "brightness(1.5) saturate(1.5) contrast(1.2) blur(4px)"
             }}
           />
        </div>
      </section>

      {/* --- SERVICE 1: RESUME --- */}
      <section className="py-16 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 sm:gap-20 relative z-20">
         <motion.div {...slideIn("left")} className="flex-1 space-y-6 sm:space-y-8 text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-blue-500 italic uppercase tracking-wider">AI Resume Architect</h3>
            <h4 className="text-3xl sm:text-5xl font-bold leading-tight tracking-tight italic uppercase">Stop Guessing, <br /> Start Matching.</h4>
            <p className="text-zinc-500 text-base sm:text-xl leading-relaxed">
               Our AI re-engineers your narrative by mapping skills to high-demand industry clusters. Bypass legacy filters and land directly on the recruiter's desk.
            </p>
         </motion.div>
         <motion.div {...slideIn("right")} className="flex-1 w-full max-w-[400px] aspect-square bg-zinc-900 border border-zinc-800 rounded-[2rem] sm:rounded-[4rem] flex items-center justify-center text-6xl sm:text-9xl shadow-2xl">
            📄
         </motion.div>
      </section>

      {/* --- HOW IT WORKS TIMELINE --- */}
      <section className="py-20 sm:py-32 bg-zinc-900/20 px-4 sm:px-8 relative z-20">
        <div className="max-w-4xl mx-auto space-y-12 sm:space-y-24 relative">
          <div className="absolute left-[16px] md:left-1/2 top-0 bottom-0 w-[2px] bg-zinc-800 -translate-x-1/2" />
          {[
            { step: "01", title: "Analyze", desc: "Our AI scans your current profile and target job roles." },
            { step: "02", title: "Optimize", desc: "Generate an ATS-proof resume with neural suggestions." },
            { step: "03", title: "Simulate", desc: "Practice rounds in the Mock Arena with real-time scoring." },
            { step: "04", title: "Elevate", desc: "Track your analytics and launch your career." }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              {...slideIn(i % 2 === 0 ? "left" : "right")} 
              className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
               <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold z-10 shrink-0 text-sm sm:text-base">
                 {item.step}
               </div>
               <div className="flex-1 p-6 sm:p-8 bg-zinc-900 border border-zinc-800 rounded-xl sm:rounded-3xl hover:border-blue-500/30 transition-colors w-full">
                  <h5 className="text-xl sm:text-2xl font-bold mb-2 italic uppercase tracking-tighter">{item.title}</h5>
                  <p className="text-zinc-500 text-sm sm:text-base">{item.desc}</p>
               </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- SUCCESS STORIES SLIDER --- */}
      <section className="py-20 sm:py-32 bg-zinc-900/10 overflow-hidden relative z-20">
        <div className="text-center mb-12 sm:mb-20 px-4 space-y-4">
           <h2 className="text-3xl sm:text-4xl font-bold italic uppercase tracking-tighter">Success Stories</h2>
           <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold">Real engineers, real results.</p>
        </div>

        <div className="relative flex items-center">
          <motion.div 
            className="flex gap-4 sm:gap-8 pr-4 sm:pr-8"
            animate={{ x: [0, "-100%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
            whileHover={{ animationPlayState: "paused" }}
            style={{ width: "max-content" }}
          >
            {duplicatedTestimonials.map((t, i) => (
              <div 
                key={i} 
                className="w-[280px] sm:w-[400px] md:w-[450px] flex-shrink-0 p-6 sm:p-10 bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl sm:rounded-[3rem] relative group hover:border-blue-500/50 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              >
                <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem] -z-10" />
                <Quote 
                  className="absolute top-4 right-4 sm:top-8 sm:right-8 text-blue-500/10 group-hover:text-blue-500/30 group-hover:scale-110 transition-all" 
                  size={32} 
                />
                <p className="text-sm sm:text-lg italic text-zinc-300 mb-6 sm:mb-8 leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="mt-auto font-bold text-white uppercase tracking-tight text-xs sm:text-base">{t.name}</div>
                <div className="text-blue-500 text-[10px] sm:text-sm font-bold uppercase tracking-tighter">{t.role}</div>
              </div>
            ))}
          </motion.div>
          <div className="absolute inset-y-0 left-0 w-12 sm:w-32 bg-gradient-to-r from-[#0a0a0c] to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-12 sm:w-32 bg-gradient-to-l from-[#0a0a0c] to-transparent pointer-events-none z-10" />
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 sm:py-40 text-center relative overflow-hidden px-4 z-20">
        <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full -z-10" />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}>
           <h2 className="text-4xl sm:text-6xl font-bold mb-8 sm:mb-12 italic uppercase tracking-tighter">Ready to Start?</h2>
           <button 
             onClick={onStart}
             className="group w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-blue-600 hover:bg-white hover:text-black text-white px-8 sm:px-16 py-4 sm:py-6 rounded-xl sm:rounded-2xl font-bold text-xl sm:text-2xl transition-all shadow-lg hover:shadow-white/10"
           >
             Evaluate Our Services <ArrowRight className="group-hover:translate-x-3 transition-transform" />
           </button>
        </motion.div>
      </section>

      {/* --- NEW FOOTER SECTION --- */}
      <Footer />
    </motion.div>
  );
};

export default ServicesDiscovery;