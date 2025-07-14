import { searchPosts } from '@/lib/search'
import SearchBar from '@/components/SearchBar'
import SearchResults from '@/components/SearchResults'
import { Suspense } from 'react'

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

async function SearchContent({ searchParams }: SearchPageProps) {
  const { q = '' } = await searchParams
  
  // Properly decode and normalize the query parameter
  const query = decodeURIComponent(q.toString()).trim()
  const posts = query ? await searchPosts(query) : []

  return (
    <>
      {/* Search Bar */}
      <SearchBar initialQuery={query} showResults={true} />

      {/* Search Results */}
      <SearchResults posts={posts} query={query} />
    </>
  )
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Posts</h1>
            <p className="text-gray-600">Find your next Costa Rica adventure</p>
          </div>

          {/* Search Content with Suspense */}
          <Suspense fallback={
            <div className="space-y-6">
              <div className="w-full max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <div className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg bg-gray-100 animate-pulse h-12"></div>
                </div>
              </div>
              <SearchResults posts={[]} query="" loading={true} />
            </div>
          }>
            <SearchContent searchParams={searchParams} />
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