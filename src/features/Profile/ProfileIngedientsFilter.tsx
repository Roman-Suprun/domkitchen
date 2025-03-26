'use client';

import { FC, useEffect, useState } from 'react';

import { Ingredient, UserAllergies } from '@prisma/client';

import { cn } from 'shared/lib/cn';
import { Button } from 'shared/ui/Button';

import { setUserAllergies } from '../../actions/profile/setUserAllergies';
import {
  ProfileIngredientsList,
  ProfileIngredientsSearch,
  ProfileIngredientsSelectedList,
} from './index';

type TIngredientsFilter = {
  userId: string;
  className?: string;
  ingredientsData: Ingredient[];
  userAllergiesIngredients: UserAllergies[];
};

export const ProfileIngredientsFilter: FC<TIngredientsFilter> = ({
  className,
  ingredientsData,
  userAllergiesIngredients,
  userId,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    ingredientsData.filter(ingredient =>
      userAllergiesIngredients?.some(
        userAllergiesIngredient =>
          userAllergiesIngredient.ingredientId === ingredient.id,
      ),
    ),
  );

  const [filteredIngredients, setFilteredIngredients] =
    useState<Ingredient[]>(ingredientsData);

  useEffect(() => {
    const filtered = ingredientsData?.filter(
      ingredient =>
        ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !selectedIngredients.some(selected => selected.id === ingredient.id),
    );
    setFilteredIngredients(filtered);
  }, [searchQuery, selectedIngredients]);

  const addIngredient = (ingredient: Ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
    setSearchQuery('');
  };

  const removeIngredient = (ingredient: Ingredient) => {
    setSelectedIngredients(
      selectedIngredients.filter(item => item !== ingredient),
    );
  };

  const onSave = async () => {
    setIsSaving(true);

    const ingredientIds = selectedIngredients.map(
      selectedIngredient => selectedIngredient.id,
    );

    await setUserAllergies({ userId, ingredientIds });

    setIsSaving(false);
  };

  return (
    <div
      className={cn(
        'w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md',
        className,
      )}
    >
      <h2 className="text-xl font-semibold mb-4">Select Allergy Ingredients</h2>
      <ProfileIngredientsSearch
        searchQuery={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      <ProfileIngredientsSelectedList
        selectedIngredients={selectedIngredients}
        onClick={removeIngredient}
      />

      <ProfileIngredientsList
        filteredIngredients={filteredIngredients}
        onClick={addIngredient}
      />

      <Button onClick={onSave} className="m-auto w-full mt-6">
        {isSaving ? 'Saving...' : 'Save'}
      </Button>
    </div>
  );
};
