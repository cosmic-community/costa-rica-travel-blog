import Link from 'next/link';
import { Product } from '@/types';
import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const productImage = product.metadata.product_images?.[0];
  const stockStatus = product.metadata.stock_status?.value || 'In Stock';
  const category = product.metadata.category?.value || 'General';
  
  const stockStatusColors: Record<string, string> = {
    'In Stock': 'bg-green-100 text-green-800',
    'Out of Stock': 'bg-red-100 text-red-800',
    'Limited Stock': 'bg-yellow-100 text-yellow-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-square overflow-hidden cursor-pointer">
          <img
            src={productImage ? `${productImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress` : '/placeholder-product.jpg'}
            alt={product.metadata.product_name || product.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            width={300}
            height={300}
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
              {product.metadata.product_name || product.title}
            </h3>
          </Link>
          {product.metadata.featured && (
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              Featured
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {product.metadata.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-green-600">
            ${product.metadata.price?.toFixed(2)}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatusColors[stockStatus] || stockStatusColors['In Stock']}`}>
            {stockStatus}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {category}
          </span>
          <div className="flex gap-2">
            <Link 
              href={`/products/${product.slug}`}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors duration-200 text-sm"
            >
              View Details
            </Link>
            <AddToCartButton 
              product={product}
              size="sm"
              disabled={stockStatus === 'Out of Stock'}
            />
          </div>
        </div>

        {product.metadata.sku && (
          <div className="mt-2 text-xs text-gray-400">
            SKU: {product.metadata.sku}
          </div>
        )}
      </div>
    </div>
  );
}