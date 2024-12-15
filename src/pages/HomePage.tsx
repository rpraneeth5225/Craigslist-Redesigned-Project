import { motion } from 'framer-motion';
import SearchBanner from '@/components/home/SearchBanner';
import FeaturedListings from '@/components/home/FeaturedListings';

export default function HomePage() {
  return (
    <div>
      <SearchBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Listings</h2>
          <FeaturedListings />
        </motion.section>
      </div>
    </div>
  );
}