import React, { useState } from 'react';

export default function GenerateAI({ result }) {
  const [copiedKey, setCopiedKey] = useState('');

  if (!result) return null;

  const copyToClipboard = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  const skillsList = Array.isArray(result.skills)
    ? result.skills
    : typeof result.skills === 'string'
    ? result.skills.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="backdrop-blur-xl bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-6 shadow-2xl space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
            </svg>
            Gemini AI Optimized Profile
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Copy & paste these optimized inputs directly into LinkedIn</p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold border border-emerald-500/20 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Ready to Copy
        </span>
      </div>

      <div className="space-y-4">
        {/* 1. Optimized Headline */}
        {result.headline && (
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <span>📌</span> Headline
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(result.headline, 'headline')}
                className="px-3 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold border border-blue-500/30 transition-all flex items-center gap-1.5"
              >
                {copiedKey === 'headline' ? '✓ Copied!' : 'Copy Headline'}
              </button>
            </div>
            <p className="text-sm font-medium text-white leading-snug bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
              {result.headline}
            </p>
          </div>
        )}

        {/* 2. Optimized About Section */}
        {result.about && (
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <span>📝</span> About / Summary
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(result.about, 'about')}
                className="px-3 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold border border-blue-500/30 transition-all flex items-center gap-1.5"
              >
                {copiedKey === 'about' ? '✓ Copied!' : 'Copy About'}
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
              {result.about}
            </p>
          </div>
        )}

        {/* 3. Recommended Skills */}
        {skillsList.length > 0 && (
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <span>💡</span> Recommended Skills
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(skillsList.join(', '), 'all-skills')}
                className="px-3 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold border border-blue-500/30 transition-all flex items-center gap-1.5"
              >
                {copiedKey === 'all-skills' ? '✓ Copied All!' : 'Copy All Skills'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillsList.map((skill, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => copyToClipboard(skill, `skill-${idx}`)}
                  title="Click to copy single skill"
                  className="group px-3 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{skill}</span>
                  <span className="text-[10px] text-indigo-400/70 group-hover:text-indigo-200">
                    {copiedKey === `skill-${idx}` ? '✓' : '📋'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 4. Optimized Experiences */}
        {Array.isArray(result.experiences) && result.experiences.length > 0 && (
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <span>💼</span> Optimized Experience Descriptions
            </span>
            {result.experiences.map((exp, idx) => (
              <div key={idx} className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-300">
                    {exp.jobTitle || `Experience ${idx + 1}`} {exp.company ? `at ${exp.company}` : ''}
                  </span>
                  {exp.description && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(exp.description, `exp-${idx}`)}
                      className="px-2.5 py-0.5 rounded-md bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-[11px] font-semibold border border-blue-500/30 transition-all"
                    >
                      {copiedKey === `exp-${idx}` ? '✓ Copied!' : 'Copy'}
                    </button>
                  )}
                </div>
                {exp.description && (
                  <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 5. Optimized Projects */}
        {Array.isArray(result.projects) && result.projects.length > 0 && (
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <span>🚀</span> Optimized Project Descriptions
            </span>
            {result.projects.map((proj, idx) => (
              <div key={idx} className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-300">
                    {proj.name || `Project ${idx + 1}`}
                  </span>
                  {proj.description && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(proj.description, `proj-${idx}`)}
                      className="px-2.5 py-0.5 rounded-md bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-[11px] font-semibold border border-blue-500/30 transition-all"
                    >
                      {copiedKey === `proj-${idx}` ? '✓ Copied!' : 'Copy'}
                    </button>
                  )}
                </div>
                {proj.description && (
                  <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
