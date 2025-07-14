import { cosmic } from './cosmic'
import { Post } from '@/types'

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Normalize search term for consistent matching
function normalizeSearchTerm(term: string): string {
  return term.toLowerCase().trim().replace(/\s+/g, ' ')
}

export async function searchPosts(query: string): Promise<Post[]> {
  const normalizedQuery = normalizeSearchTerm(query)
  
  if (!normalizedQuery) {
    return []
  }

  try {
    // Get all posts first since Cosmic doesn't have full-text search
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
    
    const allPosts = response.objects as Post[]
    
    // Filter posts based on search query
    const filteredPosts = allPosts.filter((post) => {
      const title = normalizeSearchTerm(post.metadata?.title || '')
      const excerpt = normalizeSearchTerm(post.metadata?.excerpt || '')
      const content = normalizeSearchTerm(post.metadata?.content || '')
      const tags = normalizeSearchTerm(post.metadata?.tags || '')
      const authorName = normalizeSearchTerm(post.metadata?.author?.metadata?.name || '')
      const categoryName = normalizeSearchTerm(post.metadata?.category?.metadata?.name || '')
      
      return (
        title.includes(normalizedQuery) ||
        excerpt.includes(normalizedQuery) ||
        content.includes(normalizedQuery) ||
        tags.includes(normalizedQuery) ||
        authorName.includes(normalizedQuery) ||
        categoryName.includes(normalizedQuery)
      )
    })
    
    // Sort by relevance (title matches first, then excerpt, then content)
    const sortedPosts = filteredPosts.sort((a, b) => {
      const aTitle = normalizeSearchTerm(a.metadata?.title || '')
      const bTitle = normalizeSearchTerm(b.metadata?.title || '')
      const aExcerpt = normalizeSearchTerm(a.metadata?.excerpt || '')
      const bExcerpt = normalizeSearchTerm(b.metadata?.excerpt || '')
      
      // Title matches get highest priority
      const aTitleMatch = aTitle.includes(normalizedQuery)
      const bTitleMatch = bTitle.includes(normalizedQuery)
      
      if (aTitleMatch && !bTitleMatch) return -1
      if (!aTitleMatch && bTitleMatch) return 1
      
      // Excerpt matches get second priority
      const aExcerptMatch = aExcerpt.includes(normalizedQuery)
      const bExcerptMatch = bExcerpt.includes(normalizedQuery)
      
      if (aExcerptMatch && !bExcerptMatch) return -1
      if (!aExcerptMatch && bExcerptMatch) return 1
      
      // Fall back to chronological order (newest first)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })
    
    return sortedPosts
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to search posts')
  }
}

export async function getSearchSuggestions(query: string): Promise<string[]> {
  const normalizedQuery = normalizeSearchTerm(query)
  
  if (!normalizedQuery) {
    return []
  }

  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['title', 'metadata'])
      .depth(1)
    
    const allPosts = response.objects as Post[]
    const suggestions: Set<string> = new Set()
    
    allPosts.forEach((post) => {
      const title = post.metadata?.title || ''
      const tags = post.metadata?.tags || ''
      
      // Add matching words from titles
      const titleWords = normalizeSearchTerm(title).split(' ')
      titleWords.forEach(word => {
        if (word.length > 2 && word.includes(normalizedQuery)) {
          suggestions.add(word)
        }
      })
      
      // Add matching tags
      const tagList = tags.split(',').map(tag => normalizeSearchTerm(tag))
      tagList.forEach(tag => {
        if (tag.length > 2 && tag.includes(normalizedQuery)) {
          suggestions.add(tag)
        }
      })
    })
    
    return Array.from(suggestions).slice(0, 5)
  } catch (error) {
    console.error('Failed to get search suggestions:', error)
    return []
  }
}