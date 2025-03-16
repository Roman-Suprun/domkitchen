import { FC } from 'react';

import { Heart } from 'lucide-react';

export const RecipeFavouriteButton: FC<{ isFavourite: boolean }> = ({
  isFavourite,
}) => {
  return (
    <button
      type="button"
      aria-label="Toggle favourite"
      className="absolute right-3 top-3 flex justify-center items-center bg-white w-12 h-12 rounded-full shadow-md transition-all hover:scale-110"
    >
      <Heart
        stroke={isFavourite ? '#FF6363' : '#DBE2E5'}
        fill={isFavourite ? '#FF6363' : '#DBE2E5'}
      />
    </button>
  );
};
