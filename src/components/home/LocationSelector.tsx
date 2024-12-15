import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';
import { useLocation } from '@/contexts/LocationContext';

export default function LocationSelector() {
  const { currentLocation, setCurrentLocation, nearbyLocations, isOpen, setIsOpen } = useLocation();

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-blue-600 font-semibold flex items-center hover:text-blue-700 transition-colors"
      >
        {currentLocation}
        <ChevronDown className={`ml-1 h-6 w-6 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
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
              className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-40 max-h-96 overflow-y-auto"
            >
              {nearbyLocations.map((location) => (
                <button
                  key={location}
                  onClick={() => {
                    setCurrentLocation(location);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 ${
                    currentLocation === location ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <MapPin className={`h-4 w-4 ${
                    currentLocation === location ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <span className="capitalize">{location}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}