import React from 'react';
import { SectionCard, FieldLabel, HelperText, CollapsibleItem, AddMoreBtn, inputCls, textareaCls, IC, MONTHS, YEARS } from './FormHelpers';

export default function ExperienceSection({ experiences, setExperiences, updateArr, addItem, removeItem, liUrl }) {
  const emptyExp = {
    jobTitle: '', company: '', employmentType: '', location: '', locationType: '',
    currentlyWorking: false, startMonth: '', startYear: '', description: '',
    profileHeadline: '', foundVia: ''
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
                <FieldLabel value={exp.jobTitle}>Title *</FieldLabel>
                <input className={inputCls} placeholder="e.g. Full Stack Developer"
                  value={exp.jobTitle}
                  onChange={(e) => updateArr(setExperiences, i, 'jobTitle', e.target.value)} />
                <HelperText>Your official designation.</HelperText>
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
                <HelperText>Choose how this role was structured.</HelperText>
              </div>
            </div>

            <div>
              <FieldLabel value={exp.company}>Company name *</FieldLabel>
              <input className={inputCls} placeholder="e.g. Microsoft"
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
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Month</span>
                  <select className={inputCls} value={exp.startMonth || ''} onChange={(e) => updateArr(setExperiences, i, 'startMonth', e.target.value)}>
                    <option value="">Month</option>
                    {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Year *</span>
                  <select className={inputCls} value={exp.startYear || ''} onChange={(e) => updateArr(setExperiences, i, 'startYear', e.target.value)}>
                    <option value="">Year</option>
                    {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel value={exp.location}>Location</FieldLabel>
                <input className={inputCls} placeholder="e.g. London, United Kingdom"
                  value={exp.location}
                  onChange={(e) => updateArr(setExperiences, i, 'location', e.target.value)} />
                <HelperText>The city and country where this job was located.</HelperText>
              </div>
              <div>
                <FieldLabel value={exp.locationType}>Location type</FieldLabel>
                <select className={inputCls} value={exp.locationType} onChange={(e) => updateArr(setExperiences, i, 'locationType', e.target.value)}>
                  <option value="">Please select</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                </select>
                <HelperText>Choose where you worked.</HelperText>
              </div>
            </div>

            <div>
              <FieldLabel value={exp.description}>Description</FieldLabel>
              <textarea className={textareaCls} rows={4}
                placeholder="Describe your responsibilities, key achievements, impact..."
                value={exp.description}
                onChange={(e) => updateArr(setExperiences, i, 'description', e.target.value)} />
              <HelperText>List your key responsibilities and accomplishments in bullet points.</HelperText>
            </div>

            <div>
              <FieldLabel value={exp.profileHeadline}>Profile headline</FieldLabel>
              <input className={inputCls} placeholder="Appears below your name at top of profile"
                value={exp.profileHeadline}
                onChange={(e) => updateArr(setExperiences, i, 'profileHeadline', e.target.value)} />
              <HelperText>An optional headline for this role. Leave blank to use your main profile headline.</HelperText>
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
