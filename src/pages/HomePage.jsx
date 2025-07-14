import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              TuneTrace
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
              Discover the stories behind your favorite songs
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Search for any song and get instant access to lyrics, artist information, and more.
              Your gateway to the world of music.
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Find Your Song
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Enter the artist name and song title to get started
              </p>
            </div>
            
            <SearchBar />
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            What You'll Find
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Complete Lyrics
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get the full lyrics to any song with proper formatting and structure
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Artist Information
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Learn about the artist with detailed bios and background information
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Smart Search
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Intelligent search with suggestions and auto-complete functionality
              </p>
            </div>
          </div>
        </div>

        {/* Popular Searches */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Popular Searches
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { artist: 'The Beatles', title: 'Hey Jude' },
              { artist: 'Queen', title: 'Bohemian Rhapsody' },
              { artist: 'Michael Jackson', title: 'Billie Jean' },
              { artist: 'Ed Sheeran', title: 'Shape of You' },
              { artist: 'Adele', title: 'Hello' },
              { artist: 'Coldplay', title: 'Fix You' },
              { artist: 'Imagine Dragons', title: 'Radioactive' },
              { artist: 'Taylor Swift', title: 'Shake It Off' }
            ].map((song, index) => (
              <Link
                key={index}
                to={`/lyrics/${encodeURIComponent(song.artist)}/${encodeURIComponent(song.title)}`}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 dark:border-gray-700"
              >
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 truncate">
                  {song.title}
                </h4>
                <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
                  {song.artist}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 