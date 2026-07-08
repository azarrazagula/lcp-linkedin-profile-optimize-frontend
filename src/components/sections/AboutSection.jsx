import React from 'react';
import { SectionCard, FieldLabel, HelperText, textareaCls, IC } from './FormHelpers';

export default function AboutSection({ about, setAbout, liUrl, onOptimize, optimizingField, onReload }) {
  const charLimit = 2600;
  const currentLength = about ? about.length : 0;
  const aboutId = React.useId();

  return (
    <SectionCard
      title="About / Summary"
      icon={IC.about}
      liUrl={liUrl}
      badge="required"
      description="Introduce yourself, showcase your professional journey, and highlight your core expertise and achievements."
      tip="A professional summary written in first-person ('I am...') that highlights your impact (using numbers where possible) grabs attention instantly."
      onReload={onReload}
    >
      <div>
        <div className="flex justify-between items-center mb-1">
          <FieldLabel htmlFor={aboutId} value={about}>About / Summary *</FieldLabel>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${currentLength > charLimit ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-700'}`}>
            {currentLength} / {charLimit}
          </span>
        </div>
        <div className="relative">
          <textarea id={aboutId} className={`${textareaCls} !pb-12`} rows={6}
            placeholder="Write a brief summary of your career, skills, achievements, and goals. Ex: 'I am a passionate Full Stack Developer with 3+ years of experience building responsive web applications...'"
            value={about}
            onChange={(e) => setAbout(e.target.value)} />
          {about && about.trim() && (
            <button
              type="button"
              disabled={optimizingField?.type === 'about'}
              onClick={() => onOptimize('about')}
              className="absolute bottom-2.5 right-2 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            >
              {optimizingField?.type === 'about' ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Optimizing...</span>
                </>
              ) : (
                <>
                  <span>✨</span>
                  <span>Optimize with AI</span>
                </>
              )}
            </button>
          )}
        </div>
        <HelperText>Write a short 3-4 paragraph summary of your experience, key skills, and career goals.</HelperText>
      </div>
    </SectionCard>
  );
}
