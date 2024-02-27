// @flow

export const toTitleCase = (str: string) =>
  str.replace(/\w*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
