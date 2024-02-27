// @flow

import React from 'react';
import i18n from '@swa-ui/locale';

type Props = {
  confirmationNumber: string
};

const ConfirmationNumber = ({ confirmationNumber }: Props) => (
  <div>
    <div className="confirmation-label" data-qa="confirmation-label">
      {i18n('SHARED__PASSENGER_RESERVATION_TITLE__CONFIRMATION')}
    </div>
    <div data-qa="passenger-record-locator" className="xlarge passenger-record-locator green align-right">
      {confirmationNumber}
    </div>
  </div>
);

export default ConfirmationNumber;
