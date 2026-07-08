import React from 'react';
import { OptionalSectionCard, FieldLabel, HelperText, CollapsibleItem, AddMoreBtn, inputCls, textareaCls, IC, MONTHS, YEARS } from './FormHelpers';

export default function VolunteerSection({ volunteerExp, setVolunteerExp, updateArr, addItem, removeItem, liUrl, onOptimize, optimizingField, onReload }) {
  const emptyVol = {
    organization: '', role: '', cause: '',
    currentlyVolunteering: false, startMonth: '', startYear: '', endMonth: '', endYear: '', description: ''
  };

  return (
    <OptionalSectionCard
      title="Volunteer Experience"
      icon={IC.volunteer}
      liUrl={liUrl}
      badge="optional"
      description="Highlight your community service, local volunteering, or leadership work outside of work hours."
      tip="More than 40% of recruiters view volunteer experience as equivalent to paid work experience."
      onReload={onReload}
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
                <FieldLabel htmlFor={`vol-organization-${i}`} value={vol.organization}>Organization *</FieldLabel>
                <input id={`vol-organization-${i}`} className={inputCls} placeholder="Ex: Red Cross"
                  value={vol.organization}
                  onChange={(e) => updateArr(setVolunteerExp, i, 'organization', e.target.value)} />
                <HelperText>The name of the organization you volunteered for.</HelperText>
              </div>

              {/* Role */}
              <div>
                <FieldLabel htmlFor={`vol-role-${i}`} value={vol.role}>Role *</FieldLabel>
                <input id={`vol-role-${i}`} className={inputCls} placeholder="Ex: Fundraising Volunteer"
                  value={vol.role}
                  onChange={(e) => updateArr(setVolunteerExp, i, 'role', e.target.value)} />
                <HelperText>Your job title or role during the volunteer work.</HelperText>
              </div>

              {/* Cause */}
              <div>
                <FieldLabel htmlFor={`vol-cause-${i}`} value={vol.cause}>Cause</FieldLabel>
                <select id={`vol-cause-${i}`} className={inputCls} value={vol.cause || ''} onChange={(e) => updateArr(setVolunteerExp, i, 'cause', e.target.value)}>
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
                    <label htmlFor={`vol-startMonth-${i}`} className="text-[11px] text-slate-600 font-bold uppercase tracking-wider block mb-1">Month</label>
                    <select id={`vol-startMonth-${i}`} className={inputCls} value={vol.startMonth || ''} onChange={(e) => updateArr(setVolunteerExp, i, 'startMonth', e.target.value)}>
                      <option value="">Month</option>
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`vol-startYear-${i}`} className="text-[11px] text-slate-600 font-bold uppercase tracking-wider block mb-1">Year *</label>
                    <select id={`vol-startYear-${i}`} className={inputCls} value={vol.startYear || ''} onChange={(e) => updateArr(setVolunteerExp, i, 'startYear', e.target.value)}>
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
                    <label htmlFor={`vol-endMonth-${i}`} className="text-[11px] text-slate-600 font-bold uppercase tracking-wider block mb-1">Month</label>
                    <select id={`vol-endMonth-${i}`} className={inputCls} value={vol.endMonth || ''} onChange={(e) => updateArr(setVolunteerExp, i, 'endMonth', e.target.value)}>
                      <option value="">Month</option>
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`vol-endYear-${i}`} className="text-[11px] text-slate-600 font-bold uppercase tracking-wider block mb-1">Year *</label>
                    <select id={`vol-endYear-${i}`} className={inputCls} value={vol.endYear || ''} onChange={(e) => updateArr(setVolunteerExp, i, 'endYear', e.target.value)}>
                      <option value="">Year</option>
                      {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <FieldLabel htmlFor={`vol-description-${i}`} value={vol.description}>Description</FieldLabel>
                <div className="relative">
                  <textarea id={`vol-description-${i}`} className={`${textareaCls} !pb-12`} rows={3}
                    placeholder="Describe your volunteer impact, duties, and responsibilities..."
                    value={vol.description}
                    onChange={(e) => updateArr(setVolunteerExp, i, 'description', e.target.value)} />
                  {vol.description && vol.description.trim() && (
                    <button
                      type="button"
                      disabled={optimizingField?.type === 'volunteer' && optimizingField?.index === i}
                      onClick={() => onOptimize('volunteer', i)}
                      className="absolute bottom-2.5 right-2 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {optimizingField?.type === 'volunteer' && optimizingField?.index === i ? (
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
