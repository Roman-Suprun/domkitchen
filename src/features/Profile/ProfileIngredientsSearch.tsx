import { FC } from 'react';

import { Input } from 'shared/ui/Input/Input';

type TProfileIngredientsSearch = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
};

export const ProfileIngredientsSearch: FC<TProfileIngredientsSearch> = ({
  onChange,
  searchQuery,
}) => {
  return (
    <div className="relative mb-4 flex">
      <svg
        className="absolute left-2.5 top-1/2 -translate-y-1/2  h-4 w-4 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <Input
        type="text"
        placeholder="Search ingredients..."
        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={searchQuery}
        onChange={onChange}
      />
    </div>
  );
};
