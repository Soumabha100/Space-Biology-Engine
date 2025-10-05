import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiTrendingUp } from "react-icons/fi";
import { getTags } from "../services/api";
import { useSearch } from "../context/SearchContext";

const PopularTagsSidebar = () => {
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchByTag } = useSearch(); // Use the new dedicated function

  useEffect(() => {
    const fetchTags = async () => {
      setIsLoading(true);
      const fetchedTags = await getTags();
      const uniqueTags = [...new Set(fetchedTags)];
      setTags(uniqueTags.slice(0, 100));
      setIsLoading(false);
    };
    fetchTags();
  }, []);

  const handleTagClick = (tag) => {
    // This now immediately triggers a search for the tag
    searchByTag(tag);
  };

  return (
    <div className="flex flex-col h-full bg-card/50">
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <FiTrendingUp className="text-primary" size={22} />
        <h2 className="text-lg font-bold">Popular Topics</h2>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center flex-1">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <motion.button
                key={`${tag}-${index}`}
                className="px-3 py-1.5 text-sm rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-150"
                onClick={() => handleTagClick(tag)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularTagsSidebar;
