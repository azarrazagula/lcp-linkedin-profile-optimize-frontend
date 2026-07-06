import React from 'react';
import { SectionCard, FieldLabel, textareaCls, IC } from './FormHelpers';

export default function AboutSection({ about, setAbout, liUrl }) {
  return (
    <SectionCard title="About / Summary" icon={IC.about} liUrl={liUrl} liLabel="Edit Intro">
      <div>
        <FieldLabel>About / Summary *</FieldLabel>
        <textarea className={textareaCls} rows={5}
          placeholder="Write a compelling summary about yourself, your expertise, and what drives you..."
          value={about} onChange={(e) => setAbout(e.target.value)} />
      </div>
    </SectionCard>
  );
}
