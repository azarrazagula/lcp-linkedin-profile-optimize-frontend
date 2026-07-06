import React from 'react';
import { SectionCard, FieldLabel, AddMoreBtn, RemoveBtn, inputCls, textareaCls, IC, MONTHS, YEARS } from './FormHelpers';

export default function EducationSection({ educations, setEducations, updateArr, addItem, removeItem, liUrl }) {
  const emptyEdu = {
    school: '', degree: '', fieldOfStudy: '',
    startMonth: '', startYear: '', endMonth: '', endYear: '',
    grade: '', activities: '', description: ''
  };

  return (
    <SectionCard title="Education" icon={IC.edu} liUrl={liUrl}>
      {educations.map((edu, i) => (
        <div key={i} className="space-y-3.5 pb-5 border-b border-slate-800/60 last:border-0 last:pb-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-400/80 uppercase tracking-widest">
              Education {i + 1}
            </span>
            {educations.length > 1 && <RemoveBtn onClick={() => removeItem(setEducations, i)} />}
          </div>

          <div>
            <FieldLabel value={edu.school}>School *</FieldLabel>
            <input className={inputCls} placeholder="Ex: Boston University"
              value={edu.school}
              onChange={(e) => updateArr(setEducations, i, 'school', e.target.value)} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <FieldLabel value={edu.degree}>Degree</FieldLabel>
              <input className={inputCls} placeholder="Ex: Bachelor's"
                value={edu.degree}
                onChange={(e) => updateArr(setEducations, i, 'degree', e.target.value)} />
            </div>
            <div>
              <FieldLabel value={edu.fieldOfStudy}>Field of study</FieldLabel>
              <input className={inputCls} placeholder="Ex: Business"
                value={edu.fieldOfStudy}
                onChange={(e) => updateArr(setEducations, i, 'fieldOfStudy', e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Start Date */}
            <div>
              <FieldLabel value={edu.startMonth && edu.startYear ? `${edu.startMonth} ${edu.startYear}` : ''}>Start date</FieldLabel>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-slate-500 font-medium block mb-1">Month</span>
                  <select className={inputCls} value={edu.startMonth || ''} onChange={(e) => updateArr(setEducations, i, 'startMonth', e.target.value)}>
                    <option value="">Month</option>
                    {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-medium block mb-1">Year *</span>
                  <select className={inputCls} value={edu.startYear || ''} onChange={(e) => updateArr(setEducations, i, 'startYear', e.target.value)}>
                    <option value="">Year</option>
                    {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* End Date */}
            <div>
              <FieldLabel value={edu.endMonth && edu.endYear ? `${edu.endMonth} ${edu.endYear}` : ''}>End date (or expected)</FieldLabel>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-slate-500 font-medium block mb-1">Month</span>
                  <select className={inputCls} value={edu.endMonth || ''} onChange={(e) => updateArr(setEducations, i, 'endMonth', e.target.value)}>
                    <option value="">Month</option>
                    {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-medium block mb-1">Year *</span>
                  <select className={inputCls} value={edu.endYear || ''} onChange={(e) => updateArr(setEducations, i, 'endYear', e.target.value)}>
                    <option value="">Year</option>
                    {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <FieldLabel value={edu.grade}>Grade</FieldLabel>
              <input className={inputCls} placeholder="Ex: First Class / 3.8 GPA"
                value={edu.grade}
                onChange={(e) => updateArr(setEducations, i, 'grade', e.target.value)} />
            </div>
            <div>
              <FieldLabel value={edu.activities}>Activities and societies</FieldLabel>
              <input className={inputCls} placeholder="Ex: Chess Club, Tech Lead"
                value={edu.activities}
                onChange={(e) => updateArr(setEducations, i, 'activities', e.target.value)} />
            </div>
          </div>

          <div>
            <FieldLabel value={edu.description}>Description</FieldLabel>
            <textarea className={textareaCls} rows={3}
              placeholder="Describe your coursework, honors, projects, thesis..."
              value={edu.description}
              onChange={(e) => updateArr(setEducations, i, 'description', e.target.value)} />
          </div>
        </div>
      ))}
      <AddMoreBtn onClick={() => addItem(setEducations, emptyEdu)} />
    </SectionCard>
  );
}
