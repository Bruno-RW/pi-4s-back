import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export function formatNumber(number: number) {
  return new Intl.NumberFormat('pt-BR').format(number)
};

export function getInitials(fullName: string) {
  const nameArray = fullName.split(" ");

  const firstName = nameArray[0].charAt(0).toUpperCase();
  const lastName = nameArray[nameArray.length - 1].charAt(0).toUpperCase();

  return firstName + lastName;
};

export function getUrl(headers: ReadonlyHeaders) {
  const url = headers.get('x-url') as string;
  const pathname = headers.get('x-pathname') as string;
  const origin = headers.get('x-origin') as string;

  return { url, pathname, origin };
};

export function formatDateTime(
  date: Date | null,
  defaultOptions: boolean = true,
  options: Intl.DateTimeFormatOptions = {}
) {
  if (!date) return "";

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const formatOptions = defaultOptions ? { ...dateOptions, ...options } : options;

  let formattedDate = new Intl.DateTimeFormat("pt-BR", formatOptions).format(date);

  if (options.month == "short") {
    formattedDate = formattedDate
    .replace( /\b\w/g, char => char.toUpperCase() )
    .replace( '.', '' );
  }

  return formattedDate;
};