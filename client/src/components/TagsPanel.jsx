import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getTags } from "../services/api";

const TagsPanel = ({ onTagClick }) => {
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      setIsLoading(true);
      const fetchedTags = await getTags();
      // To improve performance, let's only show a reasonable number of unique tags
      const uniqueTags = [...new Set(fetchedTags)];
      setTags(uniqueTags.slice(0, 50)); // Show up to 50 unique tags
      setIsLoading(false);
    };
    fetchTags();
  }, []);

  if (isLoading) {
    return <div className="text-center text-muted-foreground p-4">Loading topics...</div>;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 px-2">Popular Topics</h3>
      <div className="flex flex-wrap gap-2 px-2">
        {/* --- START OF THE FIX --- */}
        {tags.map((tag, index) => (
          <motion.button
            // THE FIX: We combine the tag and its index to create a truly unique key.
            key={`${tag}-${index}`}
            className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => onTagClick(tag)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tag}
          </motion.button>
        ))}
        {/* --- END OF THE FIX --- */}
      </div>
    </div>
  );
};

export default TagsPanel;