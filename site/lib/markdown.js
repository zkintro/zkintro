import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'
import getAllFilesRecursively from './utils/files'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkFootnotes from 'remark-footnotes'
import remarkMath from 'remark-math'
import remarkExtractFrontmatter from './remark-extract-frontmatter'
import remarkCodeTitles from './remark-code-title'
import remarkTocHeadings from './remark-toc-headings'
import remarkImgToJsx from './remark-img-to-jsx'
// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'

const root = process.cwd()

export function getFiles(type) {
  const prefixPaths = path.join(root, '..', 'content', 'en')
  const files = getAllFilesRecursively(prefixPaths)
  // Only want to return blog/path and ignore root, replace is needed to work on Windows
  return files.map((file) => file.slice(prefixPaths.length + 1).replace(/\\/g, '/'))
}

export function formatSlug(slug) {
  // Remove numeric prefixes (like "01_") from the slug
  const withoutPrefix = slug.replace(/^\d+_/, '')
  // Remove .md extension
  return withoutPrefix.replace(/\.md$/, '')
}

export function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export async function getFileBySlug(type, slug) {
  // Handle author files from data directory
  if (type === 'authors') {
    const mdPath = path.join(root, 'data', type, `${slug}.md`)
    const source = fs.readFileSync(mdPath, 'utf8')
    const { content, data: frontmatter } = matter(source)

    return {
      mdxSource: content,
      toc: [],
      frontMatter: {
        ...frontmatter,
        slug: slug || null,
        fileName: `${slug}.md`,
      },
    }
  }

  // Handle content files from content/en directory
  // Map slug back to filename - handle both with and without numeric prefixes
  let fileName = `${slug}.md`
  const prefixPaths = path.join(root, '..', 'content', 'en')
  const files = getAllFilesRecursively(prefixPaths)

  // Try to find a file that matches this slug when stripped of numeric prefix
  for (const file of files) {
    const relativePath = file.slice(prefixPaths.length + 1).replace(/\\/g, '/')
    if (formatSlug(relativePath) === slug) {
      fileName = relativePath
      break
    }
  }

  const mdPath = path.join(root, '..', 'content', 'en', fileName)
  const source = fs.readFileSync(mdPath, 'utf8')

  const { content, data: frontmatter } = matter(source)

  // Transform image paths from ../assets to /static/images
  const transformedContent = content.replace(/\.\.\/assets\//g, '/static/images/')

  return {
    mdxSource: transformedContent,
    toc: [],
    frontMatter: {
      readingTime: readingTime(content),
      slug: slug || null,
      fileName: fileName,
      ...frontmatter,
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
    },
  }
}

export async function getAllFilesFrontMatter(folder) {
  const prefixPaths = path.join(root, '..', 'content', 'en')

  const files = getAllFilesRecursively(prefixPaths)

  const allFrontMatter = []

  files.forEach((file) => {
    // Replace is needed to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/')
    // Only process .md files
    if (path.extname(fileName) !== '.md') {
      return
    }
    const source = fs.readFileSync(file, 'utf8')
    const { data: frontmatter } = matter(source)
    if (frontmatter.draft !== true) {
      allFrontMatter.push({
        ...frontmatter,
        // Use the slug from frontmatter if available, otherwise generate from filename
        slug: frontmatter.slug || formatSlug(fileName),
        date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
      })
    }
  })

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}
