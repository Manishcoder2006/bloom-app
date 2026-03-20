import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);

  return (
    <div className="pt-32 pb-12 w-full max-w-5xl mx-auto space-y-12">
      <h1 className="text-4xl lg:text-5xl font-medium tracking-tight text-white px-4">Shopping Bag</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* ITEMS LIST */}
        <div className="w-full lg:w-2/3 space-y-6 px-4">
          {cartItems.map((item, index) => (
            <div key={index} className="liquid-glass-strong rounded-3xl p-6 flex items-center gap-6 border border-white/5 group">
              <div className="w-32 h-32 liquid-glass rounded-2xl flex items-center justify-center p-2 relative">
                <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl blur-[20px] group-hover:bg-emerald-400/20 transition-colors" />
                <img src={item.image} alt={item.name} className="w-full h-full object-contain relative z-10" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-medium text-white">{item.name}</h3>
                  <button 
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="text-white/40 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <p className="text-sm text-emerald-400 font-mono tracking-wider">{item.category}</p>
                <div className="flex items-center gap-6 pt-2 text-white/60">
                  <p>Size: <span className="text-white ml-2">{item.size}</span></p>
                  <div className="flex items-center gap-3">
                    <p>Qty:</p>
                    <div className="flex items-center gap-2 bg-white/5 rounded-full px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, -1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/10 text-white"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-white font-mono w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/10 text-white"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="font-mono text-xl text-white">₹{(Number(item.price) * item.quantity).toFixed(2)}</div>
            </div>
          ))}

          <Link to="/shop" className="inline-flex items-center gap-2 text-emerald-400 font-medium hover:text-emerald-300 transition-colors pt-6">
             <ArrowRight size={16} className="rotate-180" /> Continue Shopping
          </Link>
        </div>

        {/* SUMMARY */}
        <div className="w-full lg:w-1/3 space-y-6 px-4">
          <div className="liquid-glass-strong rounded-[2.5rem] p-8 border border-white/5 space-y-6">
            <h2 className="text-2xl font-medium text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-white/80 font-light">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-white">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-mono text-emerald-400">Complimentary</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Taxes</span>
                <span className="font-mono text-white">Calculated at checkout</span>
              </div>
            </div>

            <div className="h-[1px] w-full bg-white/10 my-6" />

            <div className="flex justify-between items-end mb-8">
              <span className="text-lg font-medium text-white">Total</span>
              <span className="font-mono text-3xl text-emerald-300 shadow-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                ₹{subtotal.toFixed(2)}
              </span>
            </div>

            <Link to="/checkout" className="w-full py-5 rounded-full bg-emerald-500 text-black font-semibold text-lg hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all duration-500 flex items-center justify-center gap-3 group">
              Checkout 
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
