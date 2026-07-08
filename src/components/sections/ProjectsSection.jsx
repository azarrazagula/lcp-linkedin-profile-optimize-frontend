import React from 'react';
import { SectionCard, FieldLabel, HelperText, CollapsibleItem, AddMoreBtn, inputCls, textareaCls, IC, MONTHS, YEARS } from './FormHelpers';

export default function ProjectsSection({ projects, setProjects, updateArr, addItem, removeItem, liUrl, onOptimize, optimizingField }) {
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
              <FieldLabel htmlFor={`proj-name-${i}`} value={proj.name}>Project Name *</FieldLabel>
              <input id={`proj-name-${i}`} className={inputCls} placeholder="e.g. Portfolio Website"
                value={proj.name}
                onChange={(e) => updateArr(setProjects, i, 'name', e.target.value)} />
              <HelperText>The name of your project.</HelperText>
            </div>

            <div>
              <FieldLabel htmlFor={`proj-description-${i}`} value={proj.description}>Description</FieldLabel>
              <div className="relative">
                <textarea id={`proj-description-${i}`} className={`${textareaCls} !pb-12`} rows={3}
                  placeholder="What does this project do? What technologies did you use? What was your role?"
                  value={proj.description}
                  onChange={(e) => updateArr(setProjects, i, 'description', e.target.value)} />
                {proj.description && proj.description.trim() && (
                  <button
                    type="button"
                    disabled={optimizingField?.type === 'project' && optimizingField?.index === i}
                    onClick={() => onOptimize('project', i)}
                    className="absolute bottom-2.5 right-2 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {optimizingField?.type === 'project' && optimizingField?.index === i ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Optimizing...</span>
                      </>
                    ) : (
                      <>
                        <span>✨</span>
                        <span>Optimize with AI</span>
                      </>
                    )}
                  </button>
                )}
              </div>
              <HelperText>Describe the problem, technologies used, and your contribution.</HelperText>
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
                  <label htmlFor={`proj-startMonth-${i}`} className="text-[11px] text-slate-600 font-bold uppercase tracking-wider block mb-1">Month</label>
                  <select id={`proj-startMonth-${i}`} className={inputCls} value={proj.startMonth || ''} onChange={(e) => updateArr(setProjects, i, 'startMonth', e.target.value)}>
                    <option value="">Month</option>
                    {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor={`proj-startYear-${i}`} className="text-[11px] text-slate-600 font-bold uppercase tracking-wider block mb-1">Year *</label>
                  <select id={`proj-startYear-${i}`} className={inputCls} value={proj.startYear || ''} onChange={(e) => updateArr(setProjects, i, 'startYear', e.target.value)}>
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
                    <label htmlFor={`proj-endMonth-${i}`} className="text-[11px] text-slate-600 font-bold uppercase tracking-wider block mb-1">Month</label>
                    <select id={`proj-endMonth-${i}`} className={inputCls} value={proj.endMonth || ''} onChange={(e) => updateArr(setProjects, i, 'endMonth', e.target.value)}>
                      <option value="">Month</option>
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`proj-endYear-${i}`} className="text-[11px] text-slate-600 font-bold uppercase tracking-wider block mb-1">Year *</label>
                    <select id={`proj-endYear-${i}`} className={inputCls} value={proj.endYear || ''} onChange={(e) => updateArr(setProjects, i, 'endYear', e.target.value)}>
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
