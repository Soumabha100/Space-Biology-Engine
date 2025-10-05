import React, { createContext, useContext, useState, useEffect } from 'react';
import { searchEntities } from '../services/api'; 
// FIX: Add curly braces around useDebounce
import { useDebounce } from '../hooks/useDebounce';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedSearchQuery) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchEntities(debouncedSearchQuery); 
        setSearchResults(results);
      } catch (error) {
        console.error("Failed to perform search:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedSearchQuery]);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearching,
        selectedEntity,
        setSelectedEntity,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};