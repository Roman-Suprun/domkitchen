import { z } from 'zod';

import { prisma } from 'shared/lib/prisma';

import { ingredientSchema } from '../../shared/lib/validation/ingredient';

export async function addIngredient(input: unknown) {
  try {
    const data = ingredientSchema.parse(input);

    const ingredient = await prisma.ingredient.create({
      data,
    });

    return { success: true, ingredient };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return { success: false, message: 'Error during ingredient creation' };
  }
}
