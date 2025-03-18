import { cloneElement, FC, Fragment, JSX, PropsWithChildren } from 'react';

import { cn } from 'shared/lib/cn';

interface FieldProps {
  startElement?: React.ReactNode;
  endElement?: React.ReactNode;
  fullWidth?: boolean;
  children: JSX.Element;
}

interface FieldWrapperProps
  extends Omit<FieldProps, 'children'>,
    PropsWithChildren {}

const FieldWrapper: FC<FieldWrapperProps> = ({
  children,
  fullWidth,
  endElement,
  startElement,
}) => {
  const hasElements = startElement || endElement;

  if (!hasElements) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  return (
    <div className={cn('relative flex w-fit', { 'w-full': fullWidth })}>
      {children}
    </div>
  );
};

const Field: FC<FieldProps> = ({
  startElement,
  endElement,
  fullWidth,
  children,
}) => {
  const hasNativePlaceholder =
    children.type === 'input' || children.type === 'textarea';

  return (
    <FieldWrapper
      fullWidth={fullWidth}
      endElement={endElement}
      startElement={startElement}
    >
      {startElement && (
        <div className="text-gray-400 pointer-events-none absolute start-0 flex justify-center items-center h-full px-3">
          {startElement}
        </div>
      )}

      {cloneElement(children, {
        className:
          cn(
            'flex h-14 rounded-lg border border-gray-400 bg-transparent px-3 py-1',
            'text-gray-800 transition-colors',
            'focus-visible:outline-none focus:ring-1 focus:ring-gray-800 disabled:cursor-not-allowed',
            'disabled:opacity-50 md:text-sm',
            {
              'w-full': fullWidth,
              'pl-12': startElement,
              'pr-12': endElement,
              'placeholder:text-gray-400': hasNativePlaceholder,
              'data-[placeholder]:text-gray-400': !hasNativePlaceholder,
            },
            children.props.className,
          ) || null,
      })}

      {endElement && (
        <div className="text-gray-400 absolute end-0 flex justify-center items-center h-full px-3">
          {endElement}
        </div>
      )}
    </FieldWrapper>
  );
};

export { Field };
