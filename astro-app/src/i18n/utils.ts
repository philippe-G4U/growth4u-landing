import { es } from './es';
import { en } from './en';

export type Locale = 'es' | 'en';

const translations = { es, en };

export function getTranslations(locale: Locale = 'es') {
  return translations[locale] || translations.es;
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en') return 'en';
  return 'es';
}

export function getLocalizedPath(path: string, locale: Locale): string {
  if (locale === 'es') return path;
  return `/en${path}`;
}
