'use server';

import { z } from 'zod';

import { prisma } from 'shared/lib/prisma';

export const getIngredients = async () => {
  try {
    const ingredients = await prisma.ingredient.findMany({
      orderBy: { name: 'asc' },
    });

    return {
      success: true,
      data: ingredients,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return {
      success: false,
      message: 'Something went wrong while fetching ingredients',
    };
  }
};
