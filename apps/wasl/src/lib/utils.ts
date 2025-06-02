import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date for Arabic display using Gregorian calendar with Arabic day names
 * Uses ar-GA locale to get Gregorian calendar with Arabic text
 */
export function formatArabicDate(dateString: string, options?: Intl.DateTimeFormatOptions) {
  if (!dateString) return 'غير محدد';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'تاريخ غير صحيح';

  const defaultOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString('ar-GA', {
    ...defaultOptions,
    ...options,
  });
}

/**
 * Format time for Arabic display with Western Arabic numerals
 * Uses en-SA locale to get Western Arabic numerals (1,2,3 instead of ١,٢,٣)
 */
export function formatArabicTime(dateString: string, options?: Intl.DateTimeFormatOptions) {
  if (!dateString) return 'غير محدد';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'وقت غير صحيح';

  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  return date.toLocaleTimeString('en-SA', {
    ...defaultOptions,
    ...options,
  });
}

/**
 * Format date in short format for compact displays
 */
export function formatArabicDateShort(dateString: string) {
  if (!dateString) return 'غير محدد';

  return formatArabicDate(dateString, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format date without weekday for simple date display
 */
export function formatArabicDateSimple(dateString: string) {
  if (!dateString) return 'غير محدد';

  return formatArabicDate(dateString, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
