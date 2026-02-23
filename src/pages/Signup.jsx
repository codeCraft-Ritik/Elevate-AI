import { motion } from "framer-motion";
import { User, Mail, Lock, ShieldCheck, ArrowRight, EyeOff } from "lucide-react";
import { useState, useMemo } from "react";
import API from '../api/axios';

const Signup = ({ onSwitch, onSignupSuccess }) => {
  const [step, setStep] = useState(1); // 1: Info, 2: OTP Verification
  const [formData, setFormData] = useState({ username: "", email: "", password: "", otp: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // --- PRESERVED: NEURAL PARTICLE SYSTEM ---
  const particles = useMemo(() => 
    Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 3,
      duration: Math.random() * 10 + 5 
    })), []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await API.post('/auth/register', formData);
      setStep(2); // Success, move to OTP entry
    } catch (err) { 
      alert(err.response?.data?.message || "Registration failed"); 
    } finally { 
      setIsLoading(false); 
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await API.post('/auth/verify-otp', { email: formData.email, otp: formData.otp });
      alert("Verification Successful! Profile Initialized.");
      onSignupSuccess();
    } catch (err) { 
      alert("Invalid OTP Code."); 
    } finally { 
      setIsLoading(false); 
    }
  };

  return (
    <div className="h-screen w-full bg-[#050507] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* --- PRESERVED: DYNAMIC BACKGROUND ANIMATIONS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: `${p.x}%`, y: `${p.y}%`, opacity: 0.3 }}
            animate={{ 
              y: [`${p.y}%`, `${(p.y + 30) % 100}%`, `${p.y}%`], 
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1] 
            }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
            className="absolute bg-emerald-500 rounded-full blur-[2px]"
            style={{ width: p.size, height: p.size }}
          />
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_60%)]" />
      </div>

      <div className="relative flex items-center justify-center w-full max-w-[420px]">
        {/* --- PRESERVED: HOLOGRAPHIC SCANNING LINES --- */}
        <div className="absolute left-[-60vw] right-[50%] h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_rgba(37,99,235,0.9)] z-0 opacity-70" />
        <div className="absolute left-[50%] right-[-60vw] h-[2px] bg-gradient-to-l from-transparent via-blue-500 to-transparent shadow-[0_0_20px_rgba(37,99,235,0.9)] z-0 opacity-70" />

        {/* --- PRESERVED: ORBITAL ROTATION EFFECT --- */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-[125%] h-[125%] rounded-[4rem] border-t-2 border-emerald-500/40 blur-[3px] z-0"
        />

        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full bg-[#0d0d0f]/98 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-[0_0_120px_rgba(0,0,0,1)] relative z-10"
        >
          <div className="text-center mb-8">
            <h4 className="text-2xl font-black italic tracking-tighter text-white uppercase">
              {step === 1 ? "Initialize Profile" : "Neural Verification"}
            </h4>
            <p className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.3em] mt-2">
              {step === 1 ? "Start your evolution" : "Check your inbox for the access key"}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-1">Username</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-blue-500 transition-colors" size={16} />
                  <input 
                    type="text" 
                    required 
                    placeholder="Username"
                    className="w-full bg-[#141416] border border-zinc-800/50 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/40 transition-all" 
                    value={formData.username} 
                    onChange={(e) => setFormData({...formData, username: e.target.value})} 
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-1">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-blue-500 transition-colors" size={16} />
                  <input 
                    type="email" 
                    required 
                    placeholder="Email Address"
                    className="w-full bg-[#141416] border border-zinc-800/50 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/40 transition-all" 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-1">Access Key</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-emerald-500 transition-colors" size={16} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required 
                    placeholder="••••••••"
                    className="w-full bg-[#141416] border border-zinc-800/50 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500/40 transition-all" 
                    value={formData.password} 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-700 hover:text-white transition-colors">
                    <EyeOff size={16} />
                  </button>
                </div>
              </div>
              <motion.button 
                disabled={isLoading} 
                whileHover={{ y: -2, boxShadow: "0 0 25px rgba(37,99,235,0.5)" }} 
                whileTap={{ scale: 0.98 }} 
                type="submit" 
                className="w-full py-4 bg-gradient-to-r from-blue-700 to-indigo-800 rounded-xl font-black text-white italic uppercase text-sm shadow-lg flex items-center justify-center gap-2 mt-2 transition-all"
              >
                {isLoading ? "Generating OTP..." : "Get Verification Code"} <ArrowRight size={18} />
              </motion.button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-4 text-center">
                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">Enter 6-Digit Neural Code</label>
                <input 
                  type="text" 
                  maxLength="6" 
                  required 
                  className="w-full bg-[#141416] border border-zinc-800/50 rounded-xl py-5 text-center text-4xl font-black tracking-[0.5em] text-emerald-500 focus:outline-none focus:border-emerald-500/40 transition-all" 
                  value={formData.otp} 
                  onChange={(e) => setFormData({...formData, otp: e.target.value})} 
                />
              </div>
              <motion.button 
                disabled={isLoading} 
                whileHover={{ y: -2, boxShadow: "0 0 25px rgba(16,185,129,0.5)" }} 
                whileTap={{ scale: 0.98 }} 
                type="submit" 
                className="w-full py-4 bg-emerald-600 rounded-xl font-black text-white italic uppercase text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                {isLoading ? "Verifying..." : "Verify & Initialize"} <ShieldCheck size={18} />
              </motion.button>
            </form>
          )}

          <div className="mt-8 text-center pt-6 border-t border-zinc-800/50">
            <button 
              onClick={onSwitch} 
              className="text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-blue-500 transition-colors"
            >
              Existing Member? Sign In
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;