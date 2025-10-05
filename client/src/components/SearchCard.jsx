import React from "react";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";

const SearchCard = ({ result, onResultClick, index }) => {
  // Fallback for missing data
  const { icon, title, type, summary, tags = [] } = result;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07 }}
      onClick={() => onResultClick(result)}
      className="p-3 rounded-lg hover:bg-primary/10 cursor-pointer transition-colors border-b border-border last:border-b-0"
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 text-primary">{icon}</div>
        <div className="flex-1">
          <p className="font-semibold text-text">{title}</p>
          <p className="text-xs text-text-dim font-medium uppercase tracking-wider">
            {type}
          </p>
          <p className="text-sm text-text-dim mt-2 line-clamp-2">{summary}</p>
          {tags.length > 0 && (
            <div className="mt-3 flex items-center flex-wrap gap-2">
              <Tag size={14} className="text-text-dim" />
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SearchCard;
