
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Keynote from './components/Keynote';
import Scope from './components/Scope';
import Venue from './components/Venue';
import Footer from './components/Footer';
import SubmitForm from './components/SubmitForm';
import AdminDashboard from './components/AdminDashboard';
import Program from './components/Program';
import { isConfigured, refreshSupabaseClient, supabase, isSecretKey } from './lib/supabase';

type Page = 'home' | 'submit' | 'admin' | 'program';

const SetupWizard = ({ onConnected }: { onConnected: () => void }) => {
  const [sessionKey, setSessionKey] = useState('');
  const [status, setStatus] = useState<'idle' | 'testing' | 'error' | 'forbidden' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleTestConnection = async () => {
    const trimmedKey = sessionKey.trim();
    if (!trimmedKey) return;
    
    if (isSecretKey(trimmedKey)) {
      setStatus('forbidden');
      return;
    }

    setStatus('testing');
    setErrorMessage('');

    try {
      const refreshed = refreshSupabaseClient(trimmedKey, true);
      if (!refreshed) {
        throw new Error("Invalid format. Please use the public key (starts with sb_publishable_).");
      }

      const { error } = await supabase.from('submissions').select('id').limit(1);
      
      if (error) {
        if (error.code === 'PGRST301' || error.message.toLowerCase().includes('jwt') || error.message.toLowerCase().includes('forbidden')) {
          throw new Error("Access Denied. This key is not authorized for the research alliance project.");
        }
        if (error.code === '42P01') {
          setStatus('success');
          setTimeout(onConnected, 1000);
          return;
        }
        throw error;
      }

      setStatus('success');
      setTimeout(onConnected, 1000);
    } catch (err: any) {
      if (err.message === 'FORBIDDEN_SECRET_KEY') {
        setStatus('forbidden');
      } else {
        setStatus('error');
        setErrorMessage(err.message || "Connection failed. Please check your key.");
        sessionStorage.removeItem('SUPABASE_SESSION_KEY');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 selection:bg-emerald-500/30">
      <div className="max-w-2xl w-full card-glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/20 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-10">
            <div className={`w-20 h-20 rounded-[2.2rem] flex items-center justify-center mx-auto mb-8 transition-all duration-500 shadow-2xl ${
              status === 'forbidden' ? 'bg-red-500/20 text-red-500 shadow-red-500/10' : 
              status === 'success' ? 'bg-emerald-500/20 text-emerald-500 shadow-emerald-500/10' :
              'bg-emerald-500/10 text-emerald-500 shadow-emerald-500/5'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            
            <h1 className="text-4xl font-black text-white mb-4 tracking-tight">Database Login</h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              {status === 'forbidden' 
                ? "Restricted: Please use your project's 'Publishable' key." 
                : "Paste your Supabase Publishable Key to access the workshop platform."}
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 group-focus-within:text-emerald-500 transition-colors">
                Supabase Publishable Key (New Format)
              </label>
              <input 
                type="text"
                value={sessionKey}
                onChange={(e) => {
                  setSessionKey(e.target.value);
                  if (status !== 'idle') setStatus('idle');
                }}
                placeholder="sb_publishable_..."
                className={`w-full bg-slate-900 border ${status === 'error' || status === 'forbidden' ? 'border-red-500/50' : 'border-white/10'} rounded-2xl p-5 text-white focus:border-emerald-500 outline-none transition-all shadow-inner font-mono text-sm`}
                autoFocus
              />
              
              {errorMessage && (
                <p className="mt-3 text-red-400 text-xs font-medium bg-red-500/5 p-3 rounded-lg border border-red-500/10">
                  {errorMessage}
                </p>
              )}

              {status === 'forbidden' && (
                <div className="mt-6 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-200 text-sm">
                  <p className="font-bold mb-2 uppercase tracking-widest text-[10px]">Important Security Note:</p>
                  <p className="opacity-80">The <code>sb_secret</code> key provides full database control and cannot be used in browsers. Please use the <b>Publishable</b> key from your Supabase Dashboard.</p>
                </div>
              )}
            </div>

            <button 
              onClick={handleTestConnection}
              disabled={!sessionKey || status === 'testing' || status === 'success'}
              className={`w-full py-5 rounded-2xl font-black text-lg transition-all active:scale-95 disabled:opacity-50 ${
                status === 'forbidden' ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
              }`}
            >
              {status === 'testing' ? 'AUTHORIZING...' : status === 'success' ? 'CONNECTED' : 'VERIFY & ENTER'}
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between text-[10px] font-black tracking-widest uppercase">
            <div>
              <p className="text-slate-600 mb-1">Workshop Instance</p>
              <p className="text-slate-400 font-mono text-xs lowercase">raeturpbgqmamdtsnuph</p>
            </div>
            <a 
              href="https://supabase.com/dashboard/project/raeturpbgqmamdtsnuph/settings/api" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-500 hover:text-emerald-400 transition-colors"
            >
              Get Publishable Key →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isPresentingPreference, setIsPresentingPreference] = useState(false);
  const [isReady, setIsReady] = useState(isConfigured());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (!isReady) {
    return <SetupWizard onConnected={() => setIsReady(true)} />;
  }

  const handleNavigate = (page: Page, isPresenting: boolean = false) => {
    setIsPresentingPreference(isPresenting);
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-emerald-500/30 text-slate-200">
      <Navbar 
        currentPage={currentPage} 
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
                <div className="p-8 md:p-12 card-glass rounded-[3rem] border border-white/5 overflow-hidden relative flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-4">Workshop Materials</h2>
                      <p className="text-slate-400 max-w-md">Access the workshop paper, submission templates, and the technical brochure for the 2026 alliance event.</p>
                    </div>
                    <button 
                      onClick={() => handleNavigate('program')}
                      className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black transition-all flex items-center group mx-auto md:mx-0"
                    >
                      <span>BROWSE PAPERS</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                </div>
              </div>
              <Scope />
              <Venue />
            </div>
          </div>
        )}

        {currentPage === 'program' && (
          <div className="pt-24 animate-in slide-in-from-right-4 duration-500">
            <Program />
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
