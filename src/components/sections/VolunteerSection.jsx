import React from 'react';
import { OptionalSectionCard, FieldLabel, CollapsibleItem, AddMoreBtn, inputCls, textareaCls, IC, MONTHS, YEARS } from './FormHelpers';

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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel value={vol.role}>Role *</FieldLabel>
                <input className={inputCls} placeholder="e.g. Volunteer Coordinator"
                  value={vol.role}
                  onChange={(e) => updateArr(setVolunteerExp, i, 'role', e.target.value)} />
              </div>
              <div>
                <FieldLabel value={vol.organization}>Organization Name *</FieldLabel>
                <input className={inputCls} placeholder="e.g. Red Cross"
                  value={vol.organization}
                  onChange={(e) => updateArr(setVolunteerExp, i, 'organization', e.target.value)} />
              </div>
            </div>

            <div>
              <FieldLabel value={vol.cause}>Cause</FieldLabel>
              <input className={inputCls} placeholder="e.g. Disaster Relief, Education, Health"
                value={vol.cause}
                onChange={(e) => updateArr(setVolunteerExp, i, 'cause', e.target.value)} />
            </div>

            <div className="flex items-center gap-2.5 py-1">
              <input type="checkbox" id={`vol-current-${i}`} className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                checked={vol.currentlyVolunteering}
                onChange={(e) => updateArr(setVolunteerExp, i, 'currentlyVolunteering', e.target.checked)} />
              <label htmlFor={`vol-current-${i}`} className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                I am currently volunteering in this role
              </label>
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
            {!vol.currentlyVolunteering && (
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
            )}

            <div>
              <FieldLabel value={vol.description}>Description</FieldLabel>
              <textarea className={textareaCls} rows={3}
                placeholder="Describe your volunteer impact, duties, and responsibilities..."
                value={vol.description}
                onChange={(e) => updateArr(setVolunteerExp, i, 'description', e.target.value)} />
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
