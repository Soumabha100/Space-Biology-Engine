import React from "react";
import { Search, BrainCircuit, TestTube } from "lucide-react";

const SearchPanel = () => {
  // In a real app, this would come from a search API call
  const searchResults = [
    { id: "Bone Loss", type: "Disease", icon: <TestTube size={18} /> },
    {
      id: "Microgravity",
      type: "Space Stressor",
      icon: <BrainCircuit size={18} />,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-surface text-text p-4">
      <h2 className="text-xl font-bold mb-4">Explorer</h2>

      {/* Search Input */}
      <div className="relative mb-4">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search entities..."
          className="w-full pl-10 pr-4 py-2 rounded-md bg-background border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Search Results */}
      <div className="flex-1 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-2">Results</h3>
        <ul className="space-y-2">
          {searchResults.map((result) => (
            <li
              key={result.id}
              className="flex items-center p-2 rounded-md hover:bg-background cursor-pointer transition-colors"
            >
              <div className="mr-3 text-primary">{result.icon}</div>
              <div>
                <p className="font-semibold">{result.id}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {result.type}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchPanel;
