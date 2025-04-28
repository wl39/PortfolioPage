export const classnames = (classes) => {
  const newClasses = Array.isArray(classes) ? classes.join(" ") : classes || "";

  return newClasses;
};
