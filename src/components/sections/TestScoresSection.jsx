import React from 'react';
import { OptionalSectionCard, FieldLabel, CollapsibleItem, AddMoreBtn, DateRow, inputCls, IC } from './FormHelpers';

export default function TestScoresSection({ testScores, setTestScores, updateArr, addItem, removeItem }) {
  const emptyScore = {
    name: '', score: '', testMonth: '', testYear: '', description: ''
  };

  return (
    <OptionalSectionCard
      title="Test Scores"
      icon={IC.test}
      badge="optional"
      audienceHint="Recommended for Students"
      description="List standardized test scores (e.g., GRE, GMAT, SAT, TOEFL, or specialized examinations) that showcase your analytical abilities."
      tip="High test scores show analytical capabilities and academic potential, especially useful for university admissions or entry-level roles."
    >
      <div className="space-y-4">
        {testScores.map((scoreObj, i) => (
          <CollapsibleItem
            key={i}
            index={i}
            label={scoreObj.name}
            subtitle={scoreObj.score ? `Score: ${scoreObj.score}` : ''}
            canRemove={testScores.length > 1}
            onRemove={() => removeItem(setTestScores, i)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel value={scoreObj.name}>Test Name *</FieldLabel>
                <input className={inputCls} placeholder="e.g. GRE, GMAT, TOEFL"
                  value={scoreObj.name}
                  onChange={(e) => updateArr(setTestScores, i, 'name', e.target.value)} />
              </div>
              <div>
                <FieldLabel value={scoreObj.score}>Score *</FieldLabel>
                <input className={inputCls} placeholder="e.g. 330/340, Band 8.5"
                  value={scoreObj.score}
                  onChange={(e) => updateArr(setTestScores, i, 'score', e.target.value)} />
              </div>
            </div>

            <div>
              <FieldLabel value={scoreObj.testMonth && scoreObj.testYear ? `${scoreObj.testMonth} ${scoreObj.testYear}` : ''}>Test Date</FieldLabel>
              <DateRow
                monthVal={scoreObj.testMonth}
                yearVal={scoreObj.testYear}
                onMonthChange={(e) => updateArr(setTestScores, i, 'testMonth', e.target.value)}
                onYearChange={(e) => updateArr(setTestScores, i, 'testYear', e.target.value)}
              />
            </div>

            <div>
              <FieldLabel value={scoreObj.description}>Description</FieldLabel>
              <textarea className={inputCls} rows={2}
                placeholder="Ex: Percentiles or sections breakdown (e.g. Quantitative: 170, Verbal: 160)..."
                value={scoreObj.description || ''}
                onChange={(e) => updateArr(setTestScores, i, 'description', e.target.value)} />
            </div>
          </CollapsibleItem>
        ))}
      </div>
      <div className="mt-4">
        <AddMoreBtn onClick={() => addItem(setTestScores, emptyScore)} label="Add Test Score" />
      </div>
    </OptionalSectionCard>
  );
}
