import { FC } from 'react';

import { Recipe } from '@prisma/client';

import { RecipeCard } from '../RecipeCard';

type RecipeListProps = {
  title: string;
  description: string;
  recipes?: Recipe[];
};

export const RecipeList: FC<RecipeListProps> = ({
  title,
  description,
  recipes,
}) => {
  if (!recipes) return null;

  return (
    <section className="max-w-7xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-black text-center">{title}</h2>
      <p className="text-gray-600 mt-2 text-center">{description}</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))}
      </div>
    </section>
  );
};
