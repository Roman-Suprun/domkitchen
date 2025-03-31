'use client';

import { useRouter } from 'next/navigation';

import { Button } from './Button';

export const BackButton = ({ className }: { className?: string }) => {
  const router = useRouter();

  return (
    <Button
      className={className}
      onClick={() => router.back()}
    >{`< Back`}</Button>
  );
};
