import React from "react";

const SemanticSearchBar = ({ value, onChange }) => {
  return (
    <div className="flex">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)} // Pass typed value back to parent
        placeholder="Type to search..."
        className="flex-1 p-2 rounded-l border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* Optional Search Button */}
      <button
        onClick={() => onChange(value)} // triggers update if needed
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r text-white"
      >
        Search
      </button>
    </div>
  );
};

export default SemanticSearchBar;