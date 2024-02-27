// @flow

import dayjs from 'dayjs';

export const formatDateOfBirthToYearMonthDay = (dateOfBirth: string) =>
  dayjs(dateOfBirth, ['MM/DD/YYYY', 'YYYY-MM-DD']).format('YYYY-MM-DD');

export const formatDateOfBirthToMonthDayYear = (dateOfBirth: string) =>
  dayjs(dateOfBirth, ['MM/DD/YYYY', 'YYYY-MM-DD']).format('MM/DD/YYYY');
