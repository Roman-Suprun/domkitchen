import React from 'react';

import { AddIngredientPage } from '../../../views/add-ingredient-page';
import { AddRecipePage } from '../../../views/add-recipe-page/AddRecipePage';

const Page = ({ params }: { params: { type: string } }) => {
  const { type } = params;

  switch (type) {
    case 'recipe':
      return <AddRecipePage />;
    default:
      return <AddIngredientPage />;
  }
};

export default Page;
