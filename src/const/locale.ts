import { isQinglingCustomized } from './branding';
import { supportLocales } from '@/locales/resources';

export const DEFAULT_LANG = isQinglingCustomized ? 'zh-CN' : 'en-US';
export const LOBE_LOCALE_COOKIE = 'QL_LOCALE';

/**
 * Check if the language is supported
 * @param locale
 */
export const isLocaleNotSupport = (locale: string) => !supportLocales.includes(locale);
