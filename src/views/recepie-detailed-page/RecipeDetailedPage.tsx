import { FC } from 'react';

import Image from 'next/image';

import { getUser } from 'actions/profile/getUserAction';
import { getUserAllergies } from 'actions/profile/getUserAllergies';
import { getRecipeById } from 'actions/recipe/getById';
import { RecipeIngredients } from 'features/Recipe/RecipeIngredients';
import { RecipeNutrition } from 'features/Recipe/RecipeNutrition';
import { RecipeReviewForm } from 'features/Recipe/RecipeReviewForm';
import { RecipeReviewsList } from 'features/Recipe/RecipeReviewList';
import { RecipeSteps } from 'features/Recipe/RecipeSteps';
import { auth } from 'shared/lib/auth';

const nutritionData = [
  { label: 'Calories', value: '219.9 kcal' },
  { label: 'Total Fat', value: '10.7 g' },
  { label: 'Protein', value: '7.9 g' },
  { label: 'Carbohydrate', value: '22.3 g' },
  { label: 'Cholesterol', value: '37.4 mg' },
];

type RecipeDetailedPageProps = {
  recipeId: string;
};

export const RecipeDetailedPage: FC<RecipeDetailedPageProps> = async ({
  recipeId,
}) => {
  const session = await auth();
  const { user } = session || {};
  const { email } = user || {};
  const { data } = await getUser(email);
  const { id } = data || {};
  const { data: recipe } = await getRecipeById(recipeId);
  const userAllergiesIngredients = await getUserAllergies(id);

  return (
    <div className="pt-16 max-w-7xl m-auto">
      <h1 className="text-5xl font-bold mb-10">{recipe?.title}</h1>
      <div className="grid grid-cols-3 gap-6 mb-14">
        <div className="col-span-2">
          <div className="rounded-2xl overflow-hidden">
            <Image
              width={840}
              height={600}
              src={recipe?.imageUrl || '/detailed_recepie.png'}
              alt="Detailed Recepie Image"
              className="w-full h-full max-h-[700px] object-cover"
            />
          </div>
        </div>
        <RecipeNutrition nutrition={nutritionData} />
      </div>
      <p>{recipe?.description}</p>
      <RecipeIngredients
        ingredients={recipe?.ingredients}
        userAllergiesIngredients={userAllergiesIngredients}
      />
      <RecipeSteps steps={recipe?.steps} />
      {email && <RecipeReviewForm recipeId={recipeId} />}
      <RecipeReviewsList recipeId={recipeId} />
    </div>
  );
};
