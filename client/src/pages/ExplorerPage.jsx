import React, { useState } from "react";
import { useSearch } from "../context/SearchContext";
import GlobalHeader from "../components/GlobalHeader";
import ResultsPanel from "../components/ResultsPanel";
import InspectorPanel from "../components/InspectorPanel"; // You might want to integrate this differently later

const ExplorerPage = () => {
  const { setSelectedEntity, selectedEntity } = useSearch();

  const handleResultClick = (result) => {
    setSelectedEntity(result);
  };

  const handleCloseInspector = () => {
    setSelectedEntity(null);
  };

  return (
    <div className="flex flex-col h-screen bg-background text-text-primary">
      {/* The global header with the search bar stays at the top */}
      <GlobalHeader />

      <main className="flex-1 flex container mx-auto p-4 gap-4">
        {/* The main content area where results or tags will be shown */}
        <div className="w-full md:w-1/3">
          <ResultsPanel onResultClick={handleResultClick} />
        </div>

        {/* The inspector panel will show on the right when an item is clicked */}
        <div className="hidden md:block md:w-2/3">
          {selectedEntity ? (
            <InspectorPanel
              entity={selectedEntity}
              onClose={handleCloseInspector}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-text-dim">
              <p>Select an entity to see details</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExplorerPage;
