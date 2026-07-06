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
                <FieldLabel value={rec.recommenderName}>Recommender Name *</FieldLabel>
                <input className={inputCls} placeholder="e.g. Sarah Jenkins"
                  value={rec.recommenderName}
                  onChange={(e) => updateArr(setRecommendations, i, 'recommenderName', e.target.value)} />
              </div>
              <div>
                <FieldLabel value={rec.relationship}>Relationship *</FieldLabel>
                <input className={inputCls} placeholder="e.g. Managed you directly, Worked in same team"
                  value={rec.relationship}
                  onChange={(e) => updateArr(setRecommendations, i, 'relationship', e.target.value)} />
              </div>
            </div>

            <div>
              <FieldLabel value={rec.text}>Recommendation Text</FieldLabel>
              <textarea className={textareaCls} rows={4}
                placeholder="Ex: 'Alex is an exceptional developer who always goes the extra mile. They delivered the React project ahead of schedule with premium quality...'"
                value={rec.text}
                onChange={(e) => updateArr(setRecommendations, i, 'text', e.target.value)} />
              <HelperText>Paste recommendations you have received on other platforms or direct emails.</HelperText>
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
