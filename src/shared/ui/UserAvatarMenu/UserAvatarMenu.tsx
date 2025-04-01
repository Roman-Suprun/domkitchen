'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { STATIC_ROUTES } from 'shared/constants/staticRoutes';
import { LogoutButton } from 'widgets/MainLayout/ui/LogoutButton';

type UserAvatarMenuProps = {
  user: {
    firstName?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export function UserAvatarMenu({ user }: UserAvatarMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const initials = user.firstName
    ? user.firstName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
    : 'U';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 text-sm font-medium focus:outline-none"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.firstName ?? ''}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50 px-4 py-3">
          <div className="">
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>
          <ul className="flex flex-col gap-y-4 py-6">
            <li>
              <Link
                href={STATIC_ROUTES.PROFILE}
                className="text-gray-600 hover:underline"
              >
                Edit Profile
              </Link>
            </li>
            <li>
              <Link
                href={STATIC_ROUTES.ADD_INGREDIENT}
                className="text-gray-600 hover:underline"
              >
                Add Ingredient/Recipe
              </Link>
            </li>
            <li>
              <Link
                href={STATIC_ROUTES.RECIPE_FAVORITE}
                className="text-gray-600 hover:underline"
              >
                Favorite Recipes
              </Link>
            </li>
          </ul>
          <LogoutButton />
        </div>
      )}
    </div>
  );
}
