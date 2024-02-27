/* eslint-disable no-console */

const treatSpecificWarningsAsErrors = () => {
  const originalWarn = console.warn;

  console.warn = (warning, ...otherArguments) => {
    if (/Accessing PropTypes via the main React package is deprecated/.test(warning)) {
      throw new Error(warning);
    }
    originalWarn.apply(console, [warning, ...otherArguments]);
  };
};

const failOnAnyPropTypeErrors = () => {
  const originalError = console.error;

  console.error = (error, ...otherArguments) => {
    if (/(Invalid prop|Failed prop type)/.test(error)) {
      throw new Error(error);
    } else if (/type specification of prop .* is invalid/.test(error)) {
      throw new Error(error);
    }
    originalError.apply(console, otherArguments);
  };
};

module.exports = {
  failOnAnyPropTypeErrors,
  treatSpecificWarningsAsErrors
};

/* eslint-enable no-console */
