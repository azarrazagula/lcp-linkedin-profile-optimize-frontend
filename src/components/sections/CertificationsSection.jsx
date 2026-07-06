import React from 'react';
import { SectionCard, FieldLabel, AddMoreBtn, RemoveBtn, inputCls, IC, MONTHS, YEARS } from './FormHelpers';

export default function CertificationsSection({ certifications, setCertifications, updateArr, addItem, removeItem, liUrl }) {
  const emptyCert = {
    name: '', issuedBy: '',
    issueMonth: '', issueYear: '',
    expirationMonth: '', expirationYear: '',
    credentialId: '', credentialUrl: ''
  };

  return (
    <SectionCard title="Licenses & Certifications" icon={IC.cert} liUrl={liUrl}>
      {certifications.map((cert, i) => (
        <div key={i} className="space-y-3.5 pb-5 border-b border-slate-800/60 last:border-0 last:pb-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-400/80 uppercase tracking-widest">
              Certification {i + 1}
            </span>
            {certifications.length > 1 && <RemoveBtn onClick={() => removeItem(setCertifications, i)} />}
          </div>

          <div>
            <FieldLabel>Name *</FieldLabel>
            <input className={inputCls} placeholder="Ex: Microsoft certified network associate security"
              value={cert.name}
              onChange={(e) => updateArr(setCertifications, i, 'name', e.target.value)} />
          </div>

          <div>
            <FieldLabel>Issuing organization *</FieldLabel>
            <input className={inputCls} placeholder="Ex: Microsoft"
              value={cert.issuedBy}
              onChange={(e) => updateArr(setCertifications, i, 'issuedBy', e.target.value)} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Issue Date */}
            <div>
              <FieldLabel>Issue date</FieldLabel>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-slate-500 font-medium block mb-1">Month</span>
                  <select className={inputCls} value={cert.issueMonth || ''} onChange={(e) => updateArr(setCertifications, i, 'issueMonth', e.target.value)}>
                    <option value="">Month</option>
                    {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-medium block mb-1">Year</span>
                  <select className={inputCls} value={cert.issueYear || ''} onChange={(e) => updateArr(setCertifications, i, 'issueYear', e.target.value)}>
                    <option value="">Year</option>
                    {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Expiration Date */}
            <div>
              <FieldLabel>Expiration date</FieldLabel>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-slate-500 font-medium block mb-1">Month</span>
                  <select className={inputCls} value={cert.expirationMonth || ''} onChange={(e) => updateArr(setCertifications, i, 'expirationMonth', e.target.value)}>
                    <option value="">Month</option>
                    {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-medium block mb-1">Year</span>
                  <select className={inputCls} value={cert.expirationYear || ''} onChange={(e) => updateArr(setCertifications, i, 'expirationYear', e.target.value)}>
                    <option value="">Year</option>
                    {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <FieldLabel>Credential ID</FieldLabel>
              <input className={inputCls} placeholder="e.g. ABC-123456"
                value={cert.credentialId || ''}
                onChange={(e) => updateArr(setCertifications, i, 'credentialId', e.target.value)} />
            </div>
            <div>
              <FieldLabel>Credential URL</FieldLabel>
              <input className={inputCls} placeholder="https://certificate-url.com"
                value={cert.credentialUrl || ''}
                onChange={(e) => updateArr(setCertifications, i, 'credentialUrl', e.target.value)} />
            </div>
          </div>
        </div>
      ))}
      <AddMoreBtn onClick={() => addItem(setCertifications, emptyCert)} />
    </SectionCard>
  );
}
