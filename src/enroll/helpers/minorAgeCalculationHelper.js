// @flow

import dayjs from 'dayjs';

export function userIsConsideredMinor(dateOfBirth: string, minorAgeThreshold: number): boolean {
  const yearDiff = dayjs().diff(dateOfBirth, 'years');

  return !!dateOfBirth && yearDiff < minorAgeThreshold;
}
