import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { searchLyrics, searchArtistInfo } from '../utils/api';
import LyricsDisplay from '../components/LyricsDisplay';
import ArtistInfo from '../components/ArtistInfo';

const LyricsPage = () => {
  const { artist, title } = useParams();
  const navigate = useNavigate();
  
  const [lyrics, setLyrics] = useState('');
  const [artistInfo, setArtistInfo] = useState(null);
  const [lyricsLoading, setLyricsLoading] = useState(true);
  const [artistLoading, setArtistLoading] = useState(true);
  const [lyricsError, setLyricsError] = useState('');
  const [artistError, setArtistError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const decodedArtist = decodeURIComponent(artist);
      const decodedTitle = decodeURIComponent(title);

      // Fetch lyrics
      setLyricsLoading(true);
      setLyricsError('');
      try {
        const lyricsData = await searchLyrics(decodedArtist, decodedTitle);
        setLyrics(lyricsData);
      } catch (error) {
        setLyricsError(error.message);
      } finally {
        setLyricsLoading(false);
      }

      // Fetch artist info
      setArtistLoading(true);
      setArtistError('');
      try {
        const artistData = await searchArtistInfo(decodedArtist);
        setArtistInfo(artistData);
      } catch (error) {
        setArtistError(error.message);
      } finally {
        setArtistLoading(false);
      }
    };

    if (artist && title) {
      fetchData();
    }
  }, [artist, title]);

  const handleNewSearch = () => {
    navigate('/');
  };

  const decodedArtist = decodeURIComponent(artist || '');
  const decodedTitle = decodeURIComponent(title || '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Search
            </Link>
            
            <button
              onClick={handleNewSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              New Search
            </button>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {decodedTitle}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              by {decodedArtist}
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lyrics Section - Takes 2/3 of the space on large screens */}
          <div className="lg:col-span-2">
            <LyricsDisplay
              lyrics={lyrics}
              artist={decodedArtist}
              title={decodedTitle}
              isLoading={lyricsLoading}
              error={lyricsError}
            />
          </div>

          {/* Artist Info Section - Takes 1/3 of the space on large screens */}
          <div className="lg:col-span-1">
            <ArtistInfo
              artistInfo={artistInfo}
              isLoading={artistLoading}
              error={artistError}
            />
          </div>
        </div>

        {/* Error State */}
        {lyricsError && artistError && (
          <div className="mt-8 text-center">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
              <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                Song Not Found
              </h3>
              <p className="text-red-700 dark:text-red-300 mb-4">
                We couldn't find the lyrics for "{decodedTitle}" by {decodedArtist}.
              </p>
              <button
                onClick={handleNewSearch}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                Try Another Search
              </button>
            </div>
          </div>
        )}

        {/* Share Section */}
        {lyrics && !lyricsError && (
          <div className="mt-12 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Share This Song
              </h3>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => {
                    const url = window.location.href;
                    navigator.clipboard.writeText(url);
                    alert('Link copied to clipboard!');
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                  Copy Link
                </button>
                
                <a
                  href={`https://twitter.com/intent/tweet?text=Check out the lyrics for "${decodedTitle}" by ${decodedArtist} on TuneTrace!&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Share
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LyricsPage; 