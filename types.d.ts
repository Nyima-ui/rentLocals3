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
