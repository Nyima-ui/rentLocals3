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
