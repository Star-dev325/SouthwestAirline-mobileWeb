import _ from 'lodash';
import { cloneDeep, get } from 'src/shared/helpers/jsUtils';

export const getCombinedFlightNumberFromSegments = (segments, path = 'marketingCarrierInfo.flightNumber') => {
  const flightNumber = _.reduce(
    segments,
    (result, segment) => {
      result = result + (result.length ? '/' : '') + get(segment, path);

      return result;
    },
    ''
  );

  return flightNumber;
};

export const getUpdatedSelectedFlightDetails = (selectedFlight, currentState) => {
  const { currentDirection, flightDetails } = selectedFlight;
  const { inbound, outbound } = currentState;

  if (currentDirection === 'inbound') {
    return {
      inbound: cloneDeep(flightDetails),
      outbound: outbound ? cloneDeep(outbound) : {},
      currentDirection
    };
  } else if (currentDirection === 'outbound') {
    return {
      inbound: inbound ? cloneDeep(inbound) : {},
      outbound: cloneDeep(flightDetails),
      currentDirection
    };
  }

  return currentState;
};
