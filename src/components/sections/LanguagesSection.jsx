import React from 'react';
import { SectionCard, FieldLabel, HelperText, inputCls, IC } from './FormHelpers';

export default function LanguagesSection({ languages, setLanguages, liUrl }) {
  return (
    <SectionCard
      title="Languages"
      icon={IC.lang}
      liUrl={liUrl}
      badge="recommended"
      description="List the languages you can speak, write, or communicate in professionally."
      tip="Being bilingual or multilingual is a strong competitive advantage in global or remote-first companies."
    >
      <div>
        <FieldLabel value={languages}>Languages * (comma-separated)</FieldLabel>
        <input className={inputCls} placeholder="e.g. English, Tamil, Hindi"
          value={languages}
          onChange={(e) => setLanguages(e.target.value)} />
        <HelperText>The language you speak.</HelperText>
      </div>
    </SectionCard>
  );
}
