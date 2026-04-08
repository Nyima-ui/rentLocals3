interface SearchResults {
  id: string;
  title: string;
  category: string;
  price_day: number;
}

interface Listing {
  id: string;
  owner_id: string;
  category: string;
  title: string;
  description: string;
  location: string;
  pictures: string[];
  status: string;
  price_day: number;
  price_week: number;
}
interface AuthContextProps {
  user: User | null;
}

interface HyggloPrice {
  days: number;
  label: string;
}

interface HyggloListing {
  slug: string;
  product: {
    name: string;
    description: string;
    category: { name: string };
    prices: HyggloPrice[];
    images: { fullSizeUrl: string }[];
  };
  location: {
    street?: string;
    label: string;
  };
}
interface ListingPrices {
  day?: number;
  week?: number;
}

interface ParsedHyggloListing {
  title: string;
  description: string;
  category: string;
  location: string;
  prices: ListingPrices;
  pictures: string[];
}

interface IncomingListing extends Listing {
  id: string;
  price_day: number;
  price_week: number;
  owner_id: string;
}

interface SearchResults {
  id: string;
  title: string;
  category: string;
  price_day: number;
}

interface BookingPayload {
  renter_id: string;
  owner_id: string;
  listing_id: string;
  start_date: string;
  end_date: string;
  price_day: number;
  total: number;
  status: "pending" | "accepted" | "active" | "completed" | "cancelled";
}
