// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Star, Shield, Truck, RefreshCw } from 'lucide-react';
import { cosmic } from '@/lib/cosmic';
import { Product } from '@/types';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'products', slug })
      .depth(1);
    
    const product = response.object as Product;
    
    if (!product || !product.metadata) {
      return null;
    }
    
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const stockStatus = product.metadata.stock_status?.value || 'In Stock';
  const category = product.metadata.category?.value || 'General';
  const productImages = product.metadata.product_images || [];
  const mainImage = productImages[0];
  
  const stockStatusColors: Record<string, string> = {
    'In Stock': 'text-green-600',
    'Out of Stock': 'text-red-600',
    'Limited Stock': 'text-yellow-600'
  };

  const stockStatusBadges: Record<string, string> = {
    'In Stock': 'bg-green-100 text-green-800',
    'Out of Stock': 'bg-red-100 text-red-800',
    'Limited Stock': 'bg-yellow-100 text-yellow-800'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/products"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Product Images */}
            <div className="aspect-square lg:aspect-auto">
              <div className="h-full">
                {mainImage ? (
                  <img
                    src={`${mainImage.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                    alt={product.metadata.product_name || product.title}
                    className="w-full h-full object-cover"
                    width={800}
                    height={800}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
              
              {/* Additional Images */}
              {productImages.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-2 px-4 pb-4">
                  {productImages.slice(1, 5).map((image, index) => (
                    <div key={index} className="aspect-square">
                      <img
                        src={`${image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                        alt={`${product.metadata.product_name} view ${index + 2}`}
                        className="w-full h-full object-cover rounded-md border border-gray-200"
                        width={200}
                        height={200}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-6 lg:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {product.metadata.product_name || product.title}
                  </h1>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {category}
                    </span>
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${stockStatusBadges[stockStatus] || stockStatusBadges['In Stock']}`}>
                      {stockStatus}
                    </span>
                  </div>
                </div>
                {product.metadata.featured && (
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-green-600">
                  ${product.metadata.price?.toFixed(2)}
                </span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.metadata.description}
                </p>
              </div>

              {/* SKU */}
              {product.metadata.sku && (
                <div className="mb-6">
                  <span className="text-sm text-gray-500">
                    SKU: <span className="font-medium">{product.metadata.sku}</span>
                  </span>
                </div>
              )}

              {/* Stock Status */}
              <div className="mb-6">
                <span className={`text-sm font-medium ${stockStatusColors[stockStatus] || stockStatusColors['In Stock']}`}>
                  ● {stockStatus}
                </span>
              </div>

              {/* Add to Cart Button */}
              <div className="mb-8">
                <button 
                  className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={stockStatus === 'Out of Stock'}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {stockStatus === 'Out of Stock' ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>

              {/* Product Features */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose This Product</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Quality Guaranteed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Fast Shipping</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Customer Favorite</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RefreshCw className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}