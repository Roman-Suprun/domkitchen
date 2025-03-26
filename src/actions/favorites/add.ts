'use server';

import { getServerSession } from 'next-auth/next';
import { z } from 'zod';

import { authOptions } from 'shared/lib/auth';
import { prisma } from 'shared/lib/prisma';

const addFavoriteSchema = z.object({
  recipeId: z.string().uuid(),
});

export async function addFavoriteRecipe(input: unknown) {
  try {
    const { recipeId } = addFavoriteSchema.parse(input);

    const session = await getServerSession(authOptions);
    if (!session) {
      return { success: false, message: 'Authentication required' };
    }
    const userId = session.user.id;

    const existing = await prisma.favoriteRecipe.findFirst({
      where: {
        userId,
        recipeId,
      },
    });

    if (existing) {
      return { success: false, message: 'Already in favorites' };
    }

    await prisma.favoriteRecipe.create({
      data: { userId, recipeId },
    });

    return { success: true, message: 'Added to favorites' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return { success: false, message: 'Error adding to favorites' };
  }
}
