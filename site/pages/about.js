import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { getFileBySlug } from '@/lib/markdown'

const DEFAULT_LAYOUT = 'AuthorLayout'

export async function getStaticProps() {
  const authorDetails = await getFileBySlug('authors', ['default'])
  return { props: { authorDetails } }
}

export default function About({ authorDetails }) {
  const { mdxSource, frontMatter } = authorDetails

  return (
    <MarkdownRenderer
      content={mdxSource}
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      frontMatter={frontMatter}
    />
  )
}
