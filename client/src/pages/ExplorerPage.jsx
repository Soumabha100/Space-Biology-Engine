import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

// 1. Import the header here
import GlobalHeader from "../components/GlobalHeader";
import ResultsPanel from "../components/ResultsPanel";
import GraphCanvas from "../components/GraphCanvas";
import InspectorPanel from "../components/InspectorPanel";

const ExplorerPage = () => {
  const [activeEntity, setActiveEntity] = useState(null);
  const [isInspectorOpen, setIsInspectorOpen] = useState(true);

  return (
    <div className="h-full w-full flex flex-col">
      {/* 2. A dedicated, static header area */}
      <div className="w-full">
        <GlobalHeader />
      </div>

      {/* 3. The main content area that takes the remaining space */}
      <div className="flex-1 relative">
        {/* 4. The Graph Canvas with our new thematic background */}
        <div className="absolute inset-0 graph-background">
          <GraphCanvas
            activeEntity={activeEntity}
            onNodeClick={setActiveEntity}
          />
        </div>

        {/* 5. Floating ResultsPanel with adjusted starting position */}
        <motion.div
          drag
          dragMomentum={false}
          className="absolute top-4 left-4 w-full max-w-md"
        >
          <div className="bg-surface/80 backdrop-blur-sm rounded-xl border border-border shadow-2xl overflow-hidden max-h-[70vh] flex flex-col">
            <ResultsPanel onResultClick={setActiveEntity} />
          </div>
        </motion.div>

        {/* Inspector Panel (no changes needed here) */}
        <AnimatePresence>
          {isInspectorOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute top-0 right-0 h-full w-full max-w-sm"
            >
              <InspectorPanel activeEntity={activeEntity} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inspector Toggle Button with adjusted position */}
        <button
          onClick={() => setIsInspectorOpen(!isInspectorOpen)}
          className="absolute top-4 right-4 bg-surface/80 hover:bg-surface backdrop-blur-sm p-2 rounded-lg border border-border shadow-lg transition-colors"
          title={isInspectorOpen ? "Close Inspector" : "Open Inspector"}
        >
          {isInspectorOpen ? <PanelRightClose /> : <PanelRightOpen />}
        </button>
      </div>
    </div>
  );
};

export default ExplorerPage;
