
import React from 'react';
import Section from './Section';

const About: React.FC = () => {
  return (
    <Section className="bg-slate-900/50 rounded-[3rem] my-12">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-white">About the Workshop</h2>
          <div className="space-y-4 text-slate-400 leading-relaxed">
            <p>
              This one-day workshop is organised under an <span className="text-emerald-400 font-medium">Ireland–Wales Research Alliance Award</span>, 
              jointly funded by the Welsh Government and Research Ireland.
            </p>
            <p>
              The workshop forms part of a collaborative feasibility study between <strong>Bangor University</strong> and <strong>Dublin City University</strong>, 
              focusing on laser-mediated heating of carbon nano-onions (CNOs) for therapeutic applications.
            </p>
            <p>
              To maximise impact and foster new collaborations, the Bangor workshop is open to the wider UK academic and industrial community.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
             <div className="flex items-center space-x-2 text-sm bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Welsh Government Funded</span>
             </div>
             <div className="flex items-center space-x-2 text-sm bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span>Research Ireland Funded</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-white font-bold mb-2">Academic</h3>
                    <p className="text-sm text-slate-500">Researchers in physics, chemistry, and biomedicine.</p>
                </div>
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                    <h3 className="text-emerald-400 font-bold mb-2">Industry</h3>
                    <p className="text-sm text-slate-400">Nanomedicine and photonics medical device leads.</p>
                </div>
            </div>
            <div className="space-y-4 pt-8">
                <div className="p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                    <h3 className="text-cyan-400 font-bold mb-2">Clinical</h3>
                    <p className="text-sm text-slate-400">Translational pathways and medicine stakeholders.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-white font-bold mb-2">Early Career</h3>
                    <p className="text-sm text-slate-500">Specific sessions for PhDs and Postdocs.</p>
                </div>
            </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
