import _ from 'lodash';

export default (allSchemas = {}, conditionObject = '') => {
  if (_.isUndefined(conditionObject) || !_.fromPairs(conditionObject)) {
    return allSchemas;
  }

  const omitKeys = _.chain(conditionObject)
    .pickBy((value) => !value)
    .keys()
    .value();

  return _.omit(allSchemas, omitKeys);
};
