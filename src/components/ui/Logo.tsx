import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2 group">
      <motion.div
        whileHover={{ rotate: 5 }}
        className="text-blue-600 flex items-center"
      >
        {/* Peace Symbol */}
        <svg
          viewBox="0 0 100 100"
          className="h-8 w-8 group-hover:text-blue-700 transition-colors"
          fill="currentColor"
        >
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8"/>
          <path
            d="M50 5 L50 95 M50 50 L20 20 M50 50 L80 20"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
          />
        </svg>
      </motion.div>
      <div className="flex items-baseline">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors lowercase"
        >
          CRAIGSLIST
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-600 group-hover:text-gray-700 transition-colors lowercase"
        >
          
        </motion.span>
      </div>
    </Link>
  );
}