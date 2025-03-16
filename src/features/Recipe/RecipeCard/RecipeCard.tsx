import { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Timer, Utensils } from 'lucide-react';

import { RecipeFavouriteButton } from '../RecipeFavouriteButton';
import { RecipeMetaInfo } from '../RecipeMetaInfo';

type RecipeCardProps = {
  id: string;
  title: string;
  cookingTime: string;
  difficulty: string;
  isFavourite: boolean;
};

export const RecipeCard: FC<RecipeCardProps> = ({
  id,
  title,
  cookingTime,
  difficulty,
  isFavourite = false,
}) => {
  return (
    <Link
      href={`/recipe/${id}`}
      aria-label={`View details for ${title}`}
      className="block bg-main-gradient px-4 py-6 rounded-3xl max-w-[400px] shadow-lg transition-transform hover:scale-[1.02] focus-visible:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
    >
      <div className="max-h-[200px] relative rounded-3xl overflow-hidden">
        <Image
          src="/recepie_listing.png"
          width={290}
          height={200}
          alt={`Image of ${title}`}
          className="object-cover w-full h-full"
        />
        <RecipeFavouriteButton isFavourite={isFavourite} />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-black">{title}</h3>
      <div className="mt-4 flex flex-wrap gap-x-4 text-gray-700">
        <RecipeMetaInfo
          icon={<Timer size={16} />}
          text={`${cookingTime} Minutes`}
        />
        <RecipeMetaInfo icon={<Utensils size={16} />} text={difficulty} />
      </div>
    </Link>
  );
};
