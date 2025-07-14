import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto">
              <div className="mb-8">
                <div className="text-6xl font-bold text-red-200 dark:text-red-800 mb-4">
                  ⚠️
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Something went wrong
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                We encountered an unexpected error. Please try refreshing the page or go back to the homepage.
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 w-full md:w-auto"
                >
                  Refresh Page
                </button>
                
                <button
                  onClick={() => window.location.href = '/'}
                  className="inline-block bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 w-full md:w-auto"
                >
                  Go to Homepage
                </button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-8 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400">
                    Error Details (Development)
                  </summary>
                  <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs text-gray-700 dark:text-gray-300 overflow-auto">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 