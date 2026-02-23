import { Search, Bell, Menu } from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  // --- DYNAMIC USER INITIALS ---
  const username = localStorage.getItem('username') || "User";
  const profilePic = localStorage.getItem('profilePic') || "";
  const initial = username.charAt(0).toUpperCase();

  return (
    <nav className="h-20 border-b border-zinc-800 bg-[#0a0a0c]/80 backdrop-blur-xl sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <button onClick={toggleSidebar} className="lg:hidden p-2 text-zinc-400 hover:text-white bg-zinc-900 rounded-xl">
          <Menu size={20} />
        </button>
        <div className="relative w-full max-w-xs sm:max-w-md hidden xs:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-11 pr-4 focus:outline-none focus:border-blue-500 transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2.5 text-zinc-400 hover:text-white bg-zinc-900 rounded-xl">
          <Bell size={20} />
        </button>
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center overflow-hidden font-black text-white uppercase shadow-lg border border-white/10">
          {profilePic ? (
            <img src={profilePic} alt="User" className="w-full h-full object-cover" />
          ) : (
            initial
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;