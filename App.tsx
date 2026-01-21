
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

type Page = 'home' | 'submit' | 'admin';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isPresentingPreference, setIsPresentingPreference] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigate = (page: Page, isPresenting: boolean = false) => {
    setIsPresentingPreference(isPresenting);
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-emerald-500/30">
      <Navbar currentPage={currentPage === 'admin' ? 'submit' : currentPage} onNavigate={(p) => handleNavigate(p as Page)} />
      
      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <Hero onCtaClick={(presenting) => handleNavigate('submit', presenting)} />
            
            <div className="relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-24 bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent"></div>
              
              <About />
              <Keynote />
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
                <div className="p-8 md:p-12 card-glass rounded-[2.5rem] border border-white/5 overflow-hidden relative">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]"></div>
                   <div className="relative z-10 grid md:grid-cols-3 gap-12">
                      <div className="md:col-span-2">
                        <h2 className="text-3xl font-bold mb-6 text-white">Workshop Format</h2>
                        <ul className="space-y-4">
                           {[
                             "Keynote presentation from Prof. Silvia Giordani (DCU)",
                             "Invited talks from the Ireland–Wales collaboration teams",
                             "Contributed oral and poster sessions",
                             "Networking and discussion on future joint funding opportunities",
                             "Informal exchange to shape the June Dublin workshop"
                           ].map((item, i) => (
                             <li key={i} className="flex items-start">
                               <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mr-4 mt-0.5 text-[10px] font-bold">
                                 {i + 1}
                               </span>
                               <span className="text-slate-300">{item}</span>
                             </li>
                           ))}
                        </ul>
                      </div>
                      <div className="flex flex-col justify-center space-y-4 p-6 bg-white/5 rounded-3xl border border-white/10">
                         <div className="text-center">
                            <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">Workshop Attendance</p>
                            <p className="text-2xl font-bold text-white">Free of Charge</p>
                            <p className="text-slate-500 text-[10px] mt-1 italic">Advance registration required</p>
                         </div>
                         <button 
                            onClick={() => handleNavigate('submit', false)}
                            className="w-full py-3 bg-emerald-500 text-slate-950 rounded-xl font-bold hover:bg-emerald-400 transition-colors"
                          >
                           Register to Attend
                         </button>
                         <p className="text-center text-[10px] text-slate-500">
                           Wish to present? <button onClick={() => handleNavigate('submit', true)} className="text-emerald-500 hover:underline">Submit Abstract</button>
                         </p>
                      </div>
                   </div>
                </div>
              </div>

              <Scope />
              <Venue />
            </div>
          </>
        )}

        {currentPage === 'submit' && (
          <div className="pt-24">
            <SubmitForm 
              initialIsPresenting={isPresentingPreference} 
              onBackHome={() => handleNavigate('home')} 
            />
          </div>
        )}

        {currentPage === 'admin' && (
          <div className="pt-24">
            <AdminDashboard onBackHome={() => handleNavigate('home')} />
          </div>
        )}
      </main>

      <Footer onAdminClick={() => handleNavigate('admin')} />
    </div>
  );
};

export default App;
