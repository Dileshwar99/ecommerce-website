import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X, Zap, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const { getCartCount, wishlist } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const cartCount = getCartCount();
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const categories = [
    { name: 'All Shoes', path: '/shop' },
    { name: 'Running', path: '/shop?category=Running' },
    { name: 'Lifestyle', path: '/shop?category=Lifestyle' },
    { name: 'High-Top', path: '/shop?category=High-Top' },
    { name: 'Limited Drops', path: '/shop?category=Limited' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 py-3 shadow-lg'
            : 'bg-zinc-950 border-b border-zinc-900 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Toggle & Brand */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-zinc-400 hover:text-white p-2 focus:outline-none"
                aria-label="Open Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-xl bg-lime-400 flex items-center justify-center font-black text-black text-xl tracking-tighter group-hover:scale-105 transition-transform">
                  N
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-widest text-white uppercase group-hover:text-lime-400 transition-colors">
                    NEOUS
                  </span>
                  <span className="text-[10px] tracking-widest text-zinc-400 -mt-1 uppercase">
                    Future Footwear
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className={`text-sm font-semibold tracking-wide uppercase transition-colors ${
                  location.pathname === '/' ? 'text-lime-400' : 'text-zinc-300 hover:text-white'
                }`}
              >
                Home
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  to={cat.path}
                  className="text-sm font-semibold tracking-wide uppercase text-zinc-300 hover:text-lime-400 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg text-zinc-400 hover:text-lime-400 hover:bg-zinc-900 transition-colors relative"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                to="/shop?filter=wishlist"
                className="p-2 rounded-lg text-zinc-400 hover:text-lime-400 hover:bg-zinc-900 transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-zinc-800 text-lime-400 border border-lime-400/40 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Link */}
              <Link
                to="/cart"
                className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-lime-400/50 px-3.5 py-2 rounded-xl text-white transition-all group"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5 text-lime-400 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-sm">{cartCount}</span>
              </Link>
            </div>
          </div>

          {/* Quick Search Dropdown Bar */}
          {searchOpen && (
            <div className="mt-3 pt-3 border-t border-zinc-800 pb-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="w-5 h-5 absolute left-3 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search shoes by name, category, style (e.g. Jordan, Air Max, Red)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-lime-400 text-white pl-10 pr-24 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-lime-400 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-3 py-1.5 bg-lime-400 hover:bg-lime-300 text-black font-bold text-xs rounded-lg uppercase tracking-wider transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-zinc-950 text-white animate-in slide-in-from-left duration-300">
          <div className="flex items-center justify-between p-4 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-lime-400 flex items-center justify-center font-black text-black text-lg">
                N
              </div>
              <span className="font-black tracking-widest text-lg">NEOUS</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-zinc-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-4 flex-grow overflow-y-auto">
            <div className="mb-6">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search footwear..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white pl-9 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:border-lime-400"
                />
              </form>
            </div>

            <div className="space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-900 text-base font-semibold"
              >
                <span>Home</span>
                <ChevronRight className="w-4 h-4 text-zinc-600" />
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  to={cat.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-900 text-base font-semibold text-zinc-300 hover:text-white"
                >
                  <span>{cat.name}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-600" />
                </Link>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800 space-y-3">
              <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800/80">
                <div className="flex items-center gap-2 text-lime-400 font-bold text-xs uppercase tracking-wider mb-1">
                  <Zap className="w-4 h-4" /> Limited Time Offer
                </div>
                <p className="text-xs text-zinc-400">
                  Use code <span className="text-white font-mono font-bold">NEOUS10</span> at checkout for 10% off your entire order.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
