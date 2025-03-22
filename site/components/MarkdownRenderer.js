import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrismPlus from 'rehype-prism-plus'

import Image from '@/components/Image'
import CustomLink from '@/components/Link'
import TOCInline from '@/components/TOCInline'
import Pre from '@/components/Pre'
import { BlogNewsletterForm } from '@/components/NewsletterForm'

const components = {
    Image,
    TOCInline,
    a: CustomLink,
    pre: Pre,
    BlogNewsletterForm,
}

export function MarkdownRenderer({ content = '', layout, frontMatter, authorDetails, prev, next }) {
    const Layout = require(`../layouts/${layout}`).default

    // Extract headings from content
    const headings = content
        ? content
            .split('\n')
            .filter(line => line.startsWith('#'))
            .map(line => {
                const depth = line.match(/^#+/)[0].length
                const value = line.replace(/^#+\s+/, '')
                const url = `#${value.toLowerCase().replace(/\s+/g, '-')}`
                return { depth, value, url }
            })
        : []

    return (
        <Layout frontMatter={frontMatter} authorDetails={authorDetails} prev={prev} next={next} toc={headings}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[
                    rehypeKatex,
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: 'append' }],
                    rehypePrismPlus,
                ]}
                components={components}
            >
                {content}
            </ReactMarkdown>
        </Layout>
    )
} 