// @flow
import _ from 'lodash';

import type { LowFareCalendarDaysType, LowFareBoundType } from 'src/airBooking/flow-typed/lowFare.types';

export const mergeAndRemoveDuplicateDates = (
  preferredDays: Array<LowFareCalendarDaysType>,
  days: Array<LowFareCalendarDaysType>
): Array<LowFareCalendarDaysType> =>
  _.unionWith(preferredDays, days, (prefDay: LowFareCalendarDaysType, day: LowFareCalendarDaysType) =>
    _.isEqual(prefDay.date, day.date)
  );

export const transformToPrevBoundPage = (newBoundPage: ?LowFareBoundType, currentBoundPage: LowFareBoundType) => {
  if (_.isEmpty(newBoundPage)) {
    return {
      header: currentBoundPage.header,
      lowFareCalendarDays: [..._.get(currentBoundPage, 'lowFareCalendarDays')],
      _links: {
        previousLowFareCalendarPage: null,
        nextLowFareCalendarPage: _.get(currentBoundPage, '_links.nextLowFareCalendarPage')
      }
    };
  } else {
    const mergedWithoutDuplicateDates = mergeAndRemoveDuplicateDates(
      _.get(newBoundPage, 'lowFareCalendarDays'),
      _.get(currentBoundPage, 'lowFareCalendarDays')
    );

    return {
      header: _.get(newBoundPage, 'header'),
      lowFareCalendarDays: mergedWithoutDuplicateDates,
      _links: {
        previousLowFareCalendarPage: _.get(newBoundPage, '_links.previousLowFareCalendarPage'),
        nextLowFareCalendarPage: _.get(currentBoundPage, '_links.nextLowFareCalendarPage')
      }
    };
  }
};

export const transformToNextBoundPage = (newBoundPage: ?LowFareBoundType, currentBoundPage: ?LowFareBoundType) => {
  if (_.isEmpty(newBoundPage)) {
    return {
      header: _.get(currentBoundPage, 'header'),
      lowFareCalendarDays: [..._.get(currentBoundPage, 'lowFareCalendarDays')],
      _links: {
        previousLowFareCalendarPage: _.get(currentBoundPage, '_links.previousLowFareCalendarPage'),
        nextLowFareCalendarPage: null
      }
    };
  } else {
    return {
      header: _.get(newBoundPage, 'header'),
      lowFareCalendarDays: [
        ..._.get(currentBoundPage, 'lowFareCalendarDays'),
        ..._.get(newBoundPage, 'lowFareCalendarDays')
      ],
      _links: {
        previousLowFareCalendarPage: _.get(currentBoundPage, '_links.previousLowFareCalendarPage'),
        nextLowFareCalendarPage: _.get(newBoundPage, '_links.nextLowFareCalendarPage')
      }
    };
  }
};
