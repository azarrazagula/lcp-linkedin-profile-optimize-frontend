import React from 'react';
import { OptionalSectionCard, FieldLabel, HelperText, CollapsibleItem, AddMoreBtn, inputCls, textareaCls, IC, MONTHS, YEARS } from './FormHelpers';

export default function VolunteerSection({ volunteerExp, setVolunteerExp, updateArr, addItem, removeItem }) {
  const emptyVol = {
    organization: '', role: '', cause: '',
    currentlyVolunteering: false, startMonth: '', startYear: '', endMonth: '', endYear: '', description: ''
  };

  return (
    <OptionalSectionCard
      title="Volunteer Experience"
      icon={IC.volunteer}
      badge="optional"
      description="Highlight your community service, local volunteering, or leadership work outside of work hours."
      tip="More than 40% of recruiters view volunteer experience as equivalent to paid work experience."
    >
      <div className="space-y-4">
        {volunteerExp.map((vol, i) => (
          <CollapsibleItem
            key={i}
            index={i}
            label={vol.role}
            subtitle={vol.organization}
            canRemove={volunteerExp.length > 1}
            onRemove={() => removeItem(setVolunteerExp, i)}
          >
            <div className="space-y-4">
              {/* Organization */}
              <div>
                <FieldLabel value={vol.organization}>Organization *</FieldLabel>
                <input className={inputCls} placeholder="Ex: Red Cross"
                  value={vol.organization}
                  onChange={(e) => updateArr(setVolunteerExp, i, 'organization', e.target.value)} />
                <HelperText>The name of the organization you volunteered for.</HelperText>
              </div>

              {/* Role */}
              <div>
                <FieldLabel value={vol.role}>Role *</FieldLabel>
                <input className={inputCls} placeholder="Ex: Fundraising Volunteer"
                  value={vol.role}
                  onChange={(e) => updateArr(setVolunteerExp, i, 'role', e.target.value)} />
                <HelperText>Your job title or role during the volunteer work.</HelperText>
              </div>

              {/* Cause */}
              <div>
                <FieldLabel value={vol.cause}>Cause</FieldLabel>
                <select className={inputCls} value={vol.cause || ''} onChange={(e) => updateArr(setVolunteerExp, i, 'cause', e.target.value)}>
                  <option value="">Please select</option>
                  {['Animal Welfare', 'Arts and Culture', 'Children', 'Civil Rights and Social Action', 'Disaster and Humanitarian Relief', 'Economic Empowerment', 'Education', 'Environment', 'Health', 'Human Rights', 'Human Services', 'Science and Technology', 'Social Services', 'Poverty Alleviation', 'Veteran Support', 'Youth Empowerment'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <HelperText>The cause that this organization or volunteer work supports.</HelperText>
              </div>

              {/* Start Date */}
              <div>
                <FieldLabel value={vol.startMonth && vol.startYear ? `${vol.startMonth} ${vol.startYear}` : ''}>Start date</FieldLabel>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Month</span>
                    <select className={inputCls} value={vol.startMonth || ''} onChange={(e) => updateArr(setVolunteerExp, i, 'startMonth', e.target.value)}>
                      <option value="">Month</option>
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Year *</span>
                    <select className={inputCls} value={vol.startYear || ''} onChange={(e) => updateArr(setVolunteerExp, i, 'startYear', e.target.value)}>
                      <option value="">Year</option>
                      {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* End Date */}
              <div>
                <FieldLabel value={vol.endMonth && vol.endYear ? `${vol.endMonth} ${vol.endYear}` : ''}>End date</FieldLabel>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Month</span>
                    <select className={inputCls} value={vol.endMonth || ''} onChange={(e) => updateArr(setVolunteerExp, i, 'endMonth', e.target.value)}>
                      <option value="">Month</option>
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Year *</span>
                    <select className={inputCls} value={vol.endYear || ''} onChange={(e) => updateArr(setVolunteerExp, i, 'endYear', e.target.value)}>
                      <option value="">Year</option>
                      {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <FieldLabel value={vol.description}>Description</FieldLabel>
                <textarea className={textareaCls} rows={3}
                  placeholder="Describe your volunteer impact, duties, and responsibilities..."
                  value={vol.description}
                  onChange={(e) => updateArr(setVolunteerExp, i, 'description', e.target.value)} />
                <HelperText>Explain your volunteer work and the impact you made.</HelperText>
              </div>
            </div>
          </CollapsibleItem>
        ))}
      </div>
      <div className="mt-4">
        <AddMoreBtn onClick={() => addItem(setVolunteerExp, emptyVol)} label="Add Volunteer Experience" />
      </div>
    </OptionalSectionCard>
  );
}
