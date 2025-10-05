import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { searchEntities } from "../services/api";
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
  const [canLoadMore, setCanLoadMore] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const performSearch = useCallback(async (query, page = 1) => {
    if (!query) {
      setSearchResults([]);
      setTotalResults(0);
      setCanLoadMore(false);
      return;
    }

    setIsSearching(true);
    try {
      // The API returns an object { data, total }, so we destructure it here.
      const { data, total } = await searchEntities(query, page);

      // If it's the first page, we replace the results. Otherwise, we append them.
      setSearchResults((prev) => (page === 1 ? data : [...prev, ...data]));
      setTotalResults(total);

      // Determine if there are more results to load.
      setCanLoadMore(data.length > 0 && page * 15 < total);
    } catch (error) {
      console.error("Failed to perform search:", error);
      setSearchResults([]);
      setTotalResults(0);
      setCanLoadMore(false);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    // Reset to the first page and perform a new search when the query changes.
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
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
