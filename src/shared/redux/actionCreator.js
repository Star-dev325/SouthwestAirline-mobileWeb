import _ from 'lodash';

const _omitUndefined = (obj) => _.pickBy(obj, _.negate(_.isUndefined));
const _formatPrefix = (str) => _.toUpper(_.snakeCase(str));
const _removePrefix = (str, prefix = '') => _.replace(str, prefix, '');

const _successType = (actionType) => `${actionType}_SUCCESS`;
const _failedType = (actionType) => `${actionType}_FAILED`;

const apiActionCreator = (actionType, { isSpinnerNeeded = true, shouldHideError = false, shouldRedirectToHomePage } = {}, prefix = '') => {
  const start = (request) =>
    _omitUndefined({
      type: actionType,
      request,
      isFetching: isSpinnerNeeded ? true : undefined
    });

  const success = (response) =>
    _omitUndefined({
      type: _successType(actionType),
      response,
      isFetching: isSpinnerNeeded ? false : undefined
    });

  const failed = (error) =>
    _omitUndefined({
      type: _failedType(actionType),
      error,
      shouldHideError: shouldHideError || undefined,
      shouldRedirectToHomePage: shouldRedirectToHomePage || undefined,
      isFetching: isSpinnerNeeded ? false : undefined
    });

  const formattedType = _.camelCase(_removePrefix(actionType, prefix));

  return {
    [formattedType]: start,
    [`${formattedType}Success`]: success,
    [`${formattedType}Failed`]: failed
  };
};

export const actionCreator = (prefix) => {
  const formattedPrefix = _formatPrefix(prefix);

  return {
    createTypes: ({ async = [], sync = [] }) => ({
      ..._.chain(async)
        .flatMap((type) => [type, _successType(type), _failedType(type)])
        .reduce((result, type) => {
          const formattedType = `${formattedPrefix}__${type}`;

          result[formattedType] = formattedType;

          return result;
        }, {})
        .value(),
      ..._.reduce(
        sync,
        (result, type) => {
          const formattedType = `${formattedPrefix}__${type}`;

          result[formattedType] = formattedType;

          return result;
        },
        {}
      )
    }),
    createApiActions: (actionType, options) => apiActionCreator(actionType, options, formattedPrefix)
  };
};

export default apiActionCreator;
