// @flow
import React from 'react';
import i18n from '@swa-ui/locale';

type Props = {
  isCancelled: boolean
};

const ReservationCancelledBanner = (props: Props) => (
  <div>
    {props.isCancelled && (
      <div className="bgred px4 py6 white large bold">
        <span>{i18n('VIEW_RESERVATION__RESERVATION_DETAILS__CANCELLED')}</span>
      </div>
    )}
  </div>
);

export default ReservationCancelledBanner;
