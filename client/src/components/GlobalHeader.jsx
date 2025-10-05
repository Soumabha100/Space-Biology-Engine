import React from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useSearch } from "../context/SearchContext";

const GlobalHeader = () => {
  const { searchQuery, setSearchQuery } = useSearch();

  // This handler correctly updates the search query as you type
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // This handler clears the search query
  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <header className="flex items-center justify-between p-4 border-b border-border bg-card flex-shrink-0">
      <h1 className="text-xl font-bold text-primary hidden sm:block">
        Space Biology Engine
      </h1>

      {/* --- SEARCH BAR FIXES --- */}
      <div className="relative w-full max-w-lg mx-4">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search for experiments, topics, or genes..."
          className="w-full pl-10 pr-10 py-2 rounded-md bg-background border-border focus:outline-none focus:ring-2 focus:ring-ring"
          value={searchQuery}
          onChange={handleInputChange} // Correctly wired to the handler
        />
        {/* This is the new Clear button. It only shows if there's text. */}
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <FiX size={20} />
          </button>
        )}
      </div>
      {/* --- END OF FIXES --- */}

    </header>
  );
};

export default GlobalHeader;
