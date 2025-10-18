import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
declare global {
  var globalImageDeleteCallback: ((url: string) => void) | null
}

// Set callback untuk image deletion di RichTextEditor
export function setGlobalImageDeleteCallback(callback: (url: string) => void) {
  globalThis.globalImageDeleteCallback = callback
}
