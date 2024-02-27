// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import React from 'react';
import { PriceDifferenceFooter } from 'src/sameDay/components/priceDifferenceFooter';
import PriceTotalLine from 'src/shared/components/priceTotalLine';
import { POINTS } from 'src/shared/constants/currencyTypes';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';

import type { AmountDue } from 'src/sameDay/flow-typed/sameDay.types';

type Props = {
  amountDue?: AmountDue,
  className: {
    [className: string]: boolean;
  },
  creditDue?: AmountDue,
  creditInfoMessage?: string | null,
  formId: string,
  labelText: string,
  isWebView: boolean,
  onRefundMethodFieldClick: () => void,
  onSubmit: () => void,
  refundMessage?: string | null,
  refundMethod: string,
  refundMethodLabels: {
    [refundMethodLabel: string]: string
  },
  showRefundableSelection: boolean,
  taxesAndFeesWithLinks: string | null
};

export const SameDayRefundMethodForm = ({
  amountDue,
  className,
  creditDue,
  creditInfoMessage,
  formId,
  labelText,
  isWebView,
  onRefundMethodFieldClick,
  onSubmit,
  refundMethod,
  refundMethodLabels,
  showRefundableSelection,
  taxesAndFeesWithLinks
}: Props) => {
  const { fare: creditDueFare, tax: creditDueTax } = creditDue || {};
  const hasFareCredit = parseFloat(creditDueFare?.amount) > 0;
  const hasFarePointsWithTaxRefund = creditDueFare?.currencyCode === POINTS && creditDueTax;
  const isCreditDueTaxWithNoFare = !creditDueFare && creditDueTax;
  const isPointsCreditDueWithTaxRefund = hasFareCredit && hasFarePointsWithTaxRefund;
  const isPointsEvenExchangeWithTaxRefund = !hasFareCredit && hasFarePointsWithTaxRefund;
  const showCreditDueTax = isCreditDueTaxWithNoFare || isPointsCreditDueWithTaxRefund || isPointsEvenExchangeWithTaxRefund;

  return (
    <Form formId={formId} onSubmit={onSubmit}>
      <div className="same-day-refund-method-credit-section">
        <PriceTotalLine
          className="same-day-refund-method--price-line"
          priceCurrencyClass="same-day-refund-method--price-line-currency-total"
          priceTitleClass="same-day-refund-method--price-line-title"
          title={i18n('SAME_DAY__PRICING__PRICE_DIFFERENCE_REFUND_CREDIT_LABEL')}
          total={showCreditDueTax ? creditDueTax : creditDueFare}
          type="total"
        />
        {creditInfoMessage && (
          <div className="same-day-refund-method-credit-section--description">{creditInfoMessage}</div>
        )}
        <div className="same-day-refund-method--divider"></div>
      </div>
      <div className="same-day-refund-method-list">
        <div
          aria-label={refundMethodLabels[refundMethod]}
          className="same-day-refund-method-list-section"
          onClick={showRefundableSelection ? onRefundMethodFieldClick : undefined}
          tabIndex="0"
        >
          <div className="same-day-refund-method-list-section-title">{i18n('SAME_DAY__REFUND_METHOD__TITLE')}</div>
          <div className={cx('same-day-refund-method-list-section--text', className)}>
            {refundMethodLabels[refundMethod]}
          </div>
        </div>
      </div>
      <div className="same-day-refund-method--footer">
        <PriceDifferenceFooter
          amountDue={amountDue}
          creditDue={creditDue}
          isRefundScenario
          isWebView={isWebView}
          labelText={labelText}
          taxesAndFeesWithLinks={taxesAndFeesWithLinks}
        />
      </div>
    </Form>
  );
};

export default withForm({})(SameDayRefundMethodForm);
