
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
  const [error, setError] = useState<{message: string, isApiError: boolean} | null>(null);

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

    try {
      const { error: supabaseError } = await supabase
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

      if (supabaseError) throw supabaseError;

      setIsSubmitting(false);
      setSubmitted(true);
    } catch (err: any) {
      console.error("Submission Error:", err);
      setIsSubmitting(false);
      
      const isApiError = err.message?.toLowerCase().includes('api key') || err.message?.toLowerCase().includes('jwt');
      setError({
        message: err.message || "Could not save to database. Ensure your Supabase keys are correct.",
        isApiError
      });
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
          Thank you, {formData.firstName}. Your information has been securely recorded.
        </p>
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
        <p className="text-slate-400 text-lg">Enter your details to register for the workshop.</p>

        <div className="mt-8 bg-slate-900/50 border border-white/5 p-6 rounded-3xl flex items-center justify-between group max-w-2xl shadow-xl">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${formData.isPresenting ? 'bg-emerald-500 text-slate-950 scale-110' : 'bg-white/5 text-slate-500'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-lg">Submitting an abstract?</p>
              <p className="text-slate-500 text-sm">Present your research to the alliance.</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" name="isPresenting" checked={formData.isPresenting} onChange={handleChange} className="sr-only peer"/>
            <div className="w-16 h-8 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-6">
          <div className="group">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 group-focus-within:text-emerald-500 transition-colors">First Name</label>
            <input required name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-all shadow-inner" />
          </div>
          <div className="group">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 group-focus-within:text-emerald-500 transition-colors">Last Name</label>
            <input required name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-all shadow-inner" />
          </div>
          <div className="group">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 group-focus-within:text-emerald-500 transition-colors">Email Address</label>
            <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-all shadow-inner" />
          </div>
          <div className="group">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 group-focus-within:text-emerald-500 transition-colors">Institution</label>
            <input required name="institution" value={formData.institution} onChange={handleChange} className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-all shadow-inner" />
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          {formData.isPresenting && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
              <div className="group">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 group-focus-within:text-emerald-500 transition-colors">Paper Title</label>
                <input required name="title" value={formData.title} onChange={handleChange} className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-all shadow-inner" />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 group-focus-within:text-emerald-500 transition-colors">Abstract Text</label>
                <textarea required name="abstract" value={formData.abstract} onChange={handleChange} className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none h-64 resize-none shadow-inner" />
              </div>
            </div>
          )}

          {error && (
            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm mb-4 animate-in shake duration-300">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="font-bold mb-1 uppercase tracking-wider text-xs">Submission Failed</p>
                  <p>{error.message}</p>
                  {error.isApiError && (
                    <div className="mt-4 pt-4 border-t border-red-500/20">
                        <p className="text-xs text-red-300">
                            <strong>Note:</strong> This usually means the <code>SUPABASE_ANON_KEY</code> in <code>index.html</code> is incorrect. 
                            Check the <strong>Tech Guide</strong> in the dashboard for setup help.
                        </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl font-black text-lg transition-all shadow-xl active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? 'SAVING...' : (formData.isPresenting ? 'SUBMIT ABSTRACT' : 'REGISTER')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitForm;
