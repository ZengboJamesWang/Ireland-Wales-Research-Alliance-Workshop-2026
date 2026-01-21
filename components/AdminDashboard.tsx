
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface SubmissionRecord {
  id: number;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  institution: string;
  is_presenting: boolean;
  presentation_type: string | null;
  title: string | null;
  abstract: string | null;
}

interface AdminDashboardProps {
  onBackHome: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackHome }) => {
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'presenting' | 'attending'>('all');
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const ADMIN_PASSWORD = 'admin2026';

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
      setPassword('');
    }
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    setError(null);
    console.log("Fetching submissions from Supabase...");

    try {
      const { data, error: fetchError } = await supabase
        .from('submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error("Supabase Select Error:", fetchError);
        throw fetchError;
      }

      console.log(`Successfully fetched ${data?.length || 0} records:`, data);
      
      if (data && data.length === 0) {
        console.warn("Table is empty or RLS is blocking the select query. Run the 'Allow public select' policy in Supabase.");
      }
      
      setSubmissions(data || []);
    } catch (err: any) {
      console.error("Dashboard Fetch Exception:", err);
      setError(err.message || "Failed to query database. Ensure the 'submissions' table exists and RLS policy allows selection.");
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    if (submissions.length === 0) return;
    
    const headers = ["ID", "Date", "First Name", "Last Name", "Email", "Institution", "Type", "Title", "Abstract"];
    const rows = submissions.map(s => [
      s.id,
      new Date(s.created_at).toLocaleDateString(),
      s.first_name,
      s.last_name,
      s.email,
      s.institution,
      s.is_presenting ? s.presentation_type : "Attendance Only",
      (s.title || "").replace(/"/g, '""'),
      (s.abstract || "").replace(/"/g, '""')
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `workshop_submissions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredSubmissions = submissions.filter(s => {
    const matchesSearch = 
      `${s.first_name} ${s.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'presenting' && s.is_presenting) || 
      (filter === 'attending' && !s.is_presenting);

    return matchesSearch && matchesFilter;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-900 border border-white/10 p-10 rounded-[2.5rem] shadow-2xl text-center">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Staff Access Only</h2>
          <p className="text-slate-500 text-sm mb-8">Enter the workshop organizer passcode to view registrant data.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Passcode"
              className={`w-full bg-slate-950 border ${loginError ? 'border-red-500/50' : 'border-white/10'} rounded-xl p-4 text-center text-white focus:border-emerald-500 outline-none transition-all`}
              autoFocus
            />
            {loginError && <p className="text-red-400 text-xs font-bold uppercase tracking-widest">Incorrect Access Code</p>}
            <button 
              type="submit"
              className="w-full py-4 bg-emerald-500 text-slate-950 rounded-xl font-black hover:bg-emerald-400 transition-all active:scale-95"
            >
              UNLOCK DASHBOARD
            </button>
          </form>
          
          <button onClick={onBackHome} className="mt-6 text-slate-600 text-xs font-bold hover:text-slate-400 uppercase tracking-widest transition-colors">
            Return to Public Site
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Organizer Dashboard</h1>
          <div className="flex items-center space-x-3">
             <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
             <p className="text-slate-400 text-sm">Synchronized with Supabase Cloud Node</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchSubmissions}
            className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-2xl font-black hover:bg-white/10 transition-colors active:scale-95 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            REFRESH
          </button>
          <button 
            onClick={downloadCSV}
            disabled={submissions.length === 0}
            className="px-6 py-3 bg-emerald-500 text-slate-950 rounded-2xl font-black hover:bg-emerald-400 transition-all flex items-center shadow-lg shadow-emerald-500/10 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            EXPORT LIST
          </button>
          <button 
            onClick={onBackHome}
            className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-2xl font-black hover:bg-white/10 transition-colors active:scale-95"
          >
            LOGOUT
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="md:col-span-2">
          <div className="relative group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Filter by name, institution or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 pl-12 text-white focus:border-emerald-500 outline-none transition-all"
            />
          </div>
        </div>
        <div className="flex bg-slate-900 p-1 rounded-2xl border border-white/10">
          <button 
            onClick={() => setFilter('all')}
            className={`flex-1 px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${filter === 'all' ? 'bg-emerald-500 text-slate-950' : 'text-slate-500 hover:text-white'}`}
          >
            ALL
          </button>
          <button 
            onClick={() => setFilter('presenting')}
            className={`flex-1 px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${filter === 'presenting' ? 'bg-emerald-500 text-slate-950' : 'text-slate-500 hover:text-white'}`}
          >
            AUTHORS
          </button>
          <button 
            onClick={() => setFilter('attending')}
            className={`flex-1 px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${filter === 'attending' ? 'bg-emerald-500 text-slate-950' : 'text-slate-500 hover:text-white'}`}
          >
            GUESTS
          </button>
        </div>
        <div className="flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 p-4">
           <div className="text-center">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Entries</p>
             <p className="text-xl font-black text-white">{submissions.length}</p>
           </div>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Accessing Supabase Table...</p>
          </div>
        ) : error ? (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-white font-black mb-2 uppercase tracking-tight">Database Query Failed</p>
            <p className="text-slate-500 text-sm max-w-sm mx-auto mb-8">{error}</p>
            <button onClick={fetchSubmissions} className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-emerald-500 text-xs font-black uppercase tracking-widest transition-all">
              RETRY FETCH
            </button>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="py-32 text-center">
            <p className="text-slate-500 text-lg font-medium">No records match your search or table is empty.</p>
            <p className="text-slate-600 text-xs mt-2">If you have submitted, please ensure you enabled the 'Allow public select' RLS policy.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Participant Details</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Institution</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Role</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Submission</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredSubmissions.map((s) => (
                  <tr key={s.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <p className="text-white font-bold text-lg">{s.first_name} {s.last_name}</p>
                      <p className="text-slate-500 text-xs font-medium">{s.email}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-slate-300 text-sm">{s.institution}</span>
                    </td>
                    <td className="px-8 py-6">
                      {s.is_presenting ? (
                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black rounded-lg border border-emerald-500/20 uppercase tracking-wider">
                          {s.presentation_type?.replace(' Presentation', '') || 'Abstract'}
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-slate-800 text-slate-500 text-[10px] font-black rounded-lg border border-white/5 uppercase tracking-wider">
                          Attendee
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-6 max-w-sm">
                      {s.is_presenting ? (
                        <details className="cursor-pointer group/details">
                          <summary className="text-sm text-emerald-400 font-bold list-none flex items-center hover:text-emerald-300 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-open/details:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                            </svg>
                            READ ABSTRACT
                          </summary>
                          <div className="mt-4 p-5 bg-slate-950 rounded-2xl border border-white/10 text-xs text-slate-400 leading-relaxed shadow-xl animate-in fade-in slide-in-from-top-2">
                            <p className="text-white font-black text-sm mb-3 border-b border-white/5 pb-2">{s.title}</p>
                            <p className="whitespace-pre-wrap">{s.abstract}</p>
                          </div>
                        </details>
                      ) : (
                        <span className="text-slate-700 italic text-xs">No paper submitted</span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className="text-slate-600 text-[10px] font-black font-mono uppercase">
                        {new Date(s.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <div className="mt-12 flex flex-col md:flex-row items-center justify-between text-slate-600 text-[10px] font-black uppercase tracking-widest gap-4">
        <p>Ireland–Wales Research Alliance Admin Panel v1.2</p>
        <p>Supabase ID: raeturpbgqmamdtsnuph</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
