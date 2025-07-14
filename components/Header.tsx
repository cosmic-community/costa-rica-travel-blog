'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import SearchBar from './SearchBar'

interface Category {
  id: string
  title: string
  slug: string
}

interface HeaderProps {
  categories: Category[]
}

export default function Header({ categories }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Close mobile menu when clicking outside or on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <span className="text-2xl">🌴</span>
            <span className="text-xl font-bold text-gray-900">Costa Rica Travel</span>
          </Link>
          
          {/* Desktop Navigation */}
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
          
          {/* Search and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <SearchBar />
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-700 hover:text-primary transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <svg 
                className={`w-6 h-6 transition-transform ${isMobileMenuOpen ? 'rotate-90' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}
      
      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-lg font-semibold text-gray-900">Menu</span>
            <button 
              onClick={closeMobileMenu}
              className="text-gray-700 hover:text-primary transition-colors"
              aria-label="Close mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Mobile Search */}
          <div className="p-4 border-b sm:hidden">
            <SearchBar />
          </div>
          
          {/* Mobile Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-4">
            <Link 
              href="/" 
              className="block py-3 text-gray-700 hover:text-primary font-medium border-b border-gray-100 transition-colors"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="block py-3 text-gray-700 hover:text-primary font-medium border-b border-gray-100 transition-colors"
                onClick={closeMobileMenu}
              >
                {category.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}