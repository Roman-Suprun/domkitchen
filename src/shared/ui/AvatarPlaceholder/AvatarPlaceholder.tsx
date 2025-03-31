import React, { FC } from 'react';

import { cn } from '../../lib/cn';

type TAvatarPlaceholderProps = {
  firstName?: string;
  lastName?: string;
  size: 's' | 'm' | 'l';
};

export const AvatarPlaceholder: FC<TAvatarPlaceholderProps> = ({
  firstName,
  lastName,
  size,
}) => {
  return (
    <div
      className={cn(
        ' flex bg-slate-400 rounded-full items-center justify-center',
        {
          'w-12 h-12 text-lg': size === 's',
          'w-[72px] h-[72px] text-2xl': size === 'm',
          'text-4xl w-[100px] h-[100px] ': size === 'l',
        },
      )}
    >
      {firstName?.charAt(0)}
      {lastName?.charAt(0)}
    </div>
  );
};
