import _ from 'lodash';

export const transformFromPassengerTypeCountAndFareType = (passengerTypeCounts, fareProductDetails) =>
  _.chain(passengerTypeCounts)
    .omitBy((passengerCount) => passengerCount === 0)
    .mapValues((passengerCount, passengerType) => {
      const { label: fareLabel, fareRulesUrl } = fareProductDetails || {};

      return {
        passengerCount,
        passengerType,
        fareLabel,
        fareRulesUrl
      };
    })
    .value();
