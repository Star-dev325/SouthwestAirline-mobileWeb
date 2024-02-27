// @flow

import _ from 'lodash';
import { transformPassengerInfo } from 'src/airBooking/transformers/passengerInfoTransformer';

export const transformPassengerInfos = (passengerInfos: Array<*>, format: string) =>
  _.map(passengerInfos, (passenger) => {
    const passengerInfo = _.get(passenger, 'passengerInfo', {});
    const transformedPassengerInfo = transformPassengerInfo(passengerInfo, format);

    return _.merge({}, passenger, { passengerInfo: { ...transformedPassengerInfo } });
  });
