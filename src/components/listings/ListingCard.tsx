import { Link } from 'react-router-dom';
import { Listing } from '@/types/listing';
import { formatDate } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, Flag, EyeOff, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';

interface ListingCardProps {
  listing: Listing;
  index?: number;
}

export default function ListingCard({ listing, index = 0 }: ListingCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const { showToast } = useToast();

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    showToast(
      'success',
      isLiked ? 'Removed from favorites' : 'Added to favorites'
    );
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.share({
        title: listing.title,
        text: listing.description,
        url: window.location.href,
      });
      showToast('success', 'Listing shared successfully');
    } catch (error) {
      navigator.clipboard.writeText(window.location.href);
      showToast('info', 'Link copied to clipboard');
    }
  };

  const handleFlag = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    showToast('info', 'Listing reported to moderators');
  };

  const handleHide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsHidden(true);
    showToast('success', 'Listing hidden');
  };

  if (isHidden) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative group"
    >
      <Link 
        to={`/listing/${listing.id}`}
        className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
      >
        <div className="relative">
          {/* Image Container */}
          <div className="relative aspect-[4/3] sm:aspect-[3/2] md:aspect-[4/3] overflow-hidden">
            <motion.img
              src={listing.image}
              alt={listing.title}
              className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {/* Price Badge */}
            {listing.price > 0 && (
              <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm bg-opacity-90">
                ${listing.price.toLocaleString()}
              </div>
            )}

            {/* Quick Action Buttons */}
            <div className="absolute top-3 left-3 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                className={`p-2 rounded-full backdrop-blur-sm ${
                  isLiked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600'
                } shadow-lg hover:shadow-xl transition-all duration-200`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                className="p-2 rounded-full bg-white/90 text-gray-600 shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
              >
                <Share2 className="h-4 w-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowActions(!showActions);
                }}
                className="p-2 rounded-full bg-white/90 text-gray-600 shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
              >
                <MoreHorizontal className="h-4 w-4" />
              </motion.button>
            </div>

            {/* Mobile Touch Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity md:hidden" />
          </div>

          {/* Action Menu */}
          <AnimatePresence>
            {showActions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute top-16 left-4 bg-white rounded-lg shadow-xl py-2 z-10"
              >
                <button
                  onClick={handleFlag}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <Flag className="h-4 w-4" />
                  <span>Report Listing</span>
                </button>
                <button
                  onClick={handleHide}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <EyeOff className="h-4 w-4" />
                  <span>Hide Listing</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 sm:line-clamp-1">
            {listing.title}
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
            <span className="text-gray-600 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              {listing.location}
            </span>
            <span className="text-gray-500">{formatDate(listing.date)}</span>
          </div>
        </div>

        {/* Mobile Action Bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 ${
              isLiked ? 'text-red-500' : 'text-gray-600'
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm">Save</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center space-x-1 text-gray-600"
          >
            <Share2 className="h-4 w-4" />
            <span className="text-sm">Share</span>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowActions(!showActions);
            }}
            className="flex items-center space-x-1 text-gray-600"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="text-sm">More</span>
          </button>
        </div>
      </Link>
    </motion.div>
  );
}