import React, { useState } from "react";
import { Search } from "lucide-react";
import { useSearch } from "../context/SearchContext";
import { useDebounce } from "../hooks/useDebounce";

const GlobalHeader = () => {
  const { performSearch } = useSearch();
  const [inputValue, setInputValue] = useState("");

  useDebounce(() => performSearch(inputValue), 500, [inputValue]);

  return (
    // 1. Remove the 'absolute' positioning classes
    <header className="flex justify-center p-4 z-10 bg-background border-b border-border">
      <div className="relative w-full max-w-xl">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim"
          size={20}
        />
        <input
          type="text"
          placeholder="Search for genes, diseases, or publications..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          // 2. Adjust styling for a cleaner look
          className="w-full pl-12 pr-4 py-3 rounded-lg bg-surface border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-shadow shadow-md"
        />
      </div>
    </header>
  );
};

export default GlobalHeader;