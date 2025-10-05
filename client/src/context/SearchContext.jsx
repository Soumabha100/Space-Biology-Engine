import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { TestTube, Dna, FileText } from "lucide-react";

const SearchContext = createContext();

const getIconForType = (type) => {
  switch (type) {
    case "Disease":
      return <TestTube size={18} />;
    case "Gene":
      return <Dna size={18} />;
    default:
      return <FileText size={18} />;
  }
};

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = async (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/search?query=${query}`
      );
      const resultsWithIcons = response.data.map((item) => ({
        ...item,
        id: item.name || item.title, // Normalize the ID field
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
