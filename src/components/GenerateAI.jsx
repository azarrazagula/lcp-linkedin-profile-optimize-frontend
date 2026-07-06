import React, { useState } from 'react';

export default function GenerateAI({ result }) {
  const [copiedSection, setCopiedSection] = useState('');

  if (!result) return null;

  const copyToClipboard = (text, sectionName) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(''), 2000);
  };

  return (
    <div className="backdrop-blur-xl bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-6 shadow-2xl space-y-5 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
            </svg>
            Gemini AI Optimized Profile
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Copy & paste these optimized sections directly into LinkedIn</p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
          Ready to Copy
        </span>
      </div>

      <div className="space-y-4">
        {/* Optimized Headline */}
        {result.headline && (
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Optimized Headline
              </span>
              <button
                onClick={() => copyToClipboard(result.headline, 'headline')}
                className="px-3 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold border border-blue-500/30 transition-all flex items-center gap-1.5"
              >
                {copiedSection === 'headline' ? '✓ Copied!' : 'Copy Headline'}
              </button>
            </div>
            <p className="text-sm font-medium text-white leading-snug">{result.headline}</p>
          </div>
        )}

        {/* Optimized About Section */}
        {result.about && (
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Optimized About Section
              </span>
              <button
                onClick={() => copyToClipboard(result.about, 'about')}
                className="px-3 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold border border-blue-500/30 transition-all flex items-center gap-1.5"
              >
                {copiedSection === 'about' ? '✓ Copied!' : 'Copy About'}
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{result.about}</p>
          </div>
        )}

        {/* Optimized Skills */}
        {result.skills && (
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Recommended Skills
              </span>
              <button
                onClick={() =>
                  copyToClipboard(
                    Array.isArray(result.skills) ? result.skills.join(', ') : result.skills,
                    'skills'
                  )
                }
                className="px-3 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold border border-blue-500/30 transition-all flex items-center gap-1.5"
              >
                {copiedSection === 'skills' ? '✓ Copied!' : 'Copy Skills'}
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {(Array.isArray(result.skills)
                ? result.skills
                : result.skills.split(',')
              ).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium"
                >
                  {typeof skill === 'string' ? skill.trim() : skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
