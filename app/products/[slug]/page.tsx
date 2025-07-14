// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getProduct, getProducts } from '@/lib/cosmic';
import AddToCartButton from '@/components/AddToCartButton';

// Generate static params for all products
export async function generateStaticParams() {
  const products = await getProducts();
  
  return products.map((product) => ({
    slug: product.slug,
  }));
}

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const productImages = product.metadata.product_images || [];
  const stockStatus = product.metadata.stock_status?.value || 'In Stock';
  const category = product.metadata.category?.value || 'General';
  
  const stockStatusColors: Record<string, string> = {
    'In Stock': 'bg-green-100 text-green-800',
    'Out of Stock': 'bg-red-100 text-red-800',
    'Limited Stock': 'bg-yellow-100 text-yellow-800'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              {productImages.length > 0 && productImages[0] ? (
                <>
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src={`${productImages[0].imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                      alt={product.metadata.product_name || product.title}
                      className="w-full h-full object-cover"
                      width={800}
                      height={800}
                    />
                  </div>
                  
                  {productImages.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {productImages.slice(1, 5).map((image, index) => (
                        <div key={index} className="aspect-square overflow-hidden rounded-lg">
                          <img
                            src={`${image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                            alt={`${product.metadata.product_name || product.title} ${index + 2}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                            width={200}
                            height={200}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.metadata.product_name || product.title}
                </h1>
                <p className="text-sm text-gray-500 mt-2">
                  Category: {category}
                </p>
                {product.metadata.sku && (
                  <p className="text-sm text-gray-500">
                    SKU: {product.metadata.sku}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-green-600">
                  ${product.metadata.price?.toFixed(2)}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${stockStatusColors[stockStatus] || stockStatusColors['In Stock']}`}>
                  {stockStatus}
                </span>
                {product.metadata.featured && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    Featured
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.metadata.description}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <AddToCartButton
                  product={product}
                  size="lg"
                  showQuantity={true}
                  disabled={stockStatus === 'Out of Stock'}
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Product Information</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Authentic Costa Rican product</li>
                  <li>• Carefully sourced and quality checked</li>
                  <li>• Supports local artisans and businesses</li>
                  <li>• Perfect for gifts or personal use</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}