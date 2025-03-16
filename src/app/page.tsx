import { RecipeList } from 'features/Recipe/RecipeList';

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

const HomePage = () => {
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
