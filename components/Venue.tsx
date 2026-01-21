
import React from 'react';
import Section from './Section';

const Venue: React.FC = () => {
  const address = "The Management Centre, College Road, Bangor LL57 2DG, Wales";
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  
  // Convert Google Drive view link to a direct thumbnail source for reliable embedding
  const imageSource = "https://drive.google.com/thumbnail?id=1gGvDon3nkIrwOBtUZHYwDlKxKBnggA5a&sz=w1200";

  return (
    <Section className="py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-6 tracking-widest uppercase">
            Workshop Venue
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            The Management Centre
          </h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            Our workshop will be held at The Management Centre at Bangor University, a premium venue offering state-of-the-art facilities and a professional environment for scientific exchange.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-emerald-500/30 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mr-6 text-emerald-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Address</p>
                <p className="text-white font-bold text-lg">College Road, Bangor LL57 2DG, Wales</p>
              </div>
            </div>

            <div className="flex items-start p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-emerald-500/30 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mr-6 text-emerald-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Phone</p>
                <p className="text-white font-bold text-lg">+44 1248 365916</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <a 
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-2xl font-black transition-all active:scale-95 group/btn"
            >
              <span>GET DIRECTIONS</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

        <div className="order-1 lg:order-2 relative group">
          <div className="aspect-video lg:aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative transform transition-all duration-700 group-hover:scale-[1.02] bg-slate-900">
            <img 
              src={imageSource} 
              alt="The Management Centre Bangor" 
              className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-700"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src !== "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200") {
                  target.src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200";
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-transparent to-emerald-500/10"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-4 bg-emerald-500 text-slate-950 rounded-full font-black text-xs shadow-2xl">
                    PREMIUM CONFERENCE VENUE
                </div>
            </div>
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors"></div>
        </div>
      </div>
    </Section>
  );
};

export default Venue;
