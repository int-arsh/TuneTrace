import { useState } from 'react';
import Toast from './Toast';

const LyricsDisplay = ({ lyrics, artist, title, isLoading, error }) => {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(lyrics);
      setCopied(true);
      setShowToast(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy lyrics:', err);
      setShowToast(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading lyrics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
        <div className="text-red-600 dark:text-red-400 mb-2">
          <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
          Unable to Load Lyrics
        </h3>
        <p className="text-red-700 dark:text-red-300">{error}</p>
      </div>
    );
  }

  if (!lyrics) {
    return null;
  }

  // Format lyrics by splitting into lines and preserving structure
  const formattedLyrics = lyrics
    .split('\n')
    .map((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return <br key={index} />;
      
      // Check if line looks like a section header (e.g., [Verse 1], [Chorus])
      const isHeader = /^\[.*\]$/.test(trimmedLine);
      
      return (
        <p
          key={index}
          className={`${
            isHeader
              ? 'font-semibold text-blue-600 dark:text-blue-400 text-lg mt-6 mb-2'
              : 'text-gray-800 dark:text-gray-200 leading-relaxed'
          }`}
        >
          {trimmedLine}
        </p>
      );
    });

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <p className="text-blue-100">by {artist}</p>
            </div>
            <button
              onClick={handleCopy}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                  <span>Copy Lyrics</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Lyrics Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="space-y-2">
            {formattedLyrics}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 border-t border-gray-200 dark:border-gray-600">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Lyrics provided by Lyrics.ovh API
          </p>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={copied ? "Lyrics copied to clipboard!" : "Failed to copy lyrics"}
          type={copied ? "success" : "error"}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
};

export default LyricsDisplay; 