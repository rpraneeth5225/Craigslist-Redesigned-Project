import { useState, useEffect, useMemo } from 'react';
import { mockListings } from '@/data/mockListings';
import { Listing } from '@/types/listing';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Listing[]>(mockListings);

  const filteredResults = useMemo(() => {
    const searchTerms = query.toLowerCase().split(' ').filter(Boolean);
    
    return mockListings.filter(listing => {
      // Filter by category first
      if (category !== 'All Categories' && listing.category.toLowerCase() !== category.toLowerCase()) {
        return false;
      }

      // If no search query, return all listings in the category
      if (searchTerms.length === 0) {
        return true;
      }

      // Search in title, description, and location
      const searchText = `${listing.title} ${listing.description} ${listing.location}`.toLowerCase();
      
      // All search terms must be found
      return searchTerms.every(term => searchText.includes(term));
    });
  }, [query, category]);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API delay
    const timer = setTimeout(() => {
      setResults(filteredResults);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [filteredResults]);

  return {
    query,
    setQuery,
    category,
    setCategory,
    results,
    isLoading
  };
}