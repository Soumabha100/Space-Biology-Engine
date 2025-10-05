import React, { useState, useEffect } from "react";
import { Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// Import your new API function
import { getEntityData } from "../services/api";

const InspectorPanel = ({ activeEntity }) => {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      if (activeEntity?.id) {
        setIsLoading(true);
        setSummary(""); // Clear previous summary

        // Use the new, unified getEntityData function
        const data = await getEntityData(activeEntity.id);

        // The summary is now nested inside the response
        if (data?.summary) {
          setSummary(data.summary);
        } else {
          setSummary("Could not load summary.");
        }
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [activeEntity]);

  return (
    <div className="flex flex-col h-full bg-surface text-text p-4 border-l border-border overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 px-2">Inspector</h2>
      <AnimatePresence>
        {activeEntity ? (
          <motion.div
            key={activeEntity.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="px-2"
          >
            <h3 className="text-lg font-semibold text-highlight mb-2">
              {activeEntity.id}
            </h3>
            <p className="text-sm text-text-dim mb-4">
              Type: {activeEntity.type}
            </p>

            <div className="mt-4 p-4 bg-background rounded-lg border border-border">
              <h4 className="flex items-center font-semibold mb-2 text-primary">
                <Bot size={20} className="mr-2" />
                AI Generated Summary
              </h4>
              {isLoading ? (
                <p className="text-sm text-text-dim">Loading summary...</p>
              ) : (
                <p className="text-sm leading-relaxed text-text-dim">
                  {summary}
                </p>
              )}
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center h-full text-text-dim">
            <p>Select an entity to see details</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InspectorPanel;
