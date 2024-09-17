import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export function getInitials(fullName: string) {
  const nameArray = fullName.split(" ");

  const firstName = nameArray[0].charAt(0).toUpperCase();
  const lastName = nameArray[nameArray.length - 1].charAt(0).toUpperCase();

  return firstName + lastName;
};