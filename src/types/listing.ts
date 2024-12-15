export interface Listing {
  id: string;
  title: string;
  price: number;
  location: string;
  date: Date;
  image: string;
  description?: string;
  category: string;
  seller: {
    name: string;
    rating: number;
    joinDate: Date;
  };
  details?: Record<string, string>;
}