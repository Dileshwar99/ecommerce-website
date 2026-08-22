import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, Plus, Minus, Tag, Check, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    discount,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  const rawSubtotal = getCartTotal();
  const discountAmount = Math.round((rawSubtotal * discount) / 100);
  const shippingFee = rawSubtotal > 4999 || rawSubtotal === 0 ? 0 : 499;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + shippingFee);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mx-auto mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-white uppercase tracking-tight">Your Bag is Empty</h2>
        <p className="text-zinc-400 text-sm max-w-md mx-auto mt-2 mb-8 leading-relaxed">
          Looks like you haven't added any futuristic drops to your bag yet. Explore our latest footwear releases and upgrade your rotation.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-lime-400/20"
        >
          <span>Explore Drop Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-8">
        Your Shopping Bag ({cart.reduce((acc, i) => acc + i.quantity, 0)})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Cart Item List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.selectedSize}`}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 transition-all hover:border-zinc-700"
            >
              <div className="flex items-center gap-4">
                <Link
                  to={`/product/${item.id}`}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 flex-shrink-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center"
                  />
                </Link>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-lime-400 block mb-0.5">
                    {item.category}
                  </span>
                  <Link
                    to={`/product/${item.id}`}
                    className="font-bold text-white text-base hover:text-lime-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                  <div className="flex items-center gap-2 mt-1 text-xs text-zinc-400">
                    <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-200 font-mono font-bold">
                      Size: UK {item.selectedSize}
                    </span>
                    <span className="font-mono text-zinc-300 font-semibold">
                      {formatPrice(item.price)} each
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-800">
                <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl p-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                    className="p-1 text-zinc-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-mono font-bold text-xs text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                    className="p-1 text-zinc-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="block font-mono font-black text-base text-white">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id, item.selectedSize)}
                    className="text-xs text-zinc-500 hover:text-red-400 flex items-center gap-1 mt-1 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 space-y-6">
            <h2 className="text-lg font-black text-white uppercase tracking-wider">
              Order Summary
            </h2>

            {/* Coupon Code Input */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-2">
                Promotional Code
              </label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-lime-400/10 border border-lime-400/30 text-lime-400 text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span>{appliedCoupon} ({discount}% OFF)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-zinc-400 hover:text-red-400 text-xs uppercase underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. NEOUS10"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-grow bg-zinc-950 border border-zinc-800 focus:border-lime-400 text-white px-3.5 py-2.5 rounded-xl text-xs uppercase font-mono focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-3 pt-4 border-t border-zinc-800 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Bag Subtotal</span>
                <span className="font-mono text-zinc-200 font-semibold">{formatPrice(rawSubtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-lime-400">
                  <span>Discount ({discount}%)</span>
                  <span className="font-mono font-semibold">-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-zinc-400">
                <span>Shipping</span>
                <span className="font-mono text-zinc-200 font-semibold">
                  {shippingFee === 0 ? <span className="text-lime-400 uppercase">Free</span> : formatPrice(shippingFee)}
                </span>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex justify-between text-base font-black text-white">
                <span>Total Amount</span>
                <span className="font-mono text-lime-400">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-xl shadow-lime-400/20"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
              <ShieldCheck className="w-4 h-4 text-zinc-400" />
              <span>Encrypted 256-bit SSL Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
