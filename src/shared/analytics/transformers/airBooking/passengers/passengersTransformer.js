import _ from 'lodash';
import dayjs from 'dayjs';
import { createSha256Hash } from 'src/shared/helpers/hashHelper';
import { transformGenderFromChapiToWapi } from 'src/airBooking/transformers/passengerInfoTransformer';

export const transformToPassengers = (passengerInfos) => {
  if (_.isEmpty(passengerInfos)) {
    return [];
  }

  const receiptEmail = getFirstPassengerEmailHash(passengerInfos);

  return _.compact(
    _.map(passengerInfos, (passenger) => {
      if (_.isEmpty(passenger.passengerInfo)) {
        return null;
      }

      const birthYear = dayjs(passenger.passengerInfo.dateOfBirth, 'YYYY-MM-DD').format('YYYY');

      return {
        accountNumber: passenger.passengerInfo.rapidRewardsNumber,
        birthYear,
        gender: transformGenderFromChapiToWapi(passenger.passengerInfo.gender),
        receiptEmail
      };
    })
  );
};

const getFirstPassengerEmailHash = (passengerInfos) => {
  if (_.isEmpty(passengerInfos)) {
    return '';
  }

  return createSha256Hash(_.get(_.first(passengerInfos).passengerInfo, 'emailReceiptTo'));
};
