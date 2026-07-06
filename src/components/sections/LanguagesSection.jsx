import React from 'react';
import { SectionCard, FieldLabel, inputCls, IC } from './FormHelpers';

export default function LanguagesSection({ languages, setLanguages, liUrl }) {
  return (
    <SectionCard title="Languages" icon={IC.lang} liUrl={liUrl}>
      <div>
        <FieldLabel value={languages}>Languages * (comma-separated)</FieldLabel>
        <input className={inputCls} placeholder="English, Tamil, Hindi"
          value={languages}
          onChange={(e) => setLanguages(e.target.value)} />
      </div>
    </SectionCard>
  );
}
