const isEmpty = <T>(
  value: null | undefined | unknown[] | Record<string, unknown> | T,
): boolean => {
  if (value === undefined || value === null) return true;

  if (Array.isArray(value) && value.length === 0) return true;

  return typeof value === 'object' && Object.keys(value || {}).length === 0;
};

export { isEmpty };
