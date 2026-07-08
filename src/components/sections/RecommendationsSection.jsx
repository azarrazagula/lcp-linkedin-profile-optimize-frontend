import React from 'react';
import { OptionalSectionCard, FieldLabel, HelperText, CollapsibleItem, AddMoreBtn, inputCls, textareaCls, IC } from './FormHelpers';

export default function RecommendationsSection({ recommendations, setRecommendations, updateArr, addItem, removeItem }) {
  const emptyRec = {
    recommenderName: '', relationship: '', text: ''
  };

  return (
    <OptionalSectionCard
      title="Recommendations"
      icon={IC.recommend}
      badge="optional"
      description="Showcase testimonials and feedback from managers, colleagues, clients, or classmates."
      tip="Recommendations act as social proof. Having even 1 or 2 positive testimonials drastically improves recruiter trust."
    >
      <div className="space-y-4">
        {recommendations.map((rec, i) => (
          <CollapsibleItem
            key={i}
            index={i}
            label={rec.recommenderName}
            subtitle={rec.relationship}
            canRemove={recommendations.length > 1}
            onRemove={() => removeItem(setRecommendations, i)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel htmlFor={`rec-recommenderName-${i}`} value={rec.recommenderName}>Recommender Name *</FieldLabel>
                <input id={`rec-recommenderName-${i}`} className={inputCls} placeholder="e.g. Sarah Jenkins"
                  value={rec.recommenderName}
                  onChange={(e) => updateArr(setRecommendations, i, 'recommenderName', e.target.value)} />
                <HelperText>The name of the person giving you the recommendation.</HelperText>
              </div>
              <div>
                <FieldLabel htmlFor={`rec-relationship-${i}`} value={rec.relationship}>Relationship *</FieldLabel>
                <input id={`rec-relationship-${i}`} className={inputCls} placeholder="e.g. Managed you directly, Worked in same team"
                  value={rec.relationship}
                  onChange={(e) => updateArr(setRecommendations, i, 'relationship', e.target.value)} />
                <HelperText>How you worked with this person.</HelperText>
              </div>
            </div>

            <div>
              <FieldLabel htmlFor={`rec-text-${i}`} value={rec.text}>Recommendation Text</FieldLabel>
              <textarea id={`rec-text-${i}`} className={textareaCls} rows={4}
                placeholder="Ex: 'Alex is an exceptional developer who always goes the extra mile. They delivered the React project ahead of schedule with premium quality...'"
                value={rec.text}
                onChange={(e) => updateArr(setRecommendations, i, 'text', e.target.value)} />
              <HelperText>The recommendation text detailing your work ethic and skills.</HelperText>
            </div>
          </CollapsibleItem>
        ))}
      </div>
      <div className="mt-4">
        <AddMoreBtn onClick={() => addItem(setRecommendations, emptyRec)} label="Add Recommendation" />
      </div>
    </OptionalSectionCard>
  );
}
