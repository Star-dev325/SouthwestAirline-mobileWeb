// @flow

import dayjs from 'dayjs';
import _ from 'lodash';
import type {
  DynamicWaiverType,
  FormDataType,
  SearchRequest,
  SelectedBounds
} from 'src/airChange/flow-typed/airChange.types';

export const isDynamicWaiverEligible = (
  dynamicWaivers: Array<DynamicWaiverType>,
  searchRequest: SearchRequest | FormDataType,
  selectedBounds: SelectedBounds
) =>
  isWithinDynamicWaiverAlternativeCities(dynamicWaivers, searchRequest, selectedBounds) &&
  isWithinDynamicWaiverDateRange(dynamicWaivers, searchRequest, selectedBounds);

export const isWithinDynamicWaiverAlternativeCities = (
  dynamicWaivers: Array<DynamicWaiverType>,
  searchRequest: SearchRequest | FormDataType,
  selectedBounds: SelectedBounds
) => {
  const isRoundTripChange = _.size(_.filter(selectedBounds)) === 2;

  return getSelectedDynamicWaiverBounds(dynamicWaivers, selectedBounds).every(({ dynamicWaiver, isFirstBound }) => {
    const { alternativeDepartureCities, alternativeArrivalCities } = dynamicWaiver;

    const fromStation = isRoundTripChange && !isFirstBound ? searchRequest.to : searchRequest.from;
    const isFromStationValid =
      _.isEmpty(alternativeDepartureCities) || _.includes(alternativeDepartureCities, fromStation);

    const toStation = isRoundTripChange && !isFirstBound ? searchRequest.from : searchRequest.to;
    const isToStationValid = _.isEmpty(alternativeArrivalCities) || _.includes(alternativeArrivalCities, toStation);

    return isFromStationValid && isToStationValid;
  });
};

export const isWithinDynamicWaiverDateRange = (
  dynamicWaivers: Array<DynamicWaiverType>,
  searchRequest: SearchRequest | FormDataType,
  selectedBounds: SelectedBounds
) =>
  getSelectedDynamicWaiverBounds(dynamicWaivers, selectedBounds).every(({ dynamicWaiver, isFirstBound }) => {
    const { calculatedStartDate, calculatedEndDate } = dynamicWaiver;

    const date = isFirstBound
      ? _.get(searchRequest, 'departureAndReturnDate.departureDate')
      : _.get(searchRequest, 'departureAndReturnDate.returnDate');

    return dayjs(date).isBetween(calculatedStartDate, calculatedEndDate, 'day', '[]');
  });

const getSelectedDynamicWaiverBounds = (dynamicWaivers: Array<DynamicWaiverType>, selectedBounds: SelectedBounds) =>
  _.chain(selectedBounds)
    .omitBy((value) => !value)
    .map((value, key) =>
      (key === 'firstbound'
        ? {
          dynamicWaiver: _.first(dynamicWaivers),
          isFirstBound: true
        }
        : {
          dynamicWaiver: _.get(dynamicWaivers, '1'),
          isFirstBound: false
        })
    )
    .filter((bound) => !_.isEmpty(bound.dynamicWaiver))
    .value();
