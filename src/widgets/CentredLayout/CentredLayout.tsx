import { FC, PropsWithChildren } from 'react';

const CentredLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-full-screen">
      {children}
    </div>
  );
};

export { CentredLayout };
