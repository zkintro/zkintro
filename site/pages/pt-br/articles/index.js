import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'

export const POSTS_PER_PAGE = 5

export async function getStaticProps() {
    // Get all PT-BR posts
    const { slugs, load } = await import('@/lib/posts')
    const postSlugs = slugs('pt-br')
    const posts = postSlugs.map(slug => {
        const post = load('pt-br', slug)
        return {
            ...post.front,
            slug: slug
        }
    })

    const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
    const pagination = {
        currentPage: 1,
        totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    }

    return { props: { initialDisplayPosts, posts, pagination } }
}

export default function PtBrArticles({ posts, initialDisplayPosts, pagination }) {
    return (
        <>
            <PageSEO title={`Articles - ${siteMetadata.author}`} description={siteMetadata.description} />
            <ListLayout
                posts={posts}
                initialDisplayPosts={initialDisplayPosts}
                pagination={pagination}
                title="All Posts (PT-BR)"
            />
        </>
    )
} 