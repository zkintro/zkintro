import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import NewsletterForm from '@/components/NewsletterForm'

const MAX_DISPLAY = 5

export async function getStaticProps() {
    // Get all IT posts
    const { slugs, load } = await import('@/lib/posts')
    const postSlugs = slugs('it')
    const posts = postSlugs.map(slug => {
        const post = load('it', slug)
        return {
            ...post.front,
            slug: slug
        }
    }).sort((a, b) => new Date(a.date) - new Date(b.date))

    return { props: { posts } }
}

export default function Home({ posts }) {
    return (
        <>
            <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="space-y-2 pt-6 pb-8 md:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        Latest (Italiano)
                    </h1>
                    <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                        {siteMetadata.description}
                    </p>
                </div>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {!posts.length && 'No posts found.'}
                    {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
                        const { slug, date, title, summary, tags } = frontMatter
                        return (
                            <li key={slug} className="py-12">
                                <article>
                                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                                        <dl>
                                            <dt className="sr-only">Published on</dt>
                                            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                                <time dateTime={date}>
                                                    {new Date(date).toLocaleDateString(siteMetadata.locale, {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                </time>
                                            </dd>
                                        </dl>
                                        <div className="space-y-5 xl:col-span-3">
                                            <div className="space-y-6">
                                                <div>
                                                    <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                                        <a
                                                            href={`/it/articles/${slug}`}
                                                            className="text-gray-900 dark:text-gray-100"
                                                        >
                                                            {title}
                                                        </a>
                                                    </h2>
                                                </div>
                                                <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                                                    {summary}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        )
                    })}
                </ul>
            </div>
            {posts.length > MAX_DISPLAY && (
                <div className="flex justify-end text-base font-medium leading-6">
                    <a
                        href="/it/articles"
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label="all posts"
                    >
                        All Posts &rarr;
                    </a>
                </div>
            )}
            {siteMetadata.newsletter.provider !== '' && (
                <div className="flex items-center justify-center pt-4">
                    <NewsletterForm />
                </div>
            )}
        </>
    )
} 