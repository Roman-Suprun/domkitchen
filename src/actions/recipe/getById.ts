'use server';

import { z } from 'zod';

import { prismaClient } from '../../shared/lib/db';

const idSchema = z.string().uuid('Invalid recipe ID');

export async function getRecipeById(id: string) {
  try {
    const validatedId = idSchema.parse(id);

    const recipe = await prismaClient.recipe.findUnique({
      where: { id: validatedId },
      include: {
        ingredients: { include: { ingredient: true } },
        steps: true,
        reviews: { include: { user: true } },
      },
    });

    if (!recipe) {
      return { success: false, message: 'Recipe not found' };
    }

    return { success: true, data: recipe };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return {
      success: false,
      message: 'Something went wrong while fetching the recipe',
    };
  }
}
