import { getRecipesListing } from 'actions/recipe/getListing';

import { RecipeList } from 'features/Recipe/RecipeList';

const HomePage = async () => {
  const { data: recipes } = await getRecipesListing({ page: 1, limit: 4 });
  // const session = await getSession();
  // const { user } = session || {};
  // const { email } = user || {};
  // if (!email) {
  //   redirect('/sign-in');
  // }

  return (
    <div className="h-full-screen">
      <RecipeList
        title="Delicious Recipes"
        description="Explore a variety of delicious recipes to try at home."
        recipes={recipes}
      />
    </div>
  );
};

export default HomePage;
