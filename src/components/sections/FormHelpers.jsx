import React from 'react';

// ── Dynamic LinkedIn URLs helper ──────────────────────────────────────────────
export function getLIUrls(linkedinUrl) {
  let user = 'me';
  if (linkedinUrl && linkedinUrl.trim()) {
    const clean = linkedinUrl.trim().replace(/\/$/, '');
    const parts = clean.split('/in/');
    if (parts[1]) {
      user = parts[1].split('/')[0];
    }
  }

  const base = `https://www.linkedin.com/in/${user}`;
  return {
    intro:          `${base}/edit/intro/`,
    experience:     `${base}/details/experience/edit/forms/new/`,
    education:      `${base}/details/education/edit/forms/new/`,
    skills:         `${base}/skills/edit/forms/new/`,
    certifications: `${base}/details/certifications/edit/forms/new/`,
    languages:      `${base}/details/languages/edit/forms/new/`,
    contact:        `${base}/edit/forms/contact-info/new/`,
    about:          `${base}/edit/forms/summary/new/`,
    projects:       `${base}/edit/forms/project/new/`,
  };
}

// ── Date constants matching LinkedIn ──────────────────────────────────────────
export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const YEARS = Array.from({ length: 70 }, (_, i) => String(2030 - i));
export const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));

// ── Shared styles ─────────────────────────────────────────────────────────────
export const inputCls =
  'w-full px-3 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all';
export const textareaCls =
  'w-full px-3 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all resize-none';

export function FieldLabel({ children, required }) {
  if (typeof children === 'string' && children.includes('*')) {
    const parts = children.split('*');
    return (
      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
        {parts[0]}<span className="text-rose-400 font-bold text-sm ml-0.5">*</span>{parts[1]}
      </label>
    );
  }

  return (
    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
      {children}
      {required && <span className="text-rose-400 font-bold text-sm ml-0.5">*</span>}
    </label>
  );
}

// LinkedIn button — always reuses the same named tab via HTML target
export function LIBtn({ url, label = 'Edit on LinkedIn' }) {
  return (
    <a
      href={url}
      target="linkedin_edit"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/15 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 border border-blue-600/20 text-[11px] font-semibold transition-all whitespace-nowrap no-underline"
    >
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H6.5v-7H9v7zM7.7 8.7c-.8 0-1.4-.6-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4 0 .8-.6 1.4-1.4 1.4zM18 17h-2.4v-3.8c0-1.1-.4-1.8-1.3-1.8-.7 0-1.2.5-1.4 1-.1.2-.1.5-.1.8V17H10.4s.1-6.3 0-7h2.4v1c.3-.5 1-1.2 2.3-1.2 1.7 0 3 1.1 3 3.5V17z" />
      </svg>
      {label}
    </a>
  );
}

export function SectionCard({ title, icon, liUrl, liLabel, children }) {
  return (
    <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <span className="text-blue-400">{icon}</span>
          <h3 className="text-sm font-bold text-white tracking-wide">{title}</h3>
        </div>
        {liUrl && <LIBtn url={liUrl} label={liLabel} />}
      </div>
      {children}
    </div>
  );
}

export function AddMoreBtn({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full py-2 rounded-xl border border-dashed border-slate-700 hover:border-blue-500/50 text-slate-500 hover:text-blue-400 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
      </svg>
      Add More
    </button>
  );
}

export function RemoveBtn({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-[10px] text-slate-600 hover:text-rose-400 transition-colors flex items-center gap-1"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
      Remove
    </button>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────
export const IC = {
  user: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  about: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>,
  work: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  edu: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" /></svg>,
  skill: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  code: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  cert: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
  lang: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>,
  target: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  service: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
};
