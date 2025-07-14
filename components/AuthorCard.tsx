import Link from 'next/link'
import { Author } from '@/types'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      {author.metadata?.profile_photo && (
        <img
          src={`${author.metadata.profile_photo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
          alt={author.title}
          className="w-12 h-12 rounded-full object-cover"
          width={48}
          height={48}
        />
      )}
      
      <div className="flex-1">
        <Link
          href={`/authors/${author.slug}`}
          className="font-semibold text-gray-900 hover:text-primary"
        >
          {author.title}
        </Link>
        
        {author.metadata?.bio && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {author.metadata.bio}
          </p>
        )}
        
        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
          {author.metadata?.website && (
            <a
              href={author.metadata.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              Website
            </a>
          )}
          {author.metadata?.instagram && (
            <a
              href={`https://instagram.com/${author.metadata.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              Instagram
            </a>
          )}
          {author.metadata?.twitter && (
            <a
              href={`https://twitter.com/${author.metadata.twitter.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              Twitter
            </a>
          )}
        </div>
      </div>
    </div>
  )
}