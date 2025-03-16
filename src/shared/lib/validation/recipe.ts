import { z } from 'zod';

import { recipeIngredientSchema } from './ingredient';

export const recipeStepSchema = z.object({
  description: z
    .string()
    .min(5, 'Each step must be at least 5 characters long'),
});

export const recipeSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters long'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long'),
  cookingTime: z.number().min(1, 'Cooking time must be at least 1 minute'),
  difficulty: z
    .enum(['easy', 'medium', 'hard'])
    .refine(val => ['easy', 'medium', 'hard'].includes(val), {
      message: 'Invalid difficulty level',
    }),
  servings: z.number().min(1, 'Servings must be at least 1'),
  imageUrl: z.string().url('Invalid URL format').optional().or(z.literal('')),
  ingredients: z
    .array(recipeIngredientSchema)
    .min(1, 'At least one ingredient is required'),
  steps: z.array(recipeStepSchema).min(1, 'At least one step is required'),
});

export const getRecipesSchema = z.object({
  search: z.string().optional(),
  ingredients: z.array(z.string().uuid()).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(10),
});
