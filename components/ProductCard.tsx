import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isInWishlist, toggleWishlist } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Default to the first available size
    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 8;
    addToCart(product, defaultSize, 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Limited':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Running':
        return 'bg-lime-400/10 text-lime-400 border-lime-400/20';
      case 'High-Top':
        return 'bg-purple-400/10 text-purple-400 border-purple-400/20';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <div className="group relative bg-zinc-900/60 border border-zinc-800/90 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 hover:shadow-2xl hover:shadow-lime-400/5 flex flex-col justify-between">
      {/* Product Image Area */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-zinc-950">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        
        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md ${getCategoryColor(
              product.category
            )}`}
          >
            {product.category}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label="Add to Wishlist"
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            isWishlisted
              ? 'bg-red-500 text-white'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Quick Add Overlay on desktop hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-lime-400 hover:bg-lime-300 text-black font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            Quick Add (UK {product.sizes[0] || 8})
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
            <span>{product.sizes.length} Sizes Available</span>
            <span className="text-zinc-400 font-mono">#{product.id}</span>
          </div>

          <Link to={`/product/${product.id}`} className="block group-hover:text-lime-400 transition-colors">
            <h3 className="font-bold text-white text-base leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-zinc-400 line-clamp-2 mt-1.5 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase block font-semibold">Price</span>
            <span className="text-lg font-black text-white font-mono">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/product/${product.id}`}
              className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-xl transition-colors"
              aria-label="View Product"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <button
              onClick={handleQuickAdd}
              className="sm:hidden p-2 bg-lime-400 text-black rounded-xl"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
