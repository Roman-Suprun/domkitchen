import { FC } from 'react';

type TProfileIngredientsSelectedItem = {
  onClick: () => void;
  ingredientName: string;
};

export const ProfileIngredientsSelectedItem: FC<
  TProfileIngredientsSelectedItem
> = ({ ingredientName, onClick }) => {
  return (
    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
      {ingredientName}
      <button
        type="button"
        className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:outline-none focus:bg-gray-200 focus:text-gray-500"
        onClick={onClick}
      >
        <span className="sr-only">Remove {ingredientName}</span>
        <svg
          className="h-3 w-3"
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
};
