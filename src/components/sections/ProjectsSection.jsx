import React from 'react';
import { SectionCard, FieldLabel, HelperText, CollapsibleItem, AddMoreBtn, inputCls, textareaCls, IC, MONTHS, YEARS } from './FormHelpers';

export default function ProjectsSection({ projects, setProjects, updateArr, addItem, removeItem, liUrl }) {
  const emptyProj = {
    name: '', description: '', currentlyWorking: false,
    startMonth: '', startYear: '', endMonth: '', endYear: ''
  };

  return (
    <SectionCard
      title="Projects"
      icon={IC.code}
      liUrl={liUrl}
      badge="standout"
      audienceHint="Recommended for Developers, Designers & Students"
      description="Showcase practical projects you have built, open-source contributions, or university work."
      tip="Projects are the best way to prove your skill set when you have limited industry experience."
    >
      <div className="space-y-4">
        {projects.map((proj, i) => (
          <CollapsibleItem
            key={i}
            index={i}
            label={proj.name}
            subtitle={proj.currentlyWorking ? 'Currently working' : (proj.endMonth && proj.endYear ? `${proj.endMonth} ${proj.endYear}` : '')}
            canRemove={projects.length > 1}
            onRemove={() => removeItem(setProjects, i)}
          >
            <div>
              <FieldLabel value={proj.name}>Project Name *</FieldLabel>
              <input className={inputCls} placeholder="e.g. Portfolio Website"
                value={proj.name}
                onChange={(e) => updateArr(setProjects, i, 'name', e.target.value)} />
              <HelperText>Give a short, punchy name to your project.</HelperText>
            </div>

            <div>
              <FieldLabel value={proj.description}>Description</FieldLabel>
              <textarea className={textareaCls} rows={3}
                placeholder="What does this project do? What technologies did you use? What was your role?"
                value={proj.description}
                onChange={(e) => updateArr(setProjects, i, 'description', e.target.value)} />
              <HelperText>Explain the problem, your solution, and key tech stack components.</HelperText>
            </div>

            <div className="flex items-center gap-2.5 py-1">
              <input type="checkbox" id={`current-proj-${i}`} className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                checked={proj.currentlyWorking}
                onChange={(e) => updateArr(setProjects, i, 'currentlyWorking', e.target.checked)} />
              <label htmlFor={`current-proj-${i}`} className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                I am currently working on this project
              </label>
            </div>

            {/* Start Date */}
            <div>
              <FieldLabel value={proj.startMonth && proj.startYear ? `${proj.startMonth} ${proj.startYear}` : ''}>Start date</FieldLabel>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Month</span>
                  <select className={inputCls} value={proj.startMonth || ''} onChange={(e) => updateArr(setProjects, i, 'startMonth', e.target.value)}>
                    <option value="">Month</option>
                    {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Year *</span>
                  <select className={inputCls} value={proj.startYear || ''} onChange={(e) => updateArr(setProjects, i, 'startYear', e.target.value)}>
                    <option value="">Year</option>
                    {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* End Date - Only shown if NOT currently working */}
            {!proj.currentlyWorking && (
              <div>
                <FieldLabel value={proj.endMonth && proj.endYear ? `${proj.endMonth} ${proj.endYear}` : ''}>End date</FieldLabel>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Month</span>
                    <select className={inputCls} value={proj.endMonth || ''} onChange={(e) => updateArr(setProjects, i, 'endMonth', e.target.value)}>
                      <option value="">Month</option>
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Year *</span>
                    <select className={inputCls} value={proj.endYear || ''} onChange={(e) => updateArr(setProjects, i, 'endYear', e.target.value)}>
                      <option value="">Year</option>
                      {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </CollapsibleItem>
        ))}
      </div>
      <div className="mt-4">
        <AddMoreBtn onClick={() => addItem(setProjects, emptyProj)} label="Add Project" />
      </div>
    </SectionCard>
  );
}
