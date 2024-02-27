// @flow

import React from 'react';
import dayjs from 'dayjs';

import type { CurrencyType } from 'src/shared/flow-typed/shared.types';
import { MEDIUM_DATE_FORMAT } from 'src/shared/constants/dateConstants';
import type { TransferViewTravelFund } from 'src/travelFunds/flow-typed/travelFunds.types';

import CreditCardImage from 'src/shared/components/creditCardImage';
import Currency from 'src/shared/components/currency';
import i18n from '@swa-ui/locale';

type Props = {
  originalTravelFund: TransferViewTravelFund,
  transferredAmount: CurrencyType
};

const TransferFundsSummarySender = ({ originalTravelFund, transferredAmount }: Props) => {
  const { 
    travelFundType, 
    leisureFund, 
    displayName, 
    fundIdentifier, 
    expirationDate, 
    expirationDateString 
  } = originalTravelFund;

  return (
    <React.Fragment>
      <div className="transfer-funds-summary--card-and-vert-line-row">
        <CreditCardImage cardType={travelFundType} leisureFund={leisureFund} />
        <div className="transfer-funds-summary--vert-line-after-card" />
      </div>
      <div className="transfer-funds-summary--detail-col">
        <div className="transfer-funds-summary--detail-col-sender-name">{displayName}</div>
        <div className="transfer-funds-summary--detail-col-pnr">{fundIdentifier}</div>
        <div className="transfer-funds-summary--detail-col-expiration">
          {expirationDateString
            ? expirationDateString
            : expirationDate &&
              `${i18n('EXPIRATION_TEXT')}: ${dayjs(expirationDate, MEDIUM_DATE_FORMAT).format('MM/DD/YYYY')}`}
        </div>
      </div>
      <div className="transfer-funds-summary--bold-amount">
        <Currency {...transferredAmount} />
      </div>
    </React.Fragment>
  );
};

export default TransferFundsSummarySender;
