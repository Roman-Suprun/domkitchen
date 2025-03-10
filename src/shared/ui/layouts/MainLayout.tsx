import { ReactNode } from 'react';

import { Header } from '../../../widgets/Header';

export default async function MainLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Header />
      {children}
      footer
    </>
  );
}
