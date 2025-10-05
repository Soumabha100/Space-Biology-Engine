import React, { useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useSearch } from "../context/SearchContext";
import { useDebounce } from "../hooks/useDebounce";

const GlobalHeader = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const debouncedSearchQuery = useDebounce(searchQuery, 300); // 300ms debounce delay

  useEffect(() => {
    // This will trigger the search in the context, which fetches the data
    // The actual API call is managed by the SearchContext
  }, [debouncedSearchQuery]);

  return (
    <header className="flex items-center justify-between p-4 border-b border-border bg-background-secondary">
      <h1 className="text-xl font-bold">Space Biology Engine</h1>
      <div className="relative w-full max-w-md">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" />
        <input
          type="text"
          placeholder="Search for papers, diseases, or publications..."
          className="w-full pl-10 pr-4 py-2 rounded-md bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>{/* Other header items can go here */}</div>
    </header>
  );
};

export default GlobalHeader;
