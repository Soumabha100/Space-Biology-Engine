import React from "react";
import { Search } from "lucide-react";
import { useSearch } from "../context/SearchContext";

const GlobalHeader = () => {
  const { performSearch } = useSearch();

  return (
    <header className="absolute top-0 left-0 right-0 flex justify-center p-4 z-10 pointer-events-none">
      <div className="relative w-full max-w-xl pointer-events-auto">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim"
          size={20}
        />
        <input
          type="text"
          placeholder="Search publications, genes, stressors..."
          className="w-full pl-12 pr-4 py-3 rounded-lg bg-surface border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-shadow shadow-lg"
          onChange={(e) => performSearch(e.target.value)}
        />
      </div>
    </header>
  );
};

export default GlobalHeader;
