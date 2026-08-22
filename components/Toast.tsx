import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const Toast: React.FC = () => {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl bg-zinc-900/95 border border-zinc-800 shadow-2xl backdrop-blur-md text-white transition-all transform animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-center gap-3">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-lime-400 flex-shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-cyan-400 flex-shrink-0" />}
            {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />}
            <span className="text-sm font-medium text-zinc-200">{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-zinc-400 hover:text-white transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
