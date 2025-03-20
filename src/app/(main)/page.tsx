import { getRecipesListing } from 'actions/recipe/getListing';
import { ChevronDown } from 'lucide-react';

import { RecipeList } from 'features/Recipe/RecipeList';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';

const HomePage = async () => {
  const { data: recipes } = await getRecipesListing({ page: 1, limit: 4 });
  return (
    <div className="mx-10 text-red-700 h-full-screen">
      Hello world!
      <Input endElement={<ChevronDown />} />
      <Button>Click me</Button>
      <RecipeList
        title="Delicious Recipes"
        description="Explore a variety of delicious recipes to try at home."
        recipes={recipes}
      />
    </div>
  );
};

export default HomePage;
