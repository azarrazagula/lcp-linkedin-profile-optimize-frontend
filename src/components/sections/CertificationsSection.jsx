import React from 'react';
import { SectionCard, FieldLabel, HelperText, CollapsibleItem, AddMoreBtn, inputCls, IC, MONTHS, YEARS } from './FormHelpers';

export default function CertificationsSection({ certifications, setCertifications, updateArr, addItem, removeItem, liUrl, onReload }) {
  const emptyCert = {
    name: '', issuedBy: '',
    issueMonth: '', issueYear: '',
    expirationMonth: '', expirationYear: '',
    credentialId: '', credentialUrl: ''
  };

  return (
    <SectionCard
      title="Licenses & Certifications"
      icon={IC.cert}
      liUrl={liUrl}
      badge="recommended"
      description="Add your professional certifications, course completions, licenses, or credentials."
      tip="Recruiters actively search for candidates with specific certifications. It helps validate your expertise immediately."
      onReload={onReload}
    >
      <div className="space-y-4">
        {certifications.map((cert, i) => (
          <CollapsibleItem
            key={i}
            index={i}
            label={cert.name}
            subtitle={cert.issuedBy}
            canRemove={certifications.length > 1}
            onRemove={() => removeItem(setCertifications, i)}
          >
            <div>
              <FieldLabel htmlFor={`cert-name-${i}`} value={cert.name}>Name *</FieldLabel>
              <input id={`cert-name-${i}`} className={inputCls} placeholder="e.g. AWS Certified Solutions Architect"
                value={cert.name}
                onChange={(e) => updateArr(setCertifications, i, 'name', e.target.value)} />
              <HelperText>The official title of your certification.</HelperText>
            </div>

            <div>
              <FieldLabel htmlFor={`cert-issuedBy-${i}`} value={cert.issuedBy}>Issuing organization *</FieldLabel>
              <input id={`cert-issuedBy-${i}`} className={inputCls} placeholder="e.g. Amazon Web Services"
                value={cert.issuedBy}
                onChange={(e) => updateArr(setCertifications, i, 'issuedBy', e.target.value)} />
              <HelperText>The company that issued it.</HelperText>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Issue Date */}
              <div>
                <FieldLabel value={cert.issueMonth && cert.issueYear ? `${cert.issueMonth} ${cert.issueYear}` : ''}>Issue date</FieldLabel>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={`cert-issueMonth-${i}`} className="text-[11px] text-slate-600 font-bold uppercase tracking-wider block mb-1">Month</label>
                    <select id={`cert-issueMonth-${i}`} className={inputCls} value={cert.issueMonth || ''} onChange={(e) => updateArr(setCertifications, i, 'issueMonth', e.target.value)}>
                      <option value="">Month</option>
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`cert-issueYear-${i}`} className="text-[11px] text-slate-600 font-bold uppercase tracking-wider block mb-1">Year</label>
                    <select id={`cert-issueYear-${i}`} className={inputCls} value={cert.issueYear || ''} onChange={(e) => updateArr(setCertifications, i, 'issueYear', e.target.value)}>
                      <option value="">Year</option>
                      {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Expiration Date */}
              <div>
                <FieldLabel value={cert.expirationMonth && cert.expirationYear ? `${cert.expirationMonth} ${cert.expirationYear}` : ''}>Expiration date</FieldLabel>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={`cert-expirationMonth-${i}`} className="text-[11px] text-slate-600 font-bold uppercase tracking-wider block mb-1">Month</label>
                    <select id={`cert-expirationMonth-${i}`} className={inputCls} value={cert.expirationMonth || ''} onChange={(e) => updateArr(setCertifications, i, 'expirationMonth', e.target.value)}>
                      <option value="">Month</option>
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`cert-expirationYear-${i}`} className="text-[11px] text-slate-600 font-bold uppercase tracking-wider block mb-1">Year</label>
                    <select id={`cert-expirationYear-${i}`} className={inputCls} value={cert.expirationYear || ''} onChange={(e) => updateArr(setCertifications, i, 'expirationYear', e.target.value)}>
                      <option value="">Year</option>
                      {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel htmlFor={`cert-credentialId-${i}`} value={cert.credentialId}>Credential ID</FieldLabel>
                <input id={`cert-credentialId-${i}`} className={inputCls} placeholder="e.g. ABC-123456"
                  value={cert.credentialId || ''}
                  onChange={(e) => updateArr(setCertifications, i, 'credentialId', e.target.value)} />
                <HelperText>The unique registration or certificate number.</HelperText>
              </div>
              <div>
                <FieldLabel htmlFor={`cert-credentialUrl-${i}`} value={cert.credentialUrl}>Credential URL</FieldLabel>
                <input id={`cert-credentialUrl-${i}`} className={inputCls} placeholder="https://certificate-url.com"
                  value={cert.credentialUrl || ''}
                  onChange={(e) => updateArr(setCertifications, i, 'credentialUrl', e.target.value)} />
                <HelperText>Link to verify the certificate online.</HelperText>
              </div>
            </div>
          </CollapsibleItem>
        ))}
      </div>
      <div className="mt-4">
        <AddMoreBtn onClick={() => addItem(setCertifications, emptyCert)} label="Add Certification" />
      </div>
    </SectionCard>
  );
}
