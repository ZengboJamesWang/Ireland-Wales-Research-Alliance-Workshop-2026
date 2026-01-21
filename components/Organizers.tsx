
import React from 'react';
import Section from './Section';

const committee = [
  {
    name: "Prof. Zengbo Wang",
    role: "Principal Investigator & Workshop Lead",
    institution: "Bangor University",
    specialty: "Laser Processing & Nanophotonics",
    email: "z.wang@bangor.ac.uk"
  },
  {
    name: "Dr. Liyang Yue",
    role: "Co-Organizer",
    institution: "Bangor University",
    specialty: "Optical Engineering & Microspectroscopy",
    email: "l.yue@bangor.ac.uk"
  }
];

const Organizers: React.FC = () => {
  return (
    <Section className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 text-white uppercase tracking-widest">Committee</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Bangor University Research Team
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {committee.map((member, index) => (
          <div key={index} className="p-8 rounded-[2.5rem] bg-slate-900/50 border border-white/5 hover:border-emerald-500/30 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-500 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-black text-white mb-1">{member.name}</h3>
              <p className="text-emerald-400 text-sm font-bold uppercase tracking-wider mb-4">{member.role}</p>
              
              <div className="space-y-2 text-slate-400 text-sm">
                <p className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 mr-2"></span>
                  {member.institution}
                </p>
                <p className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 mr-2"></span>
                  {member.specialty}
                </p>
                <a href={`mailto:${member.email}`} className="mt-4 inline-block text-slate-300 hover:text-white transition-colors underline decoration-emerald-500/30 underline-offset-4">
                  {member.email}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Organizers;
