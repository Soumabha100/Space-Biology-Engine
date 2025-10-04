import React from "react";
import { NavLink } from "react-router-dom";
import { Compass, Book, Zap } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Sidebar = () => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center p-3 my-2 rounded-lg transition-colors ${
      isActive
        ? "bg-primary/20 text-primary" // Simplified classes
        : "text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-surface"
    }`;

  return (
    <aside className="w-20 flex flex-col items-center bg-surface border-r border-gray-200 dark:border-gray-700 py-4">
      <div className="p-2 mb-4">
        <Zap className="h-8 w-8 text-primary" /> {/* Simplified class */}
      </div>
      <nav className="flex flex-col items-center flex-1">
        <NavLink to="/" className={navLinkClass} title="Knowledge Explorer">
          <Compass size={24} />
        </NavLink>
        <NavLink to="/resources" className={navLinkClass} title="Resource Hub">
          <Book size={24} />
        </NavLink>
      </nav>
      <div className="mt-auto">
        <ThemeToggle />
      </div>
    </aside>
  );
};

export default Sidebar;
