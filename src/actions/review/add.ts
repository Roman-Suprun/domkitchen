'use server';

import { z } from 'zod';

import { auth } from 'shared/lib/auth';
import { prisma } from 'shared/lib/prisma';

const addReviewSchema = z.object({
  recipeId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(5, 'Comment must be at least 5 characters'),
});

export async function addReview(input: unknown) {
  try {
    const { recipeId, rating, comment } = addReviewSchema.parse(input);

    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, message: 'Unauthorized' };
    }

    const recipeExists = await prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!recipeExists) {
      return { success: false, message: 'Recipe not found' };
    }

    await prisma.review.create({
      data: {
        userId: session.user.id,
        recipeId,
        rating,
        comment,
      },
    });

    return { success: true, message: 'Review added successfully!' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return {
      success: false,
      message: 'Something went wrong while adding the review',
    };
  }
}
