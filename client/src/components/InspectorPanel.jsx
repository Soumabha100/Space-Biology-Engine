import React from "react";

const InspectorPanel = ({ summary }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Inspector Panel</h2>
      {summary ? (
        <p className="text-gray-200">{summary}</p>
      ) : (
        <p className="text-gray-400">Select a node to see details.</p>
      )}
    </div>
  );
};

export default InspectorPanel;