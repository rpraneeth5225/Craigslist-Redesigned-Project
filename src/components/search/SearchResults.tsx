import { motion, AnimatePresence } from 'framer-motion';
import { Listing } from '@/types/listing';
import ListingCard from '../listings/ListingCard';

interface SearchResultsProps {
  results: Listing[];
  isLoading: boolean;
}

export default function SearchResults({ results, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm h-[300px] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <p className="text-gray-500 text-lg">No listings found matching your search.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AnimatePresence>
        {results.map((listing, index) => (
          <ListingCard key={listing.id} listing={listing} index={index} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}