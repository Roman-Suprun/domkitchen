import { getRecipesListing } from 'actions/recipe/getListing';
import { RecipeList } from 'features/Recipe/RecipeList';

const HomePage = async () => {
  const { data: recipes } = await getRecipesListing({ page: 1, limit: 4 });

  return (
    <RecipeList
      title="Delicious Recipes"
      description="Explore a variety of delicious recipes to try at home."
      recipes={recipes}
    />
  );
};

export default HomePage;
