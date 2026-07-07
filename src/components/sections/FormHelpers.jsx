import React from 'react';

// ── Dynamic LinkedIn URLs helper ──────────────────────────────────────────────
export function isValidLinkedInUrl(url) {
  if (!url) return false;
  const trimmed = url.trim();
  // Validates standard LinkedIn profile URL formats
  const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]{3,100}\/?(\?.*)?$/i;
  return regex.test(trimmed);
}

export function getLIUrls(linkedinUrl) {
  if (!isValidLinkedInUrl(linkedinUrl)) {
    return {
      intro:          null,
      experience:     null,
      education:      null,
      skills:         null,
      certifications: null,
      languages:      null,
      contact:        null,
      about:          null,
      projects:       null,
      career:         null,
      volunteer:      null,
      awards:         null,
      organizations:  null,
      courses:        null,
      publications:   null,
    };
  }
  let user = 'me';
  let clean = linkedinUrl.trim().split('?')[0]; // Remove query params
  clean = clean.replace(/\/$/, ''); // Remove trailing slash
  const parts = clean.split('/in/');
  if (parts[1]) user = parts[1].split('/')[0];

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
    career:         base,
    volunteer:      `${base}/details/volunteer-experiences/edit/forms/new/`,
    awards:         `${base}/edit/forms/honor/new/`,
    organizations:  `${base}/edit/forms/organization/new/`,
    courses:        `${base}/edit/forms/course/new/`,
    publications:   `${base}/edit/forms/publication/new/`,
  };
}

// ── Date constants ─────────────────────────────────────────────────────────────
export const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];
export const YEARS = Array.from({ length: 70 }, (_, i) => String(2030 - i));
export const DAYS  = Array.from({ length: 31 }, (_, i) => String(i + 1));

// ── Shared input styles (Elite Light Theme) ────────────────────────────────────
export const inputCls =
  'w-full px-4 py-3 rounded-2xl bg-slate-50/60 hover:bg-white focus:bg-white border border-slate-200/80 hover:border-slate-300 focus:border-blue-500 text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/8 transition-all duration-200 shadow-xs';

export const textareaCls =
  'w-full px-4 py-3 rounded-2xl bg-slate-50/60 hover:bg-white focus:bg-white border border-slate-200/80 hover:border-slate-300 focus:border-blue-500 text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/8 transition-all duration-200 resize-none shadow-xs';

export const fileInputCls =
  'w-full text-sm text-slate-500 font-medium cursor-pointer file:cursor-pointer file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:transition-all border border-dashed border-slate-200 rounded-2xl px-3 py-2 bg-slate-50/60 hover:bg-white hover:border-blue-300 transition-all';

