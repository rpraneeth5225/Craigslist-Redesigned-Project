import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { mockListings } from '@/data/mockListings';
import { Link } from 'react-router-dom';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
}

export default function SearchOverlay({ isOpen, onClose, searchQuery }: SearchOverlayProps) {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [trendingSearches] = useState([
    'apartments for rent',
    'used cars',
    'part-time jobs',
    'furniture',
    'electronics'
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const filteredListings = mockListings.filter(listing =>
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={onClose}
        >
          <div className="container mx-auto px-4 pt-20" onClick={e => e.stopPropagation()}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-3xl mx-auto"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Search Results</h3>
                  <button onClick={onClose}>
                    <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>

                {searchQuery ? (
                  <div className="space-y-4">
                    {filteredListings.length > 0 ? (
                      <div className="grid gap-4">
                        {filteredListings.map(listing => (
                          <Link
                            key={listing.id}
                            to={`/listing/${listing.id}`}
                            className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-lg"
                            onClick={onClose}
                          >
                            <img
                              src={listing.image}
                              alt={listing.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <h4 className="font-medium">{listing.title}</h4>
                              <p className="text-green-600">${listing.price.toLocaleString()}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">
                        No results found for "{searchQuery}"
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {recentSearches.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Recent Searches
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((search, index) => (
                            <button
                              key={index}
                              className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
                            >
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Trending Searches
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {trendingSearches.map((search, index) => (
                          <button
                            key={index}
                            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}