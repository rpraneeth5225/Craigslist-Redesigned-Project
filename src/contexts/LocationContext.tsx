import { createContext, useContext, useState } from 'react';

interface LocationContextType {
  currentLocation: string;
  setCurrentLocation: (location: string) => void;
  nearbyLocations: string[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const defaultNearbyLocations = [
  'New Jersey',
  'New York City',
  'Long Island',
  'Philadelphia',
  'Albany',
  'Connecticut',
  'Delaware',
  'Hudson Valley',
  'Jersey Shore',
  'Central Jersey',
  'South Jersey',
  'North Jersey',
  'Poconos',
  'Rhode Island',
  'Western Mass',
  'Eastern PA',
];

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [currentLocation, setCurrentLocation] = useState('New Jersey');
  const [isOpen, setIsOpen] = useState(false);

  const handleLocationChange = (location: string) => {
    setCurrentLocation(location);
    // Location change doesn't affect listings - they remain the same
  };

  return (
    <LocationContext.Provider 
      value={{ 
        currentLocation,
        setCurrentLocation: handleLocationChange,
        nearbyLocations: defaultNearbyLocations,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}