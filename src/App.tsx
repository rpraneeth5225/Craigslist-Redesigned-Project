import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ListingPage from './pages/ListingPage';
import CategoryPage from './pages/CategoryPage';
import AIAssistant from './components/ai/AIAssistant';
import { LocationProvider } from './contexts/LocationContext';
import { ToastProvider } from './contexts/ToastContext';

function App() {
  return (
    <Router>
      <ToastProvider>
        <LocationProvider>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navigation />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/listing/:id" element={<ListingPage />} />
                <Route path="/search/:category" element={<CategoryPage />} />
              </Routes>
            </main>
            <Footer />
            <AIAssistant />
          </div>
        </LocationProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;