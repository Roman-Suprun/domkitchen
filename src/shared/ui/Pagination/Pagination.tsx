'use client';

import React, { useEffect } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { cn } from 'shared/lib/cn';
import buildSearchParams from 'shared/lib/utils/buildSearchParams';
import getSearchParams from 'shared/lib/utils/getSearchParams';

type TPaginationProps = {
  total: number;
};

type TParamsObj = {
  page?: string;
};

const perPage = 6;

export const Pagination: React.FC<TPaginationProps> = ({
  total: totalItems,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = searchParams.get('page');

  const setPage = (val: string) => {
    router.push(
      pathname +
        buildSearchParams({
          ...getSearchParams(searchParams),
          page: String(val),
        }),
      { scroll: false },
    );
  };

  if (Number(page) * perPage - perPage + 1 > totalItems) {
    if (page !== '1') {
      setPage(String(Number(page) - 1));
    }
  }

  const total = Math.ceil(totalItems / perPage);

  useEffect(() => {
    if (!page) {
      const paramsObg: TParamsObj = {};

      if (!page) paramsObg.page = '1';

      router.push(
        pathname +
          buildSearchParams({ ...getSearchParams(searchParams), ...paramsObg }),
        { scroll: false },
      );
    }
  }, [page, pathname, router, searchParams]);

  if (!totalItems) return null;

  const buttons = Array.from(
    new Set(
      [
        1,
        page,
        Number(page || 1) + 1,
        Number(page || 1) + 2,
        Number(page || 1) - 1,
        Number(page || 1) - 2,
        total,
      ].map(Number),
    ),
  )
    .sort((a, b) => Number(a) - Number(b))
    .filter(el => !!el && Number(el) <= total && Number(el) >= 1)
    .map((el, idx, arr) =>
      arr[idx + 1] === Number(el) + 1 || el === total ? el : [el, '...'],
    )
    .flat();

  return (
    <div className="mt-12 flex w-full justify-center">
      <div className="flex items-center gap-x-2">
        {buttons.map((el, index) =>
          el === '...' ? (
            <div
              key={`${el}-${index}`}
              className="w-9 text-center text-gray-700"
            >
              ...
            </div>
          ) : (
            <button
              key={el}
              type="button"
              onClick={() => setPage(String(el))}
              className={cn(
                'flex h-8 w-9 cursor-pointer items-center justify-center rounded-[5px] text-xs bg-gray-300 text-white hover:bg-gray-800',
                String(el) === page &&
                  'cursor-default bg-gray-700 text-white hover:bg-iris-100',
              )}
            >
              {el}
            </button>
          ),
        )}
      </div>
    </div>
  );
};
