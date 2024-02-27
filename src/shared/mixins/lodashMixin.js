import _ from 'lodash';

function boolMatch(s, matchers) {
  let i, matcher;
  const down = s.toLowerCase();

  matchers = [].concat(matchers);
  for (i = 0; i < matchers.length; i += 1) {
    matcher = matchers[i];

    if (!matcher) continue;

    if (matcher.test && matcher.test(s)) return true;

    if (matcher.toLowerCase() === down) return true;
  }
}

export default function () {
  _.mixin(
    {
      count(collection, predicate) {
        if (!predicate) {
          return collection.length;
        }

        const callback = _.iteratee(predicate);

        return _.reduce(collection, (result, item) => (callback(item) ? result + 1 : result), 0);
      }
    },
    { chain: false }
  );

  // toBoolean mixin is same as https://github.com/epeli/underscore.string#tobooleanstring--boolean
  _.mixin({
    toBoolean(str, trueValues, falseValues) {
      if (typeof str === 'number') str = `${str}`;

      if (typeof str !== 'string') return !!str;
      str = _.trim(str);

      if (boolMatch(str, trueValues || ['true', '1'])) return true;

      if (boolMatch(str, falseValues || ['false', '0'])) return false;

      return false;
    },
    // to compatibility with lodash v3.x merge.
    mergeWithoutUndefined() {
      const target = arguments[0];
      const source = Array.prototype.slice.call(arguments, 1);

      return _.chain(target)
        .merge(...source)
        .omitBy(_.isUndefined)
        .value();
    },
    isPromise(obj) {
      return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
    },
    someExecute: (funcArr) => (context) => {
      let result;

      for (let i = 0; i < funcArr.length; i++) {
        const fn = funcArr[i];

        result = fn(context);

        if (result) break;
      }

      return result;
    },
    hasAll: (obj, keys) => _.every(keys, _.partial(_.has, obj)),
    hasAny: (obj, keys) => _.some(keys, _.partial(_.hasIn, obj)),
    omitIfEmpty: (obj) => _.omitBy(obj, _.isEmpty),
    // unflattens an object with '.' delimited keys, for example, {'a.b.c': 'd'} => {a: {b: {c: 'd'}}}
    unflatten: (obj) =>
      _.reduce(
        obj,
        (result, value, key) => {
          _.set(result, key, value);

          return result;
        },
        {}
      )
  });
}
