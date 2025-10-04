import React, { createContext, useState, useContext } from 'react';
import { TestTube, BrainCircuit } from 'lucide-react';

const SearchContext = createContext();

// Mock data for search results
const mockResults = [
  { id: 'Bone Loss', type: 'Disease', icon: <TestTube size={18} /> },
  { id: 'Microgravity', type: 'Space Stressor', icon: <BrainCircuit size={18} /> },
];

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);
    
    // Simulate an API call
    setTimeout(() => {
      if (query) {
        setSearchResults(mockResults);
      } else {
        setSearchResults([]);
      }
      setIsSearching(false);
    }, 300);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, searchResults, performSearch, isSearching }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);