import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  Truck,
  ArrowRight,
  Package,
  QrCode,
  Building2,
  DollarSign
} from 'lucide-react';
import { UserInfo } from '../types';

const Checkout: React.FC = () => {
  const { cart, getCartTotal, discount, clearCart } = useCart();
  const navigate = useNavigate();

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    country: 'India',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '4532 8921 4452 9012',
    cardName: 'Alex Morgan',
    expiry: '12/28',
    cvv: '888',
    upiId: 'alex@okhdfcbank',
  });

  const rawSubtotal = getCartTotal();
  const discountAmount = Math.round((rawSubtotal * discount) / 100);
  const shippingFee = shippingMethod === 'express' ? 499 : (rawSubtotal > 4999 ? 0 : 299);
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + shippingFee);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo.firstName || !userInfo.email || !userInfo.address || !userInfo.phone) {
      alert('Please fill out all required shipping fields.');
      return;
    }

    const generatedId = 'NEOUS-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setOrderComplete(true);
    clearCart();
  };

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white">No Items to Checkout</h2>
        <p className="text-zinc-400 text-sm mt-2 mb-6">Your shopping bag is currently empty.</p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-lime-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl"
        >
          Go to Shop
        </Link>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-in fade-in duration-300">
        <div className="w-20 h-20 rounded-full bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-400 mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs font-black uppercase tracking-widest text-lime-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
          Order Verified & Confirmed
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mt-4">
          Thank You, {userInfo.firstName}!
        </h1>

        <p className="text-zinc-400 text-sm mt-2 max-w-md mx-auto leading-relaxed">
          Your order has been logged into our automated fulfillment queue. A tracking confirmation email has been dispatched to <strong className="text-white">{userInfo.email || 'your email'}</strong>.
        </p>

        <div className="my-8 p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 text-left space-y-4 font-mono text-xs">
          <div className="flex justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-500">Order ID:</span>
            <span className="text-lime-400 font-bold">{orderId}</span>
          </div>
          <div className="flex justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-500">Shipping Address:</span>
            <span className="text-zinc-300">{userInfo.address}, {userInfo.city} ({userInfo.zip})</span>
          </div>
          <div className="flex justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-500">Estimated Delivery:</span>
            <span className="text-zinc-300">2-4 Business Days</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-white pt-1">
            <span>Amount Paid:</span>
            <span className="text-lime-400">{formatPrice(finalTotal)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/shop"
            className="w-full sm:w-auto px-8 py-4 bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-lime-400/20"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-8">
        Secure Checkout
      </h1>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Form: Shipping & Payment Details */}
        <div className="lg:col-span-7 space-y-8">
          {/* Shipping Info Card */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lime-400">
              <Truck className="w-4 h-4" /> 1. Shipping Details
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-1.5">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={handleInputChange}
                  placeholder="e.g. Alex"
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-lime-400 text-white px-3.5 py-2.5 rounded-xl text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-1.5">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={userInfo.lastName}
                  onChange={handleInputChange}
                  placeholder="e.g. Morgan"
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-lime-400 text-white px-3.5 py-2.5 rounded-xl text-xs focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  placeholder="alex.morgan@domain.com"
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-lime-400 text-white px-3.5 py-2.5 rounded-xl text-xs focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-1.5">
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-lime-400 text-white px-3.5 py-2.5 rounded-xl text-xs focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-1.5">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  name="address"
                  value={userInfo.address}
                  onChange={handleInputChange}
                  placeholder="Apartment, suite, block or street"
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-lime-400 text-white px-3.5 py-2.5 rounded-xl text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-1.5">
                  City *
                </label>
                <input
                  type="text"
                  required
                  name="city"
                  value={userInfo.city}
                  onChange={handleInputChange}
                  placeholder="Mumbai"
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-lime-400 text-white px-3.5 py-2.5 rounded-xl text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-1.5">
                  Postal ZIP Code *
                </label>
                <input
                  type="text"
                  required
                  name="zip"
                  value={userInfo.zip}
                  onChange={handleInputChange}
                  placeholder="400001"
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-lime-400 text-white px-3.5 py-2.5 rounded-xl text-xs focus:outline-none"
                />
              </div>
            </div>

            {/* Shipping Speed Selection */}
            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
                Delivery Options
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setShippingMethod('standard')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    shippingMethod === 'standard'
                      ? 'bg-lime-400/10 border-lime-400 text-white'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold uppercase">Standard Courier</div>
                    <div className="text-[10px] text-zinc-500">3-5 Business Days</div>
                  </div>
                  <span className="font-mono text-xs font-bold text-lime-400">
                    {rawSubtotal > 4999 ? 'FREE' : '₹299'}
                  </span>
                </div>

                <div
                  onClick={() => setShippingMethod('express')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    shippingMethod === 'express'
                      ? 'bg-lime-400/10 border-lime-400 text-white'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold uppercase">Express Flight Dispatch</div>
                    <div className="text-[10px] text-zinc-500">1-2 Business Days</div>
                  </div>
                  <span className="font-mono text-xs font-bold text-lime-400">₹499</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lime-400">
              <CreditCard className="w-4 h-4" /> 2. Payment Method
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-lime-400 text-black border-lime-400 font-extrabold'
                    : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'upi'
                    ? 'bg-lime-400 text-black border-lime-400 font-extrabold'
                    : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'cod'
                    ? 'bg-lime-400 text-black border-lime-400 font-extrabold'
                    : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>COD</span>
              </button>
            </div>

            {/* Payment Fields */}
            {paymentMethod === 'card' && (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-1.5">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 text-white font-mono px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:border-lime-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-1.5">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={paymentInfo.expiry}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 text-white font-mono px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:border-lime-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-1.5">
                      CVV / CVC
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 text-white font-mono px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:border-lime-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
                  Virtual Payment Address (VPA / UPI ID)
                </label>
                <input
                  type="text"
                  value={paymentInfo.upiId}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, upiId: e.target.value })}
                  placeholder="username@bank"
                  className="w-full bg-zinc-950 border border-zinc-800 text-white font-mono px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:border-lime-400"
                />
                <p className="text-[10px] text-zinc-500">
                  A payment request prompt will be dispatched directly to your UPI app.
                </p>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 leading-relaxed">
                Cash on Delivery requires verification via phone. Please keep the exact change ready upon parcel arrival.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Review */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 sticky top-24">
            <h2 className="text-lg font-black text-white uppercase tracking-wider">
              Summary ({cart.length} {cart.length === 1 ? 'Item' : 'Items'})
            </h2>

            {/* Compact items preview */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover bg-zinc-950 border border-zinc-800"
                    />
                    <div>
                      <h4 className="font-bold text-white line-clamp-1">{item.name}</h4>
                      <span className="text-zinc-400">UK {item.selectedSize} × {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-mono text-zinc-200 font-bold">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Calculation */}
            <div className="space-y-2.5 pt-4 border-t border-zinc-800 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="font-mono text-zinc-200">{formatPrice(rawSubtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-lime-400 font-semibold">
                  <span>Discount ({discount}%)</span>
                  <span className="font-mono">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Shipping</span>
                <span className="font-mono text-zinc-200">
                  {shippingFee === 0 ? <span className="text-lime-400 uppercase font-bold">Free</span> : formatPrice(shippingFee)}
                </span>
              </div>
              <div className="pt-3 border-t border-zinc-800 flex justify-between text-base font-black text-white">
                <span>Total Due</span>
                <span className="font-mono text-lime-400">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-xl shadow-lime-400/20"
            >
              <span>Place Order & Pay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
