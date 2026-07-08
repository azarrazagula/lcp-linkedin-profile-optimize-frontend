import React from 'react';
import { SectionCard, FieldLabel, HelperText, inputCls, IC } from './FormHelpers';

export default function SkillsSection({ skills, setSkills, liUrl, onOptimize, optimizingField, onReload }) {
  const skillsId = React.useId();

  return (
    <SectionCard
      title="Skills"
      icon={IC.skill}
      liUrl={liUrl}
      badge="required"
      description="Add skills to show your technical strengths, core tools, and professional capabilities."
      tip="Aim for at least 5 skills. Profiles with 5 or more skills are discovered up to 27× more by recruiters searching on LinkedIn."
      onReload={onReload}
    >
      <div>
        <FieldLabel htmlFor={skillsId} value={skills}>Skills * (comma-separated)</FieldLabel>
        <div className="relative flex items-center">
          <input id={skillsId} className={`${inputCls} !pr-16`} placeholder="e.g. React, JavaScript, Node.js, Project Management"
            value={skills}
            onChange={(e) => setSkills(e.target.value)} />
          {skills && skills.trim() && (
            <button
              type="button"
              disabled={optimizingField?.type === 'skills'}
              onClick={() => onOptimize('skills')}
              className="absolute right-2 px-2.5 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-[10px] font-black shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer flex items-center gap-1 disabled:opacity-50"
            >
              {optimizingField?.type === 'skills' ? (
                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <span>✨ AI</span>
              )}
            </button>
          )}
        </div>
        <HelperText>The skills you want to highlight. (Note: On LinkedIn, you must search and add these skills one by one.)</HelperText>
      </div>
    </SectionCard>
  );
}
