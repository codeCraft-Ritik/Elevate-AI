import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Code2, Users, PlayCircle, X, Brain, Target, Zap, ChevronRight, Sparkles, Heart } from "lucide-react";
import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";

const MockInterview = () => {
  const [showAptitudeModal, setShowAptitudeModal] = useState(false);
  const [showCodingModal, setShowCodingModal] = useState(false);
  const [showHRModal, setShowHRModal] = useState(false);
  const navigate = useNavigate();

  // --- NEW: SCROLL RESTORATION LOGIC ---
  useEffect(() => {
    window.scrollTo({
      // top: 0,
      // left: 0,
      behavior: "instant" 
    });
  }, []); 

  const rounds = [
    { title: "Reasoning Vault", desc: "Quants, Logical, and Verbal", icon: <Calculator />, color: "border-blue-500/20 hover:border-blue-500", glow: "group-hover:bg-blue-500/10", shadow: "shadow-blue-500/5", id: 'aptitude' },
    { title: "Coding Arena", desc: "DSA, System Design, MCQ", icon: <Code2 />, color: "border-purple-500/20 hover:border-purple-500", glow: "group-hover:bg-purple-500/10", shadow: "shadow-purple-500/5", id: 'coding' },
    { title: "HR & Behavioral", desc: "Soft Skills & Situationals", icon: <Users />, color: "border-emerald-500/20 hover:border-emerald-500", glow: "group-hover:bg-emerald-500/10", shadow: "shadow-emerald-500/5", id: 'hr' }
  ];

  const aptitudeTopics = [
    { name: "Blood Relations", icon: <Users size={16}/> },
    { name: "Coding-Decoding", icon: <Code2 size={16}/> },
    { name: "Syllogism", icon: <Brain size={16}/> },
    { name: "Direction Sense", icon: <Target size={16}/> },
    { name: "Number Series", icon: <Zap size={16}/> }
  ];

  const codingTopics = [
    { name: "Data Structures", icon: <Code2 size={16}/> },
    { name: "Algorithms", icon: <Zap size={16}/> },
    { name: "System Design", icon: <Brain size={16}/> },
    { name: "OOPs Concepts", icon: <Target size={16}/> },
    { name: "Machine Learning", icon: <Sparkles size={16}/> }
  ];

  const hrCultures = [
    { name: "Agile Startup", icon: <Zap size={16}/> },
    { name: "Corporate Giant", icon: <Users size={16}/> },
    { name: "Tech Innovator", icon: <Sparkles size={16}/> },
    { name: "Client Facing", icon: <Target size={16}/> }
  ];

  // --- THE PERFECT FULL-SCREEN BLUR MODAL ---
  const Modal = ({ isOpen, onClose, title, subtitle, topics, type, colorClass }) => (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="fixed inset-0 bg-black/70 backdrop-blur-[30px] cursor-pointer" 
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 30 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.9, opacity: 0, y: 30 }} 
            className={`relative w-full max-w-lg bg-[#0d0d0f] border-2 ${colorClass} rounded-[3.5rem] p-10 shadow-2xl overflow-hidden`}
          >
            <button onClick={onClose} className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors">
                <X size={24}/>
            </button>

            <div className="text-center mb-10">
              <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">{title}</h3>
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-1">{subtitle}</p>
            </div>

            <div className="space-y-3">
              {topics.map((topic, i) => (
                <motion.button
                  key={i}
                  whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.03)" }}
                  onClick={() => navigate(`/${type}/practice/${topic.name.replace(/\s+/g, '-').toLowerCase()}`)}
                  className="w-full flex items-center justify-between p-5 bg-zinc-800/20 border border-white/5 rounded-3xl text-left transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-zinc-800 rounded-2xl group-hover:bg-white group-hover:text-black transition-all duration-500">
                        {topic.icon}
                    </div>
                    <span className="font-black text-zinc-400 group-hover:text-white italic uppercase text-xs tracking-widest transition-colors">
                        {topic.name}
                    </span>
                  </div>
                  <ChevronRight size={18} className="text-zinc-700 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="space-y-12 relative min-h-screen">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4 relative z-10">
        <h2 className="text-5xl font-black tracking-tighter italic uppercase text-white">Choose Your Challenge</h2>
        <p className="text-zinc-500 max-w-xl mx-auto font-medium">Select a specialized arena to begin your neural assessment.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {rounds.map((round, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -10 }} 
            className={`group p-10 bg-zinc-900/40 backdrop-blur-md border-2 rounded-[3.5rem] text-center space-y-8 transition-all relative overflow-hidden ${round.color} ${round.shadow}`}
          >
            <div className={`absolute inset-0 transition-all duration-1000 opacity-0 group-hover:opacity-100 ${round.glow} scale-150 rounded-full blur-3xl`} />
            <div className="relative z-10 mx-auto w-24 h-24 bg-zinc-800/80 rounded-[2rem] flex items-center justify-center text-zinc-400 group-hover:text-white transition-all duration-500">
              {round.icon}
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">{round.title}</h3>
              <p className="text-zinc-500 mt-2 text-sm font-medium">{round.desc}</p>
            </div>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if(round.id === 'aptitude') setShowAptitudeModal(true);
                if(round.id === 'coding') setShowCodingModal(true);
                if(round.id === 'hr') setShowHRModal(true);
              }}
              className="relative z-10 w-full py-5 bg-zinc-800/80 hover:bg-white hover:text-black rounded-[1.5rem] font-black italic uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 transition-all"
            >
              Start Round <PlayCircle size={18} />
            </motion.button>
          </motion.div>
        ))}
      </div>

      <Modal 
        isOpen={showAptitudeModal} 
        onClose={() => setShowAptitudeModal(false)} 
        title="Reasoning Vault" 
        subtitle="Authorized Aptitude Practice" 
        topics={aptitudeTopics} 
        type="quiz" 
        colorClass="border-blue-500/30" 
      />
      
      <Modal 
        isOpen={showCodingModal} 
        onClose={() => setShowCodingModal(false)} 
        title="Coding Arena" 
        subtitle="Technical Domain Challenges" 
        topics={codingTopics} 
        type="coding" 
        colorClass="border-purple-500/30" 
      />

      <Modal 
        isOpen={showHRModal} 
        onClose={() => setShowHRModal(false)} 
        title="Cultural Pulse" 
        subtitle="Behavioral Fit Analysis" 
        topics={hrCultures} 
        type="hr" 
        colorClass="border-emerald-500/30" 
      />
    </div>
  );
};

export default MockInterview;