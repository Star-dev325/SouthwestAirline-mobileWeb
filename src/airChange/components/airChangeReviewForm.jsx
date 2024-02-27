// @flow

import i18n from '@swa-ui/locale';
import cx from 'classnames';
import dayjs from 'dayjs';
import _ from 'lodash';
import React from 'react';
import AirChangeRefundInfo from 'src/airChange/components/airChangeRefundInfo';
import TripTotals from 'src/airChange/components/tripTotals';
import Button from 'src/shared/components/button';
import Fields from 'src/shared/components/fields';
import FlightInfoSummary from 'src/shared/components/flightInfoSummary';
import Icon from 'src/shared/components/icon';
import PurchaseSummarySecurityCodeHeader from 'src/shared/components/purchaseSummarySecurityCodeHeader';
import RefundSummary from 'src/shared/components/refundSummary';
import RefundSummaryPassengers from 'src/shared/components/refundSummaryPassengers';
import UpsellDetails from 'src/shared/components/upsellDetails';
import { getIconType } from 'src/shared/constants/iconConstants';
import RefundTypes from 'src/shared/constants/refundTypes';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import ApplyTravelFundsNavItemField from 'src/shared/form/fields/applyTravelFundsNavItemField';
import ContactMethodFields from 'src/shared/form/fields/contactMethodFields';
import FormInputField from 'src/shared/form/fields/formInputField';
import PaymentNavItemField from 'src/shared/form/fields/paymentNavItemField';
import SecurityCodeInputField from 'src/shared/form/fields/securityCodeInputField';
import purchaseSummaryFormValidator from 'src/shared/form/formValidators/airChangeReviewFormValidator';
import { isSavedCreditCardThatRequiresCVV } from 'src/shared/helpers/savedCreditCardCVVHelper';

import type { ChangePricingPage } from 'src/airChange/flow-typed/airChange.types';
import type {
  BriefBoundType,
  FlightPricingBound,
  MessageType,
  PaymentSavedCreditCards
} from 'src/shared/flow-typed/shared.types';

const { HOLD_FUTURE_USE } = RefundTypes;

type Props = {
  AIR_UPGRADE: boolean,
  changePricingPage: ChangePricingPage,
  clickContactMethodFn: () => void,
  declineNotifications?: boolean,
  formData: *,
  formId: string,
  onApplyTravelFundsClick: () => void,
  onPaymentEditClick: () => void,
  onSubmit: (*) => void,
  reviewMessages?: Array<MessageType>,
  savedCreditCards: PaymentSavedCreditCards,
  showHeading: boolean,
  travelFundsApplied: boolean
};

export class AirChangeReviewForm extends React.Component<Props> {
  _buildFlightDetails = (bounds: Array<FlightPricingBound>): Array<BriefBoundType> =>
    bounds.map((bound) => {
      const {
        arrivalAirport: { code: arrivalAirportCode },
        arrivalTime,
        departureAirport: { code: departureAirportCode },
        departureDate,
        departureTime,
        stops
      } = bound;

      return {
        arrivalAirportCode,
        arrivalTime,
        departureAirportCode,
        departureDate,
        departureDayOfWeek: dayjs(departureDate).format('dddd'),
        departureTime,
        stops
      };
    });

  _renderTripDetailsCard = (changePricingPage: ChangePricingPage) => {
    const {
      recordLocator,
      passengers,
      bounds,
      fareSummary: { nonRefundable, refundable, originalTripCost, newTripCost, newAmountDue },
      _meta: { purchaseWithPoints }
    } = changePricingPage;

    const flightDetails = this._buildFlightDetails(bounds);

    return (
      <div className="mb4">
        <FlightInfoSummary recordLocator={recordLocator} passengers={passengers} flightDetails={flightDetails} />
        <div className="review-form--trip-cost" data-qa="review-form--trip-cost">
          <TripTotals originalTripCost={originalTripCost} newTripCost={newTripCost} />
        </div>
        <AirChangeRefundInfo
          nonRefundable={nonRefundable}
          refundable={refundable}
          amountDue={newAmountDue}
          purchaseWithPoints={purchaseWithPoints}
        />
      </div>
    );
  };

  _renderUpgradeBenefitsView = (changePricingPage: ChangePricingPage) => {
    const upsellDetails = _.get(changePricingPage, 'upsellDetails');
    const offerTitle = _.get(upsellDetails, 'offerTitle');
    const upsellDetailsProps = {
      shouldRenderHeader: false,
      shouldRenderUpgradeButton: false,
      offerFeatures: _.get(upsellDetails, 'offerFeatures')
    };
    const fareRulesWithLinks = _.get(changePricingPage, 'fareRulesWithLinks');

    return (
      <>
        <div className="air-change-review-form--upgrade-benefits">
          <div className="upgrade-offer-title">{offerTitle}</div>
          <UpsellDetails {...upsellDetailsProps} />
        </div>
        <div className="air-change-review-form--fare-rules">
          <p dangerouslySetInnerHTML={{ __html: fareRulesWithLinks }} />
        </div>
      </>
    );
  };

  _renderMakeChangesButton = (changePricingPage: ChangePricingPage) => {
    const acceptanceText2 = _.get(changePricingPage, 'acceptanceText2');

    return (
      <div className="p5 white bgpblue bdt bdsdkblue">
        {acceptanceText2 && (
          <div
            className="air-change-review-form--disclaimer"
            dangerouslySetInnerHTML={{ __html: acceptanceText2 }}
            data-qa="air-change--hazmat-disclaimer"
          />
        )}
        <Button color="yellow" fluid size="xlarge" type="submit">
          {i18n('AIR_CHANGE__PRICE_DIFFERENCE__MAKE_THESE_CHANGES')}
        </Button>
      </div>
    );
  };

