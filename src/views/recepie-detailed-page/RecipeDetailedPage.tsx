import Image from 'next/image';

import { RecipeIngredients } from 'features/Recipe/RecipeIngredients';
import { RecipeList } from 'features/Recipe/RecipeList/RecipeList';
import { RecipeNutrition } from 'features/Recipe/RecipeNutrition';
import { RecipeReviewForm } from 'features/Recipe/RecipeReviewForm';
import { RecipeReviewsList } from 'features/Recipe/RecipeReviewList';
import { RecipeSteps } from 'features/Recipe/RecipeSteps';

const recipes = [
  {
    id: '1',
    title: 'Pasta Carbonara',
    cookingTime: '20',
    difficulty: 'Easy',
    isFavourite: true,
  },
  {
    id: '2',
    title: 'Grilled Chicken',
    cookingTime: '35',
    difficulty: 'Medium',
    isFavourite: false,
  },
  {
    id: '3',
    title: 'Chocolate Cake',
    cookingTime: '45',
    difficulty: 'Hard',
    isFavourite: true,
  },
  {
    id: '4',
    title: 'Avocado Toast',
    cookingTime: '10',
    difficulty: 'Easy',
    isFavourite: false,
  },
];

const recipeSteps = [
  { id: '1', stepOrder: 1, description: 'Preheat the oven to 180°C (350°F).' },
  {
    id: '2',
    stepOrder: 2,
    description: 'Mix flour, sugar, and butter in a bowl.',
  },
  {
    id: '3',
    stepOrder: 3,
    description: 'Add eggs and vanilla extract, then stir well.',
  },
  {
    id: '4',
    stepOrder: 4,
    description: 'Pour batter into a baking dish and bake for 30 minutes.',
  },
];

const recipeIngredients = [
  { id: '1', ingredientName: 'Flour', quantity: 200, quantityType: 'g' },
  { id: '2', ingredientName: 'Sugar', quantity: 100, quantityType: 'g' },
  { id: '3', ingredientName: 'Butter', quantity: 50, quantityType: 'g' },
  { id: '4', ingredientName: 'Eggs', quantity: 2, quantityType: 'pcs' },
];

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

export const RecipeDetailedPage = () => {
  return (
    <div className="pt-16 max-w-7xl m-auto">
      <h1 className="text-5xl font-bold mb-10">Health Japanese Fried Rice</h1>
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

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <RecipeIngredients ingredients={recipeIngredients} />
      <RecipeSteps steps={recipeSteps} />
      <RecipeReviewForm />
      <RecipeReviewsList reviews={initialReviews} />
      <RecipeList
        title="Delicious Recipes"
        description="Explore a variety of delicious recipes to try at home."
        recipes={recipes}
      />
    </div>
  );
};
