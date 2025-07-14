import { Metadata } from 'next';
import { cosmic } from '@/lib/cosmic';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Products - Costa Rica Travel Blog',
  description: 'Shop authentic Costa Rica travel gear, apparel, and accessories. Perfect souvenirs and gifts for Costa Rica enthusiasts.',
  keywords: 'Costa Rica products, travel gear, souvenirs, coffee mug, t-shirt, stickers, Pura Vida',
};

async function getProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects as Product[];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();
  
  const featuredProducts = products.filter(product => product.metadata.featured);
  const regularProducts = products.filter(product => !product.metadata.featured);
  
  const categories = ['All', 'Apparel', 'Accessories', 'Drinkware'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Costa Rica Store
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Bring a piece of Costa Rica home with you. Shop authentic travel gear, 
              apparel, and accessories that celebrate the Pura Vida lifestyle.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* All Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {featuredProducts.length > 0 ? 'All Products' : 'Our Products'}
          </h2>
          
          {products.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                No products available at the moment.
              </div>
              <p className="text-gray-400 mt-2">
                Check back soon for new items!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(featuredProducts.length > 0 ? regularProducts : products).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-green-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Can't find what you're looking for?
          </h3>
          <p className="text-gray-600 mb-6">
            Contact us for custom orders or special requests. We're here to help you find 
            the perfect Costa Rica souvenir!
          </p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-200">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}