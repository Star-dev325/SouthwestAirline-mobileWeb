// @flow
import i18n from '@swa-ui/locale';
import React from 'react';
import TransferFundsSummaryRecipient from 'src/travelFunds/components/transferFundsSummaryRecipient';
import TransferFundsSummarySender from 'src/travelFunds/components/transferFundsSummarySender';
import type { CurrencyType } from 'src/shared/flow-typed/shared.types';
import type { TransferViewTravelFund, TransferTravelFundsPageRecipientDetails } from 'src/travelFunds/flow-typed/travelFunds.types';

type Props = {
  originalTravelFund: TransferViewTravelFund,
  recipientDetails: TransferTravelFundsPageRecipientDetails,
  transferredAmount: CurrencyType
};

const TransferFundsSummaryCard = ({ originalTravelFund, recipientDetails, transferredAmount }: Props) => (
  <div className="transfer-funds-summary-card">
    <div className="transfer-funds-summary--title">{i18n('TRANSFER_CONFIRMATION_TITLE')}</div>
    <div className="transfer-funds-summary">
      <div className="transfer-funds-summary--row">
        <TransferFundsSummarySender originalTravelFund={originalTravelFund} transferredAmount={transferredAmount} />
      </div>
      <div className="transfer-funds-summary--row">
        <div className="transfer-funds-summary--vert-line-col">
          <div className="transfer-funds-summary--circle" />
          <div className="transfer-funds-summary--to-text">{i18n('TRANSFERRED_TO_LABEL')}</div>
        </div>
      </div>
      <div className="transfer-funds-summary--row">
        <TransferFundsSummaryRecipient recipientDetails={recipientDetails} />
      </div>
    </div>
  </div>
);

export default TransferFundsSummaryCard;
