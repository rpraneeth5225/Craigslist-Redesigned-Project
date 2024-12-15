import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Listing } from '@/types/listing';
import { mockListings } from '@/data/mockListings';
import { Link } from 'react-router-dom';

export default function RecommendationBar() {
  const [recommendations, setRecommendations] = useState<Listing[]>([]);

  useEffect(() => {
    // Simulate AI-based recommendations
    const getRecommendations = () => {
      const shuffled = [...mockListings].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    };

    setRecommendations(getRecommendations());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 mx-auto max-w-7xl"
    >
      <h3 className="text-lg font-semibold mb-4">Recommended for you</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((listing) => (
          <Link
            key={listing.id}
            to={`/listing/${listing.id}`}
            className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <img
              src={listing.image}
              alt={listing.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <h4 className="font-medium text-gray-900">{listing.title}</h4>
              <p className="text-green-600 font-semibold">
                ${listing.price.toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}