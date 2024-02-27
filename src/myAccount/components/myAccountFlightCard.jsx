// @flow
import React from 'react';
import formatDateRange from 'src/shared/helpers/formatDateRange';
import i18n from '@swa-ui/locale';

import type { Node } from 'react';
import type { ConfirmationDates } from 'src/shared/flow-typed/shared.types';

type Props = {
  dates: ConfirmationDates,
  originDescription: string,
  destinationDescription: string,
  children?: Node
};

const MyAccountFlightCard = (props: Props) => {
  const e = (element) => `my-account-flight-card--${element}`; // e = the "element" in BEM
  const { dates, originDescription, destinationDescription, children } = props;

  return (
    <div className="my-account-flight-card">
      <span className={e('trip-date')}>{formatDateRange(dates.first, dates.second)}</span>
      <span className={e('airport')}>
        {originDescription} {i18n('MY_ACCOUNT__FLIGHT_CARD__TO')}
      </span>
      <span className={e('airport')}>{destinationDescription}</span>
      {children}
    </div>
  );
};

export default MyAccountFlightCard;
