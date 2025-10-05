import React from "react";
import { motion } from "framer-motion";
import { useSearch } from "../context/SearchContext";
import GlobalHeader from "../components/GlobalHeader";
import InspectorPanel from "../components/InspectorPanel";
import SearchCard from "../components/SearchCard";
import PopularTagsSidebar from "../components/PopularTagsSidebar";

// A new, internal component for a professional loading state.
const SearchCardSkeleton = () => (
  <div className="w-full p-4 rounded-lg border bg-card/50 animate-pulse">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 mt-1 bg-muted rounded-full w-8 h-8"></div>
      <div className="flex-1">
        <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-muted rounded w-full mb-1"></div>
        <div className="h-4 bg-muted rounded w-5/6 mb-3"></div>
        <div className="flex flex-wrap gap-2">
          <div className="h-6 bg-muted rounded-full w-20"></div>
          <div className="h-6 bg-muted rounded-full w-24"></div>
        </div>
      </div>
    </div>
  </div>
);

const ExplorerPage = () => {
  const {
    setSelectedEntity,
    selectedEntity,
    searchResults,
    searchQuery,
    isSearching,
    canLoadMore,
    loadMoreResults, // Correctly retrieved from the context
    totalResults,
  } = useSearch();

  const handleResultClick = (result) => {
    setSelectedEntity(result);
  };

  const handleCloseInspector = () => {
    setSelectedEntity(null);
  };

  const renderMainContent = () => {
    // Show skeleton loaders only on the initial search
    if (isSearching && searchResults.length === 0) {
      return (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <SearchCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (searchQuery && searchResults.length > 0) {
      return (
        <>
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Search Results</h2>
            <p className="text-muted-foreground">
              Showing {searchResults.length} of {totalResults} relevant
              documents for &quot;{searchQuery}&quot;
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {searchResults.map((result, index) => (
              <SearchCard
                key={result.id}
                result={result}
                onResultClick={handleResultClick}
                index={index}
              />
            ))}
          </div>

          {canLoadMore && (
            <div className="mt-6 text-center">
              <motion.button
                onClick={loadMoreResults}
                className="px-6 py-2 font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                disabled={isSearching}
              >
                {isSearching ? "Loading..." : "Load More Results"}
              </motion.button>
            </div>
          )}
        </>
      );
    }

    if (searchQuery && !isSearching) {
      return (
        <div className="text-center text-muted-foreground mt-12">
          <h3>No results found for &quot;{searchQuery}&quot;</h3>
          <p className="text-sm">
            Try a different search term or select a popular topic.
          </p>
        </div>
      );
    }

    // Default view with instructions
    return (
      <div className="text-center text-muted-foreground mt-12">
        <h2 className="text-2xl font-bold mb-2">
          Welcome to the Knowledge Engine
        </h2>
        <p>
          Use the search bar above or select a topic from the right sidebar to
          begin exploring.
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <GlobalHeader />
      <main className="flex flex-1 overflow-hidden">
        {selectedEntity && (
          <div className="w-[30%] max-w-md flex-shrink-0 border-r border-border p-4 custom-scrollbar overflow-y-auto">
            <InspectorPanel
              entity={selectedEntity}
              onClose={handleCloseInspector}
            />
          </div>
        )}

        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          {renderMainContent()}
        </div>

        <div className="w-[20%] max-w-xs border-l border-border">
          <PopularTagsSidebar />
        </div>
      </main>
    </div>
  );
};

export default ExplorerPage;
