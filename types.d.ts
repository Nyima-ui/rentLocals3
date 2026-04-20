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

interface SingleListing extends Listing {
  owner: {
    avatar: string;
    fullname: string;
  };
}
interface AuthContextProps {
  user: User | null;
  profile: {
    avatar: string | null;
    fullname: string | null;
  } | null;
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
    municipality?: string;
    bestLocation?: {
      name: string;
      parentName: string;
    };
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
  location: string | null;
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
  status:
    | "pending"
    | "accepted"
    | "active"
    | "returned"
    | "cancelled"
    | "declined";
}

interface Profile {
  avatar: string;
  fullname: string;
}

interface ExistingBookingPayload {
  renter_id: string;
  owner_id: string;
  listing_id: string;
}

interface BookingStatusHistory {
  id: string;
  status: Booking["status"];
  created_at: string;
}

interface Booking {
  id: string;
  created_at: string;
  updated_at: string;
  start_date: string;
  end_date: string;
  price_day: string;
  total: string;
  status:
    | "pending"
    | "accepted"
    | "active"
    | "returned"
    | "cancelled"
    | "declined";
  payment_status: string;
  listing_id: string;
  owner_id: string;
  renter_id: string;
  listing: {
    title: string;
    pictures: string[];
  };
  owner: {
    fullname: string;
    avatar: string;
  };
  renter: {
    fullname: string;
    avatar: string;
  };
  status_history: BookingStatusHistory[];
}

interface MessageBubbleProps {
  variant: "sent" | "received";
  msg: string;
  avatar: string;
}

interface MessagePayload {
  booking_id: string;
  sender_id: string;
  receiver_id: string;
  listing_id: string;
  message: string;
  type: "message" | "system";
}

type SystemMessage =
  | "booking_requested"
  | "booking_accepted"
  | "booking_active"
  | "booking_returned"
  | "booking_cancelled"
  | "booking_declined";

interface GetSystemMessageProps {
  renter: string;
  systemMessage: SystemMessage;
  role: "owner" | "renter";
}

type ChatMessage =
  | {
      id: string;
      type: "message";
      message: string;
      sender_id: string;
      receiver_id: string;
      booking_id: string;
      listing_id: string;
      created_at: string;
    }
  | {
      id: string;
      type: "system";
      message: SystemMessage;
      sender_id: null;
      receiver_id: null;
      booking_id: string;
      listing_id: string;
      created_at: string;
    };

type BookingStatus =
  | "pending"
  | "accepted"
  | "active"
  | "returned"
  | "cancelled"
  | "declined";

interface GetBookingStatusMessageProps {
  renter: string;
  owner: string;
  status: BookingStatus;
  listing: string;
  role: "renter" | "owner";
}
