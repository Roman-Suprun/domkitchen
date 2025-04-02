import React, { FC } from 'react';

import NotFound from 'next/dist/client/components/not-found-error';

import { getRecipesListing } from '../../../actions/recipe/getListing';
import { RecipeIngredientsFilter } from '../../../features/Recipe/RecipeIngredientsFilter';
import { RecipeList } from '../../../features/Recipe/RecipeList';
import { auth } from '../../../shared/lib/auth';
import { Pagination } from '../../../shared/ui/Pagination';

type RecipesListingProps = {
  searchParams: Promise<{ page?: string; ingredients?: string[] | string }>;
};

const PER_PAGE = 12;

const Page: FC<RecipesListingProps> = async ({ searchParams }) => {
  const { page = 1, ingredients = [] } = await searchParams;

  const session = await auth();
  const { user } = session || {};

  const recipesResponse = await getRecipesListing({
    page: Number(page),
    limit: PER_PAGE,
    ingredients: Array.isArray(ingredients) ? ingredients : [ingredients],
  });

  const { data: recipes, pagination } = recipesResponse;

  if (!pagination) {
    return NotFound();
  }

  return (
    <section className="max-w-7xl min-w-[80rem]">
      <RecipeIngredientsFilter userId={user?.id} />
      <RecipeList recipes={recipes} />
      <Pagination total={pagination.total} perPage={PER_PAGE} />
    </section>
  );
};

export default Page;
