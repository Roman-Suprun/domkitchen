import { FC } from 'react';

import Image from 'next/image';

import { getRecipeById } from 'actions/recipe/getById';

import { RecipeIngredients } from 'features/Recipe/RecipeIngredients';
import { RecipeNutrition } from 'features/Recipe/RecipeNutrition';
import { RecipeReviewForm } from 'features/Recipe/RecipeReviewForm';
import { RecipeReviewsList } from 'features/Recipe/RecipeReviewList';
import { RecipeSteps } from 'features/Recipe/RecipeSteps';

const nutritionData = [
  { label: 'Calories', value: '219.9 kcal' },
  { label: 'Total Fat', value: '10.7 g' },
  { label: 'Protein', value: '7.9 g' },
  { label: 'Carbohydrate', value: '22.3 g' },
  { label: 'Cholesterol', value: '37.4 mg' },
];

const initialReviews = [
  {
    id: '1',
    user: { name: 'Alice Johnson', avatar: '/avatars/alice.png' },
    rating: 5,
    comment:
      'Absolutely loved this recipe! Super easy to follow and delicious.',
    createdAt: '2024-03-01T10:00:00Z',
  },
  {
    id: '2',
    user: { name: 'Michael Smith', avatar: '/avatars/michael.png' },
    rating: 4,
    comment: 'Tastes great, but I added extra seasoning for more flavor!',
    createdAt: '2024-03-02T15:30:00Z',
  },
];

type RecipeDetailedPageProps = {
  recipeId: string;
};

export const RecipeDetailedPage: FC<RecipeDetailedPageProps> = async ({
  recipeId,
}) => {
  const { data: recipe } = await getRecipeById(recipeId);
  return (
    <div className="pt-16 max-w-7xl m-auto">
      <h1 className="text-5xl font-bold mb-10">{recipe?.title}</h1>
      <div className="grid grid-cols-3 gap-6 mb-14">
        <div className="col-span-2">
          <div className="rounded-2xl overflow-hidden">
            <Image
              width={840}
              height={600}
              src="/detailed_recepie.png"
              alt="Detailed Recepie Image"
              className="w-full"
            />
          </div>
        </div>
        <RecipeNutrition nutrition={nutritionData} />
      </div>
      <p>{recipe?.description}</p>
      <RecipeIngredients ingredients={recipe?.ingredients} />
      <RecipeSteps steps={recipe?.steps} />
      <RecipeReviewForm />
      <RecipeReviewsList reviews={initialReviews} />
    </div>
  );
};
