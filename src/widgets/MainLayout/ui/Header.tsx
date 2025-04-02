import React from 'react';

import Link from 'next/link';

import { STATIC_ROUTES } from 'shared/constants/staticRoutes';
import { auth } from 'shared/lib/auth';
import { UserAvatarMenu } from 'shared/ui/UserAvatarMenu';

import { Logo } from '../../../shared/ui/Logo';
import { LogoutButton } from './LogoutButton';

const Header = async () => {
  const session = await auth();
  const { user } = session || {};
  const { email } = user || {};

  return (
    <section className="w-full h-[110px] border-b flex justify-between items-center px-10">
      <Logo />
      <ul className="flex flex-row gap-x-10 items-center">
        {user && <UserAvatarMenu user={user} />}
        {!email && (
          <li>
            <Link
              href={STATIC_ROUTES.LOGIN}
              className="text-gray-600 hover:underline"
            >
              Sign In
            </Link>
          </li>
        )}
        {!email && (
          <li>
            <Link
              href={STATIC_ROUTES.REGISTRATION}
              className="text-gray-600 hover:underline"
            >
              Sign Up
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
};

export { Header };
