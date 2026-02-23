import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useMemo } from "react";
import { Upload, Loader2, CheckCircle, Target, MousePointer2 } from "lucide-react";
import AIAssistant from "../components/resume/AIAssistant";
import API from "../api/axios";

const ResumeBuilder = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [analysis, setAnalysis] = useState(null); 
  const [resolvedTasks, setResolvedTasks] = useState([]);
  const fileInputRef = useRef(null);

  const handleUploadClick = () => { fileInputRef.current.click(); };

  const syncPercentage = useMemo(() => {
    if (!analysis?.extractedSkills) return 0;
    const manualSkillsString = localStorage.getItem('skills') || "";
    const manualSkills = manualSkillsString.toLowerCase().split(',').map(s => s.trim()).filter(s => s !== "");
    if (manualSkills.length === 0) return 0;
    const matches = analysis.extractedSkills.filter(skill => manualSkills.includes(skill.toLowerCase()));
    return Math.round((matches.length / manualSkills.length) * 100);
  }, [analysis]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("resume", file);
    setIsUploading(true);

    try {
      const response = await API.post("/resume/analyze", formData);
      setAnalysis(response.data); 
      setResolvedTasks([]); 

      // NEW: Automatically update Analytics with the new score
      // We use a baseline score + syncPercentage for realism
      const finalScore = Math.min(60 + (response.data.extractedSkills.length * 2), 100);
      
      await API.post("/analytics/track", { 
        category: "Resume", 
        task: "Portfolio Optimization", 
        score: finalScore 
      });

    } catch (err) {
      alert("Error analyzing resume. Ensure the backend is running.");
    } finally {
      setIsUploading(false);
    }
  };

  const toggleResolve = (id) => {
    setResolvedTasks(prev => prev.includes(id) ? prev.filter(tid => tid !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6 sm:space-y-8 relative px-4 sm:px-0 pb-10">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-[radial-gradient(#1e40af_1px,transparent_1px)] [background-size:40px_40px]" />
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative z-10">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight italic uppercase">Manage Your Resume</h1>
        <p className="text-zinc-500 text-xs sm:text-sm">Neural-powered resume engineering.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start relative z-10">
        <div className="lg:col-span-8 space-y-6">
          <motion.div className="bg-zinc-900/30 border-2 border-dashed border-zinc-800 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 lg:p-20 flex flex-col items-center justify-center text-center space-y-6 min-h-[400px] sm:min-h-[500px] transition-all relative overflow-hidden group">
            <motion.div animate={{ top: ["-10%", "110%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent shadow-[0_0_20px_rgba(37,99,235,0.5)] z-20 pointer-events-none" />
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf" />

            {!analysis ? (
              <div className="flex flex-col items-center space-y-4 sm:space-y-6">
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-500 relative">
                  {isUploading ? <Loader2 className="animate-spin" size={32} /> : <Upload size={32} />}
                  <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full animate-pulse" />
                </motion.div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white uppercase italic">Architect Your Future</h3>
                  <p className="text-zinc-500 text-xs sm:text-sm max-w-xs mx-auto">Upload your current resume to let ElevateAI re-engineer your narrative.</p>
                </div>
                <button onClick={handleUploadClick} disabled={isUploading} className="bg-white text-black px-8 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-sm sm:text-lg hover:bg-blue-600 hover:text-white transition-all shadow-xl relative z-30 disabled:opacity-50 uppercase italic">
                  {isUploading ? "Processing..." : "Upload PDF / DOCX"}
                </button>
              </div>
            ) : (
              <div className="w-full space-y-6 sm:space-y-8 relative z-30">
                <div className="flex flex-col sm:flex-row items-center justify-between bg-blue-600/10 border border-blue-500/20 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] gap-4">
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="p-3 sm:p-4 bg-blue-600 rounded-xl sm:rounded-2xl text-white shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                      <Target size={24} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-white uppercase italic tracking-tighter text-lg sm:text-xl leading-none">Profile Sync</h4>
                      <p className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.2em] mt-1">Extracted vs Settings Skills</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-4xl sm:text-5xl font-black text-blue-500 italic">{syncPercentage}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AnimatePresence>
                    {analysis.suggestions.map((item) => (
                      <motion.div 
                        key={item.id} layout
                        onClick={() => toggleResolve(item.id)}
                        className={`p-5 sm:p-6 rounded-[1.8rem] sm:rounded-[2.2rem] border-2 cursor-pointer transition-all relative overflow-hidden group/card text-left ${
                          resolvedTasks.includes(item.id) 
                          ? "bg-emerald-500/10 border-emerald-500/50 opacity-60" 
                          : "bg-zinc-800/50 border-zinc-700 hover:border-blue-500/50"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3 sm:mb-4">
                          <span className={`text-[9px] font-black uppercase tracking-widest px-2 sm:px-3 py-1 rounded-full ${
                            item.impact === 'High' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'
                          }`}>
                            {item.impact} Impact
                          </span>
                          {resolvedTasks.includes(item.id) && <CheckCircle className="text-emerald-500" size={18} />}
                        </div>
                        <p className={`text-xs sm:text-sm font-bold leading-relaxed ${resolvedTasks.includes(item.id) ? 'line-through text-zinc-500' : 'text-zinc-300'}`}>
                          {item.task}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-[9px] font-black text-zinc-600 uppercase">
                          <MousePointer2 size={10} /> {resolvedTasks.includes(item.id) ? "Resolved" : "Click to Resolve"}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                
                <button onClick={() => setAnalysis(null)} className="text-zinc-500 text-[9px] font-black uppercase tracking-widest hover:text-white transition-colors border-b border-zinc-800 hover:border-white pb-1 italic">
                  Analyze New Resume Version
                </button>
              </div>
            )}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="lg:col-span-4 lg:sticky lg:top-24 h-[500px] sm:h-[650px] relative z-10 mb-10">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[2.2rem] blur-xl opacity-50" />
          <AIAssistant />
        </motion.div>
      </div>
    </div>
  );
};

export default ResumeBuilder;