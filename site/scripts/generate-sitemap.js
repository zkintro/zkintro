const fs = require('fs')
const globby = require('globby')
const prettier = require('prettier')
const siteMetadata = require('../data/siteMetadata')

const YOUR_AWESOME_DOMAIN = siteMetadata.siteUrl

const formatted = (date) => {
  const [year, month, day] = date.split('-')
  return `${year}-${month}-${day}`
}

const generateSitemap = async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')
  const pages = await globby([
    'pages/*.js',
    'pages/*.tsx',
    'pages/*.ts',
    '!pages/_*.js',
    '!pages/_*.tsx',
    '!pages/_*.ts',
    '!pages/api',
    '!pages/404.tsx',
    '!pages/404.js',
    '!pages/articles/[slug].js',
    '!pages/articles/[slug].tsx',
    '!pages/blog/[slug].js',
    '!pages/blog/[slug].tsx',
  ])

  // Get all markdown files in content/en
  const contentFiles = await globby([
    '../content/en/**/*.md',
    '../content/en/**/*.mdx',
  ])

  const basePages = pages
    .filter((file) => !file.includes('['))
    .filter((file) => !file.includes(']'))
    .filter((file) => !file.includes('props'))
    .map((file) => {
      const path = file
        .replace('pages/', '')
        .replace('/page', '')
        .replace('.js', '')
        .replace('.tsx', '')
        .replace('.ts', '')
      const route = path === '/index' ? '' : path

      return `
  <url>
    <loc>${YOUR_AWESOME_DOMAIN}${route}</loc>
    <lastmod>${formatted(new Date().toISOString().split('T')[0])}</lastmod>
  </url>`
    })
    .join('')

  const dynamicPages = contentFiles
    .map((file) => {
      const path = file
        .replace('../content/en/', '')
        .replace('.md', '')
        .replace('.mdx', '')
      const route = path === 'index' ? '' : path

      return `
  <url>
    <loc>${YOUR_AWESOME_DOMAIN}/${route}</loc>
    <lastmod>${formatted(new Date().toISOString().split('T')[0])}</lastmod>
  </url>`
    })
    .join('')

  const generatedSitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${basePages}
  ${dynamicPages}
</urlset>
`

  const formattedSitemap = prettier.format(generatedSitemap, {
    ...prettierConfig,
    parser: 'html',
  })

  fs.writeFileSync('public/sitemap.xml', formattedSitemap)
}

generateSitemap()
