import React, { useState } from "react";
import { Search } from "lucide-react";
import { useSearch } from "../context/SearchContext";
import { useDebounce } from "../hooks/useDebounce"; // We will create this hook next

const GlobalHeader = () => {
  const { performSearch } = useSearch();
  const [inputValue, setInputValue] = useState("");

  // Debounce the search input to avoid excessive API calls
  useDebounce(() => performSearch(inputValue), 500, [inputValue]);

  return (
    <header className="absolute top-0 left-0 right-0 flex justify-center p-4 z-10 pointer-events-none">
      <div className="relative w-full max-w-xl pointer-events-auto">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim"
          size={20}
        />
        <input
          type="text"
          placeholder="Search for genes, diseases, or publications..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-lg bg-surface border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-shadow shadow-lg"
        />
      </div>
    </header>
  );
};

export default GlobalHeader;
