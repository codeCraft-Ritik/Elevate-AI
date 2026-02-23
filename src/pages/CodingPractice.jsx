import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, Code2, Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import API from "../api/axios";

const CodingPractice = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answerKey, setAnswerKey] = useState(""); 
  const [showAnswers, setShowAnswers] = useState(false); 
  const [loading, setLoading] = useState(true);
  const [quotaHit, setQuotaHit] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setQuotaHit(false);

        // 1. Fetch 5 Coding Challenges
        const res = await API.post("/resume/chat", { 
          message: `ACT AS A SENIOR TECHNICAL INTERVIEWER. Generate exactly 5 coding questions for: ${topic}.
          STRUCTURE:
          1. Start every question with "QUESTION_START".
          2. After 5 questions, provide "ANSWER_KEY_START" with logic and complexity analysis.` 
        });
        
        const rawText = res.data.reply || "";
        const parts = rawText.split("ANSWER_KEY_START");
        const mainContent = parts[0] || "";
        const keyContent = parts[1] || "Logic optimization pending...";
        const questionArray = mainContent.split("QUESTION_START").filter(q => q.trim() !== "");
        
        setQuestions(questionArray);
        setAnswerKey(keyContent);

        // 2. NEW: Log specific Technical Arena visit
        await API.post("/analytics/track", { 
            category: "Coding", 
            task: topic, 
            score: 100 
        });

      } catch (err) {
        if (err.response && err.response.status === 429) setQuotaHit(true);
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
        {!loading && !quotaHit && (
          <button 
            onClick={() => setShowAnswers(!showAnswers)} 
            className="px-6 py-2 bg-purple-600/10 border border-purple-500/30 rounded-full text-purple-500 text-[10px] font-black uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all"
          >
            {showAnswers ? "Hide Logic" : "Reveal Solutions"}
          </button>
        )}
      </div>

      <header className="bg-zinc-900/40 backdrop-blur-md p-10 rounded-[3rem] border border-purple-500/10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5"><Code2 size={120}/></div>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
          {topic.replace(/-/g, ' ')} <span className="text-purple-500">Arena</span>
        </h1>
        <p className="text-zinc-500 text-xs mt-3 font-bold uppercase tracking-widest">Mastering Industry Standards</p>
      </header>

      {quotaHit ? (
        <div className="p-10 bg-purple-500/10 border-2 border-purple-500/20 rounded-[3rem] text-center space-y-4">
          <AlertCircle className="mx-auto text-purple-500" size={40} />
          <h3 className="text-xl font-black text-white uppercase italic">Neural Sync Paused</h3>
          <p className="text-zinc-400 text-sm">API Limit reached. Wait 30s.</p>
          <button onClick={() => window.location.reload()} className="px-8 py-3 bg-white text-black font-black rounded-2xl uppercase text-[10px]">Reconnect</button>
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center py-40 space-y-6">
          <Loader2 className="animate-spin text-purple-500" size={60} />
          <p className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px]">Initializing Arena...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((q, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="p-8 bg-zinc-900/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] hover:border-purple-500/30 transition-all group"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-purple-500 font-black shrink-0 group-hover:bg-purple-500 group-hover:text-white transition-all">
                    {index + 1}
                </div>
                <div className="prose prose-invert max-w-none prose-p:text-zinc-400 prose-strong:text-white">
                    <ReactMarkdown>{q}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}

          {showAnswers && answerKey && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="mt-10 p-10 bg-purple-600/5 border-2 border-purple-500/20 rounded-[3rem] shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="text-purple-500" size={24} />
                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Optimal Logic Key</h3>
              </div>
              <div className="prose prose-invert max-w-none prose-p:text-zinc-300 prose-strong:text-purple-400">
                <ReactMarkdown>{answerKey}</ReactMarkdown>
              </div>
            </motion.div>
          )}

          <button onClick={() => window.location.reload()} className="w-full py-6 mt-10 bg-zinc-800 hover:bg-purple-600 rounded-[2rem] font-black italic uppercase text-white transition-all shadow-2xl">
              Next 5 Challenges
          </button>
        </div>
      )}
    </div>
  );
};

export default CodingPractice;