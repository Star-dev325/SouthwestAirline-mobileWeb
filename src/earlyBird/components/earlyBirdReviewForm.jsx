// @flow
import React from 'react';
import _ from 'lodash';
import PaymentNavItemField from 'src/shared/form/fields/paymentNavItemField';
import withForm from 'src/shared/form/enhancers/withForm';
import Form from 'src/shared/form/components/form';
import PurchaseSummarySecurityCodeHeader from 'src/shared/components/purchaseSummarySecurityCodeHeader';
import Currency from 'src/shared/components/currency';
import EarlyBirdPurchaseReviewTripDetail from 'src/earlyBird/components/earlyBirdPurchaseReviewTripDetail';
import EarlyBirdPriceFooter from 'src/earlyBird/components/earlyBirdPriceFooter';
import SecurityCodeInputField from 'src/shared/form/fields/securityCodeInputField';
import { isSavedCreditCardThatRequiresCVV } from 'src/shared/helpers/savedCreditCardCVVHelper';
import earlyBirdReviewFormValidator from 'src/shared/form/formValidators/earlyBirdReviewFormValidator';
import i18n from '@swa-ui/locale';
import type { PaymentSavedCreditCards, CurrencyType } from 'src/shared/flow-typed/shared.types';
import type { EarlyBirdBoundType } from 'src/earlyBird/flow-typed/earlyBird.types';
import FormInputField from 'src/shared/form/fields/formInputField';

type Props = {
  formId: string,
  onSubmit: (*) => void,
  onPaymentEditClick: () => void,
  savedCreditCards: PaymentSavedCreditCards,
  formData: *,
  total: CurrencyType,
  earlyBirdBounds: Array<EarlyBirdBoundType>,
  receiptEmail: ?string
};

class EarlyBirdReviewForm extends React.Component<Props> {
  render() {
    const { formId, savedCreditCards, total, earlyBirdBounds, formData, onSubmit, onPaymentEditClick, receiptEmail } =
      this.props;

    const isCVVRequired = isSavedCreditCardThatRequiresCVV(savedCreditCards, formData.paymentInfo.selectedCardId);

    return (
      <Form name="earlyBirdReviewForm" onSubmit={onSubmit} formId={formId}>
        <PurchaseSummarySecurityCodeHeader
          hasCreditCard={!_.isEmpty(savedCreditCards.primaryCard)}
          isSavedCreditCardThatRequiresCVVMissing={isCVVRequired && _.isEmpty(formData.securityCode)}
        />
        <div className="early-bird-review--trip-detail">
          <div className="early-bird-review--trip-title">{i18n('EARLY_BIRD_YOUR_TRIP_TITLE')}</div>
          <div className="early-bird-review--trip-body">
            {_.map(earlyBirdBounds, (earlyBirdBound, index: number) => (
              <EarlyBirdPurchaseReviewTripDetail key={index} {...earlyBirdBound} />
            ))}
            <div className="early-bird-review--trip-money-info">
              <span className="early-bird-review--trip-money-info-total">
                {i18n('EARLY_BIRD_PURCHASE_PRICE_TOTAL')}
              </span>
              <span className="xlarge bold">
                <Currency {...total} />
              </span>
            </div>
          </div>
        </div>
        <div data-qa="early-bird-review--payment-method" className="mt5 mb6">
          <div className="ml0 mt4">
            <div>
              <p className="gray4 large px5">{i18n('EARLY_BIRD_PURCHASE_PAYMENT')}</p>
              <PaymentNavItemField
                savedCreditCards={savedCreditCards}
                onNavItemClick={onPaymentEditClick}
                name="paymentInfo"
              />
              <SecurityCodeInputField className="mt4" shouldShowSecurityInputField={isCVVRequired} />
            </div>
          </div>
        </div>
        {!receiptEmail && (
          <div className="m5">
            <p className="gray4 large pb4">{i18n('EARLY_BIRD_EMAIL_RECEIPT_TO')}</p>
            <FormInputField name="receiptEmail" type="email" placeholder="Email address" />
          </div>
        )}
        <EarlyBirdPriceFooter buttonText="Purchase" buttonType="submit" total={total} />
      </Form>
    );
  }
}

export default withForm({
  autoClearFormData: false,
  formValidator: earlyBirdReviewFormValidator,
  defaultValues: ({ savedCreditCards }: Props) => {
    const selectedCardId = _.get(savedCreditCards, 'primaryCard.savedCreditCardId');

    return {
      paymentInfo: selectedCardId ? { selectedCardId } : {}
    };
  }
})(EarlyBirdReviewForm);
