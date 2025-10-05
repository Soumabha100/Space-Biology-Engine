import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { TestTube, BrainCircuit, Atom, Sun } from "lucide-react";

const SearchContext = createContext();

// Helper to get an icon based on type
const getIconForType = (type) => {
  switch (type) {
    case "Disease":
      return <TestTube size={18} />;
    case "Space Stressor":
      return <Sun size={18} />;
    case "Biological Process":
      return <Atom size={18} />;
    default:
      return <BrainCircuit size={18} />;
  }
};

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = async (query) => {
    setSearchQuery(query);
    if (!query) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/search?query=${query}`
      );
      // Add the icon to each result
      const resultsWithIcons = response.data.map((item) => ({
        ...item,
        icon: getIconForType(item.type),
      }));
      setSearchResults(resultsWithIcons);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <SearchContext.Provider
      value={{ searchQuery, searchResults, performSearch, isSearching }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
