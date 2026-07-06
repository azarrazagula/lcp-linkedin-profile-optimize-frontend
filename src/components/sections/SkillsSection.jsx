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
        <div className="min-h-[48px] p-2 rounded-xl bg-slate-950/60 border border-slate-800 focus-within:ring-2 focus-within:ring-blue-500/40 focus-within:border-blue-500 transition-all flex flex-wrap items-center gap-1.5">
          {skills.map((skill, index) => (
            <span key={index} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-medium">
              {skill}
              <button type="button" onClick={() => removeSkill(index)} className="hover:text-rose-400 transition-colors ml-0.5">
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            className="flex-1 bg-transparent border-0 text-white placeholder-slate-600 text-sm focus:outline-none min-w-[120px] px-1"
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
