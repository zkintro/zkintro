export const LOCALES = ['en', 'pt-br']
export const DEFAULT_LOCALE = 'en'

/** Return locale if first segment matches, else default */
export function pickLocale(pathParts) {
    const [first, ...rest] = pathParts
    return LOCALES.includes(first)
        ? { locale: first, slugParts: rest }
        : { locale: DEFAULT_LOCALE, slugParts: pathParts }
} 