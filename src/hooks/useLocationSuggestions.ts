import { useState, useCallback, useRef } from 'react';
import { LocationSuggestion, UseLocationSuggestionsReturn } from '../types/weather';
import { fetchLocationSuggestions } from '../api/weatherApi';

// Debounce utility function
const debounce = (func: Function, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

export const useLocationSuggestions = (): UseLocationSuggestionsReturn => {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedFetchSuggestions = useRef(
    debounce(async (searchQuery: string) => {
      if (searchQuery.length > 2) {
        setLoading(true);
        setError(null);
        
        try {
          const fetchedSuggestions = await fetchLocationSuggestions(searchQuery);
          setSuggestions(fetchedSuggestions);
        } catch (err) {
          console.error("Error fetching suggestions:", err);
          setSuggestions([]);
          setError('Failed to fetch location suggestions');
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
        setError(null);
      }
    }, 300)
  ).current;

  const fetchSuggestions = useCallback(async (query: string) => {
    setLoading(true);
    debouncedFetchSuggestions(query);
  }, [debouncedFetchSuggestions]);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setError(null);
  }, []);

  return {
    suggestions,
    loading,
    error,
    fetchSuggestions,
    clearSuggestions,
  };
};

