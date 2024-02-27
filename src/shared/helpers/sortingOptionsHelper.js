// @flow
import _ from 'lodash';
import type { PassengerType } from 'src/shared/flow-typed/passenger.types';
import SortingOptions from 'src/shared/constants/sortingOptions';
import type { OptionType } from 'src/shared/flow-typed/shared.types';

const { STARTING_FROM_AMOUNT, DURATION_MINUTES, NUMBER_OF_STOPS, DEPARTURE_TIME } = SortingOptions;

export const getSortingOptions = (
  paxType: ?PassengerType,
  shouldNotIncludePrice: boolean = false
): Array<OptionType> => {
  const SORT_OPTIONS = [
    {
      label: 'Depart Time',
      value: DEPARTURE_TIME
    },
    {
      label: 'Price',
      value: STARTING_FROM_AMOUNT
    },
    {
      label: 'Number of Stops',
      value: NUMBER_OF_STOPS
    },
    {
      label: 'Duration',
      value: DURATION_MINUTES
    }
  ];

  if (shouldNotIncludePrice) {
    return _.reject(SORT_OPTIONS, ['label', 'Price']);
  }

  return SORT_OPTIONS;
};
