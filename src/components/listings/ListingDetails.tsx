import { MapPin, Calendar, Share2, Flag, Heart, ChevronLeft, ChevronRight, Maximize2, Tag, MessageCircle, AlertTriangle, Shield, MapPinned, Clock, DollarSign, Truck, ThumbsUp, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Listing } from '@/types/listing';
import { formatDate } from '@/lib/utils';
import Rating from '@/components/ui/Rating';
import Button from '@/components/ui/Button';

interface ListingDetailsProps {
  listing: Listing;
}

export default function ListingDetails({ listing }: ListingDetailsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState('');
  const [viewCount, setViewCount] = useState(Math.floor(Math.random() * 100) + 20);
  const [activeTab, setActiveTab] = useState('description');
  const [showSafetyTips, setShowSafetyTips] = useState(false);

  // Simulate multiple images
  const images = [
    listing.image,
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=500',
    'https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?auto=format&fit=crop&w=500',
  ];

  useEffect(() => {
    // Simulate view count increment
    const timer = setTimeout(() => {
      setViewCount(prev => prev + 1);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const safetyTips = [
    'Meet in a public place',
    'Do not send money before receiving the item',
    'Verify the item before purchasing',
    'Keep communication within the platform',
    'Trust your instincts',
  ];

  const similarListings = [
    {
      id: '1',
      title: 'Similar Item 1',
      price: listing.price * 0.9,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500',
    },
    {
      id: '2',
      title: 'Similar Item 2',
      price: listing.price * 1.1,
      image: 'https://images.unsplash.com/photo-1550226891-ef816aed4a98?auto=format&fit=crop&w=500',
    },
  ];

  const handleShare = async () => {
    try {
      await navigator.share({
        title: listing.title,
        text: listing.description,
        url: window.location.href,
      });
    } catch (error) {
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending message
    setTimeout(() => {
      setShowContactForm(false);
      setMessage('');
      alert('Message sent successfully!');
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        {/* Image Gallery Section */}
        <div className="relative h-[500px] group">
          <motion.img
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={images[currentImageIndex]}
            alt={listing.title}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setIsImageModalOpen(true)}
          />
          
          {/* Image Navigation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>

          {/* Image Navigation Arrows */}
          <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevImage}
              className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNextImage}
              className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white"
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full ${
                isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
              } shadow-lg transition-colors duration-200`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="p-2 rounded-full bg-white text-gray-600 shadow-lg"
            >
              <Share2 className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsImageModalOpen(true)}
              className="p-2 rounded-full bg-white text-gray-600 shadow-lg"
            >
              <Maximize2 className="h-5 w-5" />
            </motion.button>
          </div>

          {/* View Count Badge */}
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            {viewCount} views
          </div>
        </div>
        
        {/* Main Content */}
        <div className="p-6">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2 mb-2"
              >
                <Tag className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-600 capitalize">
                  {listing.category}
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-gray-900 mb-2"
              >
                {listing.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-3xl font-bold text-green-600"
              >
                ${listing.price.toLocaleString()}
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col space-y-2"
            >
              <Button
                size="lg"
                onClick={() => setShowContactForm(true)}
                className="flex items-center"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Contact Seller
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSafetyTips(true)}
                className="flex items-center"
              >
                <Shield className="h-5 w-5 mr-2" />
                Safety Tips
              </Button>
            </motion.div>
          </div>

          {/* Location and Date */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 text-sm text-gray-500 mb-6"
          >
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {listing.location}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(listing.date)}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              Posted {Math.floor(Math.random() * 24)} hours ago
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="border-b mb-6">
            <div className="flex space-x-8">
              {['description', 'details', 'shipping', 'seller'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 relative ${
                    activeTab === tab
                      ? 'text-blue-600 font-medium'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span className="capitalize">{tab}</span>
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-8">
            {activeTab === 'description' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="prose max-w-none"
              >
                <p className="text-gray-600 whitespace-pre-line">{listing.description}</p>
              </motion.div>
            )}

            {activeTab === 'details' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {listing.details && Object.entries(listing.details).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b">
                    <dt className="text-gray-600">{key}</dt>
                    <dd className="font-medium text-gray-900">{value}</dd>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'shipping' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 text-green-600">
                  <Truck className="h-5 w-5" />
                  <span>Free local pickup available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPinned className="h-5 w-5 text-gray-400" />
                  <span>Delivery available within 10 miles</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  <span>Shipping cost varies by location</span>
                </div>
              </motion.div>
            )}

            {activeTab === 'seller' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{listing.seller.name}</h3>
                    <Rating value={listing.seller.rating} className="mt-1" />
                  </div>
                  <div className="text-sm text-gray-500">
                    Member since {formatDate(listing.seller.joinDate)}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <ThumbsUp className="h-5 w-5 text-green-500" />
                  <span>Quick responses</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Similar Listings */}
          <div className="border-t pt-8">
            <h3 className="text-lg font-semibold mb-4">Similar Listings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {similarListings.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-4 rounded-lg border hover:shadow-md transition-shadow"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-green-600">${item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Safety Tips Modal */}
      <AnimatePresence>
        {showSafetyTips && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold flex items-center">
                  <Shield className="h-5 w-5 text-green-500 mr-2" />
                  Safety Tips
                </h3>
                <button
                  onClick={() => setShowSafetyTips(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="space-y-3">
                {safetyTips.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-gray-700"
                  >
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                    {tip}
                  </motion.li>
                ))}
              </ul>
              <Button
                onClick={() => setShowSafetyTips(false)}
                className="w-full mt-6"
              >
                Got it
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            onClick={() => setIsImageModalOpen(false)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={images[currentImageIndex]}
              alt={listing.title}
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">Contact Seller</h3>
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="I'm interested in this listing..."
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowContactForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Send Message</Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}