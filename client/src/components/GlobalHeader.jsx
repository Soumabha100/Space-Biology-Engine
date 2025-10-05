import React, { useState, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useSearch } from "../context/SearchContext";

const GlobalHeader = () => {
  // --- START OF THE FIX ---
  // Only get what's needed: searchQuery for display and setSearchQuery to update it.
  const { searchQuery, setSearchQuery } = useSearch();
  const [inputValue, setInputValue] = useState(searchQuery);

  // Update the context's searchQuery whenever the local inputValue changes.
  // The debouncing is now handled entirely within the SearchContext.
  useEffect(() => {
    setSearchQuery(inputValue);
  }, [inputValue, setSearchQuery]);

  // When the global searchQuery is cleared (e.g., by clicking a tag), update the input field.
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);
  // --- END OF THE FIX ---

  const handleClear = () => {
    setInputValue("");
  };

  return (
    <header className="flex items-center justify-between p-4 bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
      <div className="text-2xl font-bold text-primary">
        Space Biology Knowledge Engine
      </div>
      <div className="relative w-full max-w-md">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by ID, #tag, or keyword..."
          className="w-full pl-12 pr-10 py-2 rounded-full bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <FiX />
          </button>
        )}
      </div>
    </header>
  );
};

export default GlobalHeader;
