import Link from 'next/link'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
      
      <div className="space-y-2">
        <Link
          href="/"
          className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
        >
          All Posts
        </Link>
        
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.metadata?.color || '#gray' }}
              />
              <span>{category.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}