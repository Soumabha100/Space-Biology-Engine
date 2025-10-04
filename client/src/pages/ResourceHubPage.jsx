import React from "react";

const ResourceHubPage = () => {
  // Teammate B will build the card layout here.
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">NASA Data & Resources</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-light-surface dark:bg-dark-surface rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Placeholder Card</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Teammate B will implement this section.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResourceHubPage;
