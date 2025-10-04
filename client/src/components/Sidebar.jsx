import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ theme, toggleTheme }) => {
  const location = useLocation();

  return (
    <aside className="bg-surface text-text w-64 min-h-screen flex flex-col shadow-xl border-r border-gray-300 dark:border-gray-700 transition-colors duration-300">
      {/* App Title */}
      <div className="px-6 py-5 text-2xl font-bold border-b border-gray-300 dark:border-gray-700">
        🚀 Space Explorer
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col p-4 space-y-3 flex-1">
        <Link
          to="/explorer"
          className={`px-3 py-2 rounded-md text-lg transition-all duration-200 ${
            location.pathname === "/explorer"
              ? "bg-primary text-white font-semibold shadow-md"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          🌌 Explorer Page
        </Link>

        <Link
          to="/resources"
          className={`px-3 py-2 rounded-md text-lg transition-all duration-200 ${
            location.pathname === "/resources"
              ? "bg-primary text-white font-semibold shadow-md"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          📚 Resources Hub
        </Link>
      </nav>

      {/* Theme Toggle Button */}
      <div className="p-4 border-t border-gray-300 dark:border-gray-700">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-primary text-white rounded-lg font-semibold hover:opacity-90 active:scale-95 transition-transform duration-200"
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
