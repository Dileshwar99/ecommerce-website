import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import {
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
  Sparkles,
  Check,
  Plus,
  Minus,
  Ruler
} from 'lucide-react';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, isInWishlist, toggleWishlist } = useCart();

  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState<number | null>(
    product && product.sizes.length > 0 ? product.sizes[0] : null
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'shipping'>('desc');
  const [sizeGuideOpen, setSizeGuideOpen] = useState<boolean>(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-zinc-400 mt-2 mb-6">The requested footwear model does not exist or has been archived.</p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-lime-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a shoe size');
      return;
    }
    addToCart(product, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a shoe size');
      return;
    }
    addToCart(product, selectedSize, quantity);
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-8 overflow-x-auto whitespace-nowrap">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-zinc-600 flex-shrink-0" />
        <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
        <ChevronRight className="w-3 h-3 text-zinc-600 flex-shrink-0" />
        <Link to={`/shop?category=${product.category}`} className="hover:text-white transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3 text-zinc-600 flex-shrink-0" />
        <span className="text-zinc-200 font-semibold">{product.name}</span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 relative group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-zinc-950/80 border border-zinc-800 text-lime-400 backdrop-blur-md">
                {product.category}
              </span>
            </div>
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all ${
                isWishlisted
                  ? 'bg-red-500 text-white'
                  : 'bg-zinc-950/80 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-4 text-center">
              <Sparkles className="w-5 h-5 text-lime-400 mx-auto mb-1.5" />
              <div className="text-xs font-bold text-white uppercase">Cushioned Sole</div>
              <div className="text-[10px] text-zinc-500">Maximum energy rebound</div>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-4 text-center">
              <ShieldCheck className="w-5 h-5 text-lime-400 mx-auto mb-1.5" />
              <div className="text-xs font-bold text-white uppercase">Authentic</div>
              <div className="text-[10px] text-zinc-500">Verified factory stock</div>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-4 text-center">
              <Truck className="w-5 h-5 text-lime-400 mx-auto mb-1.5" />
              <div className="text-xs font-bold text-white uppercase">Free Dispatch</div>
              <div className="text-[10px] text-zinc-500">Delivered in 2-4 days</div>
            </div>
          </div>
        </div>

        {/* Right Column: Purchasing & Details */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">
              <span>SKU: NEOUS-00{product.id}</span>
              <span>•</span>
              <span className="text-lime-400 font-bold">In Stock</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              {product.name}
            </h1>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-3xl font-black text-white font-mono">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-zinc-500 uppercase">Includes all duties & taxes</span>
            </div>
          </div>

          <div className="border-t border-b border-zinc-800 py-4">
            <p className="text-sm text-zinc-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Size Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-white">
                Select UK / India Size
              </label>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(true)}
                className="text-xs text-lime-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <Ruler className="w-3.5 h-3.5" /> Size Guide
              </button>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 rounded-xl text-xs font-bold font-mono transition-all ${
                    selectedSize === size
                      ? 'bg-lime-400 text-black shadow-lg shadow-lime-400/20 font-black'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  UK {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Quantity:
            </span>
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center font-mono font-bold text-sm text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-xl shadow-lime-400/10"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Shopping Bag
            </button>

            <button
              onClick={handleBuyNow}
              className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-colors"
            >
              Instant Checkout
            </button>
          </div>

          {/* Tabbed Info Accordion */}
          <div className="pt-6 border-t border-zinc-800">
            <div className="flex gap-4 border-b border-zinc-800 pb-2">
              <button
                onClick={() => setActiveTab('desc')}
                className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-all ${
                  activeTab === 'desc'
                    ? 'border-lime-400 text-lime-400'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-all ${
                  activeTab === 'specs'
                    ? 'border-lime-400 text-lime-400'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-all ${
                  activeTab === 'shipping'
                    ? 'border-lime-400 text-lime-400'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Shipping & Returns
              </button>
            </div>

            <div className="py-4 text-xs text-zinc-400 leading-relaxed">
              {activeTab === 'desc' && (
                <p>
                  Precision molded with aerospace-grade composite materials, our signature {product.name} is engineered for daily endurance, dynamic sprint recovery, and iconic street profile.
                </p>
              )}
              {activeTab === 'specs' && (
                <ul className="space-y-1.5 list-disc list-inside">
                  <li>Upper: Multi-weave breathable ballistic knit</li>
                  <li>Midsole: Proprietary dual-density energy rebound foam</li>
                  <li>Outsole: High-traction vulcanized rubber</li>
                  <li>Origin: Certified NEOUS Craft Labs</li>
                </ul>
              )}
              {activeTab === 'shipping' && (
                <p>
                  Complimentary express shipping on all orders over ₹4,999. Includes 30-day unworn returns and free doorstep size exchange.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Carousel / Grid */}
      {relatedProducts.length > 0 && (
        <section className="mt-24 pt-12 border-t border-zinc-800">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Complementary Silhouettes
            </h2>
            <Link
              to={`/shop?category=${product.category}`}
              className="text-xs font-bold text-lime-400 uppercase tracking-wider hover:underline"
            >
              View More in {product.category}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
              <h3 className="text-xl font-black uppercase tracking-wide">Footwear Size Chart</h3>
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-zinc-800 text-zinc-400 uppercase">
                  <tr>
                    <th className="py-2">UK / India</th>
                    <th className="py-2">US Men</th>
                    <th className="py-2">EU</th>
                    <th className="py-2">Foot Length (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 font-mono text-zinc-300">
                  <tr><td className="py-2 font-bold text-lime-400">UK 6</td><td>US 7</td><td>40</td><td>25.0 cm</td></tr>
                  <tr><td className="py-2 font-bold text-lime-400">UK 7</td><td>US 8</td><td>41</td><td>25.8 cm</td></tr>
                  <tr><td className="py-2 font-bold text-lime-400">UK 8</td><td>US 9</td><td>42.5</td><td>26.7 cm</td></tr>
                  <tr><td className="py-2 font-bold text-lime-400">UK 9</td><td>US 10</td><td>44</td><td>27.5 cm</td></tr>
                  <tr><td className="py-2 font-bold text-lime-400">UK 10</td><td>US 11</td><td>45</td><td>28.3 cm</td></tr>
                  <tr><td className="py-2 font-bold text-lime-400">UK 11</td><td>US 12</td><td>46</td><td>29.2 cm</td></tr>
                  <tr><td className="py-2 font-bold text-lime-400">UK 12</td><td>US 13</td><td>47.5</td><td>30.0 cm</td></tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="px-6 py-2.5 bg-lime-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
