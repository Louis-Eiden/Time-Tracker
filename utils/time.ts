// Typescript Type
import { TimeFormat } from "../contexts/TimeContext";
import { useTimeFormat } from "../contexts/TimeContext";

export type DateFormat = "iso" | "24" | "12";

/**
 * Format a Date for display according to user preference
 */
export const formatTimeForDisplay = (
  date: Date,
  format: TimeFormat
): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (format === "24h") {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  }

  // 12h
  const h12 = hours % 12 || 12;
  const ampm = hours < 12 ? "AM" : "PM";

  return `${h12}:${String(minutes).padStart(2, "0")} ${ampm}`;
};

/**
 * Format a date (no time) for display
 */
export const formatDateForDisplay = (
  date: Date,
  timeFormat: TimeFormat
): string => {
  // const { timeFormat } = useTimeFormat(); // 24 | 12 | iso

  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();

  switch (timeFormat) {
    // case "iso":
    //   return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    case "12h":
      return `${m}/${d}/${y}`;
    case "24h":
    default:
      return `${d}.${m}.${y}`;
  }
};

/**
 * Parse a user-entered time string into a Date
 * Supports both 24h and 12h formats
 */
export const parseTimeFromInput = (
  input: string,
  baseDate: Date,
  format: TimeFormat
): Date | null => {
  if (format === "24h") {
    const match = input.match(/^([01]?\d|2[0-3]):([0-5]\d)$/);
    if (!match) return null;

    const [, h, m] = match;
    const date = new Date(baseDate);
    date.setHours(Number(h), Number(m), 0, 0);
    return date;
  }

  // 12h (e.g. "2:30 PM")
  const match = input.match(/^(\d{1,2}):([0-5]\d)\s?(AM|PM)$/i);
  if (!match) return null;

  let [, h, m, ap] = match;
  let hours = Number(h);

  if (ap.toUpperCase() === "PM" && hours < 12) hours += 12;
  if (ap.toUpperCase() === "AM" && hours === 12) hours = 0;

  const date = new Date(baseDate);
  date.setHours(hours, Number(m), 0, 0);

  return date;
};

export const formatDuration = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
    2,
    "0"
  )}:${String(secs).padStart(2, "0")}`;
};
