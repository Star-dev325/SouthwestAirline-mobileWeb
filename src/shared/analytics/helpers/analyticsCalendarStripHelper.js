// @flow
import dayjs from 'dayjs';

import type { BoundType } from 'src/shared/flow-typed/flightBound.types';
import { INBOUND, OUTBOUND } from 'src/shared/constants/flightBoundTypes';

export const calculateDateDiffs = (
  newDate: string,
  previousDate: string,
  direction: BoundType,
  currentDiffs: { [BoundType]: string } = {}
): { [BoundType]: string } => {
  const diff = dayjs(newDate).diff(previousDate, 'days');
  const sign = Math.sign(diff) === 1 ? '+' : '';
  const diffs = { ...currentDiffs };

  diffs[direction] = `${sign}${diff}`;

  return diffs;
};

export const calculateOverrideDateDiffs = (
  newDate: string,
  previousDate: string,
  direction: BoundType,
  isOverrideEndDate: boolean,
  previousDiffs: { [BoundType]: string } = {}
): { [BoundType]: string } => {
  let diffs = {};

  if (direction === OUTBOUND) {
    if (isOverrideEndDate) {
      diffs = calculateDateDiffs(newDate, previousDate, INBOUND, previousDiffs);
    } else {
      diffs = {};
    }
  }

  return diffs;
};
