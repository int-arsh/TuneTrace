import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import LyricsPage from './pages/LyricsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <div className="App">
            <ThemeToggle />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/lyrics/:artist/:title" element={<LyricsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
