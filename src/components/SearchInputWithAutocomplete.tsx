import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useLocationSuggestions } from '../hooks/useLocationSuggestions';
import useClickOutside from '../hooks/useClickOutside';
import { SearchInputProps } from '../types/weather';

const SearchInputWithAutocomplete: React.FC<SearchInputProps> = ({ 
  query, 
  setQuery, 
  setWeatherData, 
  setLoading, 
  setError, 
  setShowSnackbar,
  fetchWeather,
  showMessage 
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const { suggestions, loading: suggestionsLoading, error: suggestionsError, fetchSuggestions, clearSuggestions } = useLocationSuggestions();

  // Use the custom hook to handle clicks outside
  useClickOutside([containerRef], () => {
    clearSuggestions();
    setIsFocused(false);
  });

  // Handle suggestions error with snackbar
  useEffect(() => {
    if (suggestionsError) {
      showMessage('Failed to fetch location suggestions. Please try again.', 'error');
    }
  }, [suggestionsError, showMessage]);

  // Handle no results when user stops typing
  useEffect(() => {
    if (query && query.length > 2 && !suggestionsLoading && suggestions.length === 0 && isFocused) {
      // Small delay to avoid showing message while still typing
      const timer = setTimeout(() => {
        showMessage('No locations found. Please try a different search term.', 'warning');
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [query, suggestions, suggestionsLoading, isFocused, showMessage]);

  useEffect(() => {
    if (query && isFocused) {
      fetchSuggestions(query);
    } else {
      clearSuggestions();
    }
  }, [query, isFocused, fetchSuggestions, clearSuggestions]);

  // Function to handle fetching weather and updating state
  const handleFetchWeather = async (lat: number, lon: number, city: string) => {
    setLoading(true);
    setError(null);
    try {
      await fetchWeather(lat, lon, city);
      // Navigate to location page after successful weather fetch
      navigate('/location');
    } catch (err) {
      const errorMessage = 'Failed to fetch weather data for this location.';
      setError(errorMessage);
      setWeatherData(null);
      setShowSnackbar(true);
      showMessage(errorMessage, 'error');
      console.error("Failed to fetch weather data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSuggestion = (suggestion: any) => {
    // Pass city name + country code (ISO short form)
    const cityWithCountry = `${suggestion.name}, ${suggestion.country_code?.toUpperCase()}`;
    handleFetchWeather(suggestion.latitude, suggestion.longitude, cityWithCountry);
    setQuery('');
    clearSuggestions();
    setShowSnackbar(false);
    setIsFocused(false);
    searchInputRef.current?.blur(); // Hide the keyboard on mobile
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (suggestions.length > 0) {
        handleSelectSuggestion(suggestions[0]);
      } else if (query && query.length > 2) {
        showMessage('No locations found. Please try a different search term.', 'warning');
      } else if (query && query.length <= 2) {
        showMessage('Please enter at least 3 characters to search.', 'info');
      }
    }
  };

  const handleClearInput = () => {
    setQuery('');
    clearSuggestions();
    setShowSnackbar(false);
    setIsFocused(false);
    searchInputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (query) {
      fetchSuggestions(query);
    }
  };

  const handleBlur = () => {
    // Don't immediately set isFocused to false to allow clicking on suggestions
    // The click outside handler will handle this
  };

  return (
    <div className="relative flex items-center w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl" ref={containerRef}>
      <div className="relative flex-grow">
        <input
          ref={searchInputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search for a city (type at least 3 characters)"
          className="w-full pl-10 pr-10 py-2 rounded-full text-gray-900 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-sm sm:text-base"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
        {query && (
          <button
            onClick={handleClearInput}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            type="button"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Autocomplete Suggestions Dropdown */}
      {(suggestions.length > 0 && query && isFocused) && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-xl overflow-hidden z-10 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSelectSuggestion(suggestion)}
              className="px-3 sm:px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 text-sm sm:text-base"
            >
              {suggestion.name}, {suggestion.country}
            </div>
          ))}
        </div>
      )}

      {/* No results message */}
      {suggestions.length === 0 && query && query.length > 2 && isFocused && !suggestionsLoading && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg shadow-xl overflow-hidden z-10">
          <div className="px-3 sm:px-4 py-3 text-sm sm:text-base text-center">
            No results found
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInputWithAutocomplete;
