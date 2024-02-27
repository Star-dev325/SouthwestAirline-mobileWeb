// @flow
import React from 'react';
import dayjs from 'dayjs';
import RefundTotalItem from 'src/shared/components/refundTotalItem';
import RefundTypes from 'src/shared/constants/refundTypes';
import CancellationTitle from 'src/airCancel/components/cancellationTitle';
import i18n from '@swa-ui/locale';
import GuestPassesSection from 'src/shared/components/guestPassesSection';

import type { CurrencyLabelType, GuestPassType } from 'src/airCancel/flow-typed/airCancel.types';

const { HOLD_FUTURE_USE, BACK_TO_ORIGINAL_PAYMENT } = RefundTypes;

type Props = {
  refundableFunds: ?CurrencyLabelType,
  nonRefundableFunds: ?CurrencyLabelType,
  pointsToCreditTotal: ?CurrencyLabelType,
  refundMethod?: string,
  pointsToCreditAccount: ?string,
  nonRefundableExpirationDate?: ?string,
  expirationDateString?: string,
  isConfirmationPage?: boolean,
  boldTopMessage?: boolean,
  isCancelBoundFlow?: boolean,
  showRefundableSelection: boolean,
  guestPasses: ?GuestPassType
};

const RefundSummaryForCancel = (props: Props) => {
  const {
    refundableFunds,
    pointsToCreditTotal,
    nonRefundableFunds,
    pointsToCreditAccount,
    refundMethod,
    isConfirmationPage,
    nonRefundableExpirationDate,
    expirationDateString,
    boldTopMessage,
    isCancelBoundFlow,
    showRefundableSelection,
    guestPasses
  } = props;

  const getRefundMethodMessage = () => {
    if (!showRefundableSelection) {
      return isConfirmationPage
        ? i18n('SHARED__REFUND_METHOD__REFUNDED_TO_CREDIT_CARD')
        : i18n('SHARED__REFUND_METHOD__REFUND_TO_CREDIT_CARD');
    } else {
      switch (refundMethod) {
        case BACK_TO_ORIGINAL_PAYMENT:
          return isConfirmationPage
            ? i18n('SHARED__REFUND_METHOD__REFUNDED_TO_CREDIT_CARD')
            : i18n('SHARED__REFUND_METHOD__REFUND_TO_CREDIT_CARD');
        case HOLD_FUTURE_USE:
          return i18n('SHARED__REFUND_METHOD__HOLD_FOR_FUTURE_USE');
        default:
          return '';
      }
    }
  };

  const getBottomMessageLeft = (): ?string =>
    (isConfirmationPage && (expirationDateString || nonRefundableExpirationDate)
      ? expirationDateString
        ? expirationDateString
        : nonRefundableExpirationDate && dayjs(nonRefundableExpirationDate).format('M/DD/YYYY')
      : null);

  const getTopMessage = (currencyLabel: ?CurrencyLabelType) => {
    const { itemTotalLabel, item } = currencyLabel || {};

    return itemTotalLabel || item || '';
  };

  const refundableFundsSubText = refundableFunds?.itemSubText;
  const refundMessage = refundableFundsSubText ? refundableFundsSubText : getRefundMethodMessage();

  return (
    <div className="refund-summary">
      <div data-qa="refund-summary">
        {!!pointsToCreditTotal && pointsToCreditAccount && (
          <RefundTotalItem
            amount={pointsToCreditTotal}
            topMessage={isCancelBoundFlow ? getTopMessage(pointsToCreditTotal) : pointsToCreditTotal.item}
            boldTopMessage={boldTopMessage}
            bottomMessageRight={`${
              isConfirmationPage
                ? i18n('SHARED__REFUND_METHOD__REFUND_SUMMARY_REFUNDED_TO_RAPID_REWARDS')
                : i18n('SHARED__REFUND_METHOD__REFUND_TO_RAPID_REWARDS')
            } ${pointsToCreditAccount}`}
            showTaxesAndFees={isCancelBoundFlow && !isConfirmationPage && !refundableFunds && !nonRefundableFunds}
            forceBackgroundGreen
          />
        )}
        {!!refundableFunds && (
          <RefundTotalItem
            amount={refundableFunds}
            topMessage={isCancelBoundFlow ? getTopMessage(refundableFunds) : refundableFunds.item}
            boldTopMessage={boldTopMessage}
            bottomMessageRight={refundMessage}
            showTaxesAndFees={isCancelBoundFlow && !isConfirmationPage && !nonRefundableFunds}
            forceBackgroundGreen
          />
        )}
        {!!nonRefundableFunds && (
          <RefundTotalItem
            amount={nonRefundableFunds}
            topMessage={isCancelBoundFlow ? getTopMessage(nonRefundableFunds) : nonRefundableFunds.item}
            boldTopMessage={boldTopMessage}
            bottomMessageRight={
              isConfirmationPage
                ? i18n('SHARED__REFUND_METHOD__HELD_FOR_FUTURE_USE')
                : i18n('SHARED__REFUND_METHOD__HOLD_FOR_FUTURE_USE')
            }
            bottomMessageLeft={getBottomMessageLeft()}
            expirationDateString={expirationDateString}
            showTaxesAndFees={isCancelBoundFlow && !isConfirmationPage}
            forceBackgroundGreen
          />
        )}
        {isCancelBoundFlow && isConfirmationPage && !!guestPasses && (
          <GuestPassesSection
            item={guestPasses.item}
            itemSubText={guestPasses.itemSubText}
            isConfirmationGuessPassesPage={true}
          />
        )}
        {isCancelBoundFlow &&
          isConfirmationPage &&
          (!!nonRefundableFunds || !!refundableFunds || !!pointsToCreditTotal) && (
          <div className="px5 pb5 white medium bggreen" data-qa="taxes-and-fees">
            {i18n('SHARED__REFUND_METHOD__REFUND_SUMMARY_TAXES_AND_FEES')}
          </div>
        )}
        {!nonRefundableFunds && !refundableFunds && !pointsToCreditTotal && (
          <div data-qa="gds-cancel-no-refund">
            <CancellationTitle title={i18n('SHARED__REFUND_METHOD__REFUND_SUMMARY_SUMMARY')} />
            <div className="flex flex-cross-center fullwidth bgwhite mt4 p5 bdt bdb">
              <img src="/content/mkt/images/landing_pages/travel-funds/travel-fund-rtf.svg" />
              <span className="ml5 xlarge">{i18n('AIR_CANCEL__TRAVEL_FUNDS')}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RefundSummaryForCancel;
