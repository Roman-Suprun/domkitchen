'use server';

import { z } from 'zod';

import { prismaClient } from '../../shared/lib/db';

export async function getIngredients() {
  try {
    const ingredients = await prismaClient.ingredient.findMany({
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
}
