export const noop = () => {};

export const addCssVariables = (key, value) => {
  document.documentElement.style.setProperty(`--${key}`, `${value}`);
};

export const createActionName = (prefix, name) => {
  return `@ShellLogixBoilerplate_${prefix}_${name}`.toUpperCase();
};
