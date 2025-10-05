import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "../context/SearchContext";
import TagsPanel from "./TagsPanel"; // Import the new component

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
              <motion.ul className="space-y-1">
                {searchResults.map((result, index) => (
                  <motion.li
                    key={result.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => onResultClick(result)}
                    className="flex items-center p-2 rounded-md hover:bg-primary/10 cursor-pointer transition-colors"
                  >
                    <div className="mr-3 text-highlight">{result.icon}</div>
                    <div>
                      <p className="font-semibold">{result.id}</p>
                      <p className="text-sm text-text-dim">{result.type}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>

        {isSearching && (
          <p className="text-center text-text-dim mt-8">Searching...</p>
        )}

        {!searchQuery && !isSearching && (
          // When there's no search, show the TagsPanel
          <TagsPanel />
        )}
      </div>
    </div>
  );
};

export default ResultsPanel;
