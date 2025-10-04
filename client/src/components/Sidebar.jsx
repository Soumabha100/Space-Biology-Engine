import React from "react";
import { NavLink } from "react-router-dom";
import { Compass, Book, Zap } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Sidebar = () => {
  const navLinkClass = ({ isActive }) =>
    `relative flex items-center justify-center h-12 w-12 rounded-lg transition-colors group ${
      isActive
        ? "text-primary bg-primary/20"
        : "text-text-dim hover:text-text hover:bg-surface"
    }`;

  return (
    <aside className="w-20 flex flex-col items-center bg-background border-r border-border py-4">
      <div className="p-2 mb-4">
        <Zap className="h-8 w-8 text-primary" />
      </div>
      <nav className="flex flex-col items-center flex-1 gap-y-2">
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
