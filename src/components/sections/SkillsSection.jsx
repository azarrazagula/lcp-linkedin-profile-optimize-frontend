import React from 'react';
import { SectionCard, FieldLabel, IC } from './FormHelpers';

export default function SkillsSection({ skills, setSkills, skillInput, setSkillInput, handleSkillKeyDown, liUrl }) {
  return (
    <SectionCard title="Skills" icon={IC.skill} liUrl={liUrl}>
      <div>
        <FieldLabel>Skills * (press Enter or , to add)</FieldLabel>
        <div className="min-h-[44px] px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 focus-within:ring-2 focus-within:ring-blue-500/40 focus-within:border-blue-500 transition-all flex flex-wrap gap-1.5">
          {skills.map((skill) => (
            <span key={skill} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-600/20 text-blue-300 text-xs font-medium border border-blue-600/20">
              {skill}
              <button type="button" onClick={() => setSkills((p) => p.filter((s) => s !== skill))}
                className="hover:text-rose-400 transition-colors ml-0.5">×</button>
            </span>
          ))}
          <input
            className="flex-1 min-w-[120px] bg-transparent text-white placeholder-slate-600 text-sm outline-none"
            placeholder={skills.length === 0 ? 'React.js, Node.js, MongoDB...' : 'Add more...'}
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKeyDown}
          />
        </div>
      </div>
    </SectionCard>
  );
}
