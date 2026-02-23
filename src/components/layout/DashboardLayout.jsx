import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useState } from "react";

const DashboardLayout = ({ children, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0a0a0c] text-white overflow-hidden relative">
      {/* ADAPTIVE SIDEBAR: Drawer on mobile */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <Sidebar onLogout={onLogout} closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        
        {/* MAIN SCROLL AREA: Adjusted padding for mobile safety */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden px-2 sm:px-8 lg:px-12 py-6 sm:py-12">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;