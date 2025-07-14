import { cosmic } from './cosmic'
import { Post } from '@/types'

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export async function searchPosts(query: string): Promise<Post[]> {
  if (!query.trim()) {
    return []
  }

  try {
    // Get all posts first since Cosmic doesn't have full-text search
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    const allPosts = response.objects as Post[]
    const searchTerm = query.toLowerCase().trim()
    
    // Filter posts based on search query
    const filteredPosts = allPosts.filter((post) => {
      const title = post.metadata?.title?.toLowerCase() || ''
      const excerpt = post.metadata?.excerpt?.toLowerCase() || ''
      const content = post.metadata?.content?.toLowerCase() || ''
      const tags = post.metadata?.tags?.toLowerCase() || ''
      const authorName = post.metadata?.author?.metadata?.name?.toLowerCase() || ''
      const categoryName = post.metadata?.category?.metadata?.name?.toLowerCase() || ''
      
      return (
        title.includes(searchTerm) ||
        excerpt.includes(searchTerm) ||
        content.includes(searchTerm) ||
        tags.includes(searchTerm) ||
        authorName.includes(searchTerm) ||
        categoryName.includes(searchTerm)
      )
    })
    
    // Sort by relevance (title matches first, then excerpt, then content)
    const sortedPosts = filteredPosts.sort((a, b) => {
      const aTitle = a.metadata?.title?.toLowerCase() || ''
      const bTitle = b.metadata?.title?.toLowerCase() || ''
      const aExcerpt = a.metadata?.excerpt?.toLowerCase() || ''
      const bExcerpt = b.metadata?.excerpt?.toLowerCase() || ''
      
      // Title matches get highest priority
      const aTitleMatch = aTitle.includes(searchTerm)
      const bTitleMatch = bTitle.includes(searchTerm)
      
      if (aTitleMatch && !bTitleMatch) return -1
      if (!aTitleMatch && bTitleMatch) return 1
      
      // Excerpt matches get second priority
      const aExcerptMatch = aExcerpt.includes(searchTerm)
      const bExcerptMatch = bExcerpt.includes(searchTerm)
      
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
  if (!query.trim()) {
    return []
  }

  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['title', 'metadata'])
      .depth(1)
    
    const allPosts = response.objects as Post[]
    const searchTerm = query.toLowerCase().trim()
    const suggestions: Set<string> = new Set()
    
    allPosts.forEach((post) => {
      const title = post.metadata?.title || ''
      const tags = post.metadata?.tags || ''
      
      // Add matching words from titles
      const titleWords = title.toLowerCase().split(' ')
      titleWords.forEach(word => {
        if (word.length > 2 && word.includes(searchTerm)) {
          suggestions.add(word)
        }
      })
      
      // Add matching tags
      const tagList = tags.split(',').map(tag => tag.trim().toLowerCase())
      tagList.forEach(tag => {
        if (tag.length > 2 && tag.includes(searchTerm)) {
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