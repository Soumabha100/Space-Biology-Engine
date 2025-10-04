import React from "react";
import { Bot } from "lucide-react";

const InspectorPanel = ({ selectedNode }) => {
  // Mock summary, to be replaced by API call
  const summary =
    "Based on multiple studies, microgravity is a primary driver of bone density loss in astronauts. It activates osteoclasts, the cells responsible for bone breakdown. This effect is a critical concern for long-duration missions to the Moon and Mars.";

  return (
    <div className="flex flex-col h-full bg-surface text-text p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Inspector</h2>

      {selectedNode ? (
        <div>
          <h3 className="text-lg font-semibold text-primary mb-2">
            {selectedNode.id}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Type: {selectedNode.type}
          </p>

          <div className="mt-4 p-3 bg-background rounded-md">
            <h4 className="flex items-center font-semibold mb-2">
              <Bot size={20} className="mr-2 text-primary" />
              AI Generated Summary
            </h4>
            <p className="text-sm leading-relaxed">{summary}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Click a node to see details</p>
        </div>
      )}
    </div>
  );
};

export default InspectorPanel;
