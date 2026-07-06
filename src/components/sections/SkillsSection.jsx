import React from 'react';
import { SectionCard, FieldLabel, IC } from './FormHelpers';

export default function SkillsSection({ skills, setSkills, skillInput, setSkillInput, handleSkillKeyDown, liUrl }) {
  const removeSkill = (index) => {
    setSkills(skills.filter((_, idx) => idx !== index));
  };

  return (
    <SectionCard title="Skills" icon={IC.skill} liUrl={liUrl}>
      <div>
        <FieldLabel value={skills.length > 0 ? skills.join(', ') : ''}>Skills * (Press Enter or , to Add)</FieldLabel>
        <div className="min-h-[48px] p-2 rounded-xl bg-white border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-600 transition-all flex flex-wrap items-center gap-1.5 shadow-xs">
          {skills.map((skill, index) => (
            <span key={index} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
              {skill}
              <button type="button" onClick={() => removeSkill(index)} className="hover:text-rose-600 transition-colors ml-0.5 text-blue-400 font-bold">
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            className="flex-1 bg-transparent border-0 text-slate-800 placeholder-slate-400 text-sm focus:outline-none min-w-[120px] px-1 font-medium"
            placeholder={skills.length === 0 ? 'Type skill and press Enter...' : 'Add more...'}
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKeyDown}
          />
        </div>
      </div>
    </SectionCard>
  );
}
