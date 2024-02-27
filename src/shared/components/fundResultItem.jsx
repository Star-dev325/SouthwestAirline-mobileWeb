// @flow
import i18n from '@swa-ui/locale';
import dayjs from 'dayjs';
import _ from 'lodash';
import React from 'react';
import Button from 'src/shared/components/button';
import CreditCardImage from 'src/shared/components/creditCardImage';
import Currency from 'src/shared/components/currency';
import Icon from 'src/shared/components/icon';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import TravelFundsConstants from 'src/travelFunds/constants/travelFundsConstants';

import { MEDIUM_DATE_FORMAT } from 'src/shared/constants/dateConstants';
import type {
  BillingInformation,
  CurrencyType,
  GreyBoxMessage as GreyBoxMessageType
} from 'src/shared/flow-typed/shared.types';
import type { ViewTravelFundLinkRequestType } from 'src/travelFunds/flow-typed/travelFunds.types';

const { SPLIT_PAYMENT } = TravelFundsConstants;

type Props = {
  fundType: string,
  displayName: string,
  appliedAmount: ?CurrencyType,
  appliedPoints?: CurrencyType,
  appliedPointsAmount?: CurrencyType,
  removalId?: string,
  removeFundFn?: (string) => void,
  fundIdentifier?: string,
  expirationDate?: string,
  expirationDateString?: string,
  remainingAmount?: CurrencyType,
  errorMessage?: string,
  pointsRemaining?: string,
  billingInfo?: BillingInformation,
  validateTransferLink?: ViewTravelFundLinkRequestType,
  associateFundLink?: ViewTravelFundLinkRequestType,
  onClickValidateTransferLinkFn?: (ViewTravelFundLinkRequestType) => void,
  onClickAssociateFundLinkFn?: (ViewTravelFundLinkRequestType) => void,
  leisureFund?: boolean,
  greyBoxMessage?: GreyBoxMessageType,
  transferableText?: string
};

const FundResultItem = (props: Props) => {
  const {
    appliedAmount,
    appliedPoints,
    appliedPointsAmount,
    associateFundLink,
    billingInfo,
    displayName,
    errorMessage,
    expirationDate,
    expirationDateString,
    fundIdentifier,
    fundType,
    greyBoxMessage,
    leisureFund,
    onClickAssociateFundLinkFn,
    onClickValidateTransferLinkFn,
    pointsRemaining,
    remainingAmount,
    removalId = '0',
    removeFundFn,
    transferableText,
    validateTransferLink
  } = props;

  const streetOne = _.get(billingInfo, 'billingAddress.streetOne');
  const streetTwo = _.get(billingInfo, 'billingAddress.streetTwo');
  const location = _.get(billingInfo, 'billingAddress.location');
  const isSplitPayment = fundType === SPLIT_PAYMENT;
  const splitPaymentFund = appliedPointsAmount || appliedPoints;
  const appliedFunds = isSplitPayment && splitPaymentFund ? { ...splitPaymentFund, showPts: true } : appliedAmount;

  const handleRemoveFundClick = (fundRemovalId: string) => {
    removeFundFn && removeFundFn(fundRemovalId);
    isSplitPayment && raiseSatelliteEvent('squid', { page_description: 'button:cash plus points remove points' });
  };

  return (
    <div className="fund-results-list--item">
      <div className="fund-results-list--outer-container">
        <CreditCardImage cardType={fundType} leisureFund={leisureFund} showIcon={isSplitPayment} />
        <div className="fund-results-list-item--info-container">
          <div className="fund-results-list-item--main-info">
            <div className="fund-results-list--text">
              <div>
                <p className="fund-result-title pdkblue larger">
                  {billingInfo && billingInfo.afpCardType ? billingInfo.afpCardType : displayName}
                </p>
                {billingInfo && billingInfo.lastFourDigits && (
                  <p className="last-four-digits-text gray5">
                    Last 4 digits:&nbsp;<span className="bold">{billingInfo.lastFourDigits}</span>
                  </p>
                )}
              </div>
              {!isSplitPayment && (
                <div className="additional-info-container">
                  {fundIdentifier && <div>{fundIdentifier}</div>}
                  {expirationDateString ? (
                    <div> {expirationDateString} </div>
                  ) : (
                    expirationDate && (
                      <div>
                        {i18n('SHARED__REFUND_RESULT_ITEM__EXPIRTATION')}{' '}
                        {dayjs(expirationDate, MEDIUM_DATE_FORMAT).format('MM/DD/YYYY')}
                      </div>
                    )
                  )}
                  {remainingAmount && (
                    <div>
                      {i18n('SHARED__REFUND_RESULT_ITEM__REMAINING')}&nbsp;
                      <Currency {...remainingAmount} />
                    </div>
                  )}
                  {transferableText && <div>{transferableText}</div>}
                </div>
              )}
              {isSplitPayment && pointsRemaining && (
                <div className="additional-info-container">
                  <div>{pointsRemaining}</div>
                </div>
              )}
            </div>
            <div className="fund-results-list--amount-container">
              <Currency className="fund-results-list--available-amount" {...appliedFunds} />
              {appliedAmount && isSplitPayment && (
                <Currency className="fund-results-list--dollar-amount" {...appliedAmount} />
              )}
            </div>
            {removeFundFn && (
              <Icon
                onClick={() => handleRemoveFundClick(removalId)}
                type="remove"
                className="fund-results-list--removal-button"
              />
            )}
          </div>
          {errorMessage && <p className="fund-results-list--error-message">{errorMessage}</p>}
          {billingInfo && (
            <div className="fund-results-list--billing-info">
              <div className="align-left">
                <p className="billing-col-title">CARDHOLDER</p>
                <p className="card-holder">{billingInfo.cardHolderName}</p>
              </div>
              <div className="align-right">
                <p className="billing-col-title">BILLING ADDRESS</p>
                {<p className="street-one">{streetOne}</p>}
                {streetTwo && <p className="street-two">{streetTwo}</p>}
                {location && <p className="location-info">{location}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
      {validateTransferLink && onClickValidateTransferLinkFn && (
        <Button
          size="larger"
          color="blue"
          fluid
          className="fund-results-list--transfer-button"
          onClick={() => onClickValidateTransferLinkFn(validateTransferLink)}
        >
          {_.get(validateTransferLink, 'labelText', 'Transfer to someone else')}
        </Button>
      )}
      {associateFundLink && onClickAssociateFundLinkFn && (
        <a
          className="pblue fund-results-list--associate-link"
          onClick={() => onClickAssociateFundLinkFn(associateFundLink)}
        >
          {_.get(associateFundLink, 'labelText', 'Add to My Account')}
        </a>
      )}
      {greyBoxMessage && (
        <div className="fund-results-list--grey-box-message">
          <div className="header">{greyBoxMessage.header || ''}</div>
          <div className="body">{greyBoxMessage.body || ''}</div>
        </div>
      )}
    </div>
  );
};

export default FundResultItem;
