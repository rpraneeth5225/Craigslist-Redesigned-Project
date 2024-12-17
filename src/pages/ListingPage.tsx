import { useParams } from 'react-router-dom';
import { mockListings } from '@/data/mockListings';
import ListingDetails from '@/components/listings/ListingDetails';

export default function ListingPage() {
  const { id } = useParams<{ id: string }>();
  const listing = mockListings.find(l => l.id === id);

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-gray-500">Listing not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ListingDetails listing={listing} />
    </div>
  );
}