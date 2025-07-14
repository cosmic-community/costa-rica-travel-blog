import Link from 'next/link'
import { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const getCategoryColor = (color?: string) => {
    if (!color) return 'bg-gray-100 text-gray-700'
    
    const colorMap: Record<string, string> = {
      '#ff6b35': 'bg-adventure text-white',
      '#0077be': 'bg-beaches text-white',
      '#228b22': 'bg-wildlife text-white',
      '#8b4513': 'bg-culture text-white',
    }
    
    return colorMap[color] || 'bg-gray-100 text-gray-700'
  }
  
  return (
    <Link href={`/categories/${category.slug}`}>
      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium hover:opacity-80 transition-opacity ${getCategoryColor(category.metadata?.color)}`}>
        {category.title}
      </span>
    </Link>
  )
}