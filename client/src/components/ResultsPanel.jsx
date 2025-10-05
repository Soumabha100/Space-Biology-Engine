import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "../context/SearchContext";
import TagsPanel from "./TagsPanel";
import SearchCard from "./SearchCard";

const ResultsPanel = ({ onResultClick }) => {
  const { searchResults, searchQuery, isSearching } = useSearch();

  const showTags = !searchQuery && !isSearching;
  const showResults = searchResults.length > 0;
  const showSearching = isSearching;
  const showNoResults =
    !isSearching && searchQuery && searchResults.length === 0;

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border flex-shrink-0">
        <h2 className="text-xl font-bold">Explorer</h2>
        <p className="text-sm text-muted-foreground">
          Select an item to view details.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {showSearching && (
          <div className="text-center text-muted-foreground mt-8">
            Searching...
          </div>
        )}

        {showTags && <TagsPanel />}

        {showResults && (
          <AnimatePresence>
            <div>
              {searchResults.map((result, index) => (
                <SearchCard
                  key={result.id}
                  result={result}
                  onResultClick={onResultClick}
                  index={index}
                />
              ))}
            </div>
          </AnimatePresence>
        )}

        {showNoResults && (
          <div className="text-center text-muted-foreground mt-8">
            No results found for "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPanel;
