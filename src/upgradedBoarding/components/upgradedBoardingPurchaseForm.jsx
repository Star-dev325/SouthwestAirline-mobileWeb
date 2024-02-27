// @flow
import React from 'react';
import _ from 'lodash';

import Form from 'src/shared/form/components/form';
import Fields from 'src/shared/components/fields';
import FormInputField from 'src/shared/form/fields/formInputField';
import withForm from 'src/shared/form/enhancers/withForm';
import PriceTotal from 'src/shared/components/priceTotal';
import PaymentNavItemField from 'src/shared/form/fields/paymentNavItemField';
import Button from 'src/shared/components/button';
import SecurityCodeInputField from 'src/shared/form/fields/securityCodeInputField';
import { getDefaultSelectedPaymentInfo } from 'src/shared/helpers/creditCardHelper';
import UpgradedBoardingBound from 'src/upgradedBoarding/components/upgradedBoardingBound';
import BriefBound from 'src/shared/components/flightSummary/briefBound';
import BoundsHeader from 'src/shared/components/boundsHeader';
import UpgradedBoardingPaxInfo from 'src/upgradedBoarding/components/upgradedBoardingPaxInfo';
import { isSavedCreditCardThatRequiresCVV } from 'src/shared/helpers/savedCreditCardCVVHelper';
import FormCheckboxField from 'src/shared/form/fields/formCheckboxField';
import i18n from '@swa-ui/locale';
import {
  getDefaultSelectedUpgradedBoardingProducts,
  generateSegmentFormFieldName,
  getPaxCountForSegment,
  getUpgradedBoardingPriceTotal
} from 'src/upgradedBoarding/helpers/upgradedBoardingHelper';
import upgradedBoardingFormValidator from 'src/shared/form/formValidators/upgradedBoardingFormValidator';

import type { PaymentSavedCreditCards, CurrencyType } from 'src/shared/flow-typed/shared.types';
import type {
  UpgradedBoardingPurchasePageType,
  UpgradedBoardingSegment
} from 'src/upgradedBoarding/flow-typed/upgradedBoarding.types';

type Props = {
  destinationDescription?: string,
  formData: *,
  formId: string,
  isCountdownFinished: boolean,
  moneyTotal: CurrencyType,
  onPaymentEditClick: (*) => void,
  onSubmit: (*) => void,
  savedCreditCards: PaymentSavedCreditCards,
  informationalMessage: ?string,
  UPGRADED_BOARDING_BY_SEGMENT: boolean,
  updateFormFieldDataValueFn: (formId: string, fieldName: string, fieldValue: *) => void,
  saveMoneyTotalFn: (moneyTotal: CurrencyType) => void,
  updateFormFieldDataValueFn: (formId: string, fieldName: string, fieldValue: *) => void,
  UPGRADED_BOARDING_BY_SEGMENT: boolean,
  upgradedBoardingPurchasePage: UpgradedBoardingPurchasePageType
};

export class UpgradedBoardingPurchaseForm extends React.Component<Props> {
  componentDidMount() {
    const {
      formData,
      upgradedBoardingPurchasePage: {
        upgradedBoardingSegment = [],
        upgradedBoardingSegment: [{ upgradedBoardingPrice: { currencyCode, currencySymbol } = {} } = {}] = []
      },
      saveMoneyTotalFn
    } = this.props;
    const moneyTotal = getUpgradedBoardingPriceTotal(formData, upgradedBoardingSegment);

    saveMoneyTotalFn({
      amount: moneyTotal,
      currencyCode,
      currencySymbol
    });
  }

  componentDidUpdate(prevProps: Props) {
    const {
      formData: prevFormData,
      upgradedBoardingPurchasePage: { upgradedBoardingSegment: prevUpgradedBoardingSegment }
    } = prevProps;
    const {
      formData,
      upgradedBoardingPurchasePage: {
        upgradedBoardingSegment = [],
        upgradedBoardingSegment: [{ upgradedBoardingPrice: { currencyCode, currencySymbol } = {} } = {}] = []
      },
      saveMoneyTotalFn
    } = this.props;

    const prevTotal = getUpgradedBoardingPriceTotal(prevFormData, prevUpgradedBoardingSegment);
    const nextTotal = getUpgradedBoardingPriceTotal(formData, upgradedBoardingSegment);

    if (prevTotal !== nextTotal) {
      saveMoneyTotalFn({
        amount: nextTotal,
        currencyCode,
        currencySymbol
      });
    }
  }

  _updateFormDataForSegment = (value: boolean, segment: UpgradedBoardingSegment) => {
    const { formId, updateFormFieldDataValueFn } = this.props;

    const passengers = _.get(segment, 'passengers', []);

    passengers.map((pax) => {
      const productId = _.get(pax, '_meta.productId');

      updateFormFieldDataValueFn(formId, productId, value);
    });
  };

  _renderSegmentMessage = (segment: UpgradedBoardingSegment, key: number) => {
    const { UPGRADED_BOARDING_BY_SEGMENT } = this.props;

    return UPGRADED_BOARDING_BY_SEGMENT ? (
      <FormCheckboxField
        name={generateSegmentFormFieldName(key)}
        onChange={(value) => this._updateFormDataForSegment(value, segment)}
      >
        {segment.upgradedBoardingSegmentMessage}
      </FormCheckboxField>
    ) : (
      <React.Fragment>{segment.upgradedBoardingSegmentMessage}</React.Fragment>
    );
  };

