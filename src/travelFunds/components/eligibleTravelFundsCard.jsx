// @flow

import React from 'react';
import dayjs from 'dayjs';

import CreditCardImage from 'src/shared/components/creditCardImage';
import Currency from 'src/shared/components/currency';
import i18n from '@swa-ui/locale';

import type { CurrencyType } from 'src/shared/flow-typed/shared.types';
import { MEDIUM_DATE_FORMAT } from 'src/shared/constants/dateConstants';

type Props = {
  displayName: string,
  expirationDate: string,
  expirationDateString?: string,
  fundIdentifier: string,
  transferableAmount: CurrencyType,
  learnMoreWithLinks: string,
  travelFundType: string,
  leisureFund: boolean
};

const EligibleTravelFundsCard = (props: Props) => {
  const {
    displayName,
    expirationDate,
    expirationDateString,
    fundIdentifier,
    transferableAmount,
    learnMoreWithLinks,
    travelFundType,
    leisureFund
  } = props;
  const expiration = expirationDateString
    ? expirationDateString
    : expirationDate && `${i18n('EXPIRATION_TEXT')}: ${dayjs(expirationDate, MEDIUM_DATE_FORMAT).format('MM/DD/YYYY')}`;

  return (
    <div className="eligibile-funds-card">
      <div className="eligibile-funds-card--title">{i18n('TRAVEL_FUNDS__ELIGIBLE_FUNDS__HEADER')}</div>
      <div className="eligibile-funds-card--container">
        <div className="eligibile-funds-card--content">
          <CreditCardImage cardType={travelFundType} leisureFund={leisureFund} />
          <div className="eligible-funds-card--description">
            <div className="eligible-funds-card--name">{displayName}</div>
            <div className="eligible-funds-card--pnr">{fundIdentifier}</div>
            {(expirationDate || expirationDateString) && (
              <div className="eligible-funds-card--expiration"> {expiration} </div>
            )}
            {learnMoreWithLinks && (
              <div className="eligible-funds-card--learn-more">
                <p dangerouslySetInnerHTML={{ __html: learnMoreWithLinks }} />
              </div>
            )}
          </div>
          <div className="eligible-funds-card--amount">
            <Currency {...transferableAmount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EligibleTravelFundsCard;
