import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-md mx-auto">
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="relative">
              <div className="text-9xl font-bold text-gray-200 dark:text-gray-700">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-24 h-24 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Content */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 w-full md:w-auto"
            >
              Go to Homepage
            </Link>
            
            <div className="text-gray-500 dark:text-gray-400">
              or
            </div>
            
            <Link
              to="/"
              className="inline-block bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 w-full md:w-auto"
            >
              Search for Lyrics
            </Link>
          </div>

          {/* Popular Links */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Popular Songs
            </h3>
            <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
              {[
                { artist: 'The Beatles', title: 'Hey Jude' },
                { artist: 'Queen', title: 'Bohemian Rhapsody' },
                { artist: 'Michael Jackson', title: 'Billie Jean' },
                { artist: 'Ed Sheeran', title: 'Shape of You' }
              ].map((song, index) => (
                <Link
                  key={index}
                  to={`/lyrics/${encodeURIComponent(song.artist)}/${encodeURIComponent(song.title)}`}
                  className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 dark:border-gray-700"
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
    </div>
  );
};

export default NotFoundPage; 