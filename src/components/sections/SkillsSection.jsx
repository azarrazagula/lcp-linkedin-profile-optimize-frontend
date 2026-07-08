import React from 'react';
import { SectionCard, FieldLabel, HelperText, inputCls, IC } from './FormHelpers';

export default function SkillsSection({ skills, setSkills, liUrl }) {
  const skillsId = React.useId();

  return (
    <SectionCard
      title="Skills"
      icon={IC.skill}
      liUrl={liUrl}
      badge="required"
      description="Add skills to show your technical strengths, core tools, and professional capabilities."
      tip="Aim for at least 5 skills. Profiles with 5 or more skills are discovered up to 27× more by recruiters searching on LinkedIn."
    >
      <div>
        <FieldLabel htmlFor={skillsId} value={skills}>Skills * (comma-separated)</FieldLabel>
        <input id={skillsId} className={inputCls} placeholder="e.g. React, JavaScript, Node.js, Project Management"
          value={skills}
          onChange={(e) => setSkills(e.target.value)} />
        <HelperText>The skills you want to highlight. (Note: On LinkedIn, you must search and add these skills one by one.)</HelperText>
      </div>
    </SectionCard>
  );
}
