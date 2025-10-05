import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useSearch } from "../context/SearchContext";

const TagsPanel = () => {
  const [tags, setTags] = useState([]);
  const { performSearch } = useSearch();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/tags")
      .then((response) => setTags(response.data))
      .catch((error) => console.error("Error fetching tags:", error));
  }, []);

  const handleTagClick = (tag) => {
    // This will update the global search bar and trigger a search
    document.querySelector('input[type="text"]').value = tag;
    performSearch(tag);
  };

  return (
    <div className="px-2 mb-6">
      <h3 className="text-sm font-semibold mb-3 text-text-dim uppercase tracking-wider">
        Popular Topics
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <motion.button
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleTagClick(tag)}
            className="px-3 py-1 bg-surface hover:bg-primary/20 text-sm text-text-dim hover:text-text rounded-full border border-border transition-colors cursor-pointer"
          >
            {tag}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TagsPanel;
