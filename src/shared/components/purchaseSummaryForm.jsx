// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import EarlyBirdInPathBreakdown from 'src/airBooking/components/earlyBirdInPathBreakdown';
import { getEarlyBirdAdditionalTemplateData } from 'src/airBooking/helpers/earlyBirdPlacementHelper';
import { transformToUnitPrice } from 'src/airBooking/transformers/transformToEarlyBirdPriceDetails';
import Button from 'src/shared/components/button';
import Icon from 'src/shared/components/icon';
import PassengerInfoSummary from 'src/shared/components/passengerInfoSummary';
import PriceTotal from 'src/shared/components/priceTotal';
import PurchaseSummarySecurityCodeHeader from 'src/shared/components/purchaseSummarySecurityCodeHeader';
import TripSummary from 'src/shared/components/tripSummary';
import { RAPID_REWARDS_VISA_ID, UPLIFT_CARD_ID } from 'src/shared/constants/creditCardConstants';
import { getIconType } from 'src/shared/constants/iconConstants';
import purposeOfTravelTypes from 'src/shared/constants/purposeOfTravelTypes';
import { REFERRERS } from 'src/shared/constants/webViewConstants';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import ApplyRapidRewardsNavItemField from 'src/shared/form/fields/applyRapidRewardsNavItemField';
import ApplyTravelFundsNavItemField from 'src/shared/form/fields/applyTravelFundsNavItemField';
import BillingAddressNavItemField from 'src/shared/form/fields/billingAddressNavItemField';
import ContactInfoTravelManagerFields from 'src/shared/form/fields/contactInfoTravelManagerFields';
import ContactMethodFields from 'src/shared/form/fields/contactMethodFields';
import EarlyBirdInPathSwitchButtonField from 'src/shared/form/fields/earlyBirdInPathSwitchButtonField';
import FormSelectField from 'src/shared/form/fields/formSelectField';
import InternalReferenceNumberField from 'src/shared/form/fields/internalReferenceNumberField';
import PaymentNavItemField from 'src/shared/form/fields/paymentNavItemField';
import PhoneNumberFields from 'src/shared/form/fields/phoneNumberFields';
import SecurityCodeInputField from 'src/shared/form/fields/securityCodeInputField';
import purchaseSummaryFormValidator from 'src/shared/form/formValidators/purchaseSummaryFormValidator';
import { isBillingAddressComplete } from 'src/shared/helpers/billingAddressHelper';
import { getDefaultSelectedPaymentInfo } from 'src/shared/helpers/creditCardHelper';
import optionsHelper from 'src/shared/helpers/optionsHelper';
import { isSavedCreditCardThatRequiresCVV } from 'src/shared/helpers/savedCreditCardCVVHelper';
import { isCurrencyAmountZero } from 'src/shared/helpers/travelFundsHelper';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';
import { PURCHASE_PAGE_ID } from 'src/wcm/constants/wcmConstants';
import { noop } from 'src/shared/helpers/jsUtils';

import type { EarlyBirdEligibility, TripSummaryType } from 'src/airBooking/flow-typed/airBooking.types';
import type { TotalPointsAppliedType } from 'src/airBooking/flow-typed/applyRapidRewards.types';
import { getContactInfoTravelManagerText } from 'src/airBooking/helpers/purchaseSummaryPageHelper';
import type { PassengerInfoType } from 'src/shared/components/passengerInfoSummary';
import type { PriceTotalPropsType } from 'src/shared/components/priceTotal';
import type {
  BillingAddressFormType,
  CurrencyType,
  DutyOfCare,
  Fee,
  initialFormData,
  IrnInfoType,
  MessageType,
  YoungTravelerParentOrGuardianFormDataType,
  PaymentSavedCreditCards
} from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';
import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';

type Props = {
  billingAddressFormData?: BillingAddressFormType,
  bottomPromo1?: {},
  clickContactInfoTravelManagerMethodFn: () => void,
  clickContactMethodFn: () => void,
  companyName?: ?string,
  declineNotifications?: boolean,
  dutyOfCareContact: ?DutyOfCare,
  EARLY_BIRD_AB_TESTING: boolean,
  earlyBirdEligibility: ?EarlyBirdEligibility,
  earlyBirdSelected?: ?boolean,
  earlyBirdUpsell: ?DynamicPlacementResponse,
  ENABLE_BOOKING_PLACEMENT: ?DynamicPlacementResponse,
  formData: FormData,
  formId: string,
  handleChasePlacementClick?: () => void,
  handleFirmOfferOfCreditFn?: () => void,
  initialFormData: initialFormData,
  irnInfo?: IrnInfoType,
  isCurrencyInPoints?: boolean,
  isInternationalBooking?: boolean,
  isWebView?: string,
  onApplyRapidRewardsClick?: () => void,
  onApplyTravelFundsClick?: () => void,
  onClickBillingAddress?: () => void,
  onEarlyBirdCheckInClick: ?() => void,
  onIrnInfoClick?: () => void,
  onParentOrGuardianItemClick: (*) => void,
  onPassengerItemClick: (*) => void,
  onPaymentEditClick: () => void,
  onSubmit: (*) => void,
  onSwitchEarlyBirdInPathButton?: (boolean) => void,
  onTripAndPriceClick: () => void,
  onUnmount: (*) => void,
  parentOrGuardianFormDataInfo: YoungTravelerParentOrGuardianFormDataType,
  passengers: Array<PassengerInfoType>,
  priceTotal: PriceTotalPropsType,
  rapidRewardsApplied?: boolean,
  reviewMessages?: Array<MessageType>,
  savedCreditCards: PaymentSavedCreditCards,
  selectedIrn?: string,
  shouldShowApplyRapidRewards?: boolean,
  shouldShowChasePlacement?: boolean,
  showEarlyBirdInPath?: boolean,
  showSaveContactMethod: boolean,
  taxesAndFees?: Array<Fee>,
  totalAppliedTravelFunds?: CurrencyType,
  totalPointsApplied?: TotalPointsAppliedType,
  travelFundsApplied?: boolean,
  travelFundsBalanceRemaining?: CurrencyType,
  tripSummary: TripSummaryType,
  upliftAdditionalInfoLink?: string,
  upliftAdditionalMessaging?: string
};

export class PurchaseSummaryForm extends React.Component<Props> {
  static defaultProps = {
    showSaveContactMethod: false,
    declineNotifications: false
  };

  constructor(props: Props) {
    super(props);
  }

  renderReviewMessage = (stationsMessage: MessageType) => {
    const { body, header, icon } = stationsMessage;

    return (
        <div className="review-message flex p5 bgwhite">
          <div className="review-message--icon">{icon && <Icon data-qa={icon} type={getIconType(icon)} />}</div>
          <div className="review-message--body">
            {header && <p className="review-message--station-header">{header}</p>}
            <p>{body}</p>
          </div>
        </div>
    );
  };

