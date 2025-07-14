const LYRICS_API_BASE = 'https://api.lyrics.ovh/v1';
const MUSICBRAINZ_API_BASE = 'https://musicbrainz.org/ws/2';
const WIKIPEDIA_API_BASE = 'https://en.wikipedia.org/api/rest_v1';

export const searchLyrics = async (artist, title) => {
  try {
    const response = await fetch(`${LYRICS_API_BASE}/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error || 'Lyrics not found');
    }
    
    return data.lyrics;
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    throw new Error('Failed to fetch lyrics. Please check the artist and song title.');
  }
};

export const searchArtistInfo = async (artistName) => {
  try {
    // First, search for the artist in MusicBrainz
    const searchResponse = await fetch(
      `${MUSICBRAINZ_API_BASE}/artist/?query=artist:${encodeURIComponent(artistName)}&fmt=json&limit=1`,
      {
        headers: {
          'User-Agent': 'TuneTrace/1.0 (https://github.com/yourusername/tunetrace)'
        }
      }
    );

    if (!searchResponse.ok) {
      throw new Error(`MusicBrainz search failed: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    
    if (!searchData.artists || searchData.artists.length === 0) {
      throw new Error('Artist not found');
    }

    const artist = searchData.artists[0];
    
    // Get Wikipedia page ID if available
    let wikipediaInfo = null;
    if (artist.relations) {
      const wikipediaRelation = artist.relations.find(rel => 
        rel.type === 'wikipedia' && rel.url && rel.url.resource
      );
      
      if (wikipediaRelation) {
        const wikiUrl = wikipediaRelation.url.resource;
        const pageTitle = wikiUrl.split('/').pop();
        
        try {
          const wikiResponse = await fetch(
            `${WIKIPEDIA_API_BASE}/page/summary/${encodeURIComponent(pageTitle)}`
          );
          
          if (wikiResponse.ok) {
            const wikiData = await wikiResponse.json();
            wikipediaInfo = {
              title: wikiData.title,
              extract: wikiData.extract,
              thumbnail: wikiData.thumbnail?.source,
              url: wikiData.content_urls?.desktop?.page
            };
          }
        } catch (wikiError) {
          console.warn('Failed to fetch Wikipedia info:', wikiError);
        }
      }
    }

    return {
      id: artist.id,
      name: artist.name,
      country: artist.country,
      type: artist.type,
      gender: artist.gender,
      beginDate: artist['life-span']?.begin,
      endDate: artist['life-span']?.end,
      tags: artist.tags?.map(tag => tag.name) || [],
      wikipedia: wikipediaInfo
    };
  } catch (error) {
    console.error('Error fetching artist info:', error);
    throw new Error('Failed to fetch artist information.');
  }
};

export const searchSongs = async (query) => {
  try {
    // This is a simplified search - in a real app, you might use a different API
    // For now, we'll return a mock response or you could integrate with Spotify API
    const response = await fetch(`https://api.lyrics.ovh/suggest/${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`Search failed: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error searching songs:', error);
    throw new Error('Failed to search songs.');
  }
}; 