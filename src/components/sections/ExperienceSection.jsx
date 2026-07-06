import React from 'react';
import { SectionCard, FieldLabel, AddMoreBtn, RemoveBtn, inputCls, textareaCls, IC, MONTHS, YEARS } from './FormHelpers';

export default function ExperienceSection({ experiences, setExperiences, updateArr, addItem, removeItem, liUrl }) {
  const emptyExp = {
    jobTitle: '', company: '', employmentType: '', location: '', locationType: '',
    currentlyWorking: false, startMonth: '', startYear: '', description: '',
    profileHeadline: '', foundVia: ''
  };

  return (
    <SectionCard title="Experience" icon={IC.work} liUrl={liUrl}>
      {experiences.map((exp, i) => (
        <div key={i} className="space-y-3.5 pb-5 border-b border-slate-800/60 last:border-0 last:pb-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-400/80 uppercase tracking-widest">
              Experience {i + 1}
            </span>
            {experiences.length > 1 && <RemoveBtn onClick={() => removeItem(setExperiences, i)} />}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <FieldLabel value={exp.jobTitle}>Title *</FieldLabel>
              <input className={inputCls} placeholder="Ex: Full Stack Developer"
                value={exp.jobTitle}
                onChange={(e) => updateArr(setExperiences, i, 'jobTitle', e.target.value)} />
            </div>
            <div>
              <FieldLabel value={exp.employmentType}>Employment type</FieldLabel>
              <select className={inputCls} value={exp.employmentType} onChange={(e) => updateArr(setExperiences, i, 'employmentType', e.target.value)}>
                <option value="">Please select</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Freelance">Freelance</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Apprenticeship">Apprenticeship</option>
                <option value="Seasonal">Seasonal</option>
              </select>
            </div>
          </div>

          <div>
            <FieldLabel value={exp.company}>Company name *</FieldLabel>
            <input className={inputCls} placeholder="Ex: Microsoft"
              value={exp.company}
              onChange={(e) => updateArr(setExperiences, i, 'company', e.target.value)} />
          </div>

          <div className="flex items-center gap-2 py-1">
            <input type="checkbox" id={`current-${i}`} className="w-4 h-4 accent-blue-500 rounded cursor-pointer"
              checked={exp.currentlyWorking}
              onChange={(e) => updateArr(setExperiences, i, 'currentlyWorking', e.target.checked)} />
            <label htmlFor={`current-${i}`} className="text-xs font-medium text-slate-300 cursor-pointer">
              I am currently working in this role
            </label>
          </div>

          {/* Start Date */}
          <div>
            <FieldLabel value={exp.startMonth && exp.startYear ? `${exp.startMonth} ${exp.startYear}` : ''}>Start date</FieldLabel>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-slate-400 font-medium block mb-1">Month</span>
                <select className={inputCls} value={exp.startMonth || ''} onChange={(e) => updateArr(setExperiences, i, 'startMonth', e.target.value)}>
                  <option value="">Month</option>
                  {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-medium block mb-1">Year *</span>
                <select className={inputCls} value={exp.startYear || ''} onChange={(e) => updateArr(setExperiences, i, 'startYear', e.target.value)}>
                  <option value="">Year</option>
                  {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <FieldLabel value={exp.location}>Location</FieldLabel>
              <input className={inputCls} placeholder="Ex: London, United Kingdom"
                value={exp.location}
                onChange={(e) => updateArr(setExperiences, i, 'location', e.target.value)} />
            </div>
            <div>
              <FieldLabel value={exp.locationType}>Location type</FieldLabel>
              <select className={inputCls} value={exp.locationType} onChange={(e) => updateArr(setExperiences, i, 'locationType', e.target.value)}>
                <option value="">Please select</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>

          <div>
            <FieldLabel value={exp.description}>Description</FieldLabel>
            <textarea className={textareaCls} rows={4}
              placeholder="Describe your responsibilities, key achievements, impact..."
              value={exp.description}
              onChange={(e) => updateArr(setExperiences, i, 'description', e.target.value)} />
          </div>

          <div>
            <FieldLabel value={exp.profileHeadline}>Profile headline</FieldLabel>
            <input className={inputCls} placeholder="Appears below your name at top of profile"
              value={exp.profileHeadline}
              onChange={(e) => updateArr(setExperiences, i, 'profileHeadline', e.target.value)} />
          </div>
        </div>
      ))}
      <AddMoreBtn onClick={() => addItem(setExperiences, emptyExp)} />
    </SectionCard>
  );
}
