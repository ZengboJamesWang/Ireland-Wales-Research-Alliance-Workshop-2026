
import React from 'react';

interface NavbarProps {
  currentPage: 'home' | 'submit';
  onNavigate: (page: 'home' | 'submit') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg mr-3 shadow-lg group-hover:scale-110 transition-transform"></div>
            <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Ireland–Wales Research Alliance
            </span>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <button 
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors hover:text-emerald-400 ${currentPage === 'home' ? 'text-emerald-400' : 'text-slate-300'}`}
            >
              Workshop Info
            </button>
            <button 
              onClick={() => onNavigate('submit')}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-md ${
                currentPage === 'submit' 
                ? 'bg-emerald-500 text-slate-950' 
                : 'bg-white/5 text-slate-200 hover:bg-white/10 border border-white/10'
              }`}
            >
              Register & Submit
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
