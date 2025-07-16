import { useState } from 'react';

const ArtistInfo = ({ artistInfo, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-3"></div>
            <p className="text-gray-600">Loading artist info...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-yellow-800 font-medium">Artist information unavailable</span>
          </div>
          <p className="text-yellow-700 mt-1 text-sm">{error}</p>
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

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
        <h3 className="text-xl font-bold text-white">Artist Information</h3>
      </div>

      <div className="p-6 ">
        {/* Artist Basic Info */}
        <div className="mb-6">
          <h4 className="text-2xl font-bold text-gray-900 mb-4">
            {artistInfo.name}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {artistInfo.type && (
              <div>
                <span className="text-sm font-medium text-gray-500">Type:</span>
                <p className="text-gray-900 capitalize">{artistInfo.type}</p>
              </div>
            )}
            
            {artistInfo.country && (
              <div>
                <span className="text-sm font-medium text-gray-500">Country:</span>
                <p className="text-gray-900">{artistInfo.country}</p>
              </div>
            )}
            
            {artistInfo.gender && (
              <div>
                <span className="text-sm font-medium text-gray-500">Gender:</span>
                <p className="text-gray-900 capitalize">{artistInfo.gender}</p>
              </div>
            )}
            
            {artistInfo.beginDate && (
              <div>
                <span className="text-sm font-medium text-gray-500">Active Since:</span>
                <p className="text-gray-900">{formatDate(artistInfo.beginDate)}</p>
              </div>
            )}
            {artistInfo.endDate && (
              <div>
                <span className="text-sm font-medium text-gray-500">Active Until:</span>
                <p className="text-gray-900">{formatDate(artistInfo.endDate)}</p>
              </div>
            )}
          </div>

          {artistInfo.tags && artistInfo.tags.length > 0 && (
            <div className="mb-4">
              <span className="text-sm font-medium text-gray-500 block mb-2">Genres:</span>
              <div className="flex flex-wrap gap-2">
                {artistInfo.tags.slice(0, 5).map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistInfo; 