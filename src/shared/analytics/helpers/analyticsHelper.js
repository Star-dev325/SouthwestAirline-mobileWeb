import _ from 'lodash';

export const generateUpdatedFlowStoreForAnalytics = (flowSelectors, state, actionType) =>
  _.chain(flowSelectors)
    .pickBy((selectorObj) => _.includes(selectorObj.actions, actionType))
    .mapValues((selectorObj) => selectorObj.selector(state))
    .value();

export const generateFlowActionListForAnalytics = (flowSelectors) =>
  _.chain(flowSelectors).mapValues('actions').values().flatten().uniq().value();

export const generateUpdatedStoresForAnalytics = (generators, state, actionType) =>
  _.reduce(
    generators,
    (result, generator, key) => {
      _.each(generator(state, actionType), (subValue, subKey) => {
        result[`${key}.${subKey}`] = subValue;
      });

      return result;
    },
    {}
  );
