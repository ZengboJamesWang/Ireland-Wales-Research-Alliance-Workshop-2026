
import React, { useState } from 'react';

interface HeroProps {
  onCtaClick: (isPresenting: boolean) => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -z-10 animate-pulse delay-700"></div>
      <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 -z-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left grid md:grid-cols-2 gap-16 items-center">
        <div className="relative z-10">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-8 tracking-[0.2em] uppercase">
            Call for Participants
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-slate-500">
            Nanoparticles for Drug Delivery & Therapy
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-xl leading-relaxed">
            Photothermal, Optical and Translational Perspectives. A premier Ireland–Wales Research Alliance Workshop hosted at Bangor University.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button 
              onClick={() => onCtaClick(true)}
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl font-black transition-all shadow-xl shadow-emerald-500/20 active:scale-95 transform hover:-translate-y-1"
            >
              SUBMIT ABSTRACT
            </button>
            <button 
              onClick={() => onCtaClick(false)}
              className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-2xl font-black transition-all backdrop-blur-sm active:scale-95 transform hover:-translate-y-1"
            >
              REGISTER TO ATTEND
            </button>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-8 max-w-md border-t border-white/10 pt-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black mb-2">Event Date</p>
              <p className="text-lg font-bold text-white">Friday, 20 March 2026</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black mb-2">Location</p>
              <p className="text-lg font-bold text-white">Bangor University, UK</p>
            </div>
          </div>
        </div>

        <div className="relative hidden md:block group">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative transform transition-transform duration-700 group-hover:scale-[1.02] bg-slate-900">
                {!imageError ? (
                  <img 
                    src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800" 
                    alt="" 
                    className="object-cover w-full h-full opacity-60 group-hover:opacity-90 transition-opacity duration-700"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 flex items-center justify-center">
                    <div className="w-32 h-32 bg-emerald-500/10 rounded-full border border-emerald-500/20 animate-pulse"></div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10">
                    <p className="text-emerald-400 font-mono text-xs mb-2 tracking-widest">// INNOVATION HUB</p>
                    <p className="text-white text-2xl font-black leading-tight">Bridging Physics, Chemistry & Medicine</p>
                </div>
            </div>
            
            {/* Multi-Date Floating Badge */}
            <div className="absolute -top-6 -right-6 p-6 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-[2.5rem] shadow-2xl transform hover:rotate-2 transition-transform cursor-default border border-white/20 backdrop-blur-sm min-w-[200px]">
                <div className="mb-4 pb-4 border-b border-white/20">
                    <p className="text-[10px] text-emerald-100 font-black uppercase tracking-widest mb-1">Abstract Deadline</p>
                    <p className="text-2xl font-black text-white">Tuesday, March 17</p>
                </div>
                <div>
                    <p className="text-[10px] text-emerald-100 font-black uppercase tracking-widest mb-1">Workshop Date</p>
                    <p className="text-2xl font-black text-white">Friday, March 20</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
