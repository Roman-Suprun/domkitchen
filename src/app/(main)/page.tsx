import { getRecipesListing } from 'actions/recipe/getListing';
import { MainBanner } from 'features/Banner/MainBanner';
import { RecipeList } from 'features/Recipe/RecipeList';
import { SubscriptionBanner } from 'features/Subscription/SubscriptionBanner';

const HomePage = async () => {
  const { data: recipes } = await getRecipesListing({ page: 1, limit: 4 });

  return (
    <div>
      <MainBanner />
      <RecipeList
        title="Delicious Recipes"
        description="Explore a variety of delicious recipes to try at home."
        recipes={recipes}
      />
      <SubscriptionBanner />
    </div>
  );
};

export default HomePage;
