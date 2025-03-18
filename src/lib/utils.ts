import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const scaleTransitionClass = "transition-transform duration-200";
export const hoverScaleClass = "hover:scale-105";
export const activeScaleClass = "active:scale-95";
