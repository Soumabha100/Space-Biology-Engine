import React from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi"; // FIX: Changed 'X' to 'FiX'

const InspectorPanel = ({ entity, onClose }) => {
  if (!entity) return null;

  return (
    <motion.div
      className="h-full bg-card/80 backdrop-blur-sm border rounded-lg p-6 flex flex-col text-card-foreground shadow-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6 flex-shrink-0">
        <h2 className="text-2xl font-bold text-primary">Details</h2>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-accent"
        >
          <FiX size={20} /> {/* FIX: Changed '<X' to '<FiX' */}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-wider">
            Title
          </h3>
          <p className="text-xl font-semibold">{entity.title}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-wider">
            Description
          </h3>
          <p className="text-base leading-relaxed text-foreground/80">
            {entity.description}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-wider">
            Source
          </h3>
          <a
            href={entity.source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base text-primary hover:underline"
          >
            View Publication or Dataset
          </a>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {entity.tags.map((tag) => (
              <div
                key={tag}
                className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InspectorPanel;
