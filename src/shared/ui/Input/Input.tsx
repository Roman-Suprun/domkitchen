'use client';

import { InputHTMLAttributes } from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { cn } from '../../lib/cn';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  className?: string;
}

export const Input = ({
  name,
  label,
  type = 'text',
  placeholder,
  className,
  ...props
}: InputFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2 items-start">
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            className={twMerge(
              cn('border px-6 rounded-xl w-full outline-none h-14', className),
            )}
            {...props}
          />
        )}
      />

      {errors[name] && (
        <span className="text-red-500 text-sm">
          {(errors[name]?.message as string) || 'Invalid input'}
        </span>
      )}
    </div>
  );
};
