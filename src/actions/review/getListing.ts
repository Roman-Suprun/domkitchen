'use server';

import { z } from 'zod';

import { prisma } from 'shared/lib/prisma';

const getReviewsSchema = z.object({
  recipeId: z.string().uuid(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(10).default(5),
});

export async function getRecipeReviews(input: unknown) {
  try {
    const { recipeId, page, limit } = getReviewsSchema.parse(input);

    const totalReviews = await prisma.review.count({
      where: { recipeId },
    });

    const reviews = await prisma.review.findMany({
      where: { recipeId },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            profileImage: true,
          },
        },
      },
    });

    const transformedReviews = reviews.map(review => ({
      id: review.id,
      user: {
        name: `${review.user.firstName} ${review.user.lastName}`,
        avatar: review.user.profileImage,
      },
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt.toISOString(),
    }));

    return {
      success: true,
      data: transformedReviews,
      pagination: {
        total: totalReviews,
        page,
        limit,
        totalPages: Math.ceil(totalReviews / limit),
      },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return {
      success: false,
      message: 'Something went wrong while fetching reviews',
    };
  }
}
