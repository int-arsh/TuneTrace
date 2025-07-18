import { Component } from 'react';

/**
 * ErrorBoundary Component
 * 
 * This is a React class component that catches JavaScript errors anywhere in its child component tree
 * and displays a fallback UI instead of crashing the entire application.
 * 
 * Think of it as a "safety net" for your React app - if something goes wrong in any component,
 * this boundary catches the error and shows a user-friendly error page instead of a blank screen.
 * 
 * IMPORTANT: Error Boundaries must be class components because React only provides error boundary
 * functionality through class component lifecycle methods.
 * 
 * example
 * <ErrorBoundary>
 *   <YourApp />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component { // extends Component is a React class component inheriting from the Component class
  constructor(props) {  // constructor is a special method that is called when a new instance of the class is created
    super(props);
    // Initialize state to track if an error has occurred
    this.state = { hasError: false, error: null };
  }

  /**
   * Static method called when an error is thrown in any child component
   * 
   * This method is called during the "render" phase, so side effects are not allowed.
   * It should only update the state to indicate that an error occurred.
   * 
   * @param {Error} error - The error that was thrown
   * @returns {Object} New state object indicating an error occurred
   */
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }; // return the state object with the error
  }

  /**
   * Lifecycle method called after an error has been thrown
   * 
   * This method is called during the "commit" phase, so side effects are allowed.
   * Use this method to log error information, send error reports to your server, etc.
   * 
   * @param {Error} error - The error that was thrown
   * @param {Object} errorInfo - Additional information about the error
   */
  componentDidCatch(error, errorInfo) {
    // Log the error for debugging purposes
    console.error('Error caught by boundary:', error, errorInfo);
    
    // In a real application, you might want to:
    // - Send error to your error reporting service (like Sentry)
    // - Log error to your server
    // - Show a toast notification
  }

  render() {
    // If an error occurred, show the fallback UI
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto">
              {/* Error Icon */}
              <div className="mb-8">
                <div className="text-6xl font-bold text-red-200 dark:text-red-800 mb-4">
                  ⚠️
                </div>
              </div>

              {/* Error Message */}
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Something went wrong
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                We encountered an unexpected error. Please try refreshing the page or go back to the homepage.
              </p>

              {/* Action Buttons */}
              <div className="space-y-4">
                {/* Refresh Button */}
                <button
                  onClick={() => window.location.reload()}
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 w-full md:w-auto"
                >
                  Refresh Page
                </button>
                
                {/* Homepage Button */}
                <button
                  onClick={() => window.location.href = '/'}
                  className="inline-block bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 w-full md:w-auto"
                >
                  Go to Homepage
                </button>
              </div>

              {/* Development Error Details */}
              {/* Only show detailed error information in development mode */}
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

    // If no error occurred, render the children normally
    return this.props.children;
  }
}

export default ErrorBoundary; 