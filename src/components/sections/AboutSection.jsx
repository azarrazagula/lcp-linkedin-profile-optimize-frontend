import React from 'react';
import { SectionCard, FieldLabel, HelperText, textareaCls, IC } from './FormHelpers';

export default function AboutSection({ about, setAbout, liUrl }) {
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
    >
      <div>
        <div className="flex justify-between items-center mb-1">
          <FieldLabel htmlFor={aboutId} value={about}>About / Summary *</FieldLabel>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${currentLength > charLimit ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-700'}`}>
            {currentLength} / {charLimit}
          </span>
        </div>
        <textarea id={aboutId} className={textareaCls} rows={6}
          placeholder="Write a brief summary of your career, skills, achievements, and goals. Ex: 'I am a passionate Full Stack Developer with 3+ years of experience building responsive web applications...'"
          value={about}
          onChange={(e) => setAbout(e.target.value)} />
        <HelperText>Write a short 3-4 paragraph summary of your experience, key skills, and career goals.</HelperText>
      </div>
    </SectionCard>
  );
}
