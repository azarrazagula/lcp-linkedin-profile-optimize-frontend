import React from 'react';
import { SectionCard, FieldLabel, HelperText, CollapsibleItem, AddMoreBtn, inputCls, textareaCls, IC, MONTHS, YEARS } from './FormHelpers';

export default function ExperienceSection({ experiences, setExperiences, updateArr, addItem, removeItem, liUrl, onOptimize, optimizingField }) {
  const emptyExp = {
    jobTitle: '', company: '', employmentType: '', location: '', locationType: '',
    currentlyWorking: false, startMonth: '', startYear: '', description: '',
    foundVia: ''
  };

  return (
    <SectionCard
      title="Experience"
      icon={IC.work}
      liUrl={liUrl}
      badge="required"
      description="List your past and current professional roles. This helps show your career progression and core capabilities."
      tip="Add metrics to your experience where possible (e.g., 'Improved database speed by 30%'). Numbers validate your impact."
    >
      <div className="space-y-4">
        {experiences.map((exp, i) => (
          <CollapsibleItem
            key={i}
            index={i}
            label={exp.jobTitle}
            subtitle={exp.company}
            canRemove={experiences.length > 1}
            onRemove={() => removeItem(setExperiences, i)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel htmlFor={`exp-jobTitle-${i}`} value={exp.jobTitle}>Title *</FieldLabel>
                <input id={`exp-jobTitle-${i}`} className={inputCls} placeholder="e.g. Full Stack Developer"
                  value={exp.jobTitle}
                  onChange={(e) => updateArr(setExperiences, i, 'jobTitle', e.target.value)} />
                <HelperText>Your official designation.</HelperText>
              </div>
              <div>
                <FieldLabel htmlFor={`exp-employmentType-${i}`} value={exp.employmentType}>Employment type</FieldLabel>
                <select id={`exp-employmentType-${i}`} className={inputCls} value={exp.employmentType} onChange={(e) => updateArr(setExperiences, i, 'employmentType', e.target.value)}>
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
                <HelperText>Choose how this role was structured.</HelperText>
              </div>
            </div>

            <div>
              <FieldLabel htmlFor={`exp-company-${i}`} value={exp.company}>Company name *</FieldLabel>
              <input id={`exp-company-${i}`} className={inputCls} placeholder="e.g. Microsoft"
                value={exp.company}
                onChange={(e) => updateArr(setExperiences, i, 'company', e.target.value)} />
              <HelperText>Use the official company name so their logo appears on your profile.</HelperText>
            </div>

            <div className="flex items-center gap-2.5 py-1">
              <input type="checkbox" id={`current-${i}`} className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                checked={exp.currentlyWorking}
                onChange={(e) => updateArr(setExperiences, i, 'currentlyWorking', e.target.checked)} />
              <label htmlFor={`current-${i}`} className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                I am currently working in this role
              </label>
            </div>

            {/* Start Date */}
            <div>
              <FieldLabel value={exp.startMonth && exp.startYear ? `${exp.startMonth} ${exp.startYear}` : ''}>Start date</FieldLabel>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor={`exp-startMonth-${i}`} className="text-[11px] text-slate-600 font-bold uppercase tracking-wider block mb-1">Month</label>
                  <select id={`exp-startMonth-${i}`} className={inputCls} value={exp.startMonth || ''} onChange={(e) => updateArr(setExperiences, i, 'startMonth', e.target.value)}>
                    <option value="">Month</option>
                    {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor={`exp-startYear-${i}`} className="text-[11px] text-slate-600 font-bold uppercase tracking-wider block mb-1">Year *</label>
                  <select id={`exp-startYear-${i}`} className={inputCls} value={exp.startYear || ''} onChange={(e) => updateArr(setExperiences, i, 'startYear', e.target.value)}>
                    <option value="">Year</option>
                    {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel htmlFor={`exp-location-${i}`} value={exp.location}>Location</FieldLabel>
                <input id={`exp-location-${i}`} className={inputCls} placeholder="e.g. London, United Kingdom"
                  value={exp.location}
                  onChange={(e) => updateArr(setExperiences, i, 'location', e.target.value)} />
                <HelperText>The city and country where this job was located.</HelperText>
              </div>
              <div>
                <FieldLabel htmlFor={`exp-locationType-${i}`} value={exp.locationType}>Location type</FieldLabel>
                <select id={`exp-locationType-${i}`} className={inputCls} value={exp.locationType} onChange={(e) => updateArr(setExperiences, i, 'locationType', e.target.value)}>
                  <option value="">Please select</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                </select>
                <HelperText>Choose where you worked.</HelperText>
              </div>
            </div>

            <div>
              <FieldLabel htmlFor={`exp-description-${i}`} value={exp.description}>Description</FieldLabel>
              <div className="relative">
                <textarea id={`exp-description-${i}`} className={`${textareaCls} !pb-12`} rows={4}
                  placeholder="Describe your responsibilities, key achievements, impact..."
                  value={exp.description}
                  onChange={(e) => updateArr(setExperiences, i, 'description', e.target.value)} />
                {exp.description && exp.description.trim() && (
                  <button
                    type="button"
                    disabled={optimizingField?.type === 'experience' && optimizingField?.index === i}
                    onClick={() => onOptimize('experience', i)}
                    className="absolute bottom-2.5 right-2 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {optimizingField?.type === 'experience' && optimizingField?.index === i ? (
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
              <HelperText>List your key responsibilities and accomplishments in bullet points.</HelperText>
            </div>
          </CollapsibleItem>
        ))}
      </div>
      <div className="mt-4">
        <AddMoreBtn onClick={() => addItem(setExperiences, emptyExp)} label="Add Experience" />
      </div>
    </SectionCard>
  );
}
