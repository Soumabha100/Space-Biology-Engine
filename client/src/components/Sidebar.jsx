import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Rocket, Book } from "lucide-react";

const Sidebar = ({ isDark, toggleTheme }) => {
  const location = useLocation();

  return (
    <aside
      className={`sidebar w-64 min-h-screen flex flex-col justify-between transition-all duration-300`}
    >
      {/* Top Section */}
      <div>
        <div className="px-6 py-5 text-2xl font-bold border-b border-gray-300 dark:border-gray-700 text-center">
          🚀 Space Explorer
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col p-5 space-y-3">
          <Link
            to="/explorer"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
              location.pathname === "/explorer"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <Rocket size={18} />
            Explorer Page
          </Link>

          <Link
            to="/resources"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
              location.pathname === "/resources"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <Book size={18} />
            Resources Hub
          </Link>
        </nav>
      </div>

      {/* Bottom Theme Toggle */}
      <div className="p-5 border-t border-gray-300 dark:border-gray-700">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center gap-2 btn-primary transition-all duration-200"
        >
          {isDark ? (
            <>
              <Sun size={18} />
              Light Mode
            </>
          ) : (
            <>
              <Moon size={18} />
              Dark Mode
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
