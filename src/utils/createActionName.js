const createActionName = (prefix, name) => {
  return `@ShellLogixBoilerplate_${prefix}_${name}`.toUpperCase();
};

export default createActionName;
