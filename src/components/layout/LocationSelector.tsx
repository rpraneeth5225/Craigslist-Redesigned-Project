import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronDown } from 'lucide-react';
import { useLocation } from '@/contexts/LocationContext';
import { useState } from 'react';

export default function LocationSelector() {
  const { currentLocation, setCurrentLocation, formattedLocation, nearbyLocations } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
      >
        <MapPin className="h-4 w-4 text-blue-600" />
        <span className="text-gray-700">{formattedLocation}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-1 z-50 max-h-96 overflow-y-auto"
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
        )}
      </AnimatePresence>
    </div>
  );
}