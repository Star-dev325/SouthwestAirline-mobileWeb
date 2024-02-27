// @flow

import dayjs from 'dayjs';
import type { EarlyBirdBoundType, EarlyBirdBoundDetailsType } from 'src/earlyBird/flow-typed/earlyBird.types';

export const transformToEarlyBirdBoundDetails = (bounds: Array<EarlyBirdBoundType>): Array<EarlyBirdBoundDetailsType> =>
  bounds &&
  bounds.map((bound: EarlyBirdBoundType) => {
    const {
      arrivalAirportCode,
      arrivalTime,
      boundType,
      departureAirportCode,
      departureDate,
      departureTime,
      isOvernight,
      passengers
    } = bound;

    return {
      boundBrief: {
        arrivalAirportCode,
        arrivalTime,
        departureAirportCode,
        departureDate,
        departureDayOfWeek: dayjs(departureDate).format('dddd'),
        departureTime,
        isOvernight
      },
      boundType,
      passengers
    };
  });
