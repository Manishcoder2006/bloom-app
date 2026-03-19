import React from 'react';
import { ArrowDown } from 'lucide-react';

const BloomLanding = () => {
  return (
    <div className="w-full min-h-screen text-white pt-24 pb-12">
      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center p-6 lg:p-12 overflow-hidden text-center max-w-7xl mx-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-emerald-500/10 blur-[120px] -z-10" />
        
        <div className="liquid-glass-strong rounded-full px-6 py-2 mb-8 border border-emerald-500/30">
          <span className="text-emerald-400 text-sm tracking-widest font-mono uppercase">Crafted for the Void</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter mb-8 leading-[0.9]">
          Redefining <br className="hidden md:block"/> Form & Function.
        </h1>

        <p className="text-lg md:text-xl text-white/60 max-w-2xl font-light leading-relaxed mb-12">
          At Bloom, we believe footwear is an extension of the self. Engineered with 
          liquid-glass polymers and aerospace-grade weaves, we craft shoes that don't just protect 
          your steps—they anticipate them.
        </p>

        <ArrowDown size={32} className="text-emerald-400 animate-bounce" />
      </section>

      {/* Our Story Grid */}
      <section className="w-full max-w-7xl mx-auto p-4 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="liquid-glass-strong rounded-[3rem] p-12 flex flex-col justify-center border border-white/5 relative overflow-hidden group min-h-[400px]">
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-emerald-500/20 transition-colors duration-700" />
           <h2 className="text-3xl lg:text-4xl font-semibold mb-6">The Genesis</h2>
           <p className="text-white/60 leading-relaxed font-light text-lg">
             Born in 2026 from a desire to merge brutalist cyber-aesthetics with hyper-ergonomics. 
             Every pair of Bloom sneakers involves 400 precision steps, culminating in an 
             algorithmically generated midsole that adapts entirely to the wearer's gait.
           </p>
        </div>

        <div className="liquid-glass-strong rounded-[3rem] p-12 flex flex-col justify-center border border-white/5 relative overflow-hidden group min-h-[400px]">
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-blue-500/20 transition-colors duration-700" />
           <h2 className="text-3xl lg:text-4xl font-semibold mb-6">Sustainability</h2>
           <p className="text-white/60 leading-relaxed font-light text-lg">
             Zero emissions. Zero waste. Our proprietary carbon-negative manufacturing process 
             absorbs atmospheric CO2 to synthesize the very polymers you walk on. When you run, 
             the Earth breathes easier.
           </p>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="w-full max-w-7xl mx-auto p-4 lg:p-8 mt-12 mb-24">
         <div className="liquid-glass rounded-[4rem] p-12 lg:p-24 text-center border border-white/10 relative overflow-hidden">
            <h2 className="text-4xl lg:text-6xl font-semibold mb-12 tracking-tight">The Architecture of Motion</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left mt-16">
              <div className="space-y-4">
                 <div className="w-12 h-12 rounded-full border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-mono">01</div>
                 <h3 className="text-xl font-medium">Kinetic Mesh</h3>
                 <p className="text-white/50 text-sm leading-relaxed">Reactive outer layer that shrinks and expands based on ambient temperature and foot swelling during long runs.</p>
              </div>
              <div className="space-y-4">
                 <div className="w-12 h-12 rounded-full border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-mono">02</div>
                 <h3 className="text-xl font-medium">Quantum Foam</h3>
                 <p className="text-white/50 text-sm leading-relaxed">Midsole injected with inert nitrogen gas for maximum energy return and zero compression over time.</p>
              </div>
              <div className="space-y-4">
                 <div className="w-12 h-12 rounded-full border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-mono">03</div>
                 <h3 className="text-xl font-medium">Biometric Lock</h3>
                 <p className="text-white/50 text-sm leading-relaxed">No laces. A smart haptic-lacing system wraps dynamically across the midfoot for an unyielding fit.</p>
              </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default BloomLanding;
