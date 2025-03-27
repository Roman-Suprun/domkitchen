'use client';

import { FC, MouseEvent, useState, useTransition } from 'react';

import { Heart } from 'lucide-react';

import { addFavoriteRecipe } from 'actions/favorites/add';
import { removeFavoriteRecipe } from 'actions/favorites/delete';

type Props = {
  recipeId: string;
  isFavorite: boolean;
};

export const RecipeFavouriteButton: FC<Props> = ({ recipeId, isFavorite }) => {
  const [isPending, startTransition] = useTransition();
  const [favorite, setFavorite] = useState(isFavorite);

  const toggleFavorite = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    startTransition(async () => {
      setFavorite(prev => !prev);

      const response = favorite
        ? await removeFavoriteRecipe({ recipeId })
        : await addFavoriteRecipe({ recipeId });

      if (!response.success) {
        setFavorite(prev => !prev);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      disabled={isPending}
      aria-label="Toggle favourite"
      className="absolute right-3 top-3 flex justify-center items-center bg-white w-12 h-12 rounded-full shadow-md transition-all hover:scale-110"
    >
      <Heart
        stroke={favorite ? '#FF6363' : '#DBE2E5'}
        fill={favorite ? '#FF6363' : '#DBE2E5'}
        className="transition-colors duration-300"
      />
    </button>
  );
};
