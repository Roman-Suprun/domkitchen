import React from 'react';

import { RecipeDetailedPage } from 'views/recepie-detailed-page';

interface RecipeDetailedProps {
  params: Promise<{ recipeId: string }>;
}

const Page = ({ params }: RecipeDetailedProps) => {
  const { recipeId } = React.use(params);
  return <RecipeDetailedPage recipeId={recipeId} />;
};

export default Page;
