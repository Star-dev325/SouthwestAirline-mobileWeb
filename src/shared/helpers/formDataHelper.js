export const getBooleanValue = (value) =>
  !!value && (typeof value === 'string' ? value.trim().toLowerCase() === 'true' : value === true);

export const createNewObjectReplacingNullValues = (item = {}) =>
  Object.entries(item).reduce((newObject, [key, value]) => {
    newObject[key] = value == null ? '' : value;

    return newObject;
  }, {});
