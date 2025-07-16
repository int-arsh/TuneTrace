/**
 * SearchBar Component
 * 
 * This component lets users search for song lyrics by entering an artist and song title.
 * It provides real-time suggestions as you type, and navigates to the lyrics page when you search.
 *
 * Features:
 * - Two input fields: Artist and Song Title
 * - Shows suggestions (autocomplete) as you type
 * - Handles loading and error states for suggestions
 * - Navigates to the lyrics page on submit or suggestion click
 * - Closes suggestions when clicking outside
 *
 * Usage:
 * <SearchBar />
 */
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchSongs } from '../utils/api';

const SearchBar = () => {
  // State for the artist and song title input fields
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  // Suggestions for autocomplete
  const [suggestions, setSuggestions] = useState([]);
  // Whether to show the suggestions dropdown
  const [showSuggestions, setShowSuggestions] = useState(false);
  // Loading and error state for suggestions
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  // React Router navigation
  const navigate = useNavigate();
  // Ref for detecting clicks outside the search area
  const searchRef = useRef(null);

  // Close suggestions dropdown when clicking outside the search area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch suggestions from the API as the user types
  useEffect(() => {
    const fetchSuggestions = async () => {
      // If both fields are empty, clear suggestions
      if (!artist.trim() && !title.trim()) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setIsLoading(true);
      setError('');

      try {
        // Combine artist and title for the search query
        const query = `${artist} ${title}`.trim();
        const results = await searchSongs(query);
        setSuggestions(results.slice(0, 5)); // Show up to 5 suggestions
        setShowSuggestions(true);
      } catch (err) {
        setError('Failed to fetch suggestions');
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce: wait 500ms after typing before fetching suggestions
    const timeoutId = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(timeoutId);
  }, [artist, title]);

  // Handle form submission (when user clicks 'Search Lyrics' or presses Enter)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (artist.trim() && title.trim()) {
      // Navigate to the lyrics page for the entered artist and title
      navigate(`/lyrics/${encodeURIComponent(artist.trim())}/${encodeURIComponent(title.trim())}`);
      setShowSuggestions(false);
    }
  };

  // Handle clicking a suggestion from the dropdown
  const handleSuggestionClick = (suggestion) => {
    setArtist(suggestion.artist.name);
    setTitle(suggestion.title);
    // Navigate to the lyrics page for the selected suggestion
    navigate(`/lyrics/${encodeURIComponent(suggestion.artist.name)}/${encodeURIComponent(suggestion.title)}`);
    setShowSuggestions(false);
  };

  return (
    // Main container for the search bar
    <div className="w-full max-w-2xl mx-auto" ref={searchRef}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Artist input field */}
          <div className="relative">
            <label htmlFor="artist" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Artist
            </label>
            <input
              type="text"
              id="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              onFocus={() => {
                if (artist.trim() || title.trim()) {
                  setShowSuggestions(true);
                }
              }}
              placeholder="Enter artist name..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
              required
            />
          </div>
          
          {/* Song title input field */}
          <div className="relative">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Song Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => {
                if (artist.trim() || title.trim()) {
                  setShowSuggestions(true);
                }
              }}
              placeholder="Enter song title..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
              required
            />
          </div>
        </div>

        {/* Search button - only enabled if both fields are filled */}
        <button
          type="submit"
          disabled={!artist.trim() || !title.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Search Lyrics
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && (artist.trim() || title.trim()) && (
        <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2">Loading suggestions...</p>
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">
              {error}
            </div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                  >
                    <div className="font-medium text-gray-900 dark:text-white">
                      {suggestion.title}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {suggestion.artist.name}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No suggestions found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 