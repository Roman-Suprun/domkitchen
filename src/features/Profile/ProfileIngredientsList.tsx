import { FC } from 'react';

import { Ingredient } from '@prisma/client';

type TProfileIngredientsList = {
  onClick: (ingredient: Ingredient) => void;
  filteredIngredients: Ingredient[];
};

export const ProfileIngredientsList: FC<TProfileIngredientsList> = ({
  filteredIngredients,
  onClick,
}) => {
  return (
    <div>
      <p className="text-sm font-medium mb-2">Common allergens:</p>
      <div className="h-60 overflow-y-auto border border-gray-300 rounded-md">
        {filteredIngredients?.length === 0 ? (
          <p className="p-4 text-sm text-gray-500">No ingredients found</p>
        ) : (
          <ul className="p-2">
            {filteredIngredients?.map(ingredient => {
              const { name, id } = ingredient;

              return (
                <li key={id}>
                  <button
                    type="button"
                    className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                    onClick={() => onClick(ingredient)}
                  >
                    {name}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
