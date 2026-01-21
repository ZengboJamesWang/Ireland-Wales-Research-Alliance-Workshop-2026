
import React from 'react';
import Section from './Section';

const schedule = [
  { time: "09:00", event: "Registration & Coffee", description: "The Management Centre Foyer" },
  { time: "09:30", event: "Opening Welcome", description: "Prof. Zengbo Wang (Bangor) & DCU Representative" },
  { time: "10:00", event: "Keynote: Nanomaterials for Health", description: "Prof. Silvia Giordani, Dublin City University" },
  { time: "11:15", event: "Coffee Break & Poster Session I", description: "Networking and research display" },
  { time: "11:45", event: "Session A: Optical Perspectives", description: "Invited talks on light-to-heat conversion" },
  { time: "13:00", event: "Workshop Lunch", description: "Provided at the Management Centre" },
  { time: "14:00", event: "Session B: Translational Nanomedicine", description: "Clinical pathways and industry panels" },
  { time: "15:30", event: "Coffee Break & Poster Session II", description: "Final research showcase" },
  { time: "16:00", event: "Alliance Strategy & Funding", description: "Discussion on future Ireland–Wales collaboration" },
  { time: "17:00", event: "Closing Remarks", description: "Workshop concludes" }
];

const Program: React.FC = () => {
  return (
    <div className="pb-24">
      <Section>
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">Workshop Program</h1>
            <p className="text-slate-500 text-lg mb-12 uppercase tracking-widest font-black text-sm italic">Friday, 20 March 2026</p>
            
            <div className="space-y-4">
              {schedule.map((item, idx) => (
                <div key={idx} className="flex gap-6 p-6 bg-slate-900/50 border border-white/5 rounded-2xl group hover:border-emerald-500/30 transition-all">
                  <div className="text-emerald-500 font-mono font-bold text-lg pt-1">{item.time}</div>
                  <div>
                    <h3 className="text-white font-bold text-xl group-hover:text-emerald-400 transition-colors">{item.event}</h3>
                    <p className="text-slate-500 mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="sticky top-24">
              <h2 className="text-2xl font-black text-white mb-8 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Additional Papers & Resources
              </h2>

              <div className="space-y-6">
                {/* Main Workshop Paper */}
                <div className="p-8 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-[2.5rem] border border-emerald-500/20 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors"></div>
                  <div className="relative z-10">
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Featured Paper</p>
                    <h3 className="text-xl font-black text-white mb-4 leading-tight">Nanoparticles for Drug Delivery & Therapy: Photothermal, Optical and Translational Perspectives</h3>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">The primary workshop paper detailing the collaboration goals between Bangor University and Dublin City University.</p>
                    <button className="w-full py-4 bg-emerald-500 text-slate-950 rounded-xl font-black text-sm hover:bg-emerald-400 transition-all flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      DOWNLOAD PDF
                    </button>
                  </div>
                </div>

                {/* Additional Template */}
                <div className="p-6 bg-slate-900/80 rounded-3xl border border-white/10 hover:border-white/20 transition-all flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mr-4 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-bold">Abstract Template</p>
                      <p className="text-slate-500 text-xs">DOCX (25KB)</p>
                    </div>
                  </div>
                  <button className="text-emerald-500 hover:text-emerald-400 font-bold text-xs uppercase tracking-widest">GET FILE</button>
                </div>

                {/* Event Brochure */}
                <div className="p-6 bg-slate-900/80 rounded-3xl border border-white/10 hover:border-white/20 transition-all flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mr-4 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-bold">Event Brochure</p>
                      <p className="text-slate-500 text-xs">PDF (2.4MB)</p>
                    </div>
                  </div>
                  <button className="text-emerald-500 hover:text-emerald-400 font-bold text-xs uppercase tracking-widest">GET FILE</button>
                </div>
              </div>

              <div className="mt-12 p-8 bg-slate-900 rounded-[2.5rem] border border-dashed border-white/10 text-center">
                <p className="text-slate-500 text-sm italic">Additional papers will be added as they are finalized by the research alliance.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Program;
