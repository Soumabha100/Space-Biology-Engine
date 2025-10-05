import React from "react";
import { motion } from "framer-motion";
import { FiX, FiUsers, FiBookOpen, FiExternalLink } from "react-icons/fi";

// Backdrop animation
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Modal animation
const modalVariants = {
  hidden: { y: "100vh", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
  exit: { y: "100vh", opacity: 0, transition: { duration: 0.3 } },
};

const InspectorPanel = ({ entity, onClose }) => {
  if (!entity) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose} // Close modal on backdrop click
    >
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] bg-card text-card-foreground rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-border"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
          {/* **FIX APPLIED HERE:** Changed `text-primary` to `text-foreground` for better contrast */}
          <h2 className="text-2xl font-bold text-foreground truncate pr-12">
            {entity.title || "Details"}
          </h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8">
          {/* Abstract Section */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
              Abstract
            </h3>
            <p className="text-base leading-relaxed text-foreground/80">
              {entity.abstract || entity.summary || "No abstract available."}
            </p>
          </div>

          {/* Authors Section */}
          {entity.byPeople && entity.byPeople.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
                <FiUsers />
                Authors
              </h3>
              <p className="text-base text-foreground/80">
                {entity.byPeople.join(", ")}
              </p>
            </div>
          )}

          {/* Source Link */}
          {entity.url && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
                <FiBookOpen />
                Source
              </h3>
              <a
                href={entity.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-base text-primary hover:underline"
              >
                View Publication or Dataset <FiExternalLink size={16} />
              </a>
            </div>
          )}
        </div>

        {/* Footer with Tags */}
        {entity.tags && entity.tags.length > 0 && (
          <div className="p-6 border-t border-border bg-background/50 flex-shrink-0">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {entity.tags.map((tag, index) => (
                <div
                  key={index}
                  className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default InspectorPanel;
