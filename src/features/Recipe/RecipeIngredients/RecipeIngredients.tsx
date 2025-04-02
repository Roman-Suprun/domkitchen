'use client';

import { FC, useState } from 'react';

import { AlertTriangle, CheckCircle, Circle } from 'lucide-react';

import { FullRecipeIngredient } from 'shared/ts/common';

type UserAllergyIngredient = {
  id: string;
  ingredientId: string;
  userId: string;
};

type RecipeIngredientsProps = {
  ingredients?: FullRecipeIngredient[];
  userAllergiesIngredients?: UserAllergyIngredient[];
};

export const RecipeIngredients: FC<RecipeIngredientsProps> = ({
  ingredients,
  userAllergiesIngredients,
}) => {
  const [checkedIngredients, setCheckedIngredients] = useState<
    Record<string, boolean>
  >({});

  if (!ingredients) return null;

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
        {ingredients.map(ingredient => {
          const isAllergen = userAllergiesIngredients?.some(
            allergy => allergy.ingredientId === ingredient.ingredientId,
          );

          return (
            <li key={ingredient.id} className="flex">
              <button
                type="button"
                className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition w-full text-left ${
                  isAllergen ? 'border-red-400 bg-red-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => toggleIngredient(ingredient.id)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    toggleIngredient(ingredient.id);
                  }
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

                {isAllergen && (
                  <span className="flex items-center gap-1 text-sm text-red-600 font-medium">
                    <AlertTriangle className="w-4 h-4" />
                    Allergen
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
