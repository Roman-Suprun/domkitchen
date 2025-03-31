import { FC } from 'react';

import { Ingredient } from '@prisma/client';

import { ProfileIngredientsSelectedItem } from './ProfileIngredientsSelectedItem';

type TProfileIngredientsSelectedList = {
  onClick: (ingredient: Ingredient) => void;
  selectedIngredients: Ingredient[];
};

export const ProfileIngredientsSelectedList: FC<
  TProfileIngredientsSelectedList
> = ({ selectedIngredients, onClick }) => {
  return (
    <div className="mb-4">
      <p className="text-sm font-medium mb-2">Your allergies:</p>
      <div className="flex flex-wrap gap-2">
        {selectedIngredients.length === 0 ? (
          <p className="text-sm text-gray-500">No ingredients selected</p>
        ) : (
          selectedIngredients.map(ingredient => {
            const { id, name } = ingredient;

            return (
              <ProfileIngredientsSelectedItem
                key={id}
                ingredientName={name}
                onClick={() => onClick(ingredient)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
