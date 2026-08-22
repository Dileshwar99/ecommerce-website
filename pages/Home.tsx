import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck, Flame, Star, Compass } from 'lucide-react';
import { products } from '../data';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const featuredProducts = products.slice(0, 4);
  const limitedProducts = products.filter((p) => p.category === 'Limited' || p.category === 'High-Top').slice(0, 4);

  const categories = [
    {
      name: 'Running',
      desc: 'Engineered for velocity and responsive energy return',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
      path: '/shop?category=Running',
      accent: 'from-lime-500/20 to-transparent',
    },
    {
      name: 'Lifestyle',
      desc: 'Everyday modern aesthetics crafted for supreme comfort',
      image: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?q=80&w=800&auto=format&fit=crop',
      path: '/shop?category=Lifestyle',
      accent: 'from-cyan-500/20 to-transparent',
    },
    {
      name: 'High-Top',
      desc: 'Iconic ankle support inspired by court culture and streetwear',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop',
      path: '/shop?category=High-Top',
      accent: 'from-purple-500/20 to-transparent',
    },
    {
      name: 'Limited Drops',
      desc: 'Exclusive archive editions and rare collaborative releases',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
      path: '/shop?category=Limited',
      accent: 'from-amber-500/20 to-transparent',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-zinc-950 border-b border-zinc-800/80 pt-8 pb-16 lg:py-24">
        {/* Glow ambient background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-lime-400/10 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[250px] bg-purple-600/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-semibold text-zinc-300">
                <Zap className="w-3.5 h-3.5 text-lime-400 fill-lime-400" />
                <span>Next-Gen Drop Collection 2026</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[1.05]">
                Redefine <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-300 to-teal-400">
                  Your Pace
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Precision-engineered performance shoes and boundary-pushing streetwear silhouettes. Discover tomorrow's ergonomics, built for today's ambition.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto px-8 py-4 bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl shadow-lime-400/20"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/shop?category=Limited"
                  className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Flame className="w-4 h-4 text-red-400" />
                  <span>Limited Drops</span>
                </Link>
              </div>

              {/* Stats / Social Proof */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-zinc-900 max-w-md mx-auto lg:mx-0">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">100%</div>
                  <div className="text-xs text-zinc-500 uppercase font-semibold">Authentic</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-lime-400 font-mono">24H</div>
                  <div className="text-xs text-zinc-500 uppercase font-semibold">Dispatch</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">4.9/5</div>
                  <div className="text-xs text-zinc-500 uppercase font-semibold">50K+ Reviews</div>
                </div>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl relative bg-zinc-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
                    alt="NEOUS Air Max Red"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-lime-400 block mb-1">
                          Featured Flagship
                        </span>
                        <h3 className="text-lg font-bold text-white">NEOUS Air Max Red</h3>
                        <p className="text-sm font-mono text-zinc-300 font-bold">₹15,999</p>
                      </div>
                      <Link
                        to="/product/1"
                        className="px-4 py-2 bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Drops Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-lime-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4" /> Trending Now
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Featured Silhouettes
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold text-zinc-300 hover:text-lime-400 transition-colors uppercase tracking-wider"
          >
            <span>View All Shoes ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Category Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-lime-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-4 h-4" /> Categorized Performance
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Shop By Series
          </h2>
          <p className="text-sm text-zinc-400 mt-2">
            Engineered tailored solutions for track, street, court, and collector galleries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              className="group relative h-80 rounded-3xl overflow-hidden border border-zinc-800/80 bg-zinc-900 transition-all hover:border-zinc-600 hover:shadow-xl flex flex-col justify-end p-6"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.accent} opacity-40`} />

              <div className="relative z-10 space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-lime-400">
                  Collection
                </span>
                <h3 className="text-2xl font-black text-white uppercase tracking-wide group-hover:text-lime-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                  {cat.desc}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Limited Drops Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-black rounded-3xl border border-zinc-800 p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 relative z-10">
            <div>
              <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest inline-block mb-3">
                Vault Archive
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                High-Top & Limited Edition Drops
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                Small-batch runs. Once they are gone, they do not restock.
              </p>
            </div>
            <Link
              to="/shop?category=Limited"
              className="px-6 py-3 bg-white hover:bg-zinc-200 text-black text-xs font-black uppercase tracking-wider rounded-xl self-start sm:self-auto transition-colors"
            >
              View Vault
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {limitedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Code Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-lime-400 text-black p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-black tracking-widest uppercase bg-black text-lime-400 px-3 py-1 rounded-full">
              Exclusive Welcome Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
              Get 10% Off Your First Drop
            </h2>
            <p className="text-sm font-medium text-black/80 max-w-lg">
              Apply code <span className="font-mono font-black underline">NEOUS10</span> during checkout for instant savings across any silhouette.
            </p>
          </div>

          <Link
            to="/shop"
            className="px-8 py-4 bg-black hover:bg-zinc-900 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl flex-shrink-0 transition-transform active:scale-95 shadow-xl"
          >
            Shop Now With Code
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
