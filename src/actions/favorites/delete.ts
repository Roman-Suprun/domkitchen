'use server';

import { revalidatePath } from 'next/cache';

import { getServerSession } from 'next-auth/next';
import { z } from 'zod';

import { authOptions } from 'shared/lib/auth';
import { prisma } from 'shared/lib/prisma';

const removeFavoriteSchema = z.object({
  recipeId: z.string().uuid(),
});

export async function removeFavoriteRecipe(input: unknown) {
  try {
    const { recipeId } = removeFavoriteSchema.parse(input);

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

    if (!existing) {
      return { success: false, message: 'Not found in favorites' };
    }

    await prisma.favoriteRecipe.delete({
      where: { id: existing.id },
    });

    revalidatePath('/recipe/favorite');

    return { success: true, message: 'Removed from favorites' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return { success: false, message: 'Error removing from favorites' };
  }
}
