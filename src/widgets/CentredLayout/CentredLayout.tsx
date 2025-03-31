import { FC, PropsWithChildren } from 'react';

import { BackButton } from 'shared/ui/Button';

const CentredLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-full-screen">
      <BackButton className="absolute top-[5%] left-[5%]" />
      {children}
    </div>
  );
};

export { CentredLayout };
