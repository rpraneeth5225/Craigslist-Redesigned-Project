import { Link } from 'react-router-dom';
import { User, Plus, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import LocationSelector from './LocationSelector';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onPostClick: () => void;
}

const categories = [
  { name: 'Housing', path: '/search/housing' },
  { name: 'Jobs', path: '/search/jobs' },
  { name: 'For Sale', path: '/search/for-sale' },
  { name: 'Services', path: '/search/services' },
  { name: 'Community', path: '/search/community' },
  { name: 'Discussion Forums', path: '/forums' },
];

export default function Sidebar({
  isOpen,
  onClose,
  isLoggedIn,
  onLoginClick,
  onPostClick,
}: SidebarProps) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 overflow-y-auto"
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Location Selector */}
          <div className="mb-6">
            <LocationSelector />
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 mb-6">
            <Button
              onClick={onPostClick}
              className="w-full justify-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Post
            </Button>
            <Button
              variant="outline"
              onClick={onLoginClick}
              className="w-full justify-center"
            >
              <User className="h-5 w-5 mr-2" />
              {isLoggedIn ? 'Account' : 'Sign In'}
            </Button>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
              Categories
            </h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-blue-600"
                  onClick={onClose}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}