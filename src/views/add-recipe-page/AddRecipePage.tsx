'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';

import NextImage from 'next/image';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Ingredient } from '@prisma/client';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { uploadImage } from '../../actions/images/uploadImage';
import { getIngredients } from '../../actions/ingredient/getListing';
import { createRecipe } from '../../actions/recipe/add';
import { STATIC_ROUTES } from '../../shared/constants/staticRoutes';
import { recipeSchema } from '../../shared/lib/validation/recipe';
import { Button } from '../../shared/ui/Button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../shared/ui/Form';
import { Input } from '../../shared/ui/Input';
import { Select } from '../../shared/ui/Select';
import Toast from '../../shared/ui/Toast';

const difficultyOptions = [
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
];

const quantityTypeOptions = [
  { label: 'g', value: 'g' },
  { label: 'ml', value: 'ml' },
  { label: 'pcs', value: 'pcs' },
];

type RecipeFormValues = z.infer<typeof recipeSchema>;

export const AddRecipePage = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const router = useRouter();

  useEffect(() => {
    getIngredients().then(val => setIngredients(val.data || []));
  }, []);

  const ingredientOptions = useMemo(() => {
    return (
      ingredients?.map(ingredient => ({
        label: ingredient.name,
        value: ingredient.id,
      })) || []
    );
  }, [ingredients]);

  const methods = useForm<RecipeFormValues>({
    defaultValues: {
      title: '',
      description: '',
      cookingTime: 0,
      difficulty: 'easy',
      servings: 1,
      imageUrl: '',
      ingredients: [{ ingredientId: '', quantity: 0, quantityType: 'g' }],
      steps: [{ description: '' }],
    },
    resolver: zodResolver(recipeSchema),
  });

  const { control, handleSubmit, register, setValue, watch, reset } = methods;

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({ control, name: 'ingredients' });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({ control, name: 'steps' });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    startTransition(async () => {
      try {
        const uploadedUrl = await uploadImage(file);

        if (!uploadedUrl) {
          toast.error('Image upload failed');

          return;
        }
        setValue('imageUrl', uploadedUrl);
        toast.success('Image uploaded successfully');
      } catch {
        toast.error('Image upload failed');
      }
    });
  };

  const onSubmit = async (data: RecipeFormValues) => {
    const res = await createRecipe(data);
    if (res.success && res.recipe) {
      toast.success('Recipe created successfully!');
      setPreviewUrl(null);
      reset();

      router.push(`${STATIC_ROUTES.RECIPE}/${res.recipe.id}`);
    } else {
      toast.error('Failed to create recipe');
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl">
      <Toast />
      <h3 className="text-2xl font-semibold mb-6 text-center">Add Recipe</h3>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} fullWidth />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} fullWidth />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="cookingTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cooking Time (minutes)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={e =>
                      field.onChange(
                        e.target.value === '' ? '' : Number(e.target.value),
                      )
                    }
                    fullWidth
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Difficulty</FormLabel>
            <FormControl>
              <Select
                name="difficulty"
                options={difficultyOptions}
                value={watch('difficulty')}
                onChange={val =>
                  setValue(
                    'difficulty',
                    String(val) as 'medium' | 'easy' | 'hard',
                  )
                }
              />
            </FormControl>
          </FormItem>

          <FormField
            control={control}
            name="servings"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Servings</FormLabel>
                <FormControl>
                  <Input type="number" {...field} fullWidth />
                </FormControl>
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Upload Image</FormLabel>
            <FormControl>
              <div>
                <Input
                  className="h-full flex items-start cursor-pointer"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {previewUrl && (
                  <NextImage
                    src={previewUrl}
                    alt="Preview"
                    className="mt-2 w-40 h-40 object-cover rounded shadow"
                  />
                )}
                {isPending && (
                  <p className="text-sm text-gray-500">Uploading...</p>
                )}
              </div>
            </FormControl>
          </FormItem>

          <div className="space-y-4">
            <FormLabel>Ingredients</FormLabel>
            {ingredientFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-end">
                <Select
                  name={`ingredients.${index}.ingredientId`}
                  options={ingredientOptions}
                  value={watch(`ingredients.${index}.ingredientId`)}
                  onChange={val =>
                    setValue(`ingredients.${index}.ingredientId`, String(val))
                  }
                />
                <Input
                  type="number"
                  placeholder="Qty"
                  {...register(`ingredients.${index}.quantity`, {
                    valueAsNumber: true,
                  })}
                />
                <Select
                  name={`ingredients.${index}.quantityType`}
                  options={quantityTypeOptions}
                  value={watch(`ingredients.${index}.quantityType`)}
                  onChange={val =>
                    setValue(`ingredients.${index}.quantityType`, String(val))
                  }
                />
                <Button type="button" onClick={() => removeIngredient(index)}>
                  ✕
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                appendIngredient({
                  ingredientId: '',
                  quantity: 0,
                  quantityType: 'g',
                })
              }
            >
              + Add Ingredient
            </Button>
          </div>

          <div className="space-y-4">
            <FormLabel>Steps</FormLabel>
            {stepFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <Input
                  fullWidth
                  placeholder={`Step ${index + 1}`}
                  {...register(`steps.${index}.description`)}
                />
                <Button type="button" onClick={() => removeStep(index)}>
                  ✕
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => appendStep({ description: '' })}
            >
              + Add Step
            </Button>
          </div>

          <Button type="submit" className="w-full">
            Submit Recipe
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
