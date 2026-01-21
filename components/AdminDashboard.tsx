
import React, { useState, useEffect } from 'react';
import { supabase, isConfigured } from '../lib/supabase';

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
  const [view, setView] = useState<'records' | 'setup'>('records');
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

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
    try {
      const { data, error: fetchError } = await supabase
        .from('submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setSubmissions(data || []);
    } catch (err: any) {
      console.error("Dashboard Fetch Exception:", err);
      setError(err.message || "Failed to query database. Table 'submissions' may be missing.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this submission? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(id);
    try {
      const { error: deleteError } = await supabase
        .from('submissions')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      // Update local state to remove the deleted record
      setSubmissions(prev => prev.filter(s => s.id !== id));
    } catch (err: any) {
      console.error("Deletion Error:", err);
      alert("Failed to delete record: " + err.message + "\n\nTip: Ensure you have added the 'DELETE' policy in your Supabase SQL editor (see Tech Guide tab).");
    } finally {
      setIsDeleting(null);
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
    const csvContent = [headers.join(","), ...rows.map(r => r.map(c => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `submissions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredSubmissions = submissions.filter(s => {
    const search = searchTerm.toLowerCase();
    const fullName = `${s.first_name} ${s.last_name}`.toLowerCase();
    const matchesSearch = 
      fullName.includes(search) ||
      s.institution.toLowerCase().includes(search) ||
      s.email.toLowerCase().includes(search);
    const matchesFilter = filter === 'all' || (filter === 'presenting' && s.is_presenting) || (filter === 'attending' && !s.is_presenting);
    return matchesSearch && matchesFilter;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-900 border border-white/10 p-10 rounded-[2.5rem] shadow-2xl text-center">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Staff Access Only</h2>
          <p className="text-slate-500 text-sm mb-8">Password: admin2026</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Passcode" className={`w-full bg-slate-950 border ${loginError ? 'border-red-500/50' : 'border-white/10'} rounded-xl p-4 text-center text-white focus:border-emerald-500 outline-none transition-all`} autoFocus />
            <button type="submit" className="w-full py-4 bg-emerald-500 text-slate-950 rounded-xl font-black hover:bg-emerald-400 transition-all">UNLOCK DASHBOARD</button>
          </form>
          <button onClick={onBackHome} className="mt-6 text-slate-600 text-xs font-bold hover:text-slate-400 uppercase tracking-widest transition-colors">Return to Public Site</button>
        </div>
        
        <div className="mt-8 flex items-center space-x-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
            <div className={`w-2 h-2 rounded-full ${isConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Connection: <span className={isConfigured ? 'text-emerald-400' : 'text-red-400'}>{isConfigured ? 'ACTIVE' : 'KEY REQUIRED'}</span>
            </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Organizer Dashboard</h1>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 w-fit">
            <button onClick={() => setView('records')} className={`px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest transition-all ${view === 'records' ? 'bg-emerald-500 text-slate-950' : 'text-slate-500 hover:text-white'}`}>SUBMISSIONS</button>
            <button onClick={() => setView('setup')} className={`px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest transition-all ${view === 'setup' ? 'bg-emerald-500 text-slate-950' : 'text-slate-500 hover:text-white'}`}>TECH GUIDE</button>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchSubmissions} className="px-5 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-black hover:bg-white/10 transition-colors flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>REFRESH</button>
          <button onClick={downloadCSV} disabled={submissions.length === 0} className="px-5 py-3 bg-emerald-500 text-slate-950 rounded-xl font-black hover:bg-emerald-400 transition-all flex items-center disabled:opacity-50">EXPORT LIST</button>
          <button onClick={onBackHome} className="px-5 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-black hover:bg-white/10">LOGOUT</button>
        </div>
      </div>

      {view === 'records' ? (
        <div className="animate-in fade-in duration-500">
          {error && (
             <div className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm">
                <p className="font-bold mb-1 uppercase tracking-widest text-xs">Error Loading Records</p>
                <p>{error}</p>
                <p className="mt-2 text-red-300/60">Check the Tech Guide tab to ensure your database is set up correctly.</p>
             </div>
          )}
          
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="md:col-span-2 relative group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" placeholder="Search entries..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 pl-12 text-white outline-none focus:border-emerald-500 transition-all" />
            </div>
            <div className="flex bg-slate-900 p-1 rounded-2xl border border-white/10">
              {['all', 'presenting', 'attending'].map((f) => (
                <button key={f} onClick={() => setFilter(f as any)} className={`flex-1 px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${filter === f ? 'bg-emerald-500 text-slate-950' : 'text-slate-500 hover:text-white'}`}>{f.toUpperCase()}</button>
              ))}
            </div>
            <div className="flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 p-4"><div className="text-center"><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total</p><p className="text-xl font-black text-white">{submissions.length}</p></div></div>
          </div>

          <div className="bg-slate-900/50 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
            {loading ? (
              <div className="py-32 flex flex-col items-center justify-center"><div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4"></div><p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Connecting...</p></div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="py-32 text-center text-slate-500">No records found. Check the "Tech Guide" if the table is missing.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead><tr className="border-b border-white/5 bg-white/5"><th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Participant</th><th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Institution</th><th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Role</th><th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Submission</th><th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Date</th><th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Actions</th></tr></thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredSubmissions.map((s) => (
                      <tr key={s.id} className="hover:bg-white/[0.02] transition-colors"><td className="px-8 py-6"><p className="text-white font-bold">{s.first_name} {s.last_name}</p><p className="text-slate-500 text-xs">{s.email}</p></td><td className="px-8 py-6 text-slate-300 text-sm">{s.institution}</td><td className="px-8 py-6">{s.is_presenting ? <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black rounded-lg border border-emerald-500/20 uppercase tracking-wider">AUTHOR</span> : <span className="px-3 py-1 bg-slate-800 text-slate-500 text-[10px] font-black rounded-lg uppercase tracking-wider">GUEST</span>}</td><td className="px-8 py-6 max-w-sm">{s.is_presenting ? <details className="cursor-pointer group/details"><summary className="text-sm text-emerald-400 font-bold list-none hover:text-emerald-300 transition-colors">READ ABSTRACT</summary><div className="mt-4 p-5 bg-slate-950 rounded-2xl border border-white/10 text-xs text-slate-400 leading-relaxed shadow-xl"><p className="text-white font-black text-sm mb-3 border-b border-white/5 pb-2">{s.title}</p><p className="whitespace-pre-wrap">{s.abstract}</p></div></details> : <span className="text-slate-700 italic text-xs">N/A</span>}</td><td className="px-8 py-6 text-right text-slate-600 text-[10px] font-black uppercase">{new Date(s.created_at).toLocaleDateString('en-GB')}</td><td className="px-8 py-6 text-center"><button onClick={() => handleDelete(s.id)} disabled={isDeleting === s.id} className={`p-2 rounded-lg transition-all ${isDeleting === s.id ? 'text-slate-700' : 'text-slate-500 hover:text-red-400 hover:bg-red-500/10'}`} title="Delete Submission">{isDeleting === s.id ? <svg className="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>}</button></td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="animate-in slide-in-from-right-4 duration-500 space-y-8">
          <div className="p-8 bg-slate-900 border border-white/10 rounded-[2.5rem]">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center mr-3 text-sm">1</span>
              Fixing "Invalid API Key" Errors
            </h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              If the form shows an "Invalid API key" error, the <code>SUPABASE_ANON_KEY</code> in <code>index.html</code> is likely not the real public key for your project.
              <br/><br/>
              To find the correct key:
              <ol className="list-decimal list-inside mt-4 space-y-3 bg-white/5 p-6 rounded-2xl border border-white/5">
                <li>Go to your <b>Supabase Dashboard</b></li>
                <li>Select your project (raeturpbgqmamdtsnuph)</li>
                <li>Click <b>Settings</b> (bottom-left gear icon)</li>
                <li>Click <b>API</b> in the sidebar</li>
                <li>Find <b>Project API keys</b> and copy the <b>anon (public)</b> key</li>
                <li>The key should be very long and start with <code>eyJ...</code></li>
              </ol>
            </p>
            
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center mr-3 text-sm">2</span>
              Database Schema & Policies
            </h3>
            <p className="text-slate-400 mb-6">
              Ensure you have executed this SQL in your <b>Supabase SQL Editor</b> to enable data storage and deletion:
            </p>
            
            <div className="bg-slate-950 p-6 rounded-2xl border border-white/5 font-mono text-xs text-emerald-400 overflow-x-auto relative group">
              <button onClick={() => {
                navigator.clipboard.writeText(`CREATE TABLE submissions (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  institution TEXT NOT NULL,
  is_presenting BOOLEAN DEFAULT FALSE,
  presentation_type TEXT,
  title TEXT,
  abstract TEXT
);

-- Enable RLS and allow public access
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert" ON submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select" ON submissions FOR SELECT USING (true);
CREATE POLICY "Allow public delete" ON submissions FOR DELETE USING (true);`);
              }} className="absolute top-4 right-4 bg-emerald-500 text-slate-950 px-3 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">COPY SQL</button>
              <pre>{`CREATE TABLE submissions (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  institution TEXT NOT NULL,
  is_presenting BOOLEAN DEFAULT FALSE,
  presentation_type TEXT,
  title TEXT,
  abstract TEXT
);

-- Enable RLS and allow public access
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert" ON submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select" ON submissions FOR SELECT USING (true);
CREATE POLICY "Allow public delete" ON submissions FOR DELETE USING (true);`}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