// ── Badge component ────────────────────────────────────────────────────────────
const BADGE_CONFIG = {
  required:    { emoji: '🔴', label: 'Required',    cls: 'bg-rose-50 border-rose-200 text-rose-700' },
  recommended: { emoji: '🟢', label: 'Recommended', cls: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
  standout:    { emoji: '🔵', label: 'Stand Out',   cls: 'bg-blue-50 border-blue-200 text-blue-700' },
  optional:    { emoji: '⚪', label: 'Optional',    cls: 'bg-slate-50 border-slate-200 text-slate-500' },
};

export function Badge({ type = 'optional' }) {
  const { emoji, label, cls } = BADGE_CONFIG[type] || BADGE_CONFIG.optional;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${cls}`}>
      <span>{emoji}</span>{label}
    </span>
  );
}

// ── Helper text below inputs ───────────────────────────────────────────────────
export function HelperText({ children }) {
  if (!children) return null;
  return (
    <p className="mt-1.5 text-[11px] text-slate-400 font-medium leading-snug flex items-start gap-1">
      <span className="mt-0.5 shrink-0">💡</span>
      <span>{children}</span>
    </p>
  );
}

// ── Smart Tip banner ───────────────────────────────────────────────────────────
export function SmartTip({ children }) {
  if (!children) return null;
  return (
    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/70 border border-amber-100 text-xs text-amber-800 font-medium leading-relaxed">
      <span className="text-base shrink-0">✨</span>
      <span>{children}</span>
    </div>
  );
}

// ── Audience Hint pill ─────────────────────────────────────────────────────────
export function AudienceHint({ children }) {
  if (!children) return null;
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-violet-600 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-full">
      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      {children}
    </span>
  );
}

// ── Field Label with Copy button ───────────────────────────────────────────────
export function FieldLabel({ children, required, value }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    if (!value) return;
    const str = typeof value === 'object' ? JSON.stringify(value) : String(value);
    navigator.clipboard.writeText(str);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderText = () => {
    if (typeof children === 'string' && children.includes('*')) {
      const [pre, ...post] = children.split('*');
      return <span>{pre}<span className="text-rose-500 font-bold text-sm">*</span>{post.join('*')}</span>;
    }
    return <span>{children}{required && <span className="text-rose-500 font-bold text-sm ml-0.5">*</span>}</span>;
  };

  return (
    <div className="flex items-center justify-between mb-1.5">
      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
        {renderText()}
      </label>
      {value !== undefined && value !== null && String(value).trim() !== '' && (
        <button type="button" onClick={handleCopy}
          className="text-[10px] font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2 py-0.5 rounded-md transition-all flex items-center gap-1 cursor-pointer">
          {copied ? '✓ Copied' : '📋 Copy'}
        </button>
      )}
    </div>
  );
}

// ── LinkedIn Edit Button ───────────────────────────────────────────────────────
export function LIBtn({ url, label = 'Edit on LinkedIn' }) {
  if (!url) {
    return (
      <button
        type="button"
        disabled
        title="Please paste your LinkedIn Profile URL in Basic Info to unlock"
        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-50 text-slate-400 border border-slate-200 text-[10px] font-bold cursor-not-allowed opacity-65 whitespace-nowrap shadow-3xs"
      >
        <span className="text-[11px] shrink-0">🔒</span>
        <span className="hidden sm:inline">{label}</span>
        <span className="inline sm:hidden">Edit</span>
      </button>
    );
  }

  return (
    <a href={url} target="linkedin_edit"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 border border-blue-200 text-xs font-bold transition-all whitespace-nowrap no-underline shadow-2xs">
      <svg className="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H6.5v-7H9v7zM7.7 8.7c-.8 0-1.4-.6-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4 0 .8-.6 1.4-1.4 1.4zM18 17h-2.4v-3.8c0-1.1-.4-1.8-1.3-1.8-.7 0-1.2.5-1.4 1-.1.2-.1.5-.1.8V17H10.4s.1-6.3 0-7h2.4v1c.3-.5 1-1.2 2.3-1.2 1.7 0 3 1.1 3 3.5V17z" />
      </svg>
      <span className="hidden sm:inline">{label}</span>
      <span className="inline sm:hidden">Edit</span>
    </a>
  );
}

// ── Section Card v2 (with badge, description, tip, audienceHint) ───────────────
export function SectionCard({ title, icon, liUrl, liLabel, badge, description, tip, audienceHint, children }) {
  return (
    <div className="bg-white border border-slate-100 rounded-[22px] shadow-[0_4px_24px_rgb(148,163,184,0.06)] hover:shadow-[0_8px_32px_rgb(148,163,184,0.10)] transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="px-6 sm:px-7 pt-6 pb-4 border-b border-slate-100/80">
        {/* Row 1: Icon + Title/Badge + Edit button */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              {icon}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-sm font-extrabold text-slate-800 tracking-wide">{title}</h3>
                {badge && <Badge type={badge} />}
              </div>
            </div>
          </div>
          {liUrl !== undefined && <LIBtn url={liUrl} label={liLabel} />}
        </div>

        {/* Row 2: Audience Hint & Description (Full width, never squeezed!) */}
        {(audienceHint || description) && (
          <div className="mt-3.5 space-y-2">
            {audienceHint && (
              <div>
                <AudienceHint>{audienceHint}</AudienceHint>
              </div>
            )}
            {description && (
              <p className="text-xs text-slate-500 font-medium leading-relaxed">{description}</p>
            )}
          </div>
        )}

        {tip && (
          <div className="mt-3">
            <SmartTip>{tip}</SmartTip>
          </div>
        )}
      </div>
      {/* Body */}
      <div className="px-6 sm:px-7 py-5 space-y-4">
        {children}
      </div>
    </div>
  );
}

// ── Collapsible Item Wrapper (for repeatable sections) ─────────────────────────
export function CollapsibleItem({ index, label, subtitle, onRemove, canRemove, children }) {
  const [open, setOpen] = React.useState(index === 0);
  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden">
      {/* Item Header */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50/60 hover:bg-slate-50 transition-colors text-left group"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-[11px] font-extrabold flex items-center justify-center shrink-0">
            {index + 1}
          </span>
          <div className="min-w-0">
            <span className="text-xs font-bold text-slate-700 truncate block">{label || `Entry ${index + 1}`}</span>
            {subtitle && <span className="text-[10px] text-slate-400 font-medium truncate block">{subtitle}</span>}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {canRemove && (
            <span
              role="button"
              tabIndex={0}
              onClick={e => { e.stopPropagation(); onRemove(); }}
              onKeyDown={e => e.key === 'Enter' && (e.stopPropagation(), onRemove())}
              className="text-[10px] text-slate-400 hover:text-rose-600 font-bold flex items-center gap-0.5 transition-colors cursor-pointer px-1.5 py-0.5 rounded-md hover:bg-rose-50"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Remove
            </span>
          )}
          <svg
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {/* Item Body */}
      {open && (
        <div className="px-4 pt-4 pb-5 space-y-3.5 bg-white border-t border-slate-100/80">
          {children}
        </div>
      )}
    </div>
  );
}

// ── Add More button ────────────────────────────────────────────────────────────
export function AddMoreBtn({ onClick, label = 'Add Another' }) {
  return (
    <button type="button" onClick={onClick}
      className="w-full py-3 rounded-2xl border border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/40 text-slate-500 hover:text-blue-600 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer group">
      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center group-hover:scale-110 transition-transform">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
        </svg>
      </span>
      {label}
    </button>
  );
}

// ── Remove button (legacy, keep for non-collapsible use) ──────────────────────
export function RemoveBtn({ onClick }) {
  return (
    <button type="button" onClick={onClick}
      className="text-[11px] text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1 font-semibold cursor-pointer">
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
      Remove
    </button>
  );
}

// ── Optional Section Wrapper (collapsed by default) ────────────────────────────
export function OptionalSectionCard({ title, icon, liUrl, liLabel, badge = 'optional', description, tip, audienceHint, children }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="bg-white border border-slate-100 rounded-[22px] shadow-[0_4px_24px_rgb(148,163,184,0.04)] hover:shadow-[0_8px_32px_rgb(148,163,184,0.08)] transition-all duration-300 overflow-hidden">
      {/* Collapsed Header */}
      <div
        onClick={() => setOpen(o => !o)}
        className="w-full flex flex-col px-6 sm:px-7 py-4 hover:bg-slate-50/60 transition-colors text-left group cursor-pointer"
      >
        <div className="flex items-center justify-between gap-3 w-full">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 shrink-0 group-hover:from-blue-50 group-hover:to-indigo-50 group-hover:border-blue-100 group-hover:text-blue-600 transition-all">
              {icon}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-sm font-extrabold text-slate-700 tracking-wide group-hover:text-slate-800 transition-colors">{title}</h3>
                {badge && <Badge type={badge} />}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {liUrl !== undefined && (
              <div onClick={e => e.stopPropagation()} className="cursor-default">
                <LIBtn url={liUrl} label={liLabel} />
              </div>
            )}
            <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Closed Sub-row for Description & Audience Hint */}
        {!open && (audienceHint || description) && (
          <div className="mt-2.5 space-y-1.5 pl-12 pr-4">
            {audienceHint && (
              <div>
                <AudienceHint>{audienceHint}</AudienceHint>
              </div>
            )}
            {description && (
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed truncate">{description}</p>
            )}
          </div>
        )}
      </div>

      {/* Expanded Content */}
      {open && (
        <div className="border-t border-slate-100">
          {/* Sub header */}
          <div className="px-6 sm:px-7 pt-4 pb-3">
            {description && (
              <p className="text-xs text-slate-500 font-medium leading-relaxed">{description}</p>
            )}
            {tip && <div className="mt-2"><SmartTip>{tip}</SmartTip></div>}
          </div>
          {/* Body */}
          <div className="px-6 sm:px-7 pb-5 space-y-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Checkbox Row ────────────────────────────────────────────────────────────────
export function CheckboxRow({ id, checked, onChange, label }) {
  return (
    <label htmlFor={id} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
      <input type="checkbox" id={id}
        checked={checked} onChange={onChange}
        className="w-4 h-4 accent-blue-600 rounded cursor-pointer" />
      <span className="text-sm text-slate-700 font-medium group-hover:text-slate-900 transition-colors">{label}</span>
    </label>
  );
}

// ── Date Row (Month + Year side by side) ───────────────────────────────────────
export function DateRow({ monthVal, yearVal, onMonthChange, onYearChange, labelValue }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Month</span>
        <select className={inputCls} value={monthVal || ''} onChange={onMonthChange}>
          <option value="">Month</option>
          {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
      <div>
        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Year</span>
        <select className={inputCls} value={yearVal || ''} onChange={onYearChange}>
          <option value="">Year</option>
          {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>
    </div>
  );
}

// ── Tag Input (skills / job titles / services) ─────────────────────────────────
export function TagInput({ tags, tagInput, setTagInput, onKeyDown, onRemove, placeholder }) {
  return (
    <div className="min-h-[50px] px-3 py-2 rounded-2xl bg-slate-50/60 hover:bg-white focus-within:bg-white border border-slate-200/80 hover:border-slate-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/8 transition-all flex flex-wrap items-center gap-1.5 shadow-xs cursor-text">
      {tags.map((tag, idx) => (
        <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          {tag}
          <button type="button" onClick={() => onRemove(idx)}
            className="text-blue-400 hover:text-rose-600 transition-colors ml-0.5 font-bold">×</button>
        </span>
      ))}
      <input
        type="text"
        value={tagInput}
        onChange={e => setTagInput(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={tags.length === 0 ? placeholder : 'Add more...'}
        className="flex-1 bg-transparent border-0 text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none min-w-[120px] px-1"
      />
    </div>
  );
}

// ── Icons ──────────────────────────────────────────────────────────────────────
export const IC = {
  user:    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>,
  contact: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
  about:   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/></svg>,
  work:    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
  edu:     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6"/></svg>,
  skill:   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>,
  code:    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>,
  cert:    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>,
  lang:    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/></svg>,
  career:  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
  volunteer:<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>,
  award:   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>,
  course:  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>,
  recommend:<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>,
  org:     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>,
  pub:     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>,
  patent:  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>,
  test:    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>,
};
