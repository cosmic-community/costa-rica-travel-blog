'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface SearchBarProps {
  initialQuery?: string
  placeholder?: string
  showResults?: boolean
}

// Normalize query for consistent handling
function normalizeQuery(query: string): string {
  return query.trim().replace(/\s+/g, ' ')
}

export default function SearchBar({ 
  initialQuery = '', 
  placeholder = 'Search posts...',
  showResults = false 
}: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Get current query from URL or use initial query
  const currentQuery = searchParams.get('q') || initialQuery
  const [query, setQuery] = useState(normalizeQuery(currentQuery))
  const [isExpanded, setIsExpanded] = useState(false)

  // Update query when URL search params change (synchronization)
  useEffect(() => {
    const urlQuery = searchParams.get('q') || ''
    const normalizedUrlQuery = normalizeQuery(urlQuery)
    setQuery(normalizedUrlQuery)
  }, [searchParams])

  // Update query when initialQuery changes
  useEffect(() => {
    if (initialQuery !== currentQuery) {
      setQuery(normalizeQuery(initialQuery))
    }
  }, [initialQuery, currentQuery])

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  // Update URL with new search query
  const updateSearchParams = (newQuery: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const normalizedQuery = normalizeQuery(newQuery)
    
    if (normalizedQuery) {
      params.set('q', normalizedQuery)
    } else {
      params.delete('q')
    }
    
    // If we're on the search page, update the current URL
    if (pathname === '/search') {
      router.replace(`/search?${params.toString()}`)
    } else if (normalizedQuery) {
      // If we're not on search page and there's a query, navigate to search
      router.push(`/search?${params.toString()}`)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const normalizedQuery = normalizeQuery(query)
    if (normalizedQuery) {
      updateSearchParams(normalizedQuery)
      setIsExpanded(false)
    }
  }

  const handleClear = () => {
    setQuery('')
    if (showResults) {
      router.push('/search')
    } else {
      // Clear the search params if we're not on search page
      const params = new URLSearchParams(searchParams.toString())
      params.delete('q')
      if (pathname === '/search') {
        router.replace('/search')
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsExpanded(false)
      inputRef.current?.blur()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setQuery(newValue)
    
    // For the search page, update URL in real-time to sync with nav bar
    if (showResults) {
      updateSearchParams(newValue)
    }
  }

  if (showResults) {
    // Full search bar for search results page
    return (
      <div className="w-full max-w-2xl mx-auto mb-8">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        </form>
      </div>
    )
  }

  // Compact search bar for header
  return (
    <div className="relative">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
          aria-label="Search"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={() => !query && setIsExpanded(false)}
              placeholder={placeholder}
              className="w-64 pl-9 pr-8 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  )
}