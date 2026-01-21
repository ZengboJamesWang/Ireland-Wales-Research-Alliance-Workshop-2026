
import React from 'react';
import Section from './Section';

const Keynote: React.FC = () => {
  // Using the Google Drive image provided by the user (ID: 1axgePyCsgkP0P2uZUh-dkrISrDDYVwfh)
  // The thumbnail endpoint is generally more reliable for direct embedding in web apps.
  const imageSource = "https://drive.google.com/thumbnail?id=1axgePyCsgkP0P2uZUh-dkrISrDDYVwfh&sz=w1000";

  return (
    <Section className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold mb-4 text-white tracking-tight">Keynote Speaker</h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full"></div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="p-8 md:p-14 bg-slate-900/40 backdrop-blur-xl rounded-[4rem] border border-white/10 shadow-3xl relative overflow-hidden group">
          {/* Decorative glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] group-hover:bg-emerald-500/20 transition-colors duration-700"></div>
          
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 relative z-10">
            <div className="w-64 h-64 md:w-80 md:h-80 flex-shrink-0 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 shadow-2xl transform transition-all duration-500 group-hover:scale-[1.03] group-hover:border-emerald-500/30 bg-slate-800 flex items-center justify-center">
              <img 
                src={imageSource} 
                alt="Professor Silvia Giordani" 
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  // Final safety fallback if Drive link is restricted or inaccessible
                  if (target.src !== "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800") {
                    target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800";
                  }
                }}
              />
            </div>
            
            <div className="text-center lg:text-left flex-grow pt-4">
              <div className="inline-flex items-center px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-[0.2em] mb-6">
                Featured Keynote
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-3">Professor Silvia Giordani</h3>
              <p className="text-slate-300 font-bold text-xl mb-6">Dublin City University (DCU)</p>
              
              <div className="space-y-5 text-slate-400 text-lg leading-relaxed mb-10 max-w-2xl">
                <p>
                  Leading the <span className="text-white font-medium">Nanomaterials for Health</span> research group at DCU, Professor Giordani specializes in the design and characterization of smart nanomaterials for biomedical applications.
                </p>
                <p className="text-base italic bg-white/5 p-4 rounded-2xl border-l-4 border-emerald-500">
                  Her presentation will highlight breakthroughs in carbon nano-onions and their pivotal role in the future of drug delivery and therapy.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-5">
                <a 
                  href="https://www.dcu.ie/chemistry/people/silvia-giordani" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl font-black transition-all shadow-xl shadow-emerald-500/20 group/btn"
                >
                  <span>VIEW PROFILE</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Keynote;
