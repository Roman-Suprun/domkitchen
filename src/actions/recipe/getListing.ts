'use server';

import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { prismaClient } from '../../shared/lib/db';
import { getRecipesSchema } from '../../shared/lib/validation/recipe';

export async function getRecipesListing(input: unknown) {
  try {
    const { search, ingredients, page, limit } = getRecipesSchema.parse(input);

    const where: Prisma.RecipeWhereInput = {};

    if (search) {
      where.title = { contains: search, mode: 'insensitive' };
    }

    if (ingredients && ingredients.length > 0) {
      where.ingredients = {
        some: {
          ingredientId: { in: ingredients },
        },
      };
    }

    const totalRecipes = await prismaClient.recipe.count({ where });

    const recipes = await prismaClient.recipe.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        ingredients: { include: { ingredient: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      data: recipes,
      pagination: {
        total: totalRecipes,
        page,
        limit,
        totalPages: Math.ceil(totalRecipes / limit),
      },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return {
      success: false,
      message: 'Something went wrong while fetching recipes',
    };
  }
}
