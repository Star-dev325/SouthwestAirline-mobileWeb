// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import React from 'react';
import { PriceDifferenceFooter } from 'src/sameDay/components/priceDifferenceFooter';
import { DOLLAR, POINTS } from 'src/shared/constants/currencyTypes';
import { SAME_DAY_STANDBY_PRICE_DIFFERENCE_FORM } from 'src/shared/constants/formIds';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import FormInputField from 'src/shared/form/fields/formInputField';
import PaymentNavItemField from 'src/shared/form/fields/paymentNavItemField';
import sameDayPriceDifferenceValidator from 'src/shared/form/formValidators/sameDayPriceDifferenceValidator';
import SecurityCodeInputField from 'src/shared/form/fields/securityCodeInputField';
import { getDefaultSelectedPaymentInfo } from 'src/shared/helpers/creditCardHelper';
import type { AmountDue } from 'src/sameDay/flow-typed/sameDay.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';
import type { PaymentSavedCreditCards } from 'src/shared/flow-typed/shared.types';

type Props = {
  amountDue?: AmountDue,
  creditDue?: AmountDue,
  formData: FormData,
  formId: string,
  isCVVRequired: boolean,
  isPaymentRequired: boolean,
  isRefundScenario?: boolean,
  labelText: string,
  onPaymentEditClick: () => void,
  onSubmit: (formData: FormData) => void,
  paymentNavItemFieldClassName?: string | null,
  savedCreditCards: PaymentSavedCreditCards,
  showEmailReceiptTo: boolean,
  showRefundPage: boolean,
  taxesAndFeesWithLinks?: string
};

export const SameDayPriceDifferenceForm = ({
  amountDue,
  creditDue,
  formId,
  isCVVRequired,
  isPaymentRequired,
  isRefundScenario = false,
  labelText,
  onPaymentEditClick,
  onSubmit,
  paymentNavItemFieldClassName,
  savedCreditCards,
  showEmailReceiptTo,
  showRefundPage, 
  taxesAndFeesWithLinks
}: Props) => {
  const { fare: amountDueFare, tax: amountDueTax } = amountDue || {};
  const isPointsAmountDueFare = amountDueFare?.currencyCode === POINTS;
  const isPointCreditDueFare =  creditDue?.fare?.currencyCode === POINTS;
  const isDollarAmountDueFare = amountDueFare?.currencyCode === DOLLAR;
  const isPointsFareWithAmountDueTax = (isPointsAmountDueFare || isPointCreditDueFare) && parseFloat(amountDueTax?.amount) > 0;
  const isDollarAmountDueFareWithoutAmountDueTax = isDollarAmountDueFare && parseFloat(amountDueFare?.amount) > 0 && !amountDueTax;
  const isSameDayStandbyPriceDifferenceFormId = formId === SAME_DAY_STANDBY_PRICE_DIFFERENCE_FORM;

  const refundFooterClassNames = {
    'same-day-standby-price-difference--footer': isSameDayStandbyPriceDifferenceFormId
  };
  const sameDayPriceDifferenceWithAmountDueTaxClassName = {
    'price-difference-form--without-margin': showRefundPage && (isDollarAmountDueFareWithoutAmountDueTax || isPointsFareWithAmountDueTax)
  };

  return (
    <Form id="price-difference-form" formId={formId} onSubmit={onSubmit}>
      {showEmailReceiptTo && (
        <div className="price-difference-form">
          <FormInputField name="recipientEmail" type="email" placeholder={i18n('SHARED__PLACEHOLDER__EMAIL_ADDRESS')} />
        </div>
      )}
      {isPaymentRequired && (
        <div className={cx('price-difference-form--payment', sameDayPriceDifferenceWithAmountDueTaxClassName)}>
          {!isSameDayStandbyPriceDifferenceFormId && (
            <div className="price-difference-form--payment_label">
              {i18n('AIR_CHANGE__PRICE_DIFFERENCE__PAYMENT_METHOD')}
            </div>
          )}
          <PaymentNavItemField
            name="paymentInfo"
            navItemFieldClassName={paymentNavItemFieldClassName}
            onNavItemClick={onPaymentEditClick}
            savedCreditCards={savedCreditCards}
          />
          {isCVVRequired && <SecurityCodeInputField shouldShowSecurityInputField={isCVVRequired} />}
        </div>
      )}
      <div className={cx('footer', refundFooterClassNames)}>
        <PriceDifferenceFooter
          amountDue={amountDue}
          creditDue={creditDue}
          isRefundScenario={isRefundScenario}
          labelText={labelText}
          taxesAndFeesWithLinks={taxesAndFeesWithLinks}
        />
      </div>
    </Form>
  );
};

export default withForm({
  autoClearFormData: false,
  defaultValues: ({ savedCreditCards }: Props) => {
    let defaultValues = { paymentInfo: {} };
    const { primaryCard } = savedCreditCards;

    if (primaryCard) {
      const paymentInfoTemp = getDefaultSelectedPaymentInfo(savedCreditCards);

      if (paymentInfoTemp.selectedCardId) {
        defaultValues = { paymentInfo: paymentInfoTemp };
      }
    }

    return defaultValues;
  },
  formValidator: sameDayPriceDifferenceValidator
})(SameDayPriceDifferenceForm);
