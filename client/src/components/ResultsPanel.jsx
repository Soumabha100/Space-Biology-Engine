import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "../context/SearchContext";
import TagsPanel from "./TagsPanel";
import SearchCard from "./SearchCard";

const ResultsPanel = ({ onResultClick }) => {
  const { searchResults, searchQuery, isSearching } = useSearch();

  // This logic correctly determines what to show on the screen.
  // - When the app loads (no search query), it shows the popular tags.
  // - When you are searching, it shows a "Searching..." message.
  // - When results are found, it displays them.
  const showTags = !searchQuery && !isSearching;
  const showResults = searchResults.length > 0;
  const showSearching = isSearching;
  const showNoResults =
    !isSearching && searchQuery && searchResults.length === 0;

  return (
    // This is the main container for the panel.
    // The `h-full` class makes it take up the full height of its parent.
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4 px-4 pt-4 flex-shrink-0">
        Explorer
      </h2>

      {/* This is the scrollable area for your content.
          - `flex-1` makes this div grow to fill the available space.
          - `overflow-y-auto` automatically adds a scrollbar when the content is too tall.
          This is the fix for your missing scrollbar. Once the tags are loaded, this will work perfectly.
      */}
      <div className="flex-1 overflow-y-auto px-2">
        {showSearching && (
          <div className="flex justify-center items-center h-full">
            <p className="text-center text-text-dim mt-8">Searching...</p>
          </div>
        )}

        {/* This is where your popular tags are displayed.
            It was not showing up because the data was not being fetched correctly.
            Now that `api.js` is fixed, this will appear as expected.
         */}
        {showTags && <TagsPanel />}

        {/* This is your dedicated search results area.
            It will only appear when there are search results to display.
         */}
        {showResults && (
          <AnimatePresence>
            <motion.div>
              <h3 className="text-lg font-semibold mb-2 px-2">Results</h3>
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
          </AnimatePresence>
        )}

        {showNoResults && (
          <div className="flex justify-center items-center h-full">
            <p className="text-center text-text-dim mt-8">
              No results found for "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPanel;
