import React from 'react';

import { AddIngredientPage } from '../../../views/add-ingredient-page';
import { AddRecipePage } from '../../../views/add-recipe-page/AddRecipePage';

type PageProps = {
  params: Promise<{ type: string }>;
};

const Page = ({ params }: PageProps) => {
  const { type } = React.use(params);

  switch (type) {
    case 'recipe':
      return <AddRecipePage />;
    default:
      return <AddIngredientPage />;
  }
};

export default Page;
