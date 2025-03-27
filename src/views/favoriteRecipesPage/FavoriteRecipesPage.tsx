import { getRecipesListing } from 'actions/recipe/getListing';
import { RecipeList } from 'features/Recipe/RecipeList';

export const FavoriteRecipesPage = async () => {
  const { data: recipes } = await getRecipesListing({ page: 1, limit: 12 });
  const filteredRecipes = recipes?.filter(recipe => recipe.isFavorite);

  return (
    <RecipeList
      title="Favorite Recipes"
      description="Explore a variety of delicious recipes to try at home."
      recipes={filteredRecipes}
    />
  );
};
