import React from "react";
import { motion } from "framer-motion";
import { FiFileText, FiDatabase, FiStar } from "react-icons/fi";

const SearchCard = ({ result, onResultClick, index }) => {
  const getIcon = () => {
    // Simple logic to determine an icon based on title/tags
    const title = result.title.toLowerCase();
    if (title.includes("experiment") || title.includes("study"))
      return <FiFileText className="text-primary" size={24} />;
    if (title.includes("dataset"))
      return <FiDatabase className="text-primary" size={24} />;
    return <FiStar className="text-primary" size={24} />;
  };

  return (
    <motion.div
      className="w-full p-4 rounded-lg border bg-card text-card-foreground cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all"
      onClick={() => onResultClick(result)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">{getIcon()}</div>
        <div className="flex-1">
          <h4 className="font-semibold text-lg mb-1 leading-tight">
            {result.title}
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            {result.description.substring(0, 150)}...
          </p>
          <div className="flex flex-wrap gap-2">
            {result.tags.slice(0, 4).map((tag, i) => (
              <div
                key={`${tag}-${i}`}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground"
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

export default SearchCard;
