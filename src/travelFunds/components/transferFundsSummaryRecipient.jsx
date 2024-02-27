// @flow

import React from 'react';

import type { TransferTravelFundsPageRecipientDetails } from 'src/travelFunds/flow-typed/travelFunds.types';

import CreditCardImage from 'src/shared/components/creditCardImage';
import i18n from '@swa-ui/locale';

type Props = {
  recipientDetails: TransferTravelFundsPageRecipientDetails
};

const TransferFundsSummaryRecipient = ({ recipientDetails }: Props) => (
  <React.Fragment>
    <div className="receiver">
      <CreditCardImage cardType="TRAVEL_FUNDS_CONFIRMATION" />
    </div>
    <div className="transfer-funds-summary--detail-col">
      <div className="transfer-funds-summary--detail-col-receiver-name">{recipientDetails.displayName}</div>
      <div className="transfer-funds-summary--detail-col-rr-number">{`${i18n('RAPID_REWARDS_LABEL')}${
        recipientDetails.accountNumber
      }`}</div>
      <div className="transfer-funds-summary--detail-col-email">{`${i18n('RECIPIENT_EMAIL_ADDRESS_PLACEHOLDER')}: ${
        recipientDetails.emailAddress
      }`}</div>
      {recipientDetails.personalMessage && (
        <React.Fragment>
          <br />
          <div className="transfer-funds-summary--detail-col-personal-message">
            <div>{i18n('CONFIRMATION_PERSONAL_MESSAGE_LABEL')}</div>
            <div>
              <p className="transfer-funds-summary--detail-col-personal-message-paragraph">
                {recipientDetails.personalMessage}
              </p>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  </React.Fragment>
);

export default TransferFundsSummaryRecipient;
