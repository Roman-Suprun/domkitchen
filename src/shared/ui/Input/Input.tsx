import { FC, InputHTMLAttributes } from 'react';

import { cn } from 'shared/lib/cn';

import { Field } from '../Field';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startElement?: React.ReactNode;
  endElement?: React.ReactNode;
  fullWidth?: boolean;
}

const Input: FC<InputProps> = ({
  className,
  startElement,
  endElement,
  fullWidth,
  ...rest
}) => {
  return (
    <Field
      fullWidth={fullWidth}
      startElement={startElement}
      endElement={endElement}
    >
      <input
        className={cn(
          'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
          className,
        )}
        {...rest}
      />
    </Field>
  );
};

export { Input };
