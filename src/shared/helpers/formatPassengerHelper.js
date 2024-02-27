// @flow

import i18n from '@swa-ui/locale';

import type { ConfirmedPassenger } from 'src/shared/flow-typed/shared.types';

export const parsePassengers = (passengers: Array<ConfirmedPassenger>): Array<ConfirmedPassenger> => {
  const transformedPassengers = [];

  for (let index = 0; index < passengers.length; index++) {
    const currentPassenger = passengers[index];
    const nextPassenger = passengers[index + 1];

    if (nextPassenger && nextPassenger.displayName === i18n('SHARED__SPECIAL_ASSISTANCE__EXTRA_SEAT')) {
      index++;
      transformedPassengers.push({ ...currentPassenger, hasExtraSeat: true });
    } else {
      transformedPassengers.push({ ...currentPassenger });
    }
  }

  return transformedPassengers;
};
