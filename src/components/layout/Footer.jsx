import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // --- COMPACT NEURAL GLOW LOGIC ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <footer 
      onMouseMove={handleMouseMove}
      className="relative mt-20 border-t border-zinc-800/50 bg-[#070708] px-6 py-10 overflow-hidden"
    >
      {/* BACKGROUND TEXT: THE FUTURE OF HIRING */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <h2 className="text-[10vw] font-black italic uppercase tracking-tighter text-zinc-900/20 whitespace-nowrap leading-none opacity-50">
          THE FUTURE OF HIRING.
        </h2>
      </div>

      {/* DYNAMIC NEURAL GLOW */}
      <motion.div 
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
        style={{
          background: useTransform(
            [springX, springY],
            ([x, y]) => `radial-gradient(350px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.2), transparent 80%)`
          )
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* LEFT: BRANDING & INNOVATIVE TAGLINE */}
          <div className="space-y-3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white shadow-lg">E</div>
              <span className="text-xl font-black italic tracking-tighter uppercase text-white">ElevateAI</span>
            </div>
            <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.25em] max-w-xs mx-auto md:mx-0 leading-relaxed">
              Engineering Excellence <br /> 
              <span className="text-zinc-500">Beyond the standard narrative.</span>
            </p>
          </div>

          {/* CENTER: ARCHITECT CREDIT */}
          <div className="text-center">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex flex-col items-center group cursor-default"
            >
              <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.4em] mb-1">Lead Architect</span>
              <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase relative">
                RITIK <span className="text-blue-600 animate-pulse">.</span>
              </h3>
            </motion.div>
            <div className="mt-2 flex items-center justify-center gap-2 text-zinc-600 text-[9px] font-black uppercase tracking-widest">
              Built with <Heart size={10} className="text-red-600 fill-red-600" /> globally
            </div>
          </div>

          {/* RIGHT: CONNECT TO ME & SOCIALS */}
          <div className="flex flex-col items-center md:items-end gap-3">
             {/* NEW CTA LABEL */}
             <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-1">
               Connect to me
             </span>
             <div className="flex gap-2">
                {[
                  { icon: <Linkedin size={18} />, link: "https://linkedin.com/in/ritik", label: "LinkedIn" },
                  { icon: <Github size={18} />, link: "https://github.com/codeCraft-Ritik", label: "GitHub" }
                ].map((social, i) => (
                  <motion.a 
                    key={i}
                    href={social.link}
                    target="_blank"
                    whileHover={{ y: -3, scale: 1.05, backgroundColor: "rgba(37,99,235,0.08)" }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-500 hover:text-white hover:border-blue-500/30 transition-all shadow-xl"
                  >
                    {social.icon}
                  </motion.a>
                ))}
             </div>
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div className="mt-8 pt-6 border-t border-zinc-900/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-zinc-700 text-[8px] font-black uppercase tracking-[0.3em]">
          <div>© {currentYear} ElevateAI • All Rights Reserved</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;