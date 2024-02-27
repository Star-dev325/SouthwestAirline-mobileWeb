export const cloneDeep = (object, clonedObjects = new WeakMap()) => {
  if ((typeof object !== 'object' || object === null) && typeof object !== 'function') {
    return object;
  }

  if (clonedObjects.has(object)) {
    return clonedObjects.get(object);
  }

  // mimic lodash behavior for cloning functions 
  if (typeof object === 'function') {
    return {};
  }

  if (object instanceof Date) {
    const clonedDate = new Date(object.getTime());

    clonedObjects.set(object, clonedDate);

    return clonedDate;
  }

  if (object instanceof RegExp) {
    const clonedRegularExpression = new RegExp(object.source, object.flags);

    clonedObjects.set(object, clonedRegularExpression);

    return clonedRegularExpression;
  }

  if (object instanceof Map) {
    const clonedMap = new Map();

    clonedObjects.set(object, clonedMap);

    object.forEach((value, key) => {
      clonedMap.set(key, cloneDeep(value, clonedObjects));
    });

    return clonedMap;
  }

  if (object instanceof Set) {
    const clonedSet = new Set();

    clonedObjects.set(object, clonedSet);

    object.forEach((value) => {
      clonedSet.add(cloneDeep(value, clonedObjects));
    });

    return clonedSet;
  }

  const clonedObject = Array.isArray(object) ? [] : Object.create(Object.getPrototypeOf(object));

  clonedObjects.set(object, clonedObject);

  const keys = [...Object.keys(object), ...Object.getOwnPropertyNames(object), ...Object.getOwnPropertySymbols(object)];

  for (const key of keys) {
    clonedObject[key] = cloneDeep(object[key], clonedObjects);
  }

  return clonedObject;
};
