
import React from 'react';
import Section from './Section';

const schedule = [
  { time: "09:00", event: "Registration & Coffee", description: "The Management Centre Foyer (TBC)" },
  { time: "09:30", event: "Opening Welcome", description: "Project Leads (Draft Only)" },
  { time: "10:00", event: "Keynote: Nanomaterials for Health", description: "Prof. Silvia Giordani, Dublin City University" },
  { time: "11:15", event: "Coffee Break & Poster Session I", description: "Tentative Networking Slot" },
  { time: "11:45", event: "Session A: Optical Perspectives", description: "Planned Technical Session" },
  { time: "13:00", event: "Workshop Lunch", description: "Preliminary Catering Details" },
  { time: "14:00", event: "Session B: Translational Nanomedicine", description: "Proposed Industry Panel" },
  { time: "15:30", event: "Coffee Break & Poster Session II", description: "Final research showcase" },
  { time: "16:00", event: "Alliance Strategy & Funding", description: "Strategy Discussion (Draft)" },
  { time: "17:00", event: "Closing Remarks", description: "Anticipated Conclusion" }
];

const Program: React.FC = () => {
  return (
    <div className="pb-24">
      <Section>
        {/* Preliminary Notice */}
        <div className="mb-12 p-6 md:p-8 bg-cyan-500/10 border border-cyan-500/20 rounded-[2.5rem] backdrop-blur-md flex flex-col md:flex-row items-center gap-6 animate-in slide-in-from-top-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="text-center md:text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 mb-1">Notice to Participants</p>
            <h2 className="text-xl font-bold text-white mb-2">Preliminary Program Details</h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
              The schedule and resources below are currently in <strong>draft status</strong>. The Ireland–Wales Research Alliance is finalizing the technical brochure and official papers. Final versions will be uploaded shortly.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">
              Draft Schedule v0.9
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight uppercase">Workshop Program</h1>
            <p className="text-slate-500 text-lg mb-12 uppercase tracking-widest font-black text-sm italic">Friday, 20 March 2026</p>
            
            <div className="space-y-4">
              {schedule.map((item, idx) => (
                <div key={idx} className="flex gap-6 p-6 bg-slate-900/50 border border-white/5 rounded-2xl group hover:border-emerald-500/30 transition-all opacity-80 hover:opacity-100">
                  <div className="text-emerald-500/50 font-mono font-bold text-lg pt-1 group-hover:text-emerald-500 transition-colors">{item.time}</div>
                  <div>
                    <h3 className="text-white font-bold text-xl group-hover:text-emerald-400 transition-colors flex items-center">
                      {item.event}
                    </h3>
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
                Draft Resources
              </h2>

              <div className="space-y-6">
                <div className="p-8 bg-gradient-to-br from-white/5 to-cyan-500/5 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">In Review</p>
                      <span className="px-2 py-0.5 bg-slate-800 text-slate-500 text-[8px] font-bold rounded uppercase">Coming Soon</span>
                    </div>
                    <h3 className="text-xl font-black text-white mb-4 leading-tight">Nanoparticles for Drug Delivery & Therapy: Research Alliance Strategy</h3>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">The primary workshop paper is currently undergoing final academic review by Bangor University and DCU teams.</p>
                    <button disabled className="w-full py-4 bg-white/5 text-slate-500 border border-white/5 rounded-xl font-black text-sm cursor-not-allowed">
                      UNDER REVIEW
                    </button>
                  </div>
                </div>

                <div className="p-6 bg-slate-900/80 rounded-3xl border border-white/10 opacity-60 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mr-4 text-slate-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-400 font-bold">Abstract Template</p>
                      <p className="text-slate-600 text-xs italic">Awaiting Final Version</p>
                    </div>
                  </div>
                  <span className="text-slate-700 font-bold text-[10px] uppercase tracking-widest">PENDING</span>
                </div>

                <div className="p-6 bg-slate-900/80 rounded-3xl border border-white/10 opacity-60 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mr-4 text-slate-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-400 font-bold">Event Brochure</p>
                      <p className="text-slate-600 text-xs italic">PDF (In Production)</p>
                    </div>
                  </div>
                  <span className="text-slate-700 font-bold text-[10px] uppercase tracking-widest">PENDING</span>
                </div>
              </div>

              <div className="mt-12 p-8 bg-slate-900 rounded-[2.5rem] border border-dashed border-white/10 text-center">
                <p className="text-slate-500 text-sm italic">
                  The technical resources are being finalized to reflect the latest collaborative feasibility study findings. Please check back shortly for full access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Program;
