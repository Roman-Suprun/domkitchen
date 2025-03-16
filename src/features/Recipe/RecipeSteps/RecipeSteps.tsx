'use client';

import { FC, useState } from 'react';

import { CheckCircle, Circle } from 'lucide-react';

type RecipeStep = {
  id: string;
  stepOrder: number;
  description: string;
};

type RecipeStepsProps = {
  steps: RecipeStep[];
};

export const RecipeSteps: FC<RecipeStepsProps> = ({ steps }) => {
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (id: string) => {
    setCheckedSteps(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="max-w-3xl mt-14">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Recipe Steps
      </h2>
      <ul className="space-y-4">
        {steps
          .sort((a, b) => a.stepOrder - b.stepOrder)
          .map(step => (
            <li key={step.id} className="flex">
              <button
                type="button"
                className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition w-full text-left"
                onClick={() => toggleStep(step.id)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') toggleStep(step.id);
                }}
                aria-pressed={checkedSteps[step.id]}
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-full">
                  {checkedSteps[step.id] ? (
                    <CheckCircle className="text-green-500 w-6 h-6" />
                  ) : (
                    <Circle className="text-gray-400 w-6 h-6" />
                  )}
                </span>
                <span
                  className={`flex-1 text-lg ${
                    checkedSteps[step.id]
                      ? 'line-through text-gray-500'
                      : 'text-gray-900'
                  }`}
                >
                  {step.description}
                </span>
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};
