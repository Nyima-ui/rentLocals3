import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculatePrice = (
  days: number,
  price_day: number,
  price_week: number,
): number => {
  if (days < 7) {
    return days * price_day;
  }
  const fullWeeks = Math.floor(days / 7);
  const remainingDays = days % 7;
  return fullWeeks * price_week + remainingDays * price_day;
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const toLocaleDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formateDatetoDayMonthYear = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};

export const getBookingStatusMessage = (
  config: GetBookingStatusMessageProps,
): string => {
  const { renter, owner, status, listing, role } = config;
  if (!renter || !owner || !status || !listing) return "";

  const BOOKING_STATUS_MESSAGES = {
    pending: {
      owner: `${renter} has requested to rent your ${listing}`,
      renter: `You've requested to rent the ${listing} from ${owner}.`,
    },
    accepted: {
      owner: `You have accepted ${renter}'s requests to rent your ${listing}`,
      renter: `Your request to rent ${listing} has been accepted by ${owner}`,
    },
    active: {
      owner: `Your rental ${listing} is active.`,
      renter: `Your booking ${listing} is active.`,
    },
    returned: {
      owner: `Your ${listing} has been returned to you by ${renter}.`,
      renter: `You have returned ${listing} to ${owner}.`,
    },
    cancelled: {
      owner: `${renter} cancelled their request to rent ${listing}.`,
      renter: `You cancelled your request to rent ${listing}`,
    },
    declined: {
      owner: `${owner} declined your request to rent ${listing}.`,
      renter: `You request to rent ${listing} has been declined.`,
    },
  };

  return BOOKING_STATUS_MESSAGES[status][role];
};

export const getSystemMessage = (config: GetSystemMessageProps): string => {
  const { renter, systemMessage, role } = config;
  if (!renter || !systemMessage || !role) return "";

  const SYSTEM_MESSAGES = {
    booking_requested: {
      owner: `${renter} sent a booking request.`,
      renter: `Booking request sent.`,
    },
    booking_accepted: {
      owner: `You accepted the booking.`,
      renter: `Your booking was accepted.`,
    },
    booking_active: {
      owner: `Rental is now active.`,
      renter: `Rental is now active.`,
    },
    booking_returned: {
      owner: `Item has been returned.`,
      renter: `Item has been returned.`,
    },
    booking_cancelled: {
      owner: `Booking was cancelled.`,
      renter: `You cancelled the booking.`,
    },
    booking_declined: {
      owner: `You declined the booking.`,
      renter: `Booking was declined.`,
    },
  };

  return SYSTEM_MESSAGES[systemMessage][role];
};
