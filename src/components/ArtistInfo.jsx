import { useState } from 'react';

const ArtistInfo = ({ artistInfo, isLoading, error }) => {
  const [showFullBio, setShowFullBio] = useState(false);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-3"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading artist info...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-yellow-800 dark:text-yellow-200 font-medium">Artist information unavailable</span>
          </div>
          <p className="text-yellow-700 dark:text-yellow-300 mt-1 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!artistInfo) {
    return null;
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const truncateText = (text, maxLength = 200) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
        <h3 className="text-xl font-bold text-white">Artist Information</h3>
      </div>

      <div className="p-6">
        {/* Artist Basic Info */}
        <div className="mb-6">
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {artistInfo.name}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {artistInfo.type && (
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Type:</span>
                <p className="text-gray-900 dark:text-white capitalize">{artistInfo.type}</p>
              </div>
            )}
            
            {artistInfo.country && (
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Country:</span>
                <p className="text-gray-900 dark:text-white">{artistInfo.country}</p>
              </div>
            )}
            
            {artistInfo.gender && (
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender:</span>
                <p className="text-gray-900 dark:text-white capitalize">{artistInfo.gender}</p>
              </div>
            )}
            
            {artistInfo.beginDate && (
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Since:</span>
                <p className="text-gray-900 dark:text-white">{formatDate(artistInfo.beginDate)}</p>
              </div>
            )}
          </div>

          {artistInfo.tags && artistInfo.tags.length > 0 && (
            <div className="mb-4">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Genres:</span>
              <div className="flex flex-wrap gap-2">
                {artistInfo.tags.slice(0, 5).map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Wikipedia Bio */}
        {artistInfo.wikipedia && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex items-center mb-4">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white">Biography</h5>
            </div>
            
            {artistInfo.wikipedia.thumbnail && (
              <div className="float-right ml-4 mb-4">
                <img
                  src={artistInfo.wikipedia.thumbnail}
                  alt={artistInfo.wikipedia.title}
                  className="w-32 h-32 object-cover rounded-lg shadow-md"
                />
              </div>
            )}
            
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {showFullBio ? (
                <p>{artistInfo.wikipedia.extract}</p>
              ) : (
                <p>{truncateText(artistInfo.wikipedia.extract)}</p>
              )}
              
              {artistInfo.wikipedia.extract.length > 200 && (
                <button
                  onClick={() => setShowFullBio(!showFullBio)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium mt-2"
                >
                  {showFullBio ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>
            
            {artistInfo.wikipedia.url && (
              <a
                href={artistInfo.wikipedia.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
                Read full Wikipedia article
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistInfo; 