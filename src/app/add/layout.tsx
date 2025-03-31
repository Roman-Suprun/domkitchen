import React, { FC, ReactNode } from 'react';

import Link from 'next/link';

import { STATIC_ROUTES } from '../../shared/constants/staticRoutes';
import { Logo } from '../../shared/ui/Logo';

type LayoutProps = {
  children: ReactNode;
};

const LINKS = [
  { label: 'Ingredient', href: STATIC_ROUTES.ADD_INGREDIENT },
  { label: 'Recipe', href: STATIC_ROUTES.ADD_RECIPE },
];

const Layout: FC<LayoutProps> = async ({ children }) => {
  return (
    <section className="w-full min-h-[calc(100vh-110px)] flex ">
      <nav className="w-[320px] border-r  min-h-[calc(100vh-110px)] px-10 py-4">
        <Logo />
        <h3 className="text-2xl font-semibold mt-3">Add</h3>
        <div className="px-3 mt-3 flex flex-col gap-y-2">
          {LINKS.map(({ label, href }) => (
            <Link className="text-xl" key={href} href={href}>
              {label}
            </Link>
          ))}
        </div>
      </nav>
      <main className="px-10 py-4 w-[calc(100vw-320px)]">{children}</main>
    </section>
  );
};

export default Layout;
