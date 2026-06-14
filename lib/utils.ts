import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

//clsx and twmerge nice utilities to manage tailwind classes b/w parent and child components
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}