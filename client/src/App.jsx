import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes/approutes";
import Sidebar from "./components/Sidebar"; // if you use sidebar


function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    // apply theme class to <html> or <body>
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Router>
      <div className="flex">
        {/* Sidebar with Theme Toggle */}
        <Sidebar theme={theme} toggleTheme={toggleTheme} />

        {/* Whole page content respects theme */}
        <main className="flex-1 min-h-screen bg-background text-text transition-colors duration-300">
          <AppRouter />
        </main>
      </div>
    </Router>
  );
}

export default App;
