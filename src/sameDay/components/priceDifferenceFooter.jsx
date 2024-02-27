// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import React from 'react';
import Button from 'src/shared/components/button';
import PriceTotalLine from 'src/shared/components/priceTotalLine';
import { DOLLAR, POINTS } from 'src/shared/constants/currencyTypes';

import type { AmountDue } from 'src/sameDay/flow-typed/sameDay.types';

type Props = {
  amountDue?: AmountDue,
  creditDue?: AmountDue,
  isRefundScenario?: boolean,
  isWebView?: boolean,
  labelText?: string,
  taxesAndFeesWithLinks?: string | null
};

export const PriceDifferenceFooter = ({
  amountDue,
  creditDue,
  isRefundScenario,
  isWebView,
  labelText,
  taxesAndFeesWithLinks
}: Props) => {
  const {
    fare: amountDueFare,
    item: amountDueTitle,
    itemTotalLabel: amountDueTotalTitle,
    tax: amountDueTax
  } = amountDue || {};
  const { fare: creditDueFare, item: creditDueTitle, tax: creditDueTax } = creditDue || {};
  const parsedEvenExchangeDue = parseFloat(amountDueFare?.amount) === 0;
  const isPointsCreditDue = creditDueFare?.currencyCode === POINTS;
  const isPointsAmountDue = amountDueFare?.currencyCode === POINTS;
  const isDollarRefund = creditDueFare?.currencyCode === DOLLAR;
  const isPointsAmountDueWithTaxRefund =
    isPointsAmountDue && !parsedEvenExchangeDue && !amountDueTax && !creditDueFare && creditDueTax;
  const isPointsCreditDueWithAmountDueTax = !amountDueFare && amountDueTax && isPointsCreditDue && !creditDueTax;
  const isPointsEvenExchangeWithTaxDue = parsedEvenExchangeDue && amountDueTax;
  const isPointsEvenExchangeWithTaxRefund = isPointsAmountDue && parsedEvenExchangeDue && creditDueTax;
  const isPointsRefund = !amountDueFare && !amountDueTax && isPointsCreditDue;
  const isPointsEvenExchangeOrAmountDueWithTaxRefund =
    isPointsAmountDueWithTaxRefund || isPointsEvenExchangeWithTaxRefund;
  const pointsCreditDueWithAmountDueTaxTitle = isPointsCreditDueWithAmountDueTax
    ? i18n('SHARED__PRICE_LINE_TITLES__AMOUNT_DUE')
    : amountDueTitle;

  const backgroundColor = {
    bgblue:
      !isPointsRefund ||
      isPointsEvenExchangeOrAmountDueWithTaxRefund ||
      !isRefundScenario ||
      !isPointsCreditDueWithAmountDueTax,
    bggreen: isPointsCreditDueWithAmountDueTax || (isRefundScenario && !isPointsEvenExchangeOrAmountDueWithTaxRefund)
  };

  const pointsDowngradeBackgroundColor = {
    bgblue: isPointsCreditDueWithAmountDueTax && !isPointsEvenExchangeWithTaxRefund,
    bggreen: isPointsEvenExchangeOrAmountDueWithTaxRefund
  };

  const taxBackgroundColor = {
    bgblue: !isDollarRefund && !isPointsRefund && !isPointsEvenExchangeWithTaxRefund,
    bggreen: isPointsEvenExchangeWithTaxRefund || isDollarRefund || isPointsRefund || isPointsAmountDueWithTaxRefund
  };

  const getPriceTotalLineProps = () => {
    const baseProps = {
      type: 'total'
    };

    if (amountDueFare?.currencyCode === DOLLAR) {
      return {
        ...baseProps,
        title: amountDueTitle,
        total: amountDueFare
      };
    } else if (creditDueFare?.currencyCode === DOLLAR) {
      return {
        ...baseProps,
        title: creditDueTitle,
        total: creditDueFare
      };
    } else if (isPointsEvenExchangeWithTaxDue && amountDueTotalTitle && !creditDueFare) {
      return {
        ...baseProps,
        title: amountDueTotalTitle,
        pointsTotal: amountDueFare,
        showPts: true,
        total: amountDueTax
      };
    } else if (amountDueFare?.currencyCode === POINTS && amountDueTax && !creditDueFare && !creditDueTax) {
      return { ...baseProps, title: amountDueTitle, pointsTotal: amountDueFare, showPts: true, total: amountDueTax };
    } else if (isPointsEvenExchangeWithTaxRefund) {
      return { ...baseProps, title: amountDueTitle, pointsTotal: amountDueFare, showPts: true };
    } else if (amountDueFare?.currencyCode === POINTS && !amountDueTax && !creditDueTax) {
      return { ...baseProps, title: amountDueTitle, pointsTotal: amountDueFare, showPts: true };
    } else if (amountDueFare?.currencyCode === POINTS && !amountDueTax && creditDueTax) {
      return { ...baseProps, title: amountDueTitle, pointsTotal: amountDueFare, showPts: true };
    } else {
      return { ...baseProps, title: creditDueTitle, pointsTotal: creditDueFare, showPts: true, total: creditDueTax };
    }
  };

  return (
    <div className={'price-difference-footer'}>
      <div className={cx('early-bird-price-footer--price-total price-difference-footer--price-total', backgroundColor)}>
        <PriceTotalLine {...getPriceTotalLineProps()} />
      </div>
      {isPointsCreditDueWithAmountDueTax && pointsCreditDueWithAmountDueTaxTitle && (
        <div
          className={cx(
            'early-bird-price-footer--price-total price-difference-footer--price-total',
            pointsDowngradeBackgroundColor
          )}
        >
          <PriceTotalLine
            showPts={true}
            title={pointsCreditDueWithAmountDueTaxTitle}
            total={amountDueTax}
            type="total"
          />
        </div>
      )}
      {isPointsEvenExchangeOrAmountDueWithTaxRefund && creditDueTitle && (
        <div
          className={cx(
            'early-bird-price-footer--price-total price-difference-footer--price-total',
            pointsDowngradeBackgroundColor
          )}
        >
          <PriceTotalLine showPts={true} title={creditDueTitle} total={creditDueTax} type="total" />
        </div>
      )}
      {taxesAndFeesWithLinks && (
        <div className={cx('price-difference-footer--description', taxBackgroundColor)}>{taxesAndFeesWithLinks}</div>
      )}
      <div
        className={cx('early-bird-price-footer--nav price-difference-footer--nav', taxBackgroundColor, {
          'price-difference-footer--nav_webview': isWebView
        })}
      >
        <Button className="continue" color="yellow" fluid size="larger" type="submit">
          {labelText}
        </Button>
      </div>
    </div>
  );
};
