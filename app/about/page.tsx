import { getAuthors } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'

export const metadata = {
  title: 'About - Costa Rica Travel Blog',
  description: 'Learn about our team of travel writers and wildlife photographers who share their passion for Costa Rica.',
}

export default async function AboutPage() {
  const authors = await getAuthors()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Costa Rica Travel Blog</h1>
          <p className="text-xl text-gray-600">
            Discover Costa Rica through the eyes of passionate travel writers and wildlife photographers
          </p>
        </header>
        
        <div className="prose prose-lg max-w-none mb-12">
          <p>
            Welcome to Costa Rica Travel Blog, your ultimate guide to exploring the incredible biodiversity, 
            stunning landscapes, and rich culture of this Central American paradise. Our team of experienced 
            travel writers and wildlife photographers are passionate about sharing the hidden gems and 
            must-see destinations that make Costa Rica truly special.
          </p>
          
          <p>
            From the cloud forests of Monteverde to the pristine beaches of Manuel Antonio, from the 
            adventure activities in Guanacaste to the rich coffee culture of the Central Valley, we provide 
            in-depth guides, practical tips, and inspiring stories to help you make the most of your 
            Costa Rican adventure.
          </p>
          
          <p>
            Our mission is to promote sustainable tourism and conservation while helping travelers 
            create unforgettable memories in one of the world's most biodiverse countries. We believe 
            that travel has the power to transform both visitors and destinations, and we're committed 
            to showcasing Costa Rica's natural wonders responsibly.
          </p>
        </div>
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Meet Our Team</h2>
          
          <div className="grid gap-6">
            {authors.map((author) => (
              <AuthorCard key={author.id} author={author} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}