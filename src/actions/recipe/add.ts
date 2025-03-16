'use server';

import { z } from 'zod';

import { prismaClient } from '../../shared/lib/db';
import { recipeSchema } from '../../shared/lib/validation/recipe';

export async function createRecipe(input: unknown) {
  try {
    const data = recipeSchema.parse(input);

    const recipe = await prismaClient.recipe.create({
      data: {
        title: data.title,
        description: data.description,
        cookingTime: data.cookingTime,
        difficulty: data.difficulty,
        servings: data.servings,
        imageUrl: data.imageUrl || null,
        ingredients: {
          create: data.ingredients.map(ing => ({
            ingredient: { connect: { id: ing.ingredientId } },
            quantity: ing.quantity,
            quantityType: ing.quantityType,
          })),
        },
        steps: {
          create: data.steps.map((step, index) => ({
            stepOrder: index + 1,
            description: step.description,
          })),
        },
      },
      include: { ingredients: true, steps: true },
    });

    return { success: true, recipe };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return {
      success: false,
      message: 'Something went wrong while creating the recipe',
    };
  }
}
