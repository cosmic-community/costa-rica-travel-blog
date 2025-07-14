// app/categories/[slug]/page.tsx
import { getCategory, getCategories, getPostsByCategory } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import CategoryBadge from '@/components/CategoryBadge'
import { Metadata } from 'next'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategory(slug)
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }
  
  return {
    title: `${category.title} - Costa Rica Travel Blog`,
    description: category.metadata?.description || `Posts about ${category.title}`,
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug)
  
  if (!category) {
    notFound()
  }
  
  const posts = await getPostsByCategory(category.id)
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <CategoryBadge category={category} />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.title}</h1>
          
          {category.metadata?.description && (
            <p className="text-xl text-gray-600 mb-6">{category.metadata.description}</p>
          )}
        </header>
        
        {/* Posts */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No posts found in this category</p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}