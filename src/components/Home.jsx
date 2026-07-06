import React, { useState } from 'react';
import LinkedInForm from './LinkedInForm';
import GenerateAI from './GenerateAI';

const API_BASE_URL = 'http://localhost:5001/api';

export default function Home({ currentUser, onLogout }) {
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGenerate = async (formData) => {
    setLoading(true);
    setErrorMsg('');
    setAiResult(null);

    try {
      const token = currentUser?.token || localStorage.getItem('user_token');

      const res = await fetch(`${API_BASE_URL}/optimize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setAiResult(data);
      } else {
        setErrorMsg(data.message || 'Backend API error');
        setAiResult({
          headline: `${formData.basicInfo?.headline || 'Professional'} | AI Optimized`,
          about: formData.about || 'AI optimized profile.',
          skills: formData.skills || [],
        });
      }
    } catch (err) {
      console.error('AI Optimize call error:', err);
      setErrorMsg('Cannot reach backend. Showing preview result.');
      setAiResult({
        headline: `${formData.basicInfo?.headline || 'Developer'} | Gemini AI Optimized`,
        about: formData.about || 'AI optimized profile.',
        skills: formData.skills || [],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg bg-grid-pattern pb-16">

      {/* ── Top Navbar ───────────────────────────────────────────────────── */}
      <nav className="backdrop-blur-xl bg-slate-900/80 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H6.5v-7H9v7zM7.7 8.7c-.8 0-1.4-.6-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4 0 .8-.6 1.4-1.4 1.4zM18 17h-2.4v-3.8c0-1.1-.4-1.8-1.3-1.8-.7 0-1.2.5-1.4 1-.1.2-.1.5-.1.8V17H10.4s.1-6.3 0-7h2.4v1c.3-.5 1-1.2 2.3-1.2 1.7 0 3 1.1 3 3.5V17z" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-extrabold text-white leading-tight">
                LinkedIn Profile <span className="text-blue-400">Optimizer</span>
              </h1>
              <span className="text-[10px] text-slate-400">Powered by Gemini AI + MERN</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300 font-medium">{currentUser?.name || 'User'}</span>
            </div>
            <button
              onClick={onLogout}
              className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">

        {/* Error Banner */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
            <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* LinkedIn Profile Optimizer Form */}
        <LinkedInForm onGenerate={handleGenerate} loading={loading} />

        {/* AI Result */}
        {aiResult && <GenerateAI result={aiResult} />}
      </main>
    </div>
  );
}
