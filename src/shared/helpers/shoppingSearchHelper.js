// @flow
import _ from 'lodash';

import type { SearchFlightOptions, SearchRequest } from 'src/airChange/flow-typed/airChange.types';
import type { BoundSelection } from 'src/shared/flow-typed/boundSelect.types';

export const generateSearchRequest = (options: SearchFlightOptions) => {
  const {
    changeShoppingLink: { href, method, body },
    boundSelections,
    selectedBounds,
    searchRequest
  } = options;

  const isSwitchedFromTo = shouldSwitchFromTo(boundSelections, selectedBounds);

  const updatedBody = _.chain(selectedBounds)
    .pickBy((selected) => !!selected)
    .reduce((result, selected, boundName) => {
      const boundIndex = boundName === 'firstbound' ? 0 : 1;
      const boundType = getBoundType(boundSelections, boundIndex);

      result[boundType] = {
        boundReference: _.get(body, `${boundIndex}.boundReference`),
        isChangeBound: true,
        ...updateBound(searchRequest, boundIndex, isSwitchedFromTo)
      };

      return result;
    }, {})
    .value();

  if (!updatedBody.outbound) {
    updatedBody.outbound = generateInitBound(boundSelections, body, 0);
  }
  const isRoundTrip = boundSelections.length === 2;

  if (isRoundTrip && !updatedBody.inbound) {
    updatedBody.inbound = generateInitBound(boundSelections, body, 1);
  }

  return {
    href,
    method,
    body: updatedBody
  };
};

const generateInitBound = (boundSelections: Array<BoundSelection>, body: ?Array<string>, index: number) => {
  const bound = boundSelections[index];

  return {
    boundReference: _.get(body, `${index}.boundReference`),
    isChangeBound: false,
    date: bound.originalDate,
    'origin-airport': bound.fromAirportCode,
    'destination-airport': bound.toAirportCode
  };
};

const updateBound = (searchRequest: SearchRequest, boundIndex: number, isSwitchedFromTo: boolean = false) => {
  const from = _.get(searchRequest, 'from');
  const to = _.get(searchRequest, 'to');

  if (boundIndex === 0) {
    return {
      date: _.get(searchRequest, 'departureAndReturnDate.departureDate'),
      'origin-airport': from,
      'destination-airport': to
    };
  }

  return {
    date: _.get(searchRequest, 'departureAndReturnDate.returnDate'),
    'origin-airport': isSwitchedFromTo ? to : from,
    'destination-airport': isSwitchedFromTo ? from : to
  };
};

export const getBoundType = (boundSelections: Array<BoundSelection>, boundIndex: number) =>
  (boundIndex === 0 ? 'outbound' : 'inbound');

const shouldSwitchFromTo = (boundSelections: Array<BoundSelection>, selectedBounds: { [string]: boolean }) =>
  selectedBounds.firstbound && selectedBounds.secondbound;
