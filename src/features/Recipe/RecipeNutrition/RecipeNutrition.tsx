import { FC } from 'react';

type NutritionInfo = {
  label: string;
  value: string;
};

type RecipeNutritionProps = {
  nutrition: NutritionInfo[];
};

export const RecipeNutrition: FC<RecipeNutritionProps> = ({ nutrition }) => {
  return (
    <div className="col-span-1 rounded-xl bg-[#E7FAFE] p-6">
      <h2 className="text-xl font-bold mb-3">Nutrition Information</h2>
      <ul className="text-lg font-medium">
        {nutrition.map(({ label, value }) => (
          <li key={label} className="flex justify-between pb-3 border-b mb-3">
            <span>{label}</span>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
