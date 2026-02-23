import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, Heart, Star } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import API from "../api/axios";

const HRBehavioral = () => {
  const { culture } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answerKey, setAnswerKey] = useState(""); 
  const [showAnswers, setShowAnswers] = useState(false); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        // Prompt engineered for HR-specific STAR method logic
        const res = await API.post("/resume/chat", { 
          message: `ACT AS A SENIOR HR DIRECTOR for a ${culture} environment. 
          Generate 5 difficult behavioral questions.
          STRUCTURE: 
          1. Start every question with "QUESTION_START".
          2. After questions, provide "ANSWER_KEY_START".
          3. For each answer, provide a "STAR Strategy" (Situation, Task, Action, Result) specific to this culture.` 
        });
        
        const rawText = res.data.reply || "";
        const parts = rawText.split("ANSWER_KEY_START");
        const mainContent = parts[0] || "";
        const keyContent = parts[1] || "Strategies pending...";
        const questionArray = mainContent.split("QUESTION_START").filter(q => q.trim() !== "");
        
        setQuestions(questionArray);
        setAnswerKey(keyContent);

        // 2. NEW: Log the specific Behavioral Context
        await API.post("/analytics/track", { 
            category: "HR", 
            task: `Fit Check: ${culture}`, 
            score: 100 
        });

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [culture]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 px-4">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/mock-test')} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all uppercase text-[10px] font-black tracking-widest">
           <ArrowLeft size={14}/> Back to Arena
        </button>
        {!loading && (
          <button onClick={() => setShowAnswers(!showAnswers)} className="px-6 py-2 bg-emerald-600/10 border border-emerald-500/30 rounded-full text-emerald-500 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all">
            {showAnswers ? "Hide STAR Logic" : "Reveal STAR Logic"}
          </button>
        )}
      </div>

      <header className="bg-zinc-900/40 backdrop-blur-md p-10 rounded-[3rem] border border-emerald-500/10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5"><Heart size={120}/></div>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
          {culture.replace(/-/g, ' ')} <span className="text-emerald-500">Pulse</span>
        </h1>
        <p className="text-zinc-500 text-xs mt-3 font-bold uppercase tracking-widest">Behavioral & Cultural Fit Arena</p>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 space-y-6">
          <Loader2 className="animate-spin text-emerald-500" size={60} />
          <p className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px]">Analyzing Cultural Fit...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((q, index) => (
            <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 bg-zinc-900/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] hover:border-emerald-500/30 transition-all group">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-emerald-500 font-black shrink-0">{index + 1}</div>
                <div className="prose prose-invert max-w-none prose-p:text-zinc-400 prose-strong:text-white">
                    <ReactMarkdown>{q}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}

          {showAnswers && answerKey && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-10 p-10 bg-emerald-600/5 border-2 border-emerald-500/20 rounded-[3rem] shadow-2xl">
              <div className="flex items-center gap-3 mb-6 text-emerald-500 font-black italic uppercase tracking-tighter">
                <Star size={24} /> <h3>STAR Method Strategies</h3>
              </div>
              <div className="prose prose-invert max-w-none prose-p:text-zinc-300 prose-strong:text-emerald-400">
                <ReactMarkdown>{answerKey}</ReactMarkdown>
              </div>
            </motion.div>
          )}

          <button onClick={() => window.location.reload()} className="w-full py-6 mt-10 bg-zinc-800 hover:bg-emerald-600 rounded-[2rem] font-black italic uppercase text-white transition-all shadow-2xl">
              Next 5 Situations
          </button>
        </div>
      )}
    </div>
  );
};

export default HRBehavioral;