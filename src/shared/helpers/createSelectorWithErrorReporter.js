import { createSelector as originalCreateSelector } from 'reselect';

export const createSelector = (...args) => {
  const selector = originalCreateSelector(...args);

  const selectorErrorReporter = (...dataArgs) => {
    try {
      return selector(...dataArgs);
    } catch (error) {
      console.error(error); //eslint-disable-line
      throw error;
    }
  };

  selectorErrorReporter.resultFunc = selector.resultFunc;

  return selectorErrorReporter;
};
