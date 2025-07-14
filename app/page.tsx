import { getPosts, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'
import Hero from '@/components/Hero'
import { Post, Category } from '@/types'

export default async function HomePage() {
  const posts = await getPosts()
  const categories = await getCategories()
  
  return (
    <div className="min-h-screen">
      <Hero />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64">
            <CategoryFilter categories={categories} />
          </aside>
          
          <main className="flex-1">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Latest Posts</h2>
              <p className="text-gray-600">Discover Costa Rica through our latest travel guides and experiences</p>
            </div>
            
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No posts found</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {posts.map((post: Post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}