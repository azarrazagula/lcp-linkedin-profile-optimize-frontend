import React from 'react';
import { OptionalSectionCard, FieldLabel, HelperText, CollapsibleItem, AddMoreBtn, inputCls, textareaCls, IC, MONTHS, YEARS } from './FormHelpers';

export default function TestScoresSection({ testScores, setTestScores, updateArr, addItem, removeItem, liUrl }) {
  const emptyScore = {
    name: '', score: '', associatedWith: '', testMonth: '', testYear: '', description: ''
  };

  return (
    <OptionalSectionCard
      title="Test Scores"
      icon={IC.test}
      liUrl={liUrl}
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
            <div className="space-y-4">
              {/* Title */}
              <div>
                <FieldLabel value={scoreObj.name}>Title *</FieldLabel>
                <input className={inputCls} placeholder="Ex: GRE, GMAT, TOEFL"
                  value={scoreObj.name}
                  onChange={(e) => updateArr(setTestScores, i, 'name', e.target.value)} />
                <HelperText>The name of the exam or test.</HelperText>
              </div>

              {/* Associated with */}
              <div>
                <FieldLabel value={scoreObj.associatedWith}>Associated with</FieldLabel>
                <input className={inputCls} placeholder="Ex: Boston University"
                  value={scoreObj.associatedWith || ''}
                  onChange={(e) => updateArr(setTestScores, i, 'associatedWith', e.target.value)} />
                <HelperText>The school, college, or company associated with this test.</HelperText>
              </div>

              {/* Score */}
              <div>
                <FieldLabel value={scoreObj.score}>Score *</FieldLabel>
                <input className={inputCls} placeholder="Ex: 330/340, Band 8.5"
                  value={scoreObj.score}
                  onChange={(e) => updateArr(setTestScores, i, 'score', e.target.value)} />
                <HelperText>Your test score or percentile.</HelperText>
              </div>

              {/* Test date */}
              <div>
                <FieldLabel value={scoreObj.testMonth && scoreObj.testYear ? `${scoreObj.testMonth} ${scoreObj.testYear}` : ''}>Test date</FieldLabel>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Month</span>
                    <select className={inputCls} value={scoreObj.testMonth || ''} onChange={(e) => updateArr(setTestScores, i, 'testMonth', e.target.value)}>
                      <option value="">Month</option>
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Year *</span>
                    <select className={inputCls} value={scoreObj.testYear || ''} onChange={(e) => updateArr(setTestScores, i, 'testYear', e.target.value)}>
                      <option value="">Year</option>
                      {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <FieldLabel value={scoreObj.description}>Description</FieldLabel>
                <textarea className={textareaCls} rows={3}
                  placeholder="Ex: Percentiles or sections breakdown (e.g. Quantitative: 170, Verbal: 160)..."
                  value={scoreObj.description || ''}
                  onChange={(e) => updateArr(setTestScores, i, 'description', e.target.value)} />
                <HelperText>Any additional details about the test or your performance.</HelperText>
              </div>
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
