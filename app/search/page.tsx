import { searchPosts } from '@/lib/search'
import SearchBar from '@/components/SearchBar'
import SearchResults from '@/components/SearchResults'
import { Suspense } from 'react'

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '' } = await searchParams
  const query = q.toString()
  const posts = query ? await searchPosts(query) : []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Posts</h1>
            <p className="text-gray-600">Find your next Costa Rica adventure</p>
          </div>

          {/* Search Bar */}
          <SearchBar initialQuery={query} showResults={true} />

          {/* Search Results */}
          <Suspense fallback={<SearchResults posts={[]} query={query} loading={true} />}>
            <SearchResults posts={posts} query={query} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Search Posts - Costa Rica Travel Blog',
  description: 'Search through our Costa Rica travel guides and blog posts',
}