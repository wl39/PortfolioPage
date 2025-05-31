export const getChangedValues = (original, modified) => {
  const changed = {};

  for (const key in original) {
    const val1 = original[key];
    const val2 = modified[key];

    const isDifferent =
      Array.isArray(val1) && Array.isArray(val2)
        ? JSON.stringify(val1) !== JSON.stringify(val2)
        : val1 !== val2;

    if (isDifferent) {
      changed[key] = val2; // 바뀐 값 저장
    }
  }

  return changed;
};