  _renderReviewMessage = (stationsMessage: MessageType) => {
    const { body, header, icon } = stationsMessage;

    return (
      <div className="review-message">
        <div className="review-message--icon">{icon && <Icon data-qa={icon} type={getIconType(icon)} />}</div>
        <div className="review-message--body">
          {header && <p className="review-message--station-header">{header}</p>}
          {body && <p>{body}</p>}
        </div>
      </div>
    );
  };

  render() {
    const {
      AIR_UPGRADE,
      changePricingPage,
      clickContactMethodFn,
      declineNotifications,
      formData,
      formId,
      onApplyTravelFundsClick,
      onPaymentEditClick,
      onSubmit,
      reviewMessages,
      savedCreditCards,
      showHeading,
      travelFundsApplied
    } = this.props;

    const { contactMethodContent, paymentInfo, refundMethod, securityCode } = formData;
    const missingContactMethod = !declineNotifications && _.isEmpty(contactMethodContent);
    const isCVVRequired = isSavedCreditCardThatRequiresCVV(savedCreditCards, paymentInfo.selectedCardId);
    const missingPaymentMethod = _.isEmpty(formData.paymentInfo);
    const {
      passengers,
      recordLocator,
      paymentRequired,
      fareSummary: { nonRefundable, refundable, travelFunds, newAmountDue, totalDueNow },
      _meta: { purchaseWithPoints, isUpgrade }
    } = changePricingPage;

    return (
      <Form className="air-change-review-form" formId={formId} name="airChangeReviewForm" onSubmit={onSubmit}>
        {reviewMessages && reviewMessages.map(this._renderReviewMessage)}
        <div className="pt5 pl5 pr5">
          {paymentRequired && (
            <PurchaseSummarySecurityCodeHeader
              missingPaymentMethod={missingPaymentMethod}
              missingContactMethod={missingContactMethod}
              isSavedCreditCardThatRequiresCVVMissing={isCVVRequired && _.isEmpty(securityCode)}
            />
          )}
          <RefundSummaryPassengers
            className="mb4"
            passengers={passengers}
            recordLocator={recordLocator}
            showHeading={showHeading}
            hideLabelText
          />
          <ContactMethodFields
            clickContactMethodFn={clickContactMethodFn}
            names={['contactMethodContent']}
            missingContactMethod={missingContactMethod}
          />

          <p className="gray5 large bold mb4 mt6">{i18n('AIR_CHANGE__PRICE_DIFFERENCE__YOUR_NEW_TRIP')}</p>
          {this._renderTripDetailsCard(changePricingPage)}
        </div>
        {AIR_UPGRADE && isUpgrade && this._renderUpgradeBenefitsView(changePricingPage)}
        <div className="pb5 pl5 pr5">
          <div className="mb4">
            <Fields
              type="grouped"
              label={i18n('AIR_CHANGE__PRICE_DIFFERENCE__EMAIL_RECEIPT_TO')}
              className="form-fields--receipt-email"
            >
              <FormInputField
                name="emailReceiptTo"
                placeholder={i18n('SHARED__PLACEHOLDER__EMAIL_ADDRESS')}
                type="email"
              />
            </Fields>
          </div>
          {(paymentRequired || travelFundsApplied) && (
            <div className={cx({ mb4: paymentRequired })}>
              <Fields
                type="grouped"
                label={i18n('AIR_CHANGE__PRICE_DIFFERENCE__APPLY_TRAVEL_FUNDS')}
                className="form-fields--apply-travel-funds"
              >
                <ApplyTravelFundsNavItemField
                  onNavItemClick={onApplyTravelFundsClick}
                  travelFundsApplied={travelFundsApplied}
                  name="applyTravelFunds"
                />
                <p className="gray5 medium mt4">
                  {i18n('SHARED__PURCHASE_SUMMARY_FORM__APPLY_FUNDS_NAV_ITEM_MESSAGE')}
                </p>
              </Fields>
            </div>
          )}
          {paymentRequired && (
            <div>
              <p className="gray5 large bold">{i18n('AIR_CHANGE__PRICE_DIFFERENCE__PAYMENT_METHOD')}</p>
              <PaymentNavItemField
                savedCreditCards={savedCreditCards}
                onNavItemClick={onPaymentEditClick}
                name="paymentInfo"
              />
              <SecurityCodeInputField shouldShowSecurityInputField={isCVVRequired} />
            </div>
          )}
        </div>

        <RefundSummary
          nonRefundable={nonRefundable}
          refundable={refundable}
          newAmountDue={newAmountDue}
          totalDueNow={totalDueNow}
          purchaseWithPoints={purchaseWithPoints}
          refundMethod={refundMethod}
          travelFunds={travelFunds}
        />

        {this._renderMakeChangesButton(changePricingPage)}
      </Form>
    );
  }
}

export default withForm({
  formValidator: purchaseSummaryFormValidator,
  autoClearFormData: false,
  defaultValues: ({ changePricingPage, savedCreditCards }: Props) => {
    const nonRefundable = _.get(changePricingPage, 'fareSummary.nonRefundable');
    const refundable = _.get(changePricingPage, 'fareSummary.refundable');
    const primaryCard = _.get(savedCreditCards, 'primaryCard.savedCreditCardId');

    const paymentInfo = primaryCard ? { selectedCardId: primaryCard } : {};

    return { refundMethod: nonRefundable && !refundable ? HOLD_FUTURE_USE : '', paymentInfo };
  }
})(AirChangeReviewForm);
