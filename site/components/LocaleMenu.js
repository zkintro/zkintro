import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { Globe } from 'lucide-react'
import { LOCALES } from '@/lib/locale'

const LocaleMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [currentLocale, setCurrentLocale] = useState('en')
    const router = useRouter()
    const menuRef = useRef(null)

    // Detect current locale from URL
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const path = window.location.pathname
            if (path.startsWith('/pt-br')) {
                setCurrentLocale('pt-br')
            } else if (path.startsWith('/es')) {
                setCurrentLocale('es')
            } else if (path.startsWith('/it')) {
                setCurrentLocale('it')
            } else if (path.startsWith('/zh-tw')) {
                setCurrentLocale('zh-tw')
            } else {
                setCurrentLocale('en')
            }
        }
    }, [router.asPath])

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    const languages = {
        'en': 'English',
        'pt-br': 'Português do Brasil',
        'es': 'Español',
        'it': 'Italiano',
        'zh-tw': '繁體中文'
    }

    const switchLanguage = (newLocale) => {
        if (typeof window === 'undefined') return

        const currentPath = window.location.pathname
        let newPath

        // Remove current locale prefix
        let basePath = currentPath
        for (const locale of ['pt-br', 'es', 'it', 'zh-tw']) {
            if (basePath.startsWith(`/${locale}`)) {
                basePath = basePath.substring(`/${locale}`.length) || '/'
                break
            }
        }

        // Add new locale prefix (except for English)
        if (newLocale === 'en') {
            newPath = basePath
        } else {
            newPath = `/${newLocale}${basePath === '/' ? '' : basePath}`
        }

        setIsOpen(false)
        window.location.href = newPath
    }

    return (
        <div className="relative" ref={menuRef}>
            <button
                type="button"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800/70 focus:outline-none"
                aria-label="Language menu"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Globe className="w-5 h-5 text-current" />
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl shadow-lg bg-white ring-1 ring-gray-200 dark:bg-neutral-900 dark:ring-neutral-700 z-50">
                    <div className="py-1">
                        {LOCALES.map((locale) => (
                            <button
                                key={locale}
                                onClick={() => switchLanguage(locale)}
                                className="flex items-center justify-between w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-900 dark:text-gray-100"
                            >
                                <span>{languages[locale]}</span>
                                {currentLocale === locale && (
                                    <span className="ml-2 text-sky-500 dark:text-green-400">✓</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default LocaleMenu 