
import React from 'react';

interface FooterProps {
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg mr-3 shadow-lg shadow-emerald-500/20"></div>
              <span className="font-bold text-lg text-white">Workshop 2026</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              Collaborative workshop fostering Ireland–Wales research links in nanomedicine and translational photonics.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-[10px] tracking-[0.2em] opacity-60">Organizers</h4>
            <div className="space-y-6">
              <div className="text-slate-400">
                <p className="font-bold text-slate-100 text-base">Prof. Zengbo Wang</p>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Principal Investigator & Workshop Lead</p>
              </div>
              <div className="text-slate-400">
                <p className="font-bold text-slate-100 text-base">Dr. Liyang Yue</p>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Co-Organizer</p>
              </div>
              <p className="text-xs text-slate-600 font-medium pt-2 italic">Bangor University, UK</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-[10px] tracking-[0.2em] opacity-60">Partner</h4>
            <div className="text-slate-400">
              <p className="font-bold text-slate-100 text-base">Dublin City University</p>
              <p className="text-xs text-slate-600 font-medium mt-1 italic">Dublin, Ireland</p>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-700 text-[10px] font-bold uppercase tracking-widest">
            © 2026 Ireland–Wales Research Alliance
          </p>
          <div className="flex space-x-8 text-[10px] text-slate-500 uppercase tracking-widest font-black">
            <button onClick={onAdminClick} className="hover:text-emerald-400 transition-colors uppercase">Dashboard</button>
            <a href="mailto:z.wang@bangor.ac.uk" className="hover:text-emerald-400 transition-colors">Contact</a>
            <a href="https://www.bangor.ac.uk/" target="_blank" rel="noopener" className="hover:text-emerald-400 transition-colors">Bangor University</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
