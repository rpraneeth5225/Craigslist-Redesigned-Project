import { useParams } from 'react-router-dom';
import { mockListings } from '@/data/mockListings';
import ListingCard from '@/components/listings/ListingCard';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const listings = mockListings.filter(l => l.category === category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 capitalize">
        {category?.replace('-', ' ')} Listings
      </h1>
      
      {listings.length === 0 ? (
        <p className="text-center text-gray-500">No listings found in this category</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}