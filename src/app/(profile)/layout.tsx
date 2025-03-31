import { ReactNode } from 'react';

import { CentredLayout } from 'widgets/CentredLayout';

export default function ProfileLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <CentredLayout>{children}</CentredLayout>;
}
