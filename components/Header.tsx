import Link from 'next/link'
import { getCategories } from '@/lib/cosmic'
import SearchBar from './SearchBar'

export default async function Header() {
  const categories = await getCategories()
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🌴</span>
            <span className="text-xl font-bold text-gray-900">Costa Rica Travel</span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-primary font-medium">
              Home
            </Link>
            
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="text-gray-700 hover:text-primary font-medium"
              >
                {category.title}
              </Link>
            ))}
          </nav>
          
          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <SearchBar />
            
            {/* Mobile menu button */}
            <button className="md:hidden text-gray-700 hover:text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}