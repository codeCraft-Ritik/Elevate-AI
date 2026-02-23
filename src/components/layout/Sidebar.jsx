import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, BrainCircuit, BarChart3, Settings, X, Zap } from "lucide-react";

const Sidebar = ({ closeSidebar }) => {
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard size={22} />, label: "Dashboard", path: "/dashboard" },
    { icon: <FileText size={22} />, label: "Resume Builder", path: "/resume" },
    { icon: <BrainCircuit size={22} />, label: "Mock Interview", path: "/mock-test" },
    { icon: <BarChart3 size={22} />, label: "Analytics", path: "/analytics" },
  ];

  return (
    <motion.div 
      initial={{ x: -100 }} animate={{ x: 0 }}
      className="w-72 bg-[#0d0d0f] border-r border-zinc-800 flex flex-col h-full z-50 relative"
    >
      <button 
        onClick={closeSidebar} 
        className="lg:hidden absolute top-10 right-6 p-2 text-zinc-500 hover:text-white"
      >
        <X size={24} />
      </button>

      <div className="p-10">
        <Link to="/dashboard" onClick={closeSidebar} className="flex items-center gap-4 group">
          <motion.div 
            whileHover={{ rotate: 360 }}
            className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/20"
          >
            E
          </motion.div>
          <span className="text-2xl font-black text-white tracking-tighter group-hover:text-blue-400 transition-colors">
            ElevateAI
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-6 space-y-3">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              to={item.path} 
              key={index} 
              onClick={closeSidebar}
            >
              <motion.div
                whileHover={{ x: 5 }}
                className={`relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                  isActive ? "text-blue-500 font-bold" : "text-zinc-500 hover:text-zinc-200"
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-blue-600/10 border border-blue-600/20 rounded-2xl"
                  />
                )}
                <span className="relative z-10">{item.icon}</span>
                <span className="relative z-10 font-medium">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-zinc-800 space-y-2">
        <Link 
          to="/settings" 
          onClick={closeSidebar} 
          className={`flex items-center gap-4 px-5 py-3 rounded-xl ${location.pathname === '/settings' ? 'text-blue-500 bg-blue-600/5' : 'text-zinc-500 hover:text-white'}`}
        >
          <Settings size={20} /> <span className="font-medium">Settings</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default Sidebar;