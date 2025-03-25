import { FC, PropsWithChildren } from 'react';

import { cn } from 'shared/lib/cn';

import { Footer } from './ui/Footer';
import { Header } from './ui/Header';

interface MainLayoutProps extends PropsWithChildren {
  className?: string;
}

const MainLayout: FC<MainLayoutProps> = ({ children, className }) => {
  return (
    <main className="flex flex-col w-full h-full min-h-full-screen">
      <Header />
      <div
        className={cn(
          'flex w-full flex-col flex-grow h-full items-center',
          className,
        )}
      >
        {children}
      </div>
      <Footer />
    </main>
  );
};

export { MainLayout };
