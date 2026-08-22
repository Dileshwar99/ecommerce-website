import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown, X, Filter, RotateCcw } from 'lucide-react';
import { products } from '../data';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const Shop: React.FC = () => {
  const location = useLocation();
  const { wishlist } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(25000);
  const [onlyWishlist, setOnlyWishlist] = useState<boolean>(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Sync with URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const searchParam = params.get('search');
    const filterParam = params.get('filter');

    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('All');
    }

    if (searchParam) {
      setSearchQuery(searchParam);
    }

    if (filterParam === 'wishlist') {
      setOnlyWishlist(true);
    } else {
      setOnlyWishlist(false);
    }
  }, [location.search]);

  const categories = ['All', 'Running', 'Lifestyle', 'High-Top', 'Limited'];

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Wishlist
    if (onlyWishlist) {
      const wishlistIds = new Set(wishlist.map((w) => w.id));
      result = result.filter((p) => wishlistIds.has(p.id));
    }

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Filter by Price Range
    result = result.filter((p) => p.price <= maxPrice);

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        // natural data order
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy, maxPrice, onlyWishlist, wishlist]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('featured');
    setMaxPrice(25000);
    setOnlyWishlist(false);
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="mb-8 pb-6 border-b border-zinc-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              {onlyWishlist ? 'Saved Wishlist' : selectedCategory === 'All' ? 'Complete Collection' : `${selectedCategory} Series`}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Showing {filteredProducts.length} high-performance {filteredProducts.length === 1 ? 'footwear model' : 'footwear models'}
            </p>
          </div>

          {/* Quick Search inside Shop */}
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
            <input
              type="text"
              placeholder="Search sneakers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-lime-400 text-white pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setOnlyWishlist(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === cat && !onlyWishlist
                  ? 'bg-lime-400 text-black shadow-lg shadow-lime-400/20'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={() => setOnlyWishlist(!onlyWishlist)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
              onlyWishlist
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
            }`}
          >
            Wishlist ({wishlist.length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800/80 h-fit">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <span className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-lime-400" /> Filters
            </span>
            <button
              onClick={resetFilters}
              className="text-xs text-zinc-400 hover:text-lime-400 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Sort Control */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-white text-xs font-semibold rounded-xl p-2.5 focus:outline-none focus:border-lime-400"
            >
              <option value="featured">Featured Drops</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-zinc-300">Max Price</span>
              <span className="font-mono text-lime-400 font-bold">{formatPrice(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="8000"
              max="25000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-lime-400 bg-zinc-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>₹8,000</span>
              <span>₹25,000</span>
            </div>
          </div>

          {/* Promo Callout */}
          <div className="mt-6 p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs">
            <p className="text-lime-400 font-bold uppercase tracking-wider mb-1">Coupon Tip</p>
            <p className="text-zinc-400 leading-relaxed">
              Use code <strong className="text-white font-mono">FIRSTDROP</strong> at checkout for 15% off.
            </p>
          </div>
        </aside>

        {/* Mobile Filter Toggle & Controls */}
        <div className="lg:hidden flex items-center justify-between gap-3 col-span-1">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex-1 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-bold text-white uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Filter className="w-4 h-4 text-lime-400" /> Filters & Sort
          </button>
        </div>

        {/* Product Grid Area */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-zinc-800/80 p-8">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mx-auto mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                No Footwear Found
              </h3>
              <p className="text-sm text-zinc-400 max-w-sm mx-auto mt-1 mb-6">
                We couldn't find any products matching your specific filters or search keywords.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-lime-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-lime-300 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-zinc-950 p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
            <h3 className="text-lg font-black text-white uppercase tracking-wide">
              Filters & Options
            </h3>
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="p-2 text-zinc-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6 flex-grow">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-2">
                Sort Order
              </label>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm rounded-xl p-3 focus:outline-none focus:border-lime-400"
              >
                <option value="featured">Featured Drops</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-bold uppercase tracking-wider text-zinc-300">Max Budget</span>
                <span className="font-mono text-lime-400 font-bold">{formatPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="8000"
                max="25000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-lime-400 bg-zinc-800 h-2 rounded-lg"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-800 flex gap-3">
            <button
              onClick={() => {
                resetFilters();
                setMobileFilterOpen(false);
              }}
              className="flex-1 py-3 bg-zinc-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl"
            >
              Reset
            </button>
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="flex-1 py-3 bg-lime-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl"
            >
              Apply ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
