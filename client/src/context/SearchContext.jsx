import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { searchEntities, getEntityData } from "../services/api"; // Ensure getEntityData is imported
import { useDebounce } from "../hooks/useDebounce";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const canLoadMore = searchResults.length < totalResults;
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const performSearch = useCallback(
    async (query, page = 1) => {
      if (!query) {
        setSearchResults([]);
        setTotalResults(0);
        return;
      }

      setIsSearching(true);
      try {
        let response;

        // --- START OF THE FIX ---
        // If query is an ID, use the dedicated endpoint for a direct match.
        if (query.startsWith("#")) {
          // An ID search returns only one result, so no pagination is needed.
          if (page === 1) {
            const entity = await getEntityData(query.substring(1));
            response = entity
              ? { data: [entity], total: 1 }
              : { data: [], total: 0 };
          } else {
            // If trying to "load more" on an ID search, return nothing.
            response = { data: [], total: searchResults.length };
          }
        } else {
          // For all other searches (text or tag), use the general search endpoint.
          response = await searchEntities(query, page);
        }
        // --- END OF THE FIX ---

        const { data = [], total = 0 } = response;
        setSearchResults((prev) => (page === 1 ? data : [...prev, ...data]));
        setTotalResults(total);
      } catch (error) {
        console.error("Failed to perform search:", error);
        setSearchResults([]);
        setTotalResults(0);
      } finally {
        setIsSearching(false);
      }
    },
    [searchResults.length]
  ); // Dependency prevents redundant calls when loading more.

  useEffect(() => {
    setCurrentPage(1);
    performSearch(debouncedSearchQuery, 1);
  }, [debouncedSearchQuery, performSearch]);

  const loadMoreResults = () => {
    if (canLoadMore && !isSearching) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      performSearch(debouncedSearchQuery, nextPage);
    }
  };

  const searchByTag = (tag) => {
    setSearchQuery(tag);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearching,
        selectedEntity,
        setSelectedEntity,
        totalResults,
        canLoadMore,
        loadMoreResults,
        searchByTag,
        performSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
