import { Link } from 'react-router-dom';
import { Instagram, Twitter, MessageCircle, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full relative z-10 p-4 lg:p-6 mt-20 mx-auto max-w-7xl">
      <div className="liquid-glass-strong rounded-[3rem] p-10 lg:p-16 border border-white/5 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8 text-white/60">
          
          {/* Brand Info */}
          <div className="space-y-6 lg:w-1/3 text-center lg:text-left">
            <Link to="/" className="flex items-center gap-3 justify-center lg:justify-start group">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 group-hover:scale-110 transition-transform">
                <div className="w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
              </div>
              <span className="text-2xl font-semibold tracking-tighter text-white">bloom</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs mx-auto lg:mx-0">
              Pioneering the future of luxury footwear through bio-digital aesthetics and unparalleled hyper-craftsmanship. 
              Engineered for the void.
            </p>
            
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
              <a href="#" className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-all border border-white/5">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-all border border-white/5">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-all border border-white/5">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
          
          {/* Links Grid */}
          <div className="flex justify-center flex-wrap lg:flex-nowrap gap-12 lg:gap-24 w-full lg:w-auto">
            <div className="space-y-6 text-center lg:text-left">
              <h4 className="text-white font-medium tracking-widest uppercase text-xs">Explore</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/shop" className="hover:text-emerald-400 transition-colors">Shop All</Link></li>
                <li><Link to="/shop" className="hover:text-emerald-400 transition-colors">New Arrivals</Link></li>
                <li><Link to="/about" className="hover:text-emerald-400 transition-colors">Our Story</Link></li>
                <li><Link to="/admin" className="hover:text-emerald-400 transition-colors">Admin Portal</Link></li>
              </ul>
            </div>
            
            <div className="space-y-6 text-center lg:text-left">
              <h4 className="text-white font-medium tracking-widest uppercase text-xs">Support</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/profile" className="hover:text-emerald-400 transition-colors">Track Order</Link></li>
                <li><Link to="/profile" className="hover:text-emerald-400 transition-colors">Returns</Link></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:w-1/4 space-y-6 text-center lg:text-left">
             <h4 className="text-white font-medium tracking-widest uppercase text-xs">Stay in the loop</h4>
             <p className="text-sm">Exclusive drops and insider perks.</p>
             <div className="relative group">
                <input 
                  type="email" 
                  placeholder="void@example.com" 
                  className="w-full bg-black/50 border border-white/10 rounded-full pl-5 pr-12 py-3 text-sm text-white outline-none focus:border-emerald-500/50 transition-colors"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-emerald-400 transition-colors">
                  <ArrowRight size={14} />
                </button>
             </div>
          </div>

        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-10" />

        <div className="flex flex-col md:flex-row items-center justify-between text-[10px] tracking-widest uppercase text-white/30 text-center gap-4">
          <p>© 2026 Bloom Footwear. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
