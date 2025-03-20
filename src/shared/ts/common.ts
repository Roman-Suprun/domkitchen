import { Ingredient, RecipeIngredient } from '@prisma/client';

export type TRegistrationFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

// Extend Prisma’s default type to include the relation
export interface FullRecipeIngredient extends RecipeIngredient {
  ingredient: Ingredient;
}
