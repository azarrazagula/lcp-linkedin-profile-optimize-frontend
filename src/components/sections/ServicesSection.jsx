import React from 'react';
import { SectionCard, FieldLabel, inputCls, textareaCls, IC } from './FormHelpers';

export default function ServicesSection({ services, setServices, liUrl }) {
  return (
    <SectionCard title="Providing Services" icon={IC.service} liUrl={liUrl}>
      <div>
        <FieldLabel>Services Offered (comma-separated)</FieldLabel>
        <input className={inputCls} placeholder="e.g. Web Development, Full Stack Development, UI/UX Design, Consulting"
          value={services.servicesOffered || ''}
          onChange={(e) => setServices({ ...services, servicesOffered: e.target.value })} />
      </div>

      <div>
        <FieldLabel>Services Description</FieldLabel>
        <textarea className={textareaCls} rows={3}
          placeholder="Describe the services you offer, technologies used, project turnarounds, or pricing terms..."
          value={services.description || ''}
          onChange={(e) => setServices({ ...services, description: e.target.value })} />
      </div>
    </SectionCard>
  );
}