  render() {
    const {
      formData,
      formId,
      isCountdownFinished,
      moneyTotal,
      onPaymentEditClick,
      onSubmit,
      savedCreditCards,
      UPGRADED_BOARDING_BY_SEGMENT,
      upgradedBoardingPurchasePage: {
        recordLocator,
        dates,
        destinationDescription,
        originationDestinationDescription,
        upgradedBoardingSegment,
        upgradedBoardingInformationalMessage,
        fareRulesWithLinks
      } = {}
    } = this.props;
    const emailAddress = 'receiptEmail';
    const isCVVRequired = isSavedCreditCardThatRequiresCVV(savedCreditCards, formData?.paymentInfo?.selectedCardId);

    return (
      <Form
        name="upgraded-boarding-purchase"
        className="upgraded-boarding-purchase-form"
        formId={formId}
        onSubmit={onSubmit}
      >
        <div className="ub-purchase-summary">
          <BoundsHeader
            dates={dates}
            originationDestinationDescription={originationDestinationDescription}
            destinationDescription={destinationDescription}
            recordLocator={recordLocator}
          />
          {upgradedBoardingSegment &&
            upgradedBoardingSegment.map((ubSegment, key) => (
              <React.Fragment key={`upgradedBoardingSegment_${key}`}>
                <div className="ub-section-title">{this._renderSegmentMessage(ubSegment, key)}</div>
                <div className="ub-eligible-flight-section">
                  <BriefBound
                    departureAirportCode={ubSegment.departureAirportCode}
                    departureDate={ubSegment.departureDate}
                    departureDayOfWeek={ubSegment.departureDayOfWeek}
                    departureTime={ubSegment.departureTime}
                    arrivalAirportCode={ubSegment.arrivalAirportCode}
                    arrivalTime={ubSegment.arrivalTime}
                    isNextDayArrival={ubSegment.isNextDayArrival}
                    isOvernight={ubSegment.isOvernight}
                    isOvernightUnderDeparture
                  />
                  <UpgradedBoardingPaxInfo
                    passengers={ubSegment.passengers}
                    UPGRADED_BOARDING_BY_SEGMENT={UPGRADED_BOARDING_BY_SEGMENT}
                  />
                </div>
              </React.Fragment>
            ))}
          {upgradedBoardingSegment &&
            upgradedBoardingSegment.map((bound, key) => (
              <UpgradedBoardingBound
                key={`upgradedBoardingBound_${key}`}
                bound={bound}
                paxCount={getPaxCountForSegment(formData, bound)}
              />
            ))}

          <div className="ub-section-title">{i18n('UB_PAYMENT')}</div>
          <PaymentNavItemField
            savedCreditCards={savedCreditCards}
            onNavItemClick={isCountdownFinished ? () => {} : onPaymentEditClick}
            name="paymentInfo"
            disable={isCountdownFinished}
          />

          <SecurityCodeInputField className="mt4" shouldShowSecurityInputField={isCVVRequired} />

          <div className="ub-section-title">{i18n('UB__EMAIL_RECEIPT_TO')}</div>
          <Fields type="grouped">
            <FormInputField
              id={`${formId}_receiptEmail`}
              name={emailAddress}
              placeholder={i18n('SHARED__PLACEHOLDER__EMAIL_ADDRESS')}
              type="email"
              value={`${formData?.receiptEmail ?? ''} `}
              disabled={false}
            />
          </Fields>
        </div>
        <div className="purchase-content--summary-footer">
          <PriceTotal
            totals={{
              moneyTotal,
              pointsTotal: null
            }}
            shouldHidePriceBreakdown
          />
          <div className="purchase-content--summary-footer-nav">
            <Button
              type="submit"
              className={`purchase ${isCountdownFinished ? 'bggray3' : ''}`}
              ref="purchaseButton"
              color={isCountdownFinished ? 'gray' : 'yellow'}
              size="larger"
              disabled={isCountdownFinished}
              fluid
            >
              {i18n('UB_PURCHASE')}
            </Button>
          </div>
        </div>
        {upgradedBoardingInformationalMessage && (
          <div className="upgraded-boarding-purchase-form--info-container">
            <div className="upgraded-boarding-purchase-form--info-message" dangerouslySetInnerHTML={{ __html: fareRulesWithLinks }}></div>
            <div className="upgraded-boarding-purchase-form--info-message">{upgradedBoardingInformationalMessage}</div>
          </div>
        )}
      </Form>
    );
  }
}

export default withForm({
  autoClearFormData: false,
  formValidator: upgradedBoardingFormValidator,
  defaultValues: (props: Props) => {
    const defaultValues = {};
    const { savedCreditCards } = props;
    const { primaryCard, ghostCards } = savedCreditCards;

    const paymentInfo = primaryCard || ghostCards ? getDefaultSelectedPaymentInfo(savedCreditCards) : {};
    const paxSegmentProductValues = getDefaultSelectedUpgradedBoardingProducts(
      props.UPGRADED_BOARDING_BY_SEGMENT,
      _.get(props, 'upgradedBoardingPurchasePage.upgradedBoardingSegment', [])
    );

    return {
      ...defaultValues,
      ...paxSegmentProductValues,
      paymentInfo: paymentInfo.selectedCardId ? paymentInfo : {}
    };
  }
})(UpgradedBoardingPurchaseForm);
