import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Send, Bot, ShieldCheck, 
  User, Zap, MessageSquare, RefreshCcw 
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import API from "../../api/axios"; // Restored API connection

const AIAssistant = () => {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // --- INITIAL CHAT STATE ---
  const [chat, setChat] = useState([
    { 
      role: 'bot', 
      content: "Hello **Ritik**. I am **PrepAI**, your HR Interview Architect. Ask me anything about your resume or how to apply the **STAR method** to your experience." 
    }
  ]);

  // Auto-scroll logic preserved
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, isTyping]);

  // --- RESTORED GEMINI API CONNECTION ---
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setChat(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    try {
      // Connecting to your Gemini-powered backend endpoint
      const response = await API.post("/resume/chat", { 
        message: currentInput,
        history: chat // Sending history for context-aware suggestions
      });

      const botResponse = { 
        role: 'bot', 
        content: response.data.reply // Rendering the Gemini response
      };
      
      setChat(prev => [...prev, botResponse]);
    } catch (err) {
      console.error("Gemini API Error:", err);
      setChat(prev => [...prev, { 
        role: 'bot', 
        content: "⚠️ **Neural Link Interrupted.** Please check your Gemini API key or connection." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0d0d0f]/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[50px] pointer-events-none" />

      {/* HEADER: PRESERVED UI */}
      <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="p-2.5 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl text-white shadow-lg">
              <Bot size={22} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[#0d0d0f] rounded-full" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase italic tracking-[0.15em] text-white">PrepAI Assistant</h3>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest animate-pulse">Neural Link Active</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setChat([chat[0]])} 
            className="p-2 text-zinc-500 hover:text-white transition-colors"
          >
            <RefreshCcw size={16} />
          </button>
          <ShieldCheck size={18} className="text-blue-500/50" />
        </div>
      </div>

      {/* CHAT AREA: BEAUTIFUL MARKDOWN RENDERING */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth scrollbar-hide"
      >
        <AnimatePresence>
          {chat.map((msg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex items-start gap-3 ${msg.role === 'bot' ? 'justify-start' : 'justify-end flex-row-reverse'}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                msg.role === 'bot' ? 'bg-blue-600/10 border-blue-500/20 text-blue-500' : 'bg-zinc-800 border-zinc-700 text-zinc-400'
              }`}>
                {msg.role === 'bot' ? <Zap size={14} /> : <User size={14} />}
              </div>

              <div className={`max-w-[85%] p-5 rounded-3xl relative ${
                msg.role === 'bot' 
                ? 'bg-zinc-900/50 border border-white/5 text-zinc-300 rounded-tl-none' 
                : 'bg-blue-600 text-white rounded-tr-none'
              }`}>
                {/* RENDER BEAUTIFUL MARKDOWN CONTENT */}
                <div className={`text-sm leading-relaxed prose prose-invert max-w-none 
                  ${msg.role === 'bot' ? 'prose-p:text-zinc-400' : 'prose-p:text-white'}
                  prose-strong:text-blue-400 prose-strong:font-black
                  prose-headings:text-white prose-headings:font-black prose-headings:italic
                  prose-ul:my-2 prose-li:my-1
                `}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 p-4 bg-white/5 rounded-2xl w-fit">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
          </motion.div>
        )}
      </div>

      {/* INPUT AREA: PRESERVED DESIGN */}
      <div className="p-6 bg-white/[0.02] border-t border-white/5">
        <div className="relative group">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Query PrepAI Neural Engine..."
            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-2xl py-4 pl-6 pr-14 text-xs text-white focus:outline-none focus:border-blue-500/50 transition-all italic relative z-10"
          />
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all z-20"
          >
            <Send size={16} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;