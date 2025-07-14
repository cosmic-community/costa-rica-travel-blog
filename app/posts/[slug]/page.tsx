// app/posts/[slug]/page.tsx
import { getPost, getPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import AuthorCard from '@/components/AuthorCard'
import CategoryBadge from '@/components/CategoryBadge'
import { Metadata } from 'next'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }
  
  return {
    title: post.title,
    description: post.metadata?.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.metadata?.excerpt || post.title,
      images: post.metadata?.featured_image?.imgix_url ? [post.metadata.featured_image.imgix_url] : [],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <article className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            {post.metadata?.category && (
              <CategoryBadge category={post.metadata.category} />
            )}
            {post.metadata?.read_time && (
              <span className="text-sm text-gray-500">
                {post.metadata.read_time} min read
              </span>
            )}
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          {post.metadata?.excerpt && (
            <p className="text-xl text-gray-600 mb-6">{post.metadata.excerpt}</p>
          )}
          
          {post.metadata?.author && (
            <AuthorCard author={post.metadata.author} />
          )}
        </header>
        
        {/* Featured Image */}
        {post.metadata?.featured_image && (
          <div className="mb-8">
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg"
              width={1200}
              height={600}
            />
          </div>
        )}
        
        {/* Content */}
        <div className="prose-custom">
          <ReactMarkdown>{post.metadata?.content || ''}</ReactMarkdown>
        </div>
        
        {/* Tags */}
        {post.metadata?.tags && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.metadata.tags.split(',').map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}