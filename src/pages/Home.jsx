import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Download, ArrowUpRight } from 'lucide-react';
import { products } from '../data/products';

export default function Home() {
  const featuredProduct = products[0];

  return (
    <div className="flex flex-col gap-6 pt-24 min-h-screen">
      {/* HERO SECTION */}
      <section className="flex flex-col lg:flex-row w-full gap-6">
        
        {/* LEFT PANEL */}
        <div className="w-full lg:w-[55%] flex flex-col p-8 lg:p-12 liquid-glass-strong rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl pointer-events-none" />
          
          <div className="flex-1 flex flex-col items-start justify-center text-left space-y-8 z-10 relative mt-12 mb-20 lg:mb-0">
            <div className="liquid-glass px-4 py-1.5 rounded-full text-xs text-emerald-300 font-medium tracking-wide flex items-center gap-2">
              <Sparkles size={12} /> The New Standard
            </div>

            <h1 className="text-5xl lg:text-7xl font-medium tracking-tight leading-[1.05] max-w-2xl text-white">
              Step into the <br />
              <span className="font-serif italic text-white/80 pr-2">future</span>
              of luxury.
            </h1>
            
            <p className="text-lg text-white/60 max-w-md font-light leading-relaxed">
              Discover hyper-premium footwear merging avant-garde design with zero-gravity bio-mechanics.
            </p>

            <Link to="/shop" className="liquid-glass px-8 py-4 rounded-full flex items-center gap-4 hover:bg-white/10 active:scale-95 transition-all mt-4 border border-white/10 group/btn">
              <span className="font-medium text-white group-hover/btn:text-emerald-300 transition-colors">Shop Collection</span>
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-white">
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
          
          <div className="mt-auto hidden lg:flex items-center gap-6">
            <span className="text-[10px] tracking-[0.2em] uppercase text-emerald-400 font-medium font-serif italic">Edition.01</span>
            <div className="h-[1px] flex-1 bg-white/10" />
            <p className="text-[10px] tracking-widest text-white/40">BORN IN THE VOID</p>
          </div>
        </div>

        {/* RIGHT PANEL: FEATURED SHOE */}
        <div className="w-full lg:w-[45%] liquid-glass-strong rounded-[2.5rem] p-6 flex flex-col relative border border-white/5 overflow-hidden group">
          
          <div className="absolute top-4 right-4 liquid-glass px-4 py-2 rounded-full z-10 font-mono text-sm border border-emerald-500/20 text-emerald-300 backdrop-blur-xl">
            ${featuredProduct.price}
          </div>

          <div className="flex-1 w-full flex items-center justify-center relative min-h-[400px]">
            {/* Glowing orb behind shoe */}
            <div className="absolute w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px]" />
            <img 
              src={featuredProduct.image} 
              alt={featuredProduct.name}
              className="w-full h-full object-contain object-center z-10 drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="mt-4 liquid-glass p-6 rounded-3xl flex items-center justify-between group/card cursor-pointer border border-white/5 hover:border-emerald-500/30 transition-colors">
            <div>
              <p className="text-xs text-emerald-400 font-medium mb-1 tracking-wider uppercase">Featured Drop</p>
              <h3 className="text-xl font-medium text-white">{featuredProduct.name}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/card:bg-emerald-500 group-hover/card:text-black transition-colors">
              <ArrowUpRight size={18} />
            </div>
          </div>
        </div>

      </section>

      {/* TRENDING BAR */}
      <section className="w-full liquid-glass-strong rounded-[2.5rem] p-8 flex flex-col lg:flex-row items-center justify-between gap-6 border border-white/5">
        <div className="flex items-center gap-4 text-white/60">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-sm font-medium tracking-wide">TRENDING DROP: TITANIUM SERIES 02</p>
        </div>
        
         <div className="flex gap-3">
            {["Engineered Mesh", "Carbon Soles", "Bio-Adapative"].map((tag) => (
              <span key={tag} className="liquid-glass px-5 py-2 rounded-full text-xs text-white/80 border border-white/5">
                {tag}
              </span>
            ))}
          </div>
      </section>
    </div>
  );
}
