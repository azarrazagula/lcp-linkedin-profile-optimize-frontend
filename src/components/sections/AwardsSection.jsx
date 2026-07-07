import React from 'react';
import { OptionalSectionCard, FieldLabel, HelperText, CollapsibleItem, AddMoreBtn, inputCls, textareaCls, IC, MONTHS, YEARS } from './FormHelpers';

export default function AwardsSection({ awards, setAwards, updateArr, addItem, removeItem, experiences = [], educations = [], liUrl }) {
  const emptyAward = {
    title: '', associatedWith: '', issuer: '', issueMonth: '', issueYear: '', description: ''
  };

  // Dynamically populate "Associated with" options from Experience companies and Education schools
  const associations = [
    ...experiences.map(exp => exp.company?.trim()).filter(Boolean),
    ...educations.map(edu => edu.school?.trim()).filter(Boolean)
  ];
  const uniqueAssociations = Array.from(new Set(associations));

  return (
    <OptionalSectionCard
      title="Awards & Honors"
      icon={IC.award}
      liUrl={liUrl}
      badge="optional"
      description="Add awards, fellowships, industry recognition, or academic prizes to showcase your achievements."
      tip="Winning awards proves that you go above and beyond in your field, making your profile stand out."
    >
      <div className="space-y-4">
        {awards.map((award, i) => (
          <CollapsibleItem
            key={i}
            index={i}
            label={award.title}
            subtitle={award.issuer}
            canRemove={awards.length > 1}
            onRemove={() => removeItem(setAwards, i)}
          >
            <div className="space-y-4">
              {/* Title */}
              <div>
                <FieldLabel value={award.title}>Title *</FieldLabel>
                <input className={inputCls} placeholder="Ex: Employee of the Month, Hackathon Winner"
                  value={award.title}
                  onChange={(e) => updateArr(setAwards, i, 'title', e.target.value)} />
                <HelperText>The name of the award or honor.</HelperText>
              </div>

              {/* Associated with */}
              <div>
                <FieldLabel value={award.associatedWith}>Associated with</FieldLabel>
                <select className={inputCls} value={award.associatedWith || ''} onChange={(e) => updateArr(setAwards, i, 'associatedWith', e.target.value)}>
                  <option value="">Please select</option>
                  {uniqueAssociations.map((assoc) => (
                    <option key={assoc} value={assoc}>{assoc}</option>
                  ))}
                </select>
                <HelperText>Associate this award with a job or education from your profile.</HelperText>
              </div>

              {/* Issuer */}
              <div>
                <FieldLabel value={award.issuer}>Issuer</FieldLabel>
                <input className={inputCls} placeholder="Ex: Google, Boston University"
                  value={award.issuer}
                  onChange={(e) => updateArr(setAwards, i, 'issuer', e.target.value)} />
                <HelperText>The organization that issued the award.</HelperText>
              </div>

              {/* Issue date */}
              <div>
                <FieldLabel value={award.issueMonth && award.issueYear ? `${award.issueMonth} ${award.issueYear}` : ''}>Issue date</FieldLabel>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Month</span>
                    <select className={inputCls} value={award.issueMonth || ''} onChange={(e) => updateArr(setAwards, i, 'issueMonth', e.target.value)}>
                      <option value="">Month</option>
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Year *</span>
                    <select className={inputCls} value={award.issueYear || ''} onChange={(e) => updateArr(setAwards, i, 'issueYear', e.target.value)}>
                      <option value="">Year</option>
                      {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <FieldLabel value={award.description}>Description</FieldLabel>
                <textarea className={textareaCls} rows={3}
                  placeholder="Ex: Selected out of 500+ participants for outstanding UI redesign work..."
                  value={award.description || ''}
                  onChange={(e) => updateArr(setAwards, i, 'description', e.target.value)} />
                <HelperText>Explain why you received this award and its significance.</HelperText>
              </div>
            </div>
          </CollapsibleItem>
        ))}
      </div>
      <div className="mt-4">
        <AddMoreBtn onClick={() => addItem(setAwards, emptyAward)} label="Add Award / Honor" />
      </div>
    </OptionalSectionCard>
  );
}
