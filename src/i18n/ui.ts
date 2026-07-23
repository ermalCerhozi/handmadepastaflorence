import { defaultLocale, type Locale } from './config';
import type { Dict } from './types';
import en from './locales/en';
import it from './locales/it';

export const dictionaries: Record<Locale, Dict> = { en, it };

/** Return the full translation dictionary for a locale (English as fallback). */
export function useTranslations(lang: Locale): Dict {
  return dictionaries[lang] ?? dictionaries[defaultLocale];
}
