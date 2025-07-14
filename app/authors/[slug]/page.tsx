// app/authors/[slug]/page.tsx
import { getAuthor, getAuthors, getPostsByAuthor } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import { Metadata } from 'next'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthor(slug)
  
  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }
  
  return {
    title: `${author.title} - Costa Rica Travel Blog`,
    description: author.metadata?.bio || `Articles by ${author.title}`,
  }
}

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthor(slug)
  
  if (!author) {
    notFound()
  }
  
  const posts = await getPostsByAuthor(author.id)
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-6">
            {author.metadata?.profile_photo && (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                alt={author.title}
                className="w-24 h-24 rounded-full object-cover"
                width={96}
                height={96}
              />
            )}
            
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{author.title}</h1>
              {author.metadata?.bio && (
                <p className="text-lg text-gray-600 mb-4">{author.metadata.bio}</p>
              )}
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {author.metadata?.email && (
                  <a
                    href={`mailto:${author.metadata.email}`}
                    className="hover:text-primary"
                  >
                    Email
                  </a>
                )}
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
        </header>
        
        {/* Posts */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Articles by {author.title}</h2>
          
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No posts found by this author</p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}