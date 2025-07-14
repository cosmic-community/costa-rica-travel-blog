import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Featured Image */}
        {post.metadata?.featured_image && (
          <div className="md:w-1/3">
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-48 md:h-full object-cover"
              width={300}
              height={200}
            />
          </div>
        )}
        
        {/* Content */}
        <div className="p-6 md:w-2/3">
          <div className="flex items-center gap-4 mb-3">
            {post.metadata?.category && (
              <CategoryBadge category={post.metadata.category} />
            )}
            {post.metadata?.read_time && (
              <span className="text-sm text-gray-500">
                {post.metadata.read_time} min read
              </span>
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            <Link href={`/posts/${post.slug}`} className="hover:text-primary">
              {post.title}
            </Link>
          </h2>
          
          {post.metadata?.excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.metadata.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            {post.metadata?.author && (
              <div className="flex items-center gap-3">
                {post.metadata.author.metadata?.profile_photo && (
                  <img
                    src={`${post.metadata.author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.title}
                    className="w-8 h-8 rounded-full object-cover"
                    width={32}
                    height={32}
                  />
                )}
                <div>
                  <Link
                    href={`/authors/${post.metadata.author.slug}`}
                    className="text-sm font-medium text-gray-900 hover:text-primary"
                  >
                    {post.metadata.author.title}
                  </Link>
                </div>
              </div>
            )}
            
            <Link
              href={`/posts/${post.slug}`}
              className="text-primary hover:text-primary/80 font-medium text-sm"
            >
              Read More →
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}