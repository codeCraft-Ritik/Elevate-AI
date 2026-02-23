import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ShieldCheck, ArrowLeft, Brain, Eye, EyeOff, AlertTriangle } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import API from "../api/axios";

const AptitudePractice = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answerKey, setAnswerKey] = useState(""); 
  const [showAnswers, setShowAnswers] = useState(false); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(false);
        
        // 1. Fetch 5 Questions from Gemini
        const res = await API.post("/resume/chat", { 
          message: `ACT AS AN ELITE HR INTERVIEWER. Generate exactly 5 separate aptitude questions for: ${topic}.
          STRUCTURE:
          1. Start every question with "QUESTION_START".
          2. List options (A, B, C, D) vertically.
          3. After the 5 questions, provide "ANSWER_KEY_START" followed by short explanations.` 
        });
        
        const rawText = res.data.reply || "";
        const parts = rawText.split("ANSWER_KEY_START");
        const mainContent = parts[0] || "";
        const keyContent = parts[1] || "Solutions ready.";
        const questionArray = mainContent.split("QUESTION_START").filter(q => q.trim() !== "");
        
        setQuestions(questionArray);
        setAnswerKey(keyContent);

        // 2. NEW: Log specific Topic Activity to Analytics
        // This ensures "Coding-Decoding" vs "Syllogism" shows up correctly
        await API.post("/analytics/track", { 
            category: "Aptitude", 
            task: topic, 
            score: 100 
        });

      } catch (err) {
        if (err.response && err.response.status === 429) setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [topic]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 px-4">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/mock-test')} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all uppercase text-[10px] font-black tracking-widest">
           <ArrowLeft size={14}/> Back to Arena
        </button>
        {!loading && !error && (
          <button 
            onClick={() => setShowAnswers(!showAnswers)} 
            className="px-6 py-2 bg-blue-600/10 border border-blue-500/30 rounded-full text-blue-500 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
          >
            {showAnswers ? <><EyeOff size={14}/> Hide Key</> : <><Eye size={14}/> Reveal Answers</>}
          </button>
        )}
      </div>

      <header className="bg-zinc-900/40 backdrop-blur-md p-10 rounded-[3rem] border border-blue-500/10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5"><Brain size={120}/></div>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
          {topic.replace(/-/g, ' ')} <span className="text-blue-500">Vault</span>
        </h1>
        <p className="text-zinc-500 text-xs mt-3 font-bold uppercase tracking-widest">Authorized Aptitude Assessment</p>
      </header>

      {error ? (
        <div className="p-10 bg-red-500/10 border-2 border-red-500/20 rounded-[3rem] text-center space-y-4">
          <AlertTriangle className="mx-auto text-red-500" size={40} />
          <h3 className="text-xl font-black text-white uppercase italic">Quota Reached</h3>
          <p className="text-zinc-400 text-sm">Please wait 30s for the Neural Engine to reset.</p>
          <button onClick={() => window.location.reload()} className="px-8 py-3 bg-white text-black font-black rounded-2xl uppercase text-[10px]">Retry Now</button>
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center py-40 space-y-6">
          <Loader2 className="animate-spin text-blue-500" size={60} />
          <p className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">Accessing Vault...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((q, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="p-8 bg-zinc-900/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] hover:border-blue-500/30 transition-all group"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-blue-500 font-black shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    {index + 1}
                </div>
                <div className="prose prose-invert max-w-none prose-p:text-zinc-400 prose-p:leading-relaxed prose-strong:text-white">
                    <ReactMarkdown>{q}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}

          {showAnswers && answerKey && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="mt-10 p-10 bg-blue-600/5 border-2 border-blue-500/20 rounded-[3rem] shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="text-blue-500" size={24} />
                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Verified Solutions</h3>
              </div>
              <div className="prose prose-invert max-w-none prose-p:text-zinc-300 prose-strong:text-blue-400">
                <ReactMarkdown>{answerKey}</ReactMarkdown>
              </div>
            </motion.div>
          )}

          <button onClick={() => window.location.reload()} className="w-full py-6 mt-10 bg-zinc-800 hover:bg-blue-600 rounded-[2rem] font-black italic uppercase text-white transition-all shadow-2xl">
              Regenerate (5 New Questions)
          </button>
        </div>
      )}
    </div>
  );
};

export default AptitudePractice;