'use client';

import ReactSelect from 'react-select';
import { twMerge } from 'tailwind-merge';

import { cn } from '../../lib/cn';
import { customSelectStyles } from './styles';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  name: string;
  label?: string;
  options: Option[];
  placeholder?: string;
  className?: string;
  value?: string | string[];
  onChange?: (value: string | string[] | null) => void;
  isMulti?: boolean;
}

export const Select = ({
  name,
  label,
  options,
  placeholder,
  className,
  value,
  onChange,
  isMulti = false,
}: SelectFieldProps) => {
  return (
    <div className="flex flex-col gap-2 items-start w-full">
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>
      )}

      <ReactSelect
        inputId={name}
        options={options}
        placeholder={placeholder}
        className={twMerge(
          cn('border rounded-xl w-full outline-none', className),
        )}
        styles={customSelectStyles}
        classNamePrefix="react-select"
        isMulti={isMulti}
        onChange={selectedOptions => {
          if (isMulti) {
            const values =
              (selectedOptions as Option[] | null)?.map(
                option => option.value,
              ) || [];
            onChange?.(values);
          } else {
            const value = (selectedOptions as Option | null)?.value || null;
            onChange?.(value);
          }
        }}
        value={
          isMulti
            ? options.filter(option =>
                (value as string[])?.includes(option.value),
              )
            : options.find(option => option.value === value) || null
        }
      />
    </div>
  );
};
