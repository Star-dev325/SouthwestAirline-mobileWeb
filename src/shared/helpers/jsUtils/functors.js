export const noop = () => {};

export const flowRight = (...funcs) => (arg) => {
  funcs.reverse();
  
  return funcs.reduce((result, func) => func(result), arg);
};