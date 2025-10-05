import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to 'dark'
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove the opposite theme class
    const oldTheme = theme === 'dark' ? 'light' : 'dark';
    root.classList.remove(oldTheme);

    // Add the current theme class to the <html> element
    root.classList.add(theme);

    // Save the theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};