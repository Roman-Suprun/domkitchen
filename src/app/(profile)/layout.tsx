import { ReactNode } from 'react';

import { MainLayout } from 'widgets/MainLayout';

export default function ProfileLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <MainLayout>{children}</MainLayout>;
}
