import React from 'react';
import { SectionCard, FieldLabel, AddMoreBtn, RemoveBtn, inputCls, textareaCls, IC, MONTHS, YEARS } from './FormHelpers';

export default function ProjectsSection({ projects, setProjects, updateArr, addItem, removeItem, liUrl }) {
  const emptyProj = {
    name: '', description: '', currentlyWorking: false,
    startMonth: '', startYear: '', endMonth: '', endYear: ''
  };

  return (
    <SectionCard title="Projects" icon={IC.code} liUrl={liUrl}>
      {projects.map((proj, i) => (
        <div key={i} className="space-y-3.5 pb-5 border-b border-slate-800/60 last:border-0 last:pb-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-400/80 uppercase tracking-widest">
              Project {i + 1}
            </span>
            {projects.length > 1 && <RemoveBtn onClick={() => removeItem(setProjects, i)} />}
          </div>

          <div>
            <FieldLabel>Project Name *</FieldLabel>
            <input className={inputCls} placeholder="LinkedIn Optimizer"
              value={proj.name}
              onChange={(e) => updateArr(setProjects, i, 'name', e.target.value)} />
          </div>

          <div>
            <FieldLabel>Description</FieldLabel>
            <textarea className={textareaCls} rows={3}
              placeholder="What does this project do? What problem does it solve?"
              value={proj.description}
              onChange={(e) => updateArr(setProjects, i, 'description', e.target.value)} />
          </div>

          <div className="flex items-center gap-2 py-1">
            <input type="checkbox" id={`current-proj-${i}`} className="w-4 h-4 accent-blue-500 rounded cursor-pointer"
              checked={proj.currentlyWorking}
              onChange={(e) => updateArr(setProjects, i, 'currentlyWorking', e.target.checked)} />
            <label htmlFor={`current-proj-${i}`} className="text-xs font-medium text-slate-300 cursor-pointer">
              I am currently working on this project
            </label>
          </div>

          {/* Start Date */}
          <div>
            <FieldLabel>Start date</FieldLabel>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-slate-400 font-medium block mb-1">Month</span>
                <select className={inputCls} value={proj.startMonth || ''} onChange={(e) => updateArr(setProjects, i, 'startMonth', e.target.value)}>
                  <option value="">Month</option>
                  {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-medium block mb-1">Year *</span>
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
              <FieldLabel>End date</FieldLabel>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] text-slate-400 font-medium block mb-1">Month</span>
                  <select className={inputCls} value={proj.endMonth || ''} onChange={(e) => updateArr(setProjects, i, 'endMonth', e.target.value)}>
                    <option value="">Month</option>
                    {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-medium block mb-1">Year *</span>
                  <select className={inputCls} value={proj.endYear || ''} onChange={(e) => updateArr(setProjects, i, 'endYear', e.target.value)}>
                    <option value="">Year</option>
                    {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <AddMoreBtn onClick={() => addItem(setProjects, emptyProj)} />
    </SectionCard>
  );
}
