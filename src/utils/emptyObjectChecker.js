export const isNonEmptyObject = (obj) =>
  obj && typeof obj === 'object' && Object.keys(obj).length > 0;
