export default function Hero() {
  return (
    <section className="relative h-96 bg-gradient-to-r from-primary to-secondary">
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
        <div className="text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Costa Rica
          </h1>
          <p className="text-xl md:text-2xl mb-6 max-w-2xl">
            Explore the incredible biodiversity, stunning landscapes, and rich culture 
            of this Central American paradise
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#latest-posts"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Read Latest Posts
            </a>
            <a
              href="/categories"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              Explore Categories
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}