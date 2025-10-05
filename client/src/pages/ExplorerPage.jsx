import React from "react";
import { useSearch } from "../context/SearchContext";
import GlobalHeader from "../components/GlobalHeader";
import InspectorPanel from "../components/InspectorPanel";
import SearchCard from "../components/SearchCard";
import TagsPanel from "../components/TagsPanel";

const ExplorerPage = () => {
  const {
    setSelectedEntity,
    selectedEntity,
    searchResults,
    searchQuery,
    isSearching,
    setSearchQuery, // We need this for the TagsPanel
  } = useSearch();

  const handleResultClick = (result) => {
    setSelectedEntity(result);
  };

  const handleCloseInspector = () => {
    setSelectedEntity(null);
  };

  // This function determines what to show in the main content area
  const renderMainContent = () => {
    const hasResults = searchResults.length > 0;

    if (isSearching) {
      return (
        <div className="text-center text-muted-foreground mt-12">
          Searching for results...
        </div>
      );
    }

    // If a search has been made, show the results
    if (searchQuery && hasResults) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {searchResults.map((result, index) => (
            <SearchCard
              key={result.id}
              result={result}
              onResultClick={handleResultClick}
              index={index}
            />
          ))}
        </div>
      );
    }

    if (searchQuery && !hasResults) {
      return (
        <div className="text-center text-muted-foreground mt-12">
          No results found for &quot;{searchQuery}&quot;
        </div>
      );
    }

    // By default, when there is no search, show the Popular Topics
    return <TagsPanel onTagClick={(tag) => setSearchQuery(tag)} />;
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <GlobalHeader />
      <main className="flex flex-1 overflow-hidden">
        {/* === MAIN CONTENT AREA (Left and Center) === */}
        {/* This panel is scrollable and takes up more space when the inspector is hidden */}
        <div className="flex-1 p-6 overflow-y-auto">{renderMainContent()}</div>

        {/* === CONDITIONAL DETAILS PANEL (Right) === */}
        {/* This InspectorPanel only appears if an item has been selected */}
        {selectedEntity && (
          <div className="w-[35%] max-w-lg flex-shrink-0 border-l border-border p-4">
            <InspectorPanel
              entity={selectedEntity}
              onClose={handleCloseInspector}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default ExplorerPage;
