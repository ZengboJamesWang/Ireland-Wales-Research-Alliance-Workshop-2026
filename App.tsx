
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Keynote from './components/Keynote';
import Scope from './components/Scope';
import Venue from './components/Venue';
import Organizers from './components/Organizers';
import Footer from './components/Footer';
import SubmitForm from './components/SubmitForm';
import AdminDashboard from './components/AdminDashboard';
import { isConfigured } from './lib/supabase';

type Page = 'home' | 'submit' | 'admin';

const SetupWizard = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 selection:bg-emerald-500/30">
    <div className="max-w-2xl w-full card-glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/20 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]"></div>
      <div className="relative z-10">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-8 text-emerald-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 className="text-4xl font-black text-white mb-4 tracking-tight">Connect Database</h1>
        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
          The application is live but the <b>Supabase Anon Key</b> is missing. Please add it to see the workshop content.
        </p>
        
        <div className="space-y-4">
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all group">
            <p className="text-white font-bold mb-1 flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
              Option A: Vercel Dashboard
            </p>
            <p className="text-slate-500 text-sm">
              Add <code>SUPABASE_ANON_KEY</code> to <b>Settings &gt; Environment Variables</b> in Vercel, then redeploy.
            </p>
          </div>
          
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
            <p className="text-white font-bold mb-1 flex items-center">
              <span className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></span>
              Option B: Hardcode in HTML
            </p>
            <p className="text-slate-500 text-sm">
              Paste your key directly into <code>index.html</code> inside the <code>SUPABASE_ANON_KEY</code> field.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-[10px] uppercase font-black tracking-widest">Project Reference</p>
            <p className="text-slate-400 font-mono text-xs">raeturpbgqmamdtsnuph</p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            Check Connection
          </button>
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isPresentingPreference, setIsPresentingPreference] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // If Supabase is not configured, show the setup instructions
  if (!isConfigured) {
    return <SetupWizard />;
  }

  const handleNavigate = (page: Page, isPresenting: boolean = false) => {
    setIsPresentingPreference(isPresenting);
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-emerald-500/30 text-slate-200">
      <Navbar 
        currentPage={currentPage === 'admin' ? 'submit' : currentPage} 
        onNavigate={(p) => handleNavigate(p as Page)} 
      />
      
      <main className="flex-grow">
        {currentPage === 'home' && (
          <div className="animate-in fade-in duration-1000">
            <Hero onCtaClick={(presenting) => handleNavigate('submit', presenting)} />
            <div className="relative">
              <About />
              <Keynote />
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
                <div className="p-8 md:p-12 card-glass rounded-[2.5rem] border border-white/5 overflow-hidden relative text-center md:text-left">
                   <div className="relative z-10 grid md:grid-cols-3 gap-12">
                      <div className="md:col-span-2">
                        <h2 className="text-3xl font-bold mb-6 text-white">Workshop Format</h2>
                        <ul className="space-y-4 text-slate-300">
                          <li>• Keynote presentation from Prof. Silvia Giordani (DCU)</li>
                          <li>• Invited talks from the Ireland–Wales collaboration teams</li>
                          <li>• Contributed oral and poster sessions</li>
                          <li>• Networking and discussion on funding opportunities</li>
                        </ul>
                      </div>
                      <div className="flex flex-col justify-center space-y-4 p-6 bg-white/5 rounded-3xl border border-white/10">
                         <div className="text-center">
                            <p className="text-2xl font-bold text-white">Free Attendance</p>
                            <p className="text-slate-500 text-xs mt-1">Advance registration required</p>
                         </div>
                         <button 
                            onClick={() => handleNavigate('submit', false)} 
                            className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold transition-all"
                         >
                            Register Now
                         </button>
                      </div>
                   </div>
                </div>
              </div>

              <Scope />
              <Organizers />
              <Venue />
            </div>
          </div>
        )}

        {currentPage === 'submit' && (
          <div className="pt-24 animate-in slide-in-from-bottom-4 duration-500">
            <SubmitForm 
              initialIsPresenting={isPresentingPreference} 
              onBackHome={() => handleNavigate('home')} 
            />
          </div>
        )}

        {currentPage === 'admin' && (
          <div className="pt-24 animate-in fade-in duration-500">
            <AdminDashboard onBackHome={() => handleNavigate('home')} />
          </div>
        )}
      </main>

      <Footer onAdminClick={() => handleNavigate('admin')} />
    </div>
  );
};

export default App;
