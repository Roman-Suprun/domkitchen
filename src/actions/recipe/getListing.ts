'use server';

import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { authOptions } from 'shared/lib/auth';
import { prisma } from 'shared/lib/prisma';

import { getRecipesSchema } from '../../shared/lib/validation/recipe';

export async function getRecipesListing(input: unknown) {
  try {
    const { search, ingredients, page, limit } = getRecipesSchema.parse(input);

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

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

    const totalRecipes = await prisma.recipe.count({ where });

    const recipes = await prisma.recipe.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        ingredients: { include: { ingredient: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    let favoriteRecipeIds: Set<string> = new Set();

    if (userId) {
      const favorites = await prisma.favoriteRecipe.findMany({
        where: { userId },
        select: { recipeId: true },
      });

      favoriteRecipeIds = new Set(favorites.map(fav => fav.recipeId));
    }

    const recipesWithFavorites = recipes.map(recipe => ({
      ...recipe,
      isFavorite: favoriteRecipeIds.has(recipe.id),
    }));

    return {
      success: true,
      data: recipesWithFavorites,
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
