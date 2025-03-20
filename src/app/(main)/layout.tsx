import { ReactNode } from 'react';

import { MainLayout } from 'widgets/MainLayout';

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <MainLayout>{children}</MainLayout>;
}
