import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import { cn } from '../../lib/cn';

type TButton = {
  variant?: 'primary' | 'secondary';
  size?: 'big' | 'small';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  children?: ReactNode | string;
};

export type TButtonElementProps = TButton &
  ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<TButtonElementProps> = props => {
  const {
    disabled,
    variant = 'primary',
    size = 'big',
    type = 'button',
    children,
    className,
    ...rest
  } = props;

  return (
    <button
      {...rest}
      type={type}
      disabled={disabled}
      className={cn(
        'rounded-2xl cursor-pointer border-2 bg-black text-white border-black font-semibold outline-none transition-all hover:text-black hover:bg-white',
        variant === 'secondary' &&
          'bg-white text-black hover:text-white hover:bg-black',
        size === 'big' ? 'h-[60px] px-8' : 'h-9 px-4 text-sm',
        disabled && 'pointer-events-none opacity-40',
        className,
      )}
    >
      {children}
    </button>
  );
};
