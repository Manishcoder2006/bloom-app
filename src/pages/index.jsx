import React from 'react';
import { 
  Sparkles, Download, Wand2, BookOpen, 
  ArrowRight, Twitter, Linkedin, Instagram, Menu, Plus 
} from 'lucide-react';

const BloomLanding = () => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden flex font-sans">
      {/* BACKGROUND VIDEO */}
      <video 
        autoPlay muted loop playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4" type="video/mp4" />
      </video>

      {/* CONTENT LAYER */}
      <div className="relative z-10 flex w-full min-h-screen p-4 lg:p-6 gap-6">
        
        {/* LEFT PANEL */}
        <section className="relative w-full lg:w-[52%] flex flex-col p-8 lg:p-12 liquid-glass-strong rounded-[2.5rem]">
          {/* Nav */}
          <nav className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Bloom" className="w-8 h-8" />
              <span className="text-2xl font-semibold tracking-tighter text-white">bloom</span>
            </div>
            <button className="liquid-glass px-5 py-2 rounded-full flex items-center gap-2 hover:scale-105 transition-transform">
              <span className="text-sm font-medium">Menu</span>
              <Menu size={18} />
            </button>
          </nav>

          {/* Hero Content */}
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
            <img src="/logo.png" alt="Bloom Logo" className="w-20 h-20 opacity-90" />
            <h1 className="text-5xl lg:text-7xl font-medium tracking-tight leading-[1.1] max-w-2xl">
              Innovating the <br />
              <span className="font-serif italic text-white/80">spirit of bloom AI</span>
            </h1>
            
            <button className="liquid-glass-strong px-8 py-4 rounded-full flex items-center gap-4 hover:scale-105 active:scale-95 transition-all">
              <span className="font-medium">Explore Now</span>
              <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                <Download size={14} />
              </div>
            </button>

            <div className="flex gap-3 pt-4">
              {["Artistic Gallery", "AI Generation", "3D Structures"].map((tag) => (
                <span key={tag} className="liquid-glass px-4 py-1.5 rounded-full text-xs text-white/80">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Quote */}
          <div className="mt-auto pt-12 text-center space-y-4">
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-medium">Visionary Design</span>
            <div className="flex items-center justify-center gap-6">
              <div className="h-[1px] w-12 bg-white/20" />
              <p className="text-lg">
                "We <span className="font-serif italic">imagined</span> a realm with <span className="font-serif italic">no ending</span>."
              </p>
              <div className="h-[1px] w-12 bg-white/20" />
            </div>
            <p className="text-[10px] tracking-widest text-white/40">MARCUS AURELIO</p>
          </div>
        </section>

        {/* RIGHT PANEL (Desktop Only) */}
        <section className="hidden lg:flex flex-col w-[48%] space-y-6">
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <div className="liquid-glass px-4 py-2 rounded-full flex items-center gap-4">
              {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="text-white hover:text-white/60 transition-colors">
                  <Icon size={18} />
                </a>
              ))}
              <div className="w-[1px] h-4 bg-white/20 mx-1" />
              <ArrowRight size={18} className="cursor-pointer hover:translate-x-1 transition-transform" />
            </div>
            
            <button className="liquid-glass p-3 rounded-full hover:scale-105 transition-transform">
              <Sparkles size={20} className="text-white" />
            </button>
          </div>

          {/* Ecosystem Card */}
          <div className="liquid-glass p-6 rounded-3xl w-56 self-end space-y-2">
            <h3 className="text-sm font-medium">Enter our ecosystem</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Experience the convergence of nature and neural synthesis.
            </p>
          </div>

          {/* Bottom Feature Section */}
          <div className="mt-auto liquid-glass-strong p-6 rounded-[2.5rem] space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="liquid-glass p-5 rounded-3xl space-y-3 hover:scale-[1.02]">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Wand2 size={16} />
                </div>
                <h4 className="text-sm font-medium">Processing</h4>
              </div>
              <div className="liquid-glass p-5 rounded-3xl space-y-3 hover:scale-[1.02]">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <BookOpen size={16} />
                </div>
                <h4 className="text-sm font-medium">Growth Archive</h4>
              </div>
            </div>

            <div className="liquid-glass p-4 rounded-3xl flex items-center gap-4 group">
              <img 
                src="@/assets/hero-flowers.png" 
                alt="Sculpting" 
                className="w-24 h-16 rounded-xl object-cover grayscale"
              />
              <div className="flex-1">
                <h4 className="text-sm font-medium">Advanced Plant Sculpting</h4>
                <p className="text-[10px] text-white/50">Procedural botanical architecture</p>
              </div>
              <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <Plus size={16} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default BloomLanding;