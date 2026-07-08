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
              <FieldLabel htmlFor={`edu-school-${i}`} value={edu.school}>School *</FieldLabel>
              <input id={`edu-school-${i}`} className={inputCls} placeholder="e.g. Harvard University"
                value={edu.school}
                onChange={(e) => updateArr(setEducations, i, 'school', e.target.value)} />
              <HelperText>The official name of your school, college, or university.</HelperText>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel htmlFor={`edu-degree-${i}`} value={edu.degree}>Degree</FieldLabel>
                <input id={`edu-degree-${i}`} className={inputCls} placeholder="e.g. Bachelor of Science"
                  value={edu.degree}
                  onChange={(e) => updateArr(setEducations, i, 'degree', e.target.value)} />
                 <HelperText>The degree or diploma you earned.</HelperText>
              </div>
              <div>
                <FieldLabel htmlFor={`edu-fieldOfStudy-${i}`} value={edu.fieldOfStudy}>Field of study</FieldLabel>
                <input id={`edu-fieldOfStudy-${i}`} className={inputCls} placeholder="e.g. Computer Science"
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
                    <label htmlFor={`edu-startMonth-${i}`} className="text-[11px] text-slate-600 font-bold uppercase tracking-wider block mb-1">Month</label>
                    <select id={`edu-startMonth-${i}`} className={inputCls} value={edu.startMonth || ''} onChange={(e) => updateArr(setEducations, i, 'startMonth', e.target.value)}>
                      <option value="">Month</option>
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`edu-startYear-${i}`} className="text-[11px] text-slate-600 font-bold uppercase tracking-wider block mb-1">Year *</label>
                    <select id={`edu-startYear-${i}`} className={inputCls} value={edu.startYear || ''} onChange={(e) => updateArr(setEducations, i, 'startYear', e.target.value)}>
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
                    <label htmlFor={`edu-endMonth-${i}`} className="text-[11px] text-slate-600 font-bold uppercase tracking-wider block mb-1">Month</label>
                    <select id={`edu-endMonth-${i}`} className={inputCls} value={edu.endMonth || ''} onChange={(e) => updateArr(setEducations, i, 'endMonth', e.target.value)}>
                      <option value="">Month</option>
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`edu-endYear-${i}`} className="text-[11px] text-slate-600 font-bold uppercase tracking-wider block mb-1">Year *</label>
                    <select id={`edu-endYear-${i}`} className={inputCls} value={edu.endYear || ''} onChange={(e) => updateArr(setEducations, i, 'endYear', e.target.value)}>
                      <option value="">Year</option>
                      {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel htmlFor={`edu-grade-${i}`} value={edu.grade}>Grade</FieldLabel>
                <input id={`edu-grade-${i}`} className={inputCls} placeholder="e.g. 8.5 CGPA / 3.8 GPA"
                  value={edu.grade}
                  onChange={(e) => updateArr(setEducations, i, 'grade', e.target.value)} />
                 <HelperText>Your final score or GPA.</HelperText>
              </div>
              <div>
                <FieldLabel htmlFor={`edu-activities-${i}`} value={edu.activities}>Activities and societies</FieldLabel>
                <input id={`edu-activities-${i}`} className={inputCls} placeholder="e.g. Debate Club, Basketball Team"
                  value={edu.activities}
                  onChange={(e) => updateArr(setEducations, i, 'activities', e.target.value)} />
                 <HelperText>Clubs, sports, or student organizations you participated in.</HelperText>
              </div>
            </div>

            <div>
              <FieldLabel htmlFor={`edu-description-${i}`} value={edu.description}>Description</FieldLabel>
              <textarea id={`edu-description-${i}`} className={textareaCls} rows={3}
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
