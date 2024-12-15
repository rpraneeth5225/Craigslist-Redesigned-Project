import { useState } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from '@/contexts/LocationContext';
import SearchResults from '../search/SearchResults';
import { useSearch } from '@/hooks/useSearch';
import LocationSelector from './LocationSelector';

export default function SearchBanner() {
  const { query, setQuery, category, setCategory, results, isLoading } = useSearch();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const categories = [
    'All Categories',
    'Vehicles',
    'Housing',
    'Jobs',
    'For Sale',
    'Services',
    'Community'
  ];

  const handleClearSearch = () => {
    setQuery('');
    setCategory('All Categories');
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 animate-gradient"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(37, 99, 235, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(37, 99, 235, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.02) 0%, transparent 70%)
          `
        }}
      />

      <div className="relative py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find what you need
            </h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl text-gray-600 flex items-center justify-center gap-2"
            >
              in <LocationSelector />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto relative"
          >
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search listings..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    className="w-full pl-12 pr-10 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  />
                  {query && (
                    <button
                      onClick={handleClearSearch}
                      className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="appearance-none w-full md:w-48 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {(isSearchFocused || query) && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-7xl mx-auto mt-4"
              >
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <SearchResults results={results} isLoading={isLoading} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}