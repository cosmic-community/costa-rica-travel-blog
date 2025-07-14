import { Post } from '@/types'
import PostCard from './PostCard'

interface SearchResultsProps {
  posts: Post[]
  query: string
  loading?: boolean
}

export default function SearchResults({ posts, query, loading }: SearchResultsProps) {
  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (!query.trim()) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">Enter a search term to find posts</div>
        <p className="text-gray-400">Search by title, content, tags, or author</p>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">
          No posts found for "{query}"
        </div>
        <p className="text-gray-400">Try searching with different keywords</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {posts.length} {posts.length === 1 ? 'result' : 'results'} for "{query}"
        </h2>
      </div>
      
      <div className="grid gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}