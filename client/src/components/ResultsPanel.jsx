import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "../context/SearchContext";
import TagsPanel from "./TagsPanel";
// 1. Import the new SearchCard component
import SearchCard from "./SearchCard";

const ResultsPanel = ({ onResultClick }) => {
  const { searchResults, searchQuery, isSearching } = useSearch();

  return (
    <div className="flex flex-col h-full bg-surface text-text p-4 border-r border-border">
      <h2 className="text-xl font-bold mb-4 px-2">Explorer</h2>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {searchResults.length > 0 && (
            <motion.div>
              <h3 className="text-lg font-semibold mb-2 px-2">Results</h3>
              {/* 2. Replace the <ul> with a div that renders SearchCard */}
              <div className="flex flex-col">
                {searchResults.map((result, index) => (
                  <SearchCard
                    key={result.id}
                    result={result}
                    onResultClick={onResultClick}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isSearching && (
          <div className="flex justify-center items-center h-full">
            <p className="text-center text-text-dim mt-8">Searching...</p>
          </div>
        )}

        {!searchQuery && !isSearching && (
          <TagsPanel />
        )}
      </div>
    </div>
  );
};

export default ResultsPanel;