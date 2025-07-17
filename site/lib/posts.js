// site/lib/posts.js
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { DEFAULT_LOCALE } from './locale.js'

const ROOT = path.join(process.cwd(), '..', 'content')

export function slugs(locale = DEFAULT_LOCALE) {
    const dir = path.join(ROOT, locale)
    return fs
        .readdirSync(dir)
        .filter(f => f.endsWith('.md'))
        .map(f => f.replace(/\.md$/, '').replace(/^\d+_/, ''))
}

export function load(locale, slug) {
    const dir = path.join(ROOT, locale)
    // Find the actual file (may have number prefix)
    const files = fs.readdirSync(dir)
    const actualFile = files.find(f =>
        f.endsWith('.md') && f.replace(/\.md$/, '').replace(/^\d+_/, '') === slug
    )
    if (!actualFile) {
        throw new Error(`Post not found: ${slug} in ${locale}`)
    }
    const file = path.join(dir, actualFile)
    const raw = fs.readFileSync(file, 'utf8')
    const { data, content } = matter(raw)
    // Rewrite image paths from ../assets/ to /assets/
    const processedContent = content.replace(/\.\.\/assets\//g, '/assets/')
    return { front: data, content: processedContent }
} 