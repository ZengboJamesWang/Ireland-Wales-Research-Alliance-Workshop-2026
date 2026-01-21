
import React, { useState, useEffect } from 'react';
import { PresentationType, AbstractSubmission } from '../types';
import { supabase } from '../lib/supabase';

interface SubmitFormProps {
  initialIsPresenting?: boolean;
  onBackHome?: () => void;
}

const SubmitForm: React.FC<SubmitFormProps> = ({ initialIsPresenting = false, onBackHome }) => {
  const [formData, setFormData] = useState<AbstractSubmission>({
    firstName: '',
    lastName: '',
    email: '',
    institution: '',
    isPresenting: initialIsPresenting,
    type: PresentationType.ORAL,
    title: '',
    abstract: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData(prev => ({ ...prev, isPresenting: initialIsPresenting }));
  }, [initialIsPresenting]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    console.log("Attempting to submit to Supabase...", formData);

    try {
      const { data, error: supabaseError } = await supabase
        .from('submissions')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            institution: formData.institution,
            is_presenting: formData.isPresenting,
            presentation_type: formData.isPresenting ? formData.type : null,
            title: formData.isPresenting ? formData.title : null,
            abstract: formData.isPresenting ? formData.abstract : null,
          }
        ]);

      if (supabaseError) {
        console.error("Supabase Insert Error:", supabaseError);
        // Handle specific RLS or Table missing errors
        if (supabaseError.code === '42P01') {
          throw new Error("Table 'submissions' does not exist in your Supabase project. Please create it first.");
        }
        if (supabaseError.code === '42501') {
          throw new Error("Database permission denied (RLS). Please run the SQL policies in your Supabase dashboard.");
        }
        throw supabaseError;
      }

      console.log("Supabase Insert Success:", data);
      setIsSubmitting(false);
      setSubmitted(true);
    } catch (err: any) {
      console.error("Submission Exception:", err);
      setIsSubmitting(false);
      setError(err.message || "Failed to save to database. Check browser console (F12) for details.");
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center animate-in fade-in zoom-in duration-500 px-4">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-500 shadow-lg shadow-emerald-500/10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-4xl font-black mb-4 text-white">
          {formData.isPresenting ? "Submission Successful" : "Registration Confirmed"}
        </h2>
        <p className="text-slate-400 mb-8 text-lg">
          Thank you, {formData.firstName}. Your information has been securely logged in our Supabase database.
        </p>
        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 mb-8 text-left max-w-md mx-auto">
          <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-3">Confirmation Summary</p>
          <p className="text-white font-bold mb-1 truncate text-lg">
            {formData.isPresenting ? (formData.title || "Abstract Submission") : "Attendance Registration"}
          </p>
          <p className="text-slate-400 text-sm">
            {formData.isPresenting ? `${formData.type} • ` : ''}{formData.institution}
          </p>
        </div>
        <button 
          onClick={onBackHome}
          className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-300 font-bold hover:bg-white/10 transition-all hover:text-white"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
          {formData.isPresenting ? "Research Submission" : "Workshop Registration"}
        </h1>
        <p className="text-slate-400 text-lg">
          Integrated directly with Supabase Cloud.
        </p>

        <div className="mt-8 bg-slate-900/50 border border-white/5 p-6 rounded-3xl flex items-center justify-between group max-w-2xl">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${formData.isPresenting ? 'bg-emerald-500 text-slate-950 scale-110' : 'bg-white/5 text-slate-500'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-lg">Are you submitting an abstract?</p>
              <p className="text-slate-500 text-sm">Present an oral talk or poster.</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              name="isPresenting" 
              checked={formData.isPresenting} 
              onChange={handleChange} 
              className="sr-only peer"
            />
            <div className="w-16 h-8 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/60 ml-1">Identity & Institution</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">First Name</label>
                <input required name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" placeholder="Jane" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Last Name</label>
                <input required name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" placeholder="Doe" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Email Address</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" placeholder="jane.doe@university.ac.uk" />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Institution</label>
              <input required name="institution" value={formData.institution} onChange={handleChange} className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" placeholder="Bangor University" />
            </div>

            {formData.isPresenting && (
              <div className="animate-in fade-in duration-500">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Preference</label>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all appearance-none cursor-pointer">
                  <option value={PresentationType.ORAL}>{PresentationType.ORAL}</option>
                  <option value={PresentationType.POSTER}>{PresentationType.POSTER}</option>
                </select>
              </div>
            )}
          </div>
          
          <div className="p-6 bg-slate-900/40 border border-white/5 rounded-3xl">
             <div className="flex justify-between items-center text-sm mb-3">
                <span className="text-slate-500">Abstract Deadline</span>
                <span className="text-white font-bold">Tuesday, 17 March</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Workshop Date</span>
                <span className="text-white font-bold">Friday, 20 March</span>
             </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6 flex flex-col">
          {formData.isPresenting ? (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/60 ml-1">Scientific Content</p>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Paper Title</label>
                <input required name="title" value={formData.title} onChange={handleChange} className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" placeholder="Novel laser heating of carbon nano-onions..." />
              </div>

              <div className="relative">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Abstract Text</label>
                <textarea 
                  required
                  name="abstract" 
                  value={formData.abstract} 
                  onChange={handleChange} 
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all resize-none h-[280px]" 
                  placeholder="Summarize your research..."
                />
                <div className="absolute bottom-4 right-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                  {formData.abstract?.split(/\s+/).filter(Boolean).length || 0} / 500 words
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-500/5 border border-emerald-500/10 p-12 rounded-[3rem] flex-grow flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 mb-8 shadow-xl shadow-emerald-500/10">
                <svg xmlns="http://www.w3.org/2000/center" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-4">Registration Only</h3>
              <p className="text-slate-400 text-base max-w-[320px] leading-relaxed">
                Join us for the full workshop agenda, including lunch and networking breaks.
              </p>
            </div>
          )}

          <div className="pt-4 mt-auto">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-medium mb-4 animate-in shake">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full py-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-[2rem] font-black text-lg transition-all shadow-2xl shadow-emerald-500/30 active:scale-95 transform hover:-translate-y-1 flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  COMMITTING TO DATABASE...
                </>
              ) : (formData.isPresenting ? 'SUBMIT ABSTRACT' : 'CONFIRM REGISTRATION')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SubmitForm;
