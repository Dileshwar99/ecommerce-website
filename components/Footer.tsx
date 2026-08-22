import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Headphones, Check } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Service Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-zinc-900">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lime-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Free Delivery</h4>
              <p className="text-xs text-zinc-500">On all orders above ₹4,999</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lime-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">100% Authentic</h4>
              <p className="text-xs text-zinc-500">Verified & certified gear</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lime-400">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">30-Day Returns</h4>
              <p className="text-xs text-zinc-500">Hassle-free exchange policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lime-400">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">24/7 Support</h4>
              <p className="text-xs text-zinc-500">Dedicated sneaker experts</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12">
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-lime-400 flex items-center justify-center font-black text-black text-lg tracking-tighter">
                N
              </div>
              <span className="text-xl font-black tracking-widest text-white uppercase">NEOUS</span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Engineering the next generation of performance, lifestyle, and limited-edition footwear with uncompromising aesthetics and modern ergonomics.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
                Global Shipping Active
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/shop" className="hover:text-lime-400 transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Running" className="hover:text-lime-400 transition-colors">
                  Running Series
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Lifestyle" className="hover:text-lime-400 transition-colors">
                  Lifestyle Casuals
                </Link>
              </li>
              <li>
                <Link to="/shop?category=High-Top" className="hover:text-lime-400 transition-colors">
                  High-Top Court
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Limited" className="hover:text-lime-400 transition-colors">
                  Limited Drops
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Customer Care</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/cart" className="hover:text-lime-400 transition-colors">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <span className="hover:text-lime-400 cursor-pointer transition-colors">
                  Size Guide
                </span>
              </li>
              <li>
                <span className="hover:text-lime-400 cursor-pointer transition-colors">
                  Order Tracking
                </span>
              </li>
              <li>
                <span className="hover:text-lime-400 cursor-pointer transition-colors">
                  Returns & Refunds
                </span>
              </li>
              <li>
                <span className="hover:text-lime-400 cursor-pointer transition-colors">
                  Contact Support
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Stay Ahead</h3>
            <p className="text-xs text-zinc-400 mb-3">
              Subscribe for secret releases, restock alerts, and VIP discounts.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="your.email@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-lime-400 text-white px-3.5 py-2.5 rounded-xl text-xs focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-lime-400 hover:bg-lime-300 text-black font-bold rounded-lg flex items-center justify-center transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-lime-400 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Subscribed successfully! Welcome to the club.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} NEOUS Footwear Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-zinc-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-zinc-400 cursor-pointer">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
