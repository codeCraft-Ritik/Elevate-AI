import { useState, useEffect } from "react";
import { motion } from "framer-motion"; 
import { 
  TrendingUp, Target, Zap, Award, BarChart3, Clock, 
  Code2, Brain, Heart, FileText, CheckCircle2, Activity
} from "lucide-react";
import API from "../api/axios";

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await API.get("/analytics/user-stats");
        setStats(res.data);
      } catch (err) {
        console.error("Neural telemetry failed to sync.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading || !stats) return (
    <div className="flex flex-col items-center justify-center py-40 space-y-4">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">Syncing Neural Data...</p>
    </div>
  );

  return (
    <div className="space-y-10 pb-20 px-8">
      <header className="relative z-10">
        <h2 className="text-5xl font-black tracking-tighter italic uppercase text-white leading-tight">
          Performance <span className="text-blue-500">Telemetry</span>
        </h2>
        <p className="text-zinc-500 mt-2 font-medium tracking-wide">
          Comprehensive analysis of your professional prep cycle.
        </p>
      </header>

      {/* PRIMARY PERFORMANCE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Prep Sessions", val: stats.totalQuestions, icon: <Target />, color: "text-blue-400", bg: "bg-blue-400/5" },
          { label: "Coding Mastery", val: `${stats.codingXP} XP`, icon: <Code2 />, color: "text-purple-400", bg: "bg-purple-400/5" },
          { label: "Resume ATS Score", val: `${stats.resumeScore}/100`, icon: <FileText />, color: "text-orange-400", bg: "bg-orange-400/5" },
          { label: "Interview Grade", val: "A+", icon: <Award />, color: "text-emerald-400", bg: "bg-emerald-400/5" }
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -5, scale: 1.02 }}
            className={`p-8 ${stat.bg} backdrop-blur-xl border border-white/5 rounded-[2.5rem] relative overflow-hidden group`}
          >
            <div className={`absolute -top-4 -right-4 p-8 opacity-10 ${stat.color} group-hover:scale-125 transition-transform duration-500`}>
              {stat.icon}
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{stat.label}</p>
            <h3 className="text-4xl font-black italic text-white mt-2 tracking-tighter">{stat.val}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-10 bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[3.5rem] space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-6">
            <h3 className="text-2xl font-black italic uppercase text-white tracking-tighter flex items-center gap-3">
              <Activity size={24} className="text-blue-500" /> Neural Activity Log
            </h3>
            <span className="px-4 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded-full uppercase tracking-widest">Live Sync Active</span>
          </div>
          
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
            {stats.recentActivity.map((act, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="flex items-center justify-between p-6 bg-white/[0.02] rounded-[2rem] border border-white/5 hover:bg-white/[0.05] transition-all"
              >
                <div className="flex items-center gap-5">
                  <div className={`p-4 rounded-2xl bg-zinc-800 ${
                    act.category === 'Coding' ? 'text-purple-400' : 
                    act.category === 'Aptitude' ? 'text-blue-400' : 
                    act.category === 'Resume' ? 'text-orange-400' : 'text-emerald-400'
                  }`}>
                    {act.category === "Coding" ? <Code2 size={20}/> : 
                     act.category === "Aptitude" ? <Brain size={20}/> : 
                     act.category === "Resume" ? <FileText size={20}/> : <Heart size={20}/>}
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase italic text-xs tracking-widest leading-none">{act.task}</h4>
                    <p className="text-zinc-500 text-[9px] uppercase font-bold mt-2 flex items-center gap-2">
                       <Clock size={10} /> {act.time} • {act.category} Arena
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <span className="text-white font-black text-[10px] block uppercase tracking-tighter">Status</span>
                    <span className="text-emerald-500 font-bold text-[9px] uppercase">{act.status}</span>
                  </div>
                  <CheckCircle2 size={18} className="text-emerald-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-10 bg-blue-600/5 border border-blue-500/20 rounded-[3rem] space-y-8">
            <h3 className="text-xl font-black italic uppercase text-white tracking-tighter leading-none">Preparation Balance</h3>
            <div className="space-y-6">
              {[
                { label: "Technical DSA", val: stats.skillMetrics.technical, color: "bg-purple-500" },
                { label: "Logical Aptitude", val: stats.skillMetrics.logical, color: "bg-blue-500" },
                { label: "Behavioral STAR", val: stats.skillMetrics.behavioral, color: "bg-emerald-500" }
              ].map((skill, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between text-[9px] font-black uppercase text-zinc-400 tracking-widest">
                    <span>{skill.label}</span>
                    <span className="text-white">{skill.val}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${skill.val}%` }} 
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className={`h-full ${skill.color} shadow-[0_0_15px_rgba(255,255,255,0.1)]`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;