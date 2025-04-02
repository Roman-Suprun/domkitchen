import { getRecipesListing } from 'actions/recipe/getListing';
import { RecipeList } from 'features/Recipe/RecipeList';

export const FavoriteRecipesPage = async () => {
  const { data: recipes } = await getRecipesListing({ page: 1, limit: 12 });
  const filteredRecipes = recipes?.filter(recipe => recipe.isFavorite);

  const hasFavorites = filteredRecipes && filteredRecipes.length > 0;

  return hasFavorites ? (
    <RecipeList
      title="Favorite Recipes"
      description="Explore a variety of delicious recipes to try at home."
      recipes={filteredRecipes}
    />
  ) : (
    <div className="max-w-3xl mx-auto text-center mt-20 px-4">
      <h2 className="text-2xl font-semibold text-gray-900">
        No Favorite Recipes Yet
      </h2>
      <p className="text-gray-600 mt-2 mb-6">
        You have not added any recipes to your favorites. Start exploring and
        save the ones you love!
      </p>
    </div>
  );
};
