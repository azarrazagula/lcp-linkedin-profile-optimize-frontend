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
    <div className="backdrop-blur-xl bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/80 border border-indigo-200/80 rounded-3xl p-6 shadow-xl space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-indigo-100 pb-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
            </svg>
            Gemini AI Optimized Profile
          </h2>
          <p className="text-xs text-slate-600 font-medium mt-0.5">Copy & paste these optimized inputs directly into LinkedIn</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Ready to Copy
        </span>
      </div>

      <div className="space-y-4">
        {/* 1. Optimized Headline */}
        {result.headline && (
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                <span>📌</span> Headline
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(result.headline, 'headline')}
                className="px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-3xs"
              >
                {copiedKey === 'headline' ? '✓ Copied!' : 'Copy Headline'}
              </button>
            </div>
            <p className="text-sm font-semibold text-slate-800 leading-snug bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              {result.headline}
            </p>
          </div>
        )}

        {/* 2. Optimized About Section */}
        {result.about && (
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                <span>📝</span> About / Summary
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(result.about, 'about')}
                className="px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-3xs"
              >
                {copiedKey === 'about' ? '✓ Copied!' : 'Copy About'}
              </button>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed whitespace-pre-line bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              {result.about}
            </p>
          </div>
        )}

        {/* 3. Recommended Skills */}
        {skillsList.length > 0 && (
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                <span>💡</span> Recommended Skills
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(skillsList.join(', '), 'all-skills')}
                className="px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-3xs"
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
                  className="group px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-3xs"
                >
                  <span>{skill}</span>
                  <span className="text-[10px] text-blue-400 group-hover:text-blue-600">
                    {copiedKey === `skill-${idx}` ? '✓' : '📋'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 4. Optimized Experiences */}
        {Array.isArray(result.experiences) && result.experiences.length > 0 && (
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
              <span>💼</span> Optimized Experience Descriptions
            </span>
            {result.experiences.map((exp, idx) => (
              <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">
                    {exp.jobTitle || `Experience ${idx + 1}`} {exp.company ? `at ${exp.company}` : ''}
                  </span>
                  {exp.description && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(exp.description, `exp-${idx}`)}
                      className="px-2.5 py-0.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-bold border border-blue-200 transition-all cursor-pointer"
                    >
                      {copiedKey === `exp-${idx}` ? '✓ Copied!' : 'Copy'}
                    </button>
                  )}
                </div>
                {exp.description && (
                  <p className="text-xs text-slate-700 font-medium whitespace-pre-line leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 5. Optimized Projects */}
        {Array.isArray(result.projects) && result.projects.length > 0 && (
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
              <span>🚀</span> Optimized Project Descriptions
            </span>
            {result.projects.map((proj, idx) => (
              <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">
                    {proj.name || `Project ${idx + 1}`}
                  </span>
                  {proj.description && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(proj.description, `proj-${idx}`)}
                      className="px-2.5 py-0.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-bold border border-blue-200 transition-all cursor-pointer"
                    >
                      {copiedKey === `proj-${idx}` ? '✓ Copied!' : 'Copy'}
                    </button>
                  )}
                </div>
                {proj.description && (
                  <p className="text-xs text-slate-700 font-medium whitespace-pre-line leading-relaxed">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
