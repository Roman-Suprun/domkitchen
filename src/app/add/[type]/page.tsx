import React from 'react';

import { AddIngredientPage } from '../../../views/add-ingredient-page';

const Page = ({ params }: { params: { type: string } }) => {
  const { type } = params;

  switch (type) {
    case 'recipe':
      return <div>rec</div>;
    default:
      return <AddIngredientPage />;
  }
};

export default Page;
