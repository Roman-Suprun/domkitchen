'use client';

import { FC, useState } from 'react';

import { CheckCircle, Circle } from 'lucide-react';

import { FullRecipeIngredient } from 'shared/ts/common';

type RecipeIngredientsProps = {
  ingredients?: FullRecipeIngredient[];
};

export const RecipeIngredients: FC<RecipeIngredientsProps> = ({
  ingredients,
}) => {
  const [checkedIngredients, setCheckedIngredients] = useState<
    Record<string, boolean>
  >({});

  if (!ingredients) {
    return null;
  }

  const toggleIngredient = (id: string) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="max-w-3xl mt-14">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ingredients</h2>
      <ul className="space-y-4">
        {ingredients.map(ingredient => (
          <li key={ingredient.id} className="flex">
            <button
              type="button"
              className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition w-full text-left"
              onClick={() => toggleIngredient(ingredient.id)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ')
                  toggleIngredient(ingredient.id);
              }}
              aria-pressed={checkedIngredients[ingredient.id]}
            >
              <span className="w-8 h-8 flex items-center justify-center rounded-full">
                {checkedIngredients[ingredient.id] ? (
                  <CheckCircle className="text-green-500 w-6 h-6" />
                ) : (
                  <Circle className="text-gray-400 w-6 h-6" />
                )}
              </span>
              <span
                className={`flex-1 text-lg ${
                  checkedIngredients[ingredient.id]
                    ? 'line-through text-gray-500'
                    : 'text-gray-900'
                }`}
              >
                {ingredient.quantity} {ingredient.quantityType}{' '}
                {ingredient.ingredient.name}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
