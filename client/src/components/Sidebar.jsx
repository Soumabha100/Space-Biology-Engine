import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Moon,
  Sun,
  Rocket,
  BookOpen,
  ChevronsRight,
  ChevronsLeft,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext"; // Assuming your context hook is named this

const Sidebar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`relative h-screen bg-surface border-r border-border flex flex-col justify-between transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      {/* Top Section */}
      <div>
        <div className="flex items-center justify-center h-20 border-b border-border">
          <Rocket size={32} className="text-primary" />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col p-4 space-y-2">
          <SidebarItem
            icon={<Rocket size={20} />}
            text="Explorer"
            to="/explorer"
            active={location.pathname === "/explorer"}
            expanded={isExpanded}
          />
          <SidebarItem
            icon={<BookOpen size={20} />}
            text="Resources"
            to="/resources"
            active={location.pathname === "/resources"}
            expanded={isExpanded}
          />
        </nav>
      </div>

      {/* Bottom Theme Toggle */}
      <div className="flex flex-col items-center p-4 space-y-2 border-t border-border">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-full h-12 rounded-lg text-text-dim hover:bg-primary/10 hover:text-primary transition-colors"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </aside>
  );
};

// Helper component for sidebar items
const SidebarItem = ({ icon, text, to, active, expanded }) => {
  return (
    <Link
      to={to}
      className={`flex items-center p-3 my-1 rounded-lg transition-colors ${
        active
          ? "bg-primary text-white shadow-lg"
          : "text-text-dim hover:bg-primary/10 hover:text-primary"
      }`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-32 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
    </Link>
  );
};

export default Sidebar;