  render() {
    const {
      billingAddressFormData,
      bottomPromo1,
      clickContactInfoTravelManagerMethodFn,
      clickContactMethodFn,
      companyName,
      declineNotifications,
      dutyOfCareContact,
      EARLY_BIRD_AB_TESTING,
      earlyBirdEligibility,
      earlyBirdSelected,
      earlyBirdUpsell,
      ENABLE_BOOKING_PLACEMENT,
      formData,
      formId,
      handleChasePlacementClick,
      handleFirmOfferOfCreditFn,
      initialFormData,
      irnInfo,
      isCurrencyInPoints,
      isInternationalBooking,
      isWebView,
      onApplyRapidRewardsClick,
      onApplyTravelFundsClick,
      onClickBillingAddress,
      onEarlyBirdCheckInClick,
      onIrnInfoClick,
      onParentOrGuardianItemClick,
      onPassengerItemClick,
      onPaymentEditClick,
      onSubmit,
      onSwitchEarlyBirdInPathButton = noop,
      onTripAndPriceClick,
      parentOrGuardianFormDataInfo,
      passengers,
      priceTotal,
      promoBottom01,
      promoTop01,
      rapidRewardsApplied = false,
      savedCreditCards,
      selectedIrn,
      shouldShowApplyRapidRewards,
      shouldShowChasePlacement,
      showEarlyBirdInPath,
      taxesAndFees,
      totalAppliedTravelFunds,
      totalPointsApplied,
      travelFundsApplied = false,
      travelFundsBalanceRemaining,
      tripSummary,
      upliftAdditionalInfoLink,
      upliftAdditionalMessaging,
      reviewMessages
    } = this.props;

    const isCVVRequired = isSavedCreditCardThatRequiresCVV(savedCreditCards, formData.paymentInfo.selectedCardId);

    const missingContactMethod = !declineNotifications && _.isEmpty(formData['contactMethodContent']);

    const contactInfoTravelManagerText = getContactInfoTravelManagerText(
        initialFormData?.contactTravelManagerInfo ?? {}
    );
    const missingPaymentMethod = _.isEmpty(formData.paymentInfo);
    const legalVerbiageText = companyName
        ? dutyOfCareContact &&
        dutyOfCareContact.legalVerbiage &&
        dutyOfCareContact.legalVerbiage.replace('{companyName}', companyName)
        : '';

    const unitPriceOutBound = transformToUnitPrice(_.get(earlyBirdEligibility, 'bounds[0]'));
    const unitPriceInBound = transformToUnitPrice(_.get(earlyBirdEligibility, 'bounds[1]'));

    const chaseInstantCreditCardSelected = formData.paymentInfo.selectedCardId === RAPID_REWARDS_VISA_ID;
    const upliftSelected = formData.paymentInfo.selectedCardId === UPLIFT_CARD_ID;
    const paymentNavAdditionalInfoMessage = upliftSelected ? upliftAdditionalMessaging : undefined;
    const paymentNavAdditionalInfoLink = upliftSelected ? upliftAdditionalInfoLink : undefined;

    const zeroCardBalanceRemaining = isCurrencyAmountZero(travelFundsBalanceRemaining);
    const billingAddressComplete = isBillingAddressComplete(billingAddressFormData);
    const showPaymentInfoOnFile =
        savedCreditCards.ghostCardRequired && savedCreditCards.ghostCards && savedCreditCards.ghostCards.length === 1;
    const showEarlyBirdInFareBreakdown = EARLY_BIRD_AB_TESTING
        ? earlyBirdSelected
        : !!formData.isEarlyBirdInPathRadioButtonChecked;
    const { firstName, lastName } = parentOrGuardianFormDataInfo || {};
    const parentOrGuardianName = { name: `${firstName} ${lastName}` };

    return (
        <Form
            name="air-booking-purchase"
            className="purchase-summary-form purchase-content"
            data-qa="purchase-summary-form"
            formId={formId}
            onSubmit={onSubmit}
        >
          {reviewMessages && reviewMessages.map(this.renderReviewMessage)}
          {ENABLE_BOOKING_PLACEMENT && promoTop01 && (
              <DynamicPlacement
                  {...promoTop01}
                  data-qa="promoTop01"
                  isWebView={isWebView}
              />
          )}
          <dl className="shopping-summary">
            <PurchaseSummarySecurityCodeHeader
                missingPaymentMethod={missingPaymentMethod && !zeroCardBalanceRemaining}
                missingBillingAddress={!billingAddressComplete && zeroCardBalanceRemaining}
                missingContactMethod={missingContactMethod}
                isSavedCreditCardThatRequiresCVVMissing={isCVVRequired && _.isEmpty(formData.securityCode)}
            />
            <dt data-qa="passengers-section-title">{i18n('SHARED__PURCHASE_SUMMARY_FORM__PASSENGERS')}</dt>
            <dd>
              <PassengerInfoSummary onPassengerItemClick={onPassengerItemClick} passengers={passengers} />
            </dd>
            {parentOrGuardianFormDataInfo && (
                <>
                  <dt>{i18n('SHARED__PURCHASE_SUMMARY_FORM__PARENT_OR_GUARDIAN')}</dt>
                  <dd data-qa="parent-or-guardian-section-title">
                    <PassengerInfoSummary
                        onPassengerItemClick={onParentOrGuardianItemClick}
                        passengers={[parentOrGuardianName]}
                    />
                  </dd>
                </>
            )}
            <ContactMethodFields
                clickContactMethodFn={clickContactMethodFn}
                missingContactMethod={missingContactMethod}
                names={['contactMethodContent']}
                isOptional={isInternationalBooking}
            />
            <dt data-qa="your-trip-section-title">{i18n('SHARED__PURCHASE_SUMMARY_FORM__TRIP')}</dt>
            <dd>
              <TripSummary {...tripSummary} onTripAndPriceClick={onTripAndPriceClick} />
            </dd>
            {irnInfo && companyName && (
                <InternalReferenceNumberField
                    clickIrnFn={onIrnInfoClick}
                    selectedIrn={selectedIrn}
                    irnInfo={irnInfo}
                    name="internalReferenceNumber"
                />
            )}
            {companyName && (
                <div className="duty-of-care-nav-item">
                  <ContactInfoTravelManagerFields
                      clickContactInfoTravelManagerMethodFn={clickContactInfoTravelManagerMethodFn}
                      names={['contactTravelManagerInfo']}
                      value={contactInfoTravelManagerText}
                  />
                  <p className="helper-text">{legalVerbiageText}</p>
                </div>
            )}
            <dt data-qa="purpose-of-travel-section-title">{i18n('SHARED__PURCHASE_SUMMARY_FORM__TRAVEL_PURPOSE')}</dt>
            <dd>
              <FormSelectField
                  name="purposeOfTravel"
                  placeholder="Select (optional)"
                  options={optionsHelper.getOptionsByMeta(purposeOfTravelTypes)}
              />
            </dd>
            {!EARLY_BIRD_AB_TESTING && showEarlyBirdInPath && (
                <dl>
                  <dt onClick={onEarlyBirdCheckInClick} className="purchase-summary-form--add-early-bird pt2">
                    {i18n('SHARED__PURCHASE_SUMMARY_FORM__ADD_EARLY_BIRD_CHECK_IN')}
                    <sup>&reg;</sup>
                  </dt>
                  <dd>
                    <EarlyBirdInPathSwitchButtonField
                        name="isEarlyBirdInPathRadioButtonChecked"
                        onClick={onSwitchEarlyBirdInPathButton}
                        totalPrice={_.get(earlyBirdEligibility, 'totalPrice')}
                        unitPriceOutBound={unitPriceOutBound}
                        unitPriceInBound={unitPriceInBound}
                    />
                    <EarlyBirdInPathBreakdown
                        isRadioButtonChecked={!!formData.isEarlyBirdInPathRadioButtonChecked}
                        earlyBirdEligibility={earlyBirdEligibility}
                        EARLY_BIRD_AB_TESTING={EARLY_BIRD_AB_TESTING}
                    />
                    <div className="gray5 medium pt4 bggray2" data-qa="add-early-bird-check-in--verbiage">
                      {i18n('SHARED__EARLY_BIRD__CHECK_IN_VERBIAGE')}
                    </div>
                  </dd>
                </dl>
            )}
            {EARLY_BIRD_AB_TESTING && earlyBirdUpsell && (
                <dl>
                  <dt />
                  <dd>
                    <DynamicPlacement
                        {...earlyBirdUpsell}
                        className={'early-bird-purchase-placement'}
                        earlyBirdEligibility={earlyBirdEligibility}
                        earlyBirdSelected={earlyBirdSelected}
                        EARLY_BIRD_AB_TESTING={EARLY_BIRD_AB_TESTING}
                        additionalTemplateData={getEarlyBirdAdditionalTemplateData(
                            unitPriceInBound,
                            unitPriceOutBound,
                            earlyBirdEligibility
                        )}
                    />
                  </dd>
                </dl>
            )}
            {onApplyTravelFundsClick && (
                <div className="apply-travel-funds-nav-item">
                  <dt data-qa="apply-funds-section-title">{i18n('SHARED__PURCHASE_SUMMARY_FORM__APPLY_TRAVEL_FUNDS')}</dt>
                  <ApplyTravelFundsNavItemField
                      onNavItemClick={onApplyTravelFundsClick}
                      travelFundsApplied={travelFundsApplied}
                      name="applyTravelFunds"
                  />
                  <p className="helper-text">{i18n('SHARED__PURCHASE_SUMMARY_FORM__APPLY_FUNDS_NAV_ITEM_MESSAGE')}</p>
                </div>
            )}
            {onApplyRapidRewardsClick && !isCurrencyInPoints && shouldShowApplyRapidRewards && (
                <div className="apply-rapid-rewards-nav-item">
                  <dt data-qa="apply-points-section-title">{i18n('SHARED__PURCHASE_SUMMARY_FORM__APPLY_RAPID_REWARDS')}</dt>
                  <ApplyRapidRewardsNavItemField
                      name="applyRapidRewards"
                      onNavItemClick={onApplyRapidRewardsClick}
                      rapidRewardsApplied={rapidRewardsApplied}
                  />
                </div>
            )}
            {zeroCardBalanceRemaining && (
                <div className="billing-address-nav-item">
                  <dt data-qa="billing-address-section-title">{i18n('SHARED__BILLING_INFO__BILLING_ADDRESS')}</dt>
                  <BillingAddressNavItemField
                      onNavItemClick={onClickBillingAddress}
                      billingAddressComplete={billingAddressComplete}
                      name="travelFundsAddress"
                  />
                </div>
            )}
            {!zeroCardBalanceRemaining && (
                <div>
                  <dt data-qa="payment-section-title">{i18n('SHARED__PURCHASE_SUMMARY_FORM__PAYMENT')}</dt>
                  <dd>
                    <PaymentNavItemField
                        showPaymentInfoOnFile={showPaymentInfoOnFile}
                        savedCreditCards={savedCreditCards}
                        onNavItemClick={onPaymentEditClick}
                        name="paymentInfo"
                        additionalInfoMessage={paymentNavAdditionalInfoMessage}
                        additionalInfoLink={paymentNavAdditionalInfoLink}
                    />
                    {chaseInstantCreditCardSelected && (
                        <PhoneNumberFields
                            placeholder={i18n('SHARED__PLACEHOLDER__BILLING_PHONE_NUMBER')}
                            names={['chasePhoneNumber', 'chasePhoneCountryCode']}
                            nameForPhoneNumber="chasePhoneNumber"
                            nameForPhoneCountryCode="chasePhoneCountryCode"
                            className="phone-number-field"
                            data-qa="chasePhoneNumber"
                            onSubmit={onSubmit}
                        />
                    )}
                  </dd>
                  <dd>
                    <SecurityCodeInputField shouldShowSecurityInputField={isCVVRequired} />
                  </dd>
                </div>
            )}
          </dl>
          {bottomPromo1 && shouldShowChasePlacement && (
              <DynamicPlacement
                  {...bottomPromo1}
                  data-qa="purchase-page-placement"
                  className="bottom-promo"
                  referrer={REFERRERS.PURCHASE}
                  isWebView={isWebView}
                  onClick={handleChasePlacementClick}
                  observerCallback={handleFirmOfferOfCreditFn}
                  pageId={PURCHASE_PAGE_ID}
              />
          )}
          <div className="purchase-content--summary-footer">
            <PriceTotal
                earlyBirdEligibility={earlyBirdEligibility}
                ref="priceTotal"
                showEarlyBirdInFareBreakdown={showEarlyBirdInFareBreakdown}
                taxesAndFees={taxesAndFees}
                totalAppliedTravelFunds={totalAppliedTravelFunds}
                totalPointsApplied={totalPointsApplied}
                travelFundsBalanceRemaining={travelFundsBalanceRemaining}
                {...priceTotal}
            />
            <div className="purchase-disclaimer">{i18n('PURCHASE_DISCLAIMER')}</div>
            <div className="purchase-content--summary-footer-nav">
              <Button type="submit" className="purchase" ref="purchaseButton" color="yellow" size="larger" fluid>
                {i18n('SHARED__PURCHASE_SUMMARY_FORM__PURCHASE')}
              </Button>
            </div>
            {ENABLE_BOOKING_PLACEMENT && promoBottom01 && (
                <DynamicPlacement
                    {...promoBottom01}
                    data-qa="promoBottom01"
                    isWebView={isWebView}
                />
            )}
          </div>
        </Form>
    );
  }
}

export default withForm({
  formValidator: purchaseSummaryFormValidator,
  autoClearFormData: false,
  defaultValues: (props: Props) => {
    const defaultValues = {
      isEarlyBirdInPathRadioButtonChecked: false,
      securityCode: '',
      purposeOfTravel: '',
      internalReferenceNumber: '',
      travelFundsAddress: _.get(props, 'billingAddressFormData', null)
    };
    const { primaryCard, ghostCards } = props.savedCreditCards;

    if (primaryCard || ghostCards) {
      const paymentInfo = getDefaultSelectedPaymentInfo(props.savedCreditCards);

      if (paymentInfo.selectedCardId) {
        return _.merge({}, defaultValues, { paymentInfo });
      }
    }

    return defaultValues;
  }
})(PurchaseSummaryForm);
