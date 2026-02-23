import { motion } from "framer-motion";
import { Lock, ArrowRight, EyeOff, Mail, ShieldCheck } from "lucide-react";
import { useState, useMemo } from "react";
import API from "../api/axios";

const Login = ({ onLoginSuccess, onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const particles = useMemo(
    () =>
      Array.from({ length: 35 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 3,
        duration: Math.random() * 10 + 5,
      })),
    []
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      const data = response.data;

      // Store token safely
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      // Support both backend response formats
      if (data?.user) {
        localStorage.setItem("username", data.user.username || "");
        localStorage.setItem("email", data.user.email || email);
        localStorage.setItem("profilePic", data.user.profilePic || "");
        localStorage.setItem("about", data.user.about || "");
        localStorage.setItem("college", data.user.college || "");
        localStorage.setItem(
          "skills",
          data.user.skills ? data.user.skills.join(", ") : ""
        );
      } else {
        localStorage.setItem("username", data.username || "");
        localStorage.setItem("email", data.email || email);
        localStorage.setItem("profilePic", data.profilePic || "");
        localStorage.setItem("about", data.about || "");
        localStorage.setItem("college", data.college || "");
        localStorage.setItem(
          "skills",
          data.skills ? data.skills.join(", ") : ""
        );
      }

      onLoginSuccess();
    } catch (err) {
      console.error("Login Error:", err);
      alert(err.response?.data?.message || "Authentication failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-[#050507] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: `${p.x}%`, y: `${p.y}%`, opacity: 0.3 }}
            animate={{
              y: [`${p.y}%`, `${(p.y + 30) % 100}%`, `${p.y}%`],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bg-blue-600 rounded-full blur-[2px]"
            style={{ width: p.size, height: p.size }}
          />
        ))}
      </div>

      <div className="relative flex items-center justify-center w-full max-w-[420px]">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full bg-[#0d0d0f]/98 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-[0_0_120px_rgba(0,0,0,1)] relative z-10"
        >
          <div className="text-center mb-8">
            <h4 className="text-2xl font-black italic tracking-tighter text-white uppercase leading-none">
              Neural Access
            </h4>
            <p className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.3em] mt-2">
              Authorized Personnel Only
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700" size={16} />
              <input
                type="email"
                required
                placeholder="Email Address"
                className="w-full bg-[#141416] border border-zinc-800/50 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700" size={16} />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full bg-[#141416] border border-zinc-800/50 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-700"
              >
                <EyeOff size={16} />
              </button>
            </div>

            <motion.button
              disabled={isLoading}
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-700 to-indigo-800 rounded-xl font-black text-white text-sm"
            >
              {isLoading ? "Authenticating..." : "Enter Simulation"} <ArrowRight size={18} />
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={onSwitch}
              className="text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-blue-500"
            >
              New User? Create Profile
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;