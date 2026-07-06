import React from 'react';
import { SectionCard, FieldLabel, HelperText, TagInput, IC } from './FormHelpers';

export default function SkillsSection({ skills, setSkills, skillInput, setSkillInput, handleSkillKeyDown, liUrl }) {
  const removeSkill = (index) => {
    setSkills(skills.filter((_, idx) => idx !== index));
  };

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
        <FieldLabel value={skills.length > 0 ? skills.join(', ') : ''}>Skills * (Press Enter or , to Add)</FieldLabel>
        <TagInput
          tags={skills}
          tagInput={skillInput}
          setTagInput={setSkillInput}
          onKeyDown={handleSkillKeyDown}
          onRemove={removeSkill}
          placeholder="e.g. React, JavaScript, Node.js, Project Management"
        />
        <HelperText>Add hard skills (like programming languages, tools) as well as soft skills (like leadership, negotiation).</HelperText>
      </div>
    </SectionCard>
  );
}
