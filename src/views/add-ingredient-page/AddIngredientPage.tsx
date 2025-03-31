'use client';

import { useMemo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { addIngredient } from '../../actions/ingredient/add';
// eslint-disable-next-line import/no-named-as-default
import ingredientCategories from '../../shared/constants/ingredientCategories';
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

interface IngredientFormValues {
  ingredient: string;
  category: string;
}

export const AddIngredientPage = () => {
  const methods = useForm<IngredientFormValues>({
    defaultValues: {
      ingredient: '',
      category: '',
    },
  });

  const { setValue, watch, reset } = methods;
  const selectedCategory = watch('category');

  const onSubmit = async (data: IngredientFormValues) => {
    const { ingredient: name, category } = data;

    await addIngredient({ name, category });

    reset();

    toast.success(
      <div className="flex gap-x-2">{`${name} successfully added`}</div>,
      { autoClose: 3000 },
    );
  };

  const categoryOptions = useMemo(() => {
    return Object.entries(ingredientCategories).map(([value, label]) => ({
      label,
      value,
    }));
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-[500px]">
      <Toast />
      <h3 className="text-2xl font-semibold mb-6 text-center">
        Add Ingredient
      </h3>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={methods.control}
            name="ingredient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter ingredient name</FormLabel>
                <FormControl>
                  <Input fullWidth {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Select
            name="category"
            label="Category"
            options={categoryOptions}
            value={selectedCategory}
            onChange={value => setValue('category', String(value))}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
