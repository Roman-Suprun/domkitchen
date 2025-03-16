'use server';

import { getServerSession } from 'next-auth';

import { z } from 'zod';

import { authOptions } from 'shared/lib/auth/authOptions';

import { prismaClient } from '../../shared/lib/db';

const addReviewSchema = z.object({
  recipeId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(5, 'Comment must be at least 5 characters'),
});

export async function addReview(input: unknown) {
  try {
    const { recipeId, rating, comment } = addReviewSchema.parse(input);

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, message: 'Unauthorized' };
    }

    const recipeExists = await prismaClient.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!recipeExists) {
      return { success: false, message: 'Recipe not found' };
    }

    await prismaClient.review.create({
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
