import React from 'react';
import { SectionCard, FieldLabel, textareaCls, IC } from './FormHelpers';

export default function AboutSection({ about, setAbout, liUrl }) {
  return (
    <SectionCard title="About / Summary" icon={IC.about} liUrl={liUrl}>
      <div>
        <FieldLabel value={about}>About / Summary *</FieldLabel>
        <textarea className={textareaCls} rows={5}
          placeholder="Write a brief summary of your career, skills, achievements, and goals..."
          value={about}
          onChange={(e) => setAbout(e.target.value)} />
      </div>
    </SectionCard>
  );
}
