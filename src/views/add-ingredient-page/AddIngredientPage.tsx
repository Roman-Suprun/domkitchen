'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '../../shared/ui/Button';
import { Input } from '../../shared/ui/Input';
import { Select } from '../../shared/ui/Select';

interface IngredientFormValues {
  name: string;
  category: string;
}

const categoryOptions = [
  { value: 'vegetables', label: 'Vegetables' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'dairy', label: 'Dairy Products' },
  { value: 'meats', label: 'Meats' },
  { value: 'seafood', label: 'Seafood' },
];

export const AddIngredientPage = () => {
  const methods = useForm<IngredientFormValues>({
    defaultValues: {
      name: '',
      category: '',
    },
  });

  const { setValue, watch } = methods;
  const selectedCategory = watch('category');

  const onSubmit = (data: IngredientFormValues) => {
    console.log('Submitted Data:', data);
  };

  return (
    <div className="text-center flex flex-col items-center w-full max-w-[500px]">
      <h3 className="text-2xl font-semibold mb-6">Add Ingredient</h3>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <Input
            name="imgregient"
            label="Ingredient Name"
            placeholder="Enter ingredient name"
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
