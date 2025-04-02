'use client';

import React, { FC, useEffect, useMemo, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Ingredient, UserAllergies } from '@prisma/client';

import { getIngredients } from '../../../actions/ingredient/getListing';
import { getUserAllergies } from '../../../actions/profile/getUserAllergies';
import buildSearchParams from '../../../shared/lib/utils/buildSearchParams';
import getSearchParams from '../../../shared/lib/utils/getSearchParams';
import { Select } from '../../../shared/ui/Select';

type TRecipeIngredientsFilterProps = {
  userId?: string;
};

export const RecipeIngredientsFilter: FC<TRecipeIngredientsFilterProps> = ({
  userId,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const [userAllergies, setUserAllergies] = useState<UserAllergies[]>([]);

  const [selectedIngredient, setSelectedIngredient] = useState<string[]>([]);

  useEffect(() => {
    if (userId) {
      getUserAllergies(userId).then(setUserAllergies);
    }
  }, [userId]);

  useEffect(() => {
    console.log(userAllergies);
  }, [userAllergies]);

  useEffect(() => {
    getIngredients().then(val => setIngredients(val.data || []));
  }, []);

  useEffect(() => {
    router.push(
      pathname +
        buildSearchParams({
          ...getSearchParams(searchParams),
          ingredients: selectedIngredient,
        }),
      { scroll: false },
    );
  }, [pathname, router, selectedIngredient]);

  const allergiesIds = useMemo(
    () => userAllergies.map(el => el.ingredientId),
    [userAllergies],
  );

  const ingredientOptions = useMemo(() => {
    return (
      ingredients?.map(ingredient => ({
        label: allergiesIds.includes(ingredient.id)
          ? `${ingredient.name} *allergen`
          : ingredient.name,
        value: ingredient.id,
      })) || []
    );
  }, [allergiesIds, ingredients]);

  return (
    <section className="flex items-center w-full justify-end gap-x-6 py-4">
      <div className="w-[320px]">
        <Select
          name="Ingredients"
          isMulti
          placeholder="Choose ingredients..."
          onChange={el => setSelectedIngredient(el as string[])}
          value={selectedIngredient}
          options={ingredientOptions}
        />
      </div>
    </section>
  );
};
