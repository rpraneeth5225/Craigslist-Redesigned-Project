import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const categories = [
  { name: 'Vehicles', path: '/search/vehicles' },
  { name: 'Housing', path: '/search/housing' },
  { name: 'Jobs', path: '/search/jobs' },
  { name: 'For Sale', path: '/search/for-sale' },
  { name: 'Services', path: '/search/services' },
  { name: 'Community', path: '/search/community' },
  { name: 'Discussion Forums', path: '/forums' },
];

export default function Categories() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hidden md:block">
      <nav className="flex items-center space-x-6">
        {categories.slice(0, 5).map((category) => (
          <Link
            key={category.name}
            to={category.path}
            className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
          >
            {category.name}
          </Link>
        ))}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
          >
            More
            <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-30"
                  onClick={() => setIsOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-40"
                >
                  {categories.slice(5).map((category) => (
                    <Link
                      key={category.name}
                      to={category.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                      onClick={() => setIsOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </div>
  );
}