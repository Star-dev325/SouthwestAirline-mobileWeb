// @flow

import _ from 'lodash';
import {
  formatDateOfBirthToMonthDayYear,
  formatDateOfBirthToYearMonthDay
} from 'src/airBooking/helpers/passengerInfoHelper';
import genderOptions from 'src/shared/form/constants/genderOptions';
import GenderTypes from 'src/shared/form/constants/genderTypes';

import type { Passenger, FrequentTravelerType } from 'src/shared/flow-typed/shared.types';

const { Male, Female } = genderOptions;
const toFirstUpperCase = (gender) => _.capitalize(_.result(gender, 'toLowerCase'));

export const transformGenderFromChapiToWapi = (gender: string) => {
  let passengerGender;

  switch (gender) {
    case GenderTypes.MALE:
      passengerGender = toFirstUpperCase(Male);
      break;
    case GenderTypes.FEMALE:
      passengerGender = toFirstUpperCase(Female);
      break;
    case GenderTypes.UNAVAILABLE:
      passengerGender = '';
      break;
  }

  return passengerGender;
};

export const transformPassengerInfo = (passenger: Passenger | FrequentTravelerType, format: string) => {
  const passengerDateOfBirth = _.get(passenger, 'dateOfBirth', '');
  const transformedDateOfBirth =
    format === 'YYYY-MM-DD'
      ? formatDateOfBirthToMonthDayYear(passengerDateOfBirth)
      : formatDateOfBirthToYearMonthDay(passengerDateOfBirth);

  return _.merge({}, passenger, { dateOfBirth: transformedDateOfBirth });
};
