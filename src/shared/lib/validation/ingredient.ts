import { z } from 'zod';

export const ingredientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  category: z.string().min(2, 'Category cannot be empty'),
  imageUrl: z.string().url('Invalid URL format').optional().or(z.literal('')),
});

export const recipeIngredientSchema = z.object({
  ingredientId: z.string().uuid('Invalid ingredient ID'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  quantityType: z.string().min(1, 'Quantity type is required'),
});
