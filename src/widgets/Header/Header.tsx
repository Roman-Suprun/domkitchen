import React from 'react';

import Link from 'next/link';

import { STATIC_ROUTES } from '../../shared/constants/staticRoutes';
import { getSession } from '../../shared/lib/auth/getAuth';
import { LogoutButton } from '../../shared/ui/Button';

export const Header = async () => {
  const session = await getSession();

  const { user } = session || {};
  const { email } = user || {};

  return (
    <section className="w-full h-[110px] border-b flex justify-between items-center px-10">
      <Link href={STATIC_ROUTES.HOME} className="text-gray-600">
        LOGO
      </Link>
      <ul className="flex flex-row gap-x-10 items-center">
        {email && (
          <li>
            <Link
              href={STATIC_ROUTES.PROFILE}
              className="text-gray-600 hover:underline"
            >
              Profile
            </Link>
          </li>
        )}
        <li>
          <Link
            href={STATIC_ROUTES.LOGIN}
            className="text-gray-600 hover:underline"
          >
            Sign In
          </Link>
        </li>
        <li>
          <Link
            href={STATIC_ROUTES.REGISTRATION}
            className="text-gray-600 hover:underline"
          >
            Sign Up
          </Link>
        </li>
        {email && <LogoutButton />}
      </ul>
    </section>
  );
};
