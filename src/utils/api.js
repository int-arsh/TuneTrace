/**
 * API Utilities for TuneTrace
 * 
 * This file contains all the API functions used to fetch data from external services:
 * - Lyrics.ovh API for song lyrics
 * - MusicBrainz API for artist information
 * - Song search functionality
 */

// Base URLs for different APIs
const LYRICS_API_BASE = 'https://api.lyrics.ovh/v1';
const MUSICBRAINZ_API_BASE = 'https://musicbrainz.org/ws/2';

/**
 * Fetches lyrics for a specific song
 * 
 * @param {string} artist - The artist/band name
 * @param {string} title - The song title
 * @returns {Promise<string>} The lyrics text
 * @throws {Error} If lyrics cannot be found or API fails
 * 
 * Example:
 * const lyrics = await searchLyrics('The Beatles', 'Hey Jude');
 */
export const searchLyrics = async (artist, title) => {
  try {
    // Make API request to Lyrics.ovh
    const response = await fetch(`${LYRICS_API_BASE}/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
    
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parse the JSON response
    const data = await response.json();
    
    // Check if the API returned an error (like "lyrics not found")
    if (data.error) {
      throw new Error(data.error || 'Lyrics not found');
    }
    
    // Return the lyrics text
    return data.lyrics;
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    throw new Error('Failed to fetch lyrics. Please check the artist and song title.');
  }
};

/**
 * Fetches detailed information about an artist from MusicBrainz
 * 
 * @param {string} artistName - The name of the artist to search for
 * @returns {Promise<Object>} Artist information object with properties:
 *   - id: MusicBrainz artist ID
 *   - name: Artist name
 *   - country: Artist's country
 *   - type: Artist type (Person, Group, Orchestra, etc.)
 *   - gender: Artist gender (for individual artists)
 *   - beginDate: When the artist started their career
 *   - endDate: When the artist ended their career (if applicable)
 *   - tags: Array of genre tags
 * @throws {Error} If artist cannot be found or API fails
 * 
 * Example:
 * const artistInfo = await searchArtistInfo('The Beatles');
 */
export const searchArtistInfo = async (artistName) => {
  try {
    // First, search for the artist in MusicBrainz database
    const searchResponse = await fetch(
      `${MUSICBRAINZ_API_BASE}/artist/?query=artist:${encodeURIComponent(artistName)}&fmt=json&limit=1`,
      {
        headers: {
          // MusicBrainz requires a User-Agent header
          'User-Agent': 'TuneTrace/1.0 (https://github.com/yourusername/tunetrace)'
        }
      }
    );

    // Check if the search request was successful
    if (!searchResponse.ok) {
      throw new Error(`MusicBrainz search failed: ${searchResponse.status}`);
    }

    // Parse the search results
    const searchData = await searchResponse.json();
    
    // Check if any artists were found
    if (!searchData.artists || searchData.artists.length === 0) {
      throw new Error('Artist not found');
    }

    // Get the first (most relevant) artist from search results
    const artist = searchData.artists[0];

    // Return formatted artist information
    return {
      id: artist.id,
      name: artist.name,
      country: artist.country,
      type: artist.type,
      gender: artist.gender,
      beginDate: artist['life-span']?.begin,
      endDate: artist['life-span']?.end,
      tags: artist.tags?.map(tag => tag.name) || []
    };
  } catch (error) {
    console.error('Error fetching artist info:', error);
    throw new Error('Failed to fetch artist information.');
  }
};

/**
 * Searches for songs based on a query string
 * 
 * @param {string} query - The search query (can be artist name, song title, or both)
 * @returns {Promise<Array>} Array of song objects with properties:
 *   - title: Song title
 *   - artist: Object with artist name
 * @throws {Error} If search fails
 * 
 * Example:
 * const songs = await searchSongs('Beatles Hey Jude');
 */
export const searchSongs = async (query) => {
  try {
    // Use Lyrics.ovh suggest endpoint for song search
    // This provides song suggestions based on the query
    const response = await fetch(`https://api.lyrics.ovh/suggest/${encodeURIComponent(query)}`);
    
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Search failed: ${response.status}`);
    }
    
    // Parse the search results
    const data = await response.json();
    
    // Return the array of songs (or empty array if none found)
    return data.data || [];
  } catch (error) {
    console.error('Error searching songs:', error);
    throw new Error('Failed to search songs.');
  }
}; 