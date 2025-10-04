import React from "react";
import { Bot } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const InspectorPanel = ({ selectedNode }) => {
  const summary = "Based on multiple studies, microgravity is a primary driver of bone density loss in astronauts. It activates osteoclasts... This is a critical concern for long-duration missions.";

  return (
    <div className="flex flex-col h-full bg-surface text-text p-4 border-l border-border overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 px-2">Inspector</h2>
      <AnimatePresence>
        {selectedNode ? (
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="px-2"
          >
            <h3 className="text-lg font-semibold text-highlight mb-2">{selectedNode.id}</h3>
            <p className="text-sm text-text-dim mb-4">Type: {selectedNode.type}</p>
            
            <div className="mt-4 p-4 bg-background rounded-lg border border-border">
              <h4 className="flex items-center font-semibold mb-2 text-primary">
                <Bot size={20} className="mr-2" />
                AI Generated Summary
              </h4>
              <p className="text-sm leading-relaxed text-text-dim">{summary}</p>
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center h-full text-text-dim">
            <p>Click a node to see details</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InspectorPanel;