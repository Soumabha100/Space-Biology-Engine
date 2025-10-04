import React from "react";

const ExplorerPage = () => {
  // Teammate B will build the search, results, and inspector panels here.
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Knowledge Explorer</h1>
      <p className="text-gray-600 dark:text-gray-400">
        The main dashboard with the search bar and 3-pane layout will be built
        here.
      </p>
      <div className="mt-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-96 flex items-center justify-center">
        <p className="text-gray-500">
          Graph Canvas will be implemented here later.
        </p>
      </div>
    </div>
  );
};

export default ExplorerPage;
