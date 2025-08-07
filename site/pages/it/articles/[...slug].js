import PageTitle from '@/components/PageTitle'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'

const DEFAULT_LAYOUT = 'PostLayout'

export async function getStaticPaths() {
    const { slugs } = await import('@/lib/posts')
    const postSlugs = slugs('it')
    return {
        paths: postSlugs.map((slug) => ({
            params: {
                slug: [slug],
            },
        })),
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const { load } = await import('@/lib/posts')
    const slug = params.slug.join('/')
    const post = load('it', slug)

    // For now, simplified props - no prev/next/authors for IT
    const authorDetails = [{ name: 'Default Author' }] // Placeholder

    // Create mdxSource-like structure for compatibility
    const postData = {
        mdxSource: post.content,
        frontMatter: post.front
    }

    return {
        props: {
            post: postData,
            authorDetails,
            prev: null,
            next: null
        }
    }
}

export default function ItArticles({ post, authorDetails, prev, next }) {
    const { mdxSource, frontMatter } = post

    return (
        <>
            {frontMatter.draft !== true ? (
                <MarkdownRenderer
                    content={mdxSource}
                    layout={frontMatter.layout || DEFAULT_LAYOUT}
                    frontMatter={frontMatter}
                    authorDetails={authorDetails}
                    prev={prev}
                    next={next}
                />
            ) : (
                <div className="mt-24 text-center">
                    <PageTitle>
                        Under Construction{' '}
                        <span role="img" aria-label="roadwork sign">
                            🚧
                        </span>
                    </PageTitle>
                </div>
            )}
        </>
    )
} 