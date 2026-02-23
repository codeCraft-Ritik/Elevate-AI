import { motion } from "framer-motion";
import { User, Lock, Bell, Camera, LogOut, BookOpen, Cpu, AlignLeft, Edit3 } from "lucide-react";
import { useState } from "react";
import API from '../api/axios';

const Settings = ({ onLogout }) => {
  // --- STATE MANAGEMENT ---
  const [profilePic, setProfilePic] = useState(localStorage.getItem('profilePic') || "");
  const [username, setUsername] = useState(localStorage.getItem('username') || "User");
  const [about, setAbout] = useState(localStorage.getItem('about') || "");
  const [college, setCollege] = useState(localStorage.getItem('college') || "");
  const [skills, setSkills] = useState(localStorage.getItem('skills') || "");
  
  const email = localStorage.getItem('email') || "";

  // --- SAVE PROFILE DATA TO BACKEND ---
  const handleSaveProfile = async () => {
    try {
      const skillsArray = skills.split(',').map(s => s.trim()).filter(s => s !== "");
      
      const response = await API.put('/auth/update-profile', { 
        email, 
        username, // Sends new name to backend
        about, 
        college, 
        skills: skillsArray 
      });
      
      // PERSIST IN LOCALSTORAGE
      localStorage.setItem('username', username);
      localStorage.setItem('about', about);
      localStorage.setItem('college', college);
      localStorage.setItem('skills', skills);
      
      alert("Neural profile updated successfully!");
    } catch (err) {
      alert("Failed to update profile details.");
    }
  };

  // --- PHOTO LOGIC PRESERVED ---
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;
      try {
        await API.put('/auth/update-profile-pic', { email, profilePic: base64String });
        localStorage.setItem('profilePic', base64String);
        setProfilePic(base64String);
        alert("Photo updated!");
      } catch (err) { alert("Upload failed."); }
    };
    reader.readAsDataURL(file);
  };

  const initial = username.charAt(0).toUpperCase();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-4xl mx-auto space-y-10 pb-20 px-4 sm:px-0"
    >
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold italic tracking-tight text-white uppercase leading-none">Profile Settings</h1>
          <p className="text-zinc-500 mt-2">Modify your simulation identity.</p>
        </div>
        <button 
          onClick={handleSaveProfile} 
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20"
        >
          Save All Changes
        </button>
      </header>

      {/* IDENTITY & PHOTO SECTION */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative z-10">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center overflow-hidden text-3xl font-bold text-white shadow-lg border border-white/10">
            {profilePic ? <img src={profilePic} className="w-full h-full object-cover" alt="Profile" /> : initial}
          </div>
          <label className="absolute -bottom-2 -right-2 p-2 bg-blue-600 border border-zinc-800 rounded-lg text-white cursor-pointer hover:bg-blue-700 transition-all shadow-xl">
            <Camera size={16} />
            <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
          </label>
        </div>
        <div className="flex-1 text-center md:text-left relative z-10 space-y-4">
           {/* NEW: USERNAME EDIT FIELD */}
           <div className="space-y-1.5">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Identity Name</label>
              <div className="relative max-w-xs mx-auto md:mx-0 group">
                <Edit3 className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors" size={14} />
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-2.5 pl-10 pr-4 text-white font-bold focus:outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
           </div>
           <p className="text-zinc-500 font-medium text-sm italic">{email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* ABOUT SECTION */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
          <div className="px-8 py-6 border-b border-zinc-800 flex items-center gap-3 bg-zinc-900/50">
            <AlignLeft className="text-blue-500" /> 
            <h3 className="font-bold italic uppercase tracking-wider text-white">About Me</h3>
          </div>
          <div className="p-8">
            <textarea 
              value={about} 
              onChange={(e) => setAbout(e.target.value)}
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 min-h-[140px] transition-all"
            />
          </div>
        </div>

        {/* EDUCATION & SKILLS SECTION */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
          <div className="px-8 py-6 border-b border-zinc-800 flex items-center gap-3 bg-zinc-900/50">
            <BookOpen className="text-purple-500" /> 
            <h3 className="font-bold italic uppercase tracking-wider text-white">Expertise</h3>
          </div>
          <div className="p-8 space-y-8">
            <div className="space-y-3">
              <label className="text-sm font-black text-zinc-500 uppercase tracking-widest ml-1">University</label>
              <input 
                type="text" 
                value={college} 
                onChange={(e) => setCollege(e.target.value)}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-black text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Cpu size={14}/> Skills (Comma separated)
              </label>
              <input 
                type="text" 
                value={skills} 
                onChange={(e) => setSkills(e.target.value)}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* LOGOUT */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h4 className="font-bold text-white uppercase italic tracking-tight">Security Zone</h4>
            <p className="text-zinc-600 text-xs font-black uppercase tracking-widest mt-1">End existing simulation session</p>
          </div>
          <button onClick={onLogout} className="w-full md:w-auto px-10 py-4 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-xl font-black italic uppercase transition-all flex items-center justify-center gap-2 border border-red-500/20 shadow-xl">
            Logout Account <LogOut size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;