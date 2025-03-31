import React from 'react';

import Link from 'next/link';

import { STATIC_ROUTES } from '../../constants/staticRoutes';

export const Logo = () => {
  return (
    <Link
      href={STATIC_ROUTES.HOME}
      className="text-gray-600 text-2xl select-none"
    >
      Dom<span className="font-semibold">Kitchen</span>
    </Link>
  );
};
