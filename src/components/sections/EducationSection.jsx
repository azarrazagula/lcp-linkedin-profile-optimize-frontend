import React from 'react';
import { SectionCard, FieldLabel, HelperText, CollapsibleItem, AddMoreBtn, inputCls, textareaCls, IC, MONTHS, YEARS } from './FormHelpers';

export default function EducationSection({ educations, setEducations, updateArr, addItem, removeItem, liUrl }) {
  const emptyEdu = {
    school: '', degree: '', fieldOfStudy: '',
    startMonth: '', startYear: '', endMonth: '', endYear: '',
    grade: '', activities: '', description: ''
  };

  return (
    <SectionCard
      title="Education"
      icon={IC.edu}
      liUrl={liUrl}
      badge="required"
      description="Add your academic qualifications, schools, colleges, and degrees. This is important to verify your credentials."
      tip="Adding details of your field of study or coursework can help matching algorithms find related entry-level openings."
    >
      <div className="space-y-4">
        {educations.map((edu, i) => (
          <CollapsibleItem
            key={i}
            index={i}
            label={edu.school}
            subtitle={edu.degree}
            canRemove={educations.length > 1}
            onRemove={() => removeItem(setEducations, i)}
          >
            <div>
              <FieldLabel value={edu.school}>School *</FieldLabel>
              <input className={inputCls} placeholder="e.g. Harvard University"
                value={edu.school}
                onChange={(e) => updateArr(setEducations, i, 'school', e.target.value)} />
              <HelperText>The official name of your school, college, or university.</HelperText>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel value={edu.degree}>Degree</FieldLabel>
                <input className={inputCls} placeholder="e.g. Bachelor of Science"
                  value={edu.degree}
                  onChange={(e) => updateArr(setEducations, i, 'degree', e.target.value)} />
                 <HelperText>The degree or diploma you earned.</HelperText>
              </div>
              <div>
                <FieldLabel value={edu.fieldOfStudy}>Field of study</FieldLabel>
                <input className={inputCls} placeholder="e.g. Computer Science"
                  value={edu.fieldOfStudy}
                  onChange={(e) => updateArr(setEducations, i, 'fieldOfStudy', e.target.value)} />
                 <HelperText>Your major or specialization.</HelperText>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Start Date */}
              <div>
                <FieldLabel value={edu.startMonth && edu.startYear ? `${edu.startMonth} ${edu.startYear}` : ''}>Start date</FieldLabel>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Month</span>
                    <select className={inputCls} value={edu.startMonth || ''} onChange={(e) => updateArr(setEducations, i, 'startMonth', e.target.value)}>
                      <option value="">Month</option>
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Year *</span>
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
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Month</span>
                    <select className={inputCls} value={edu.endMonth || ''} onChange={(e) => updateArr(setEducations, i, 'endMonth', e.target.value)}>
                      <option value="">Month</option>
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Year *</span>
                    <select className={inputCls} value={edu.endYear || ''} onChange={(e) => updateArr(setEducations, i, 'endYear', e.target.value)}>
                      <option value="">Year</option>
                      {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel value={edu.grade}>Grade</FieldLabel>
                <input className={inputCls} placeholder="e.g. 8.5 CGPA / 3.8 GPA"
                  value={edu.grade}
                  onChange={(e) => updateArr(setEducations, i, 'grade', e.target.value)} />
                 <HelperText>Your final score or GPA.</HelperText>
              </div>
              <div>
                <FieldLabel value={edu.activities}>Activities and societies</FieldLabel>
                <input className={inputCls} placeholder="e.g. Debate Club, Basketball Team"
                  value={edu.activities}
                  onChange={(e) => updateArr(setEducations, i, 'activities', e.target.value)} />
                 <HelperText>Clubs, sports, or student organizations you participated in.</HelperText>
              </div>
            </div>

            <div>
              <FieldLabel value={edu.description}>Description</FieldLabel>
              <textarea className={textareaCls} rows={3}
                placeholder="Describe your coursework, honors, key academic projects, thesis..."
                value={edu.description}
                onChange={(e) => updateArr(setEducations, i, 'description', e.target.value)} />
              <HelperText>Summarize your key courses, academic projects, or achievements.</HelperText>
            </div>
          </CollapsibleItem>
        ))}
      </div>
      <div className="mt-4">
        <AddMoreBtn onClick={() => addItem(setEducations, emptyEdu)} label="Add Education" />
      </div>
    </SectionCard>
  );
}
