
import React from 'react';
import Section from './Section';

const topics = [
  "Carbon-based nanomaterials (CNOs, CNTs, graphene, nanodiamonds)",
  "Nanoparticles for drug delivery and controlled release",
  "Photothermal and photodynamic therapy",
  "Laser–nanoparticle interaction and light-to-heat conversion",
  "Optical, thermal, and spectroscopic characterisation",
  "Translational challenges in nanomedicine",
  "Industry perspectives and clinical pathways"
];

const Scope: React.FC = () => {
  return (
    <Section>
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Scope and Topics</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          We welcome contributions related to nanoparticles for drug delivery and therapy, focusing on both fundamental studies and applied work.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => (
          <div key={index} className="p-6 rounded-2xl bg-slate-900 border border-white/5 hover:border-emerald-500/30 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-500 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-200 font-medium leading-relaxed">{topic}</p>
          </div>
        ))}
        <div className="p-6 rounded-2xl border border-dashed border-white/10 flex items-center justify-center text-slate-500 text-sm italic">
          And other related translational perspectives...
        </div>
      </div>
    </Section>
  );
};

export default Scope;
