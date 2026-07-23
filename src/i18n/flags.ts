import type { Locale } from "./config";
export const flags: Record<Locale, string> = {
  en: `<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="16" fill="#012169"/><path d="M0,0 24,16 M24,0 0,16" stroke="#fff" stroke-width="3.2"/><path d="M0,0 24,16 M24,0 0,16" stroke="#C8102E" stroke-width="1.6"/><rect x="9.6" width="4.8" height="16" fill="#fff"/><rect y="5.6" width="24" height="4.8" fill="#fff"/><rect x="10.8" width="2.4" height="16" fill="#C8102E"/><rect y="6.8" width="24" height="2.4" fill="#C8102E"/></svg>`,
  it: `<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg"><rect width="8" height="16" fill="#009246"/><rect x="8" width="8" height="16" fill="#fff"/><rect x="16" width="8" height="16" fill="#CE2B37"/></svg>`,
  fr: `<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg"><rect width="8" height="16" fill="#0055A4"/><rect x="8" width="8" height="16" fill="#fff"/><rect x="16" width="8" height="16" fill="#EF4135"/></svg>`,
  de: `<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="16" fill="#000"/><rect y="5.33" width="24" height="5.33" fill="#DD0000"/><rect y="10.66" width="24" height="5.33" fill="#FFCE00"/></svg>`,
  zh: `<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="16" fill="#DE2910"/><path d="M4.5 3 l1.2 3.7 H9.6 l-3.1 2.3 1.2 3.7 -3.2 -2.3 -3.2 2.3 1.2 -3.7 -3.1 -2.3 H3.3 Z" fill="#FFDE00"/></svg>`,
};
