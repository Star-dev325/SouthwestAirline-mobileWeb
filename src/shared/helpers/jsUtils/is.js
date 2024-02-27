export const isFunction = (passedHandler) => typeof passedHandler === 'function';

const isFalsy = (value) => !value;
const isEmptyArray = (value) => value?.length !== undefined && value.length === 0;
const isEmptyCollection = (value) => value?.size !== undefined && value.size === 0;
const isEmptyObject = (value) => value && value.size === undefined && Object.keys(value).length === 0;

export const isEmpty = (value) =>
  isFalsy(value) || isEmptyArray(value) || isEmptyCollection(value) || isEmptyObject(value);

export const isObject = (value) => {
  if (value === null || typeof(value) === 'undefined') return false;

  return value && typeof value === 'object' && value.constructor === Object;
};
