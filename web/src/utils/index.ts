import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sevenDaysAgo(): Date {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date;
}

export function getSevenDayRange(): { startDate: Date; endDate: Date } {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 6); // 7 days including today
  return { startDate, endDate };
}

export function isDateRangeWithinSevenDays(
  startDate: Date,
  endDate: Date
): boolean {
  if (!startDate || !endDate) return false;

  // Calculate the difference in days between start and end date
  // Add 1 to include both start and end dates (inclusive range)
  const timeDiff = endDate.getTime() - startDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;

  // Check if the date range is exactly 7 days
  return daysDiff === 7;
}
