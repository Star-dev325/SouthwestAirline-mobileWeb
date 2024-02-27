// @flow
import React from 'react';
import i18n from '@swa-ui/locale';

import type { Node } from 'react';

type Props = {
  isCheckedIn?: boolean,
  hasCompletePassportInfo?: boolean,
  isInternational?: boolean
};

const PassengerDocumentStatus = ({ isCheckedIn, hasCompletePassportInfo, isInternational = true }: Props): Node => {
  if (isCheckedIn) {
    return <div className="bold green">{i18n('SHARED__RESERVATION_PASSENGER__CHECKED_IN')}</div>;
  } else if (isInternational) {
    return hasCompletePassportInfo ? (
      <div className="bold green">{i18n('SHARED__RESERVATION_PASSENGER__PASSPORT_COMPLETED')}</div>
    ) : (
      <div className="bold red">{i18n('SHARED__RESERVATION_PASSENGER__PASSPORT_INCOMPLETE')}</div>
    );
  }

  return null;
};

export default PassengerDocumentStatus;
