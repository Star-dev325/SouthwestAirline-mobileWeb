// @flow
import React from 'react';
import util from 'util';
import i18n from '@swa-ui/locale';

type Props = {
  confirmationNumber: string
};

const ConfirmationNumberSubtitle = (props: Props) => (
  <div className="my-account-flight-card--confirmation-number">
    <span>
      {util.format(i18n('MY_ACCOUNT__CONFIRMATION_NUMBER_SUBTITLE__CONFIRMATION_NUMBER'), props.confirmationNumber)}
    </span>
  </div>
);

export default ConfirmationNumberSubtitle;
