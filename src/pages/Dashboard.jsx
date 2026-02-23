import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  ArrowUpRight, Zap, Target, ShieldCheck, 
  Rocket, Flame, Award, Calendar, CheckCircle2, X, TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom"; 

// 3D Interactive Card Wrapper
const InteractiveCard = ({ children, color, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  return (
    <motion.div 
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`p-6 sm:p-8 bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] sm:rounded-[3rem] relative overflow-hidden group hover:border-${color}-500/40 transition-all duration-500 shadow-2xl ${className}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-${color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

const Dashboard = () => {
  const [isHabitOpen, setIsHabitOpen] = useState(false);
  
  const [completedDays, setCompletedDays] = useState(() => {
    const saved = localStorage.getItem("habit_tracker_data");
    return saved ? JSON.parse(saved) : {};
  });

  const username = localStorage.getItem('username') || "Candidate";
  const manualSkills = useMemo(() => 
    localStorage.getItem('skills')?.split(',').map(s => s.trim()).filter(s => s) || [], 
    []
  );

  useEffect(() => {
    localStorage.setItem("habit_tracker_data", JSON.stringify(completedDays));
  }, [completedDays]);

  const toggleHabit = (day) => {
    setCompletedDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 sm:p-10 space-y-10 pb-24 max-w-[1600px] mx-auto relative overflow-hidden"
    >
      {/* 1. HABIT TRACKER TRIGGER */}
      <motion.button 
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        onClick={() => setIsHabitOpen(true)}
        className="fixed bottom-10 right-10 z-50 bg-blue-600 text-white p-5 rounded-full shadow-2xl border border-white/20"
      >
        <Calendar size={24} />
      </motion.button>

      {/* 2. CENTERED HABIT TRACKER MODAL */}
      <AnimatePresence>
        {isHabitOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsHabitOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-[2.5rem] sm:rounded-[3.5rem] p-6 sm:p-10 shadow-2xl overflow-hidden">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl sm:text-2xl font-black text-white italic uppercase tracking-tighter">Consistency Log</h3>
                <button onClick={() => setIsHabitOpen(false)} className="text-zinc-500 hover:text-white transition-colors"><X size={24}/></button>
              </div>
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                {last7Days.map(day => (
                  <div key={day} className="flex items-center justify-between p-4 sm:p-6 bg-white/5 rounded-3xl border border-white/5">
                    <span className="text-white font-bold text-xs sm:text-sm uppercase">{day}</span>
                    <button onClick={() => toggleHabit(day)} className={`p-3 rounded-2xl transition-all ${completedDays[day] ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-zinc-700'}`}><CheckCircle2 size={24} /></button>
                  </div>
                ))}
              </div>
              <button onClick={() => setIsHabitOpen(false)} className="w-full mt-8 py-4 sm:py-5 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase italic rounded-2xl transition-all shadow-xl text-sm">Close Log</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. RESPONSIVE HEADER */}
      <motion.header variants={itemVariants} className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 sm:gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center gap-2">
                <ShieldCheck size={12} className="text-blue-500" />
                <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.3em]">Protocol Active</span>
             </div>
          </div>
          <h2 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter italic uppercase leading-[0.9]">
            Agent: <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">{username}</span>
          </h2>
        </div>
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-8 bg-zinc-900/80 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/5 shadow-2xl">
           <div className="text-right">
              <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Velocity</p>
              <p className="text-2xl font-black italic text-orange-500">14D STREAK</p>
           </div>
           <Flame size={28} className="text-orange-600 animate-pulse" />
        </div>
      </motion.header>

      {/* 4. MAIN BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 sm:gap-8">
        <motion.div variants={itemVariants} className="md:col-span-6 lg:col-span-8">
          <InteractiveCard color="blue">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6 sm:space-y-8">
                <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em]">Market Readiness</p>
                <h3 className="text-5xl sm:text-7xl font-black text-white italic tracking-tighter leading-none">92.4%</h3>
                <p className="text-zinc-500 text-sm">Neural profile optimized for <span className="text-white">Senior Roles</span>.</p>
                <div className="flex gap-4"><button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg">Analyze Sync</button></div>
              </div>
              <div className="hidden md:flex bg-black/40 rounded-[2rem] p-6 border border-white/5 flex-col justify-end h-48">
                 <div className="flex items-end gap-1.5 h-full">
                    {[30, 50, 45, 80, 60, 90, 70, 85].map((h, i) => (
                      <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-blue-500/20 border-t-2 border-blue-500 rounded-t-sm" />
                    ))}
                 </div>
              </div>
            </div>
          </InteractiveCard>
        </motion.div>

        <motion.div variants={itemVariants} className="md:col-span-3 lg:col-span-4">
          <InteractiveCard color="emerald">
             <div className="relative z-10 flex flex-row sm:flex-col justify-between items-center sm:items-start h-full py-2">
                <div className="p-4 bg-emerald-600 w-fit rounded-2xl text-white shadow-xl"><TrendingUp size={24}/></div>
                <div className="text-right sm:text-left">
                   <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">XP Points</p>
                   <h3 className="text-3xl sm:text-5xl font-black text-white italic tracking-tighter">12.4k</h3>
                </div>
             </div>
          </InteractiveCard>
        </motion.div>

        <motion.div variants={itemVariants} className="md:col-span-6 lg:col-span-8">
          <InteractiveCard color="purple">
             <div className="relative z-10 space-y-8">
                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Skill Map</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                   {manualSkills.slice(0, 6).map((skill, i) => (
                      <div key={i} className="p-4 bg-black/40 border border-white/5 rounded-3xl text-center space-y-2">
                         <p className="text-[9px] font-black text-zinc-300 uppercase truncate">{skill}</p>
                         <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500" style={{ width: `${70 + i * 5}%` }} />
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </InteractiveCard>
        </motion.div>

        <motion.div variants={itemVariants} className="md:col-span-3 lg:col-span-4">
          <div className="h-full bg-zinc-900/60 p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] border border-white/5 space-y-8">
             <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Live Telemetry</p>
             <div className="space-y-6">
                {[{ l: "Resume Sync", s: "Success" }, { l: "Mock Test 04", s: "Active" }].map((f, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0">
                     <p className="text-white text-xs font-bold uppercase">{f.l}</p>
                     <p className="text-[9px] font-black uppercase text-emerald-500">{f.s}</p>
                  </div>
                ))}
             </div>
          </div>
        </motion.div>
      </div>

      {/* 5. PLACEMENT VELOCITY */}
      <motion.div variants={itemVariants}>
        <InteractiveCard color="blue" className="w-full">
           <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-lg"><Rocket size={24}/></div>
                 <div className="text-left">
                    <h3 className="text-xl sm:text-2xl font-black text-white italic uppercase tracking-tighter">Placement Velocity</h3>
                    <p className="text-zinc-500 text-[9px] font-black uppercase mt-1">Milestones: 4/5 Complete</p>
                 </div>
              </div>
              <Link 
                to="/mock-test" 
                className="group w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-white text-black font-black uppercase italic text-sm rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95"
              >
                Launch Session 
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
           </div>
        </InteractiveCard>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;