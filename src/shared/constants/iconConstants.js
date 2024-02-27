// @flow

const iconDictionary = {
  INFO: 'ic-info',
  WARNING: 'exclamation-circle'
};

export default iconDictionary;

export const getIconType = (type: string) => {
  const typeToUpperCase = type.toUpperCase();

  if (iconDictionary[typeToUpperCase]) {
    return iconDictionary[typeToUpperCase];
  }

  return iconDictionary.WARNING;
};
