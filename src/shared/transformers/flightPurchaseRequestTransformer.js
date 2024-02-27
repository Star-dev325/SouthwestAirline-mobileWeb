// @flow

import _ from 'lodash';
import { removeSeparator } from 'src/shared/helpers/separatorHelper';
import {
  NEW_CREDIT_CARD_ID,
  RAPID_REWARDS_VISA_ID,
  PAY_PAL_CARD_ID,
  APPLE_PAY_CARD_ID,
  UPLIFT_CARD_ID
} from 'src/shared/constants/creditCardConstants';
import { generateNewCreditCardInfo, generateUatpCardInfo } from 'src/shared/helpers/creditCardHelper';
import { transformToNonChargeableAncillaryProducts } from 'src/shared/transformers/nonChargeableAncillaryProductsTransformer';
import { transformToTravelFundsAddress } from 'src/shared/transformers/billingAddressTransformer';
import { isCurrencyAmountZero } from 'src/shared/helpers/travelFundsHelper';
import { hasAnyEligibleEarlyBirdProducts } from 'src/shared/selectors/earlyBirdSelector';
import { getMoneyTotalForAirBooking } from 'src/shared/helpers/alternativeFormsOfPaymentHelper';
import { APPLE_PAY, UPLIFT } from 'src/shared/constants/creditCardTypes';
import PassengerTypes from 'src/shared/constants/passengerTypes';

import type { PurchaseFlightParamsType, EarlyBirdEligibility } from 'src/airBooking/flow-typed/airBooking.types';
import type { BuildPassengerType, PassportFormData, PassengerInfos } from 'src/shared/flow-typed/shared.types';
import { otherPassengerReference } from 'src/airBooking/helpers/purchaseSummaryPageHelper';

const { LAPCHILD } = PassengerTypes;

const transformEarlyBirdProductsForPurchase = (earlyBirdEligibility: ?EarlyBirdEligibility) =>
  _.chain(_.get(earlyBirdEligibility, 'bounds'))
    .map((bound) => [bound._meta.products.adult])
    .flatten()
    .reject(_.isEmpty)
    .value();

const optionalFieldCheck = (value) => (_.isEmpty(value) ? null : value);

function buildPassportAndEmergencyContact(passportAndEmergencyContact: PassportFormData) {
  const passportInfo = {
    passportInformation: _.pick(passportAndEmergencyContact, [
      'passportNumber',
      'passportIssuedBy',
      'nationality',
      'passportExpirationDate',
      'countryOfResidence'
    ])
  };

  if (
    !_.isEmpty(passportAndEmergencyContact.emergencyContactName) &&
    !_.isEmpty(passportAndEmergencyContact.emergencyContactPhoneNumber)
  ) {
    _.assign(passportInfo, {
      emergencyContact: {
        emergencyContactInformation: {
          contactPhone: {
            countryCode: passportAndEmergencyContact.emergencyContactCountryCode,
            number: removeSeparator(passportAndEmergencyContact.emergencyContactPhoneNumber)
          },
          name: passportAndEmergencyContact.emergencyContactName
        }
      }
    });
  }

  return passportInfo;
}

export const buildPassenger = (passenger: BuildPassengerType) => {
  const {
    firstName,
    lastName,
    middleName,
    dateOfBirth,
    gender,
    suffix,
    saveAsFrequentTraveler,
    rapidRewardsNumber,
    knownTravelerNumber,
    redressNumber,
    frequentTravelerId,
    frequentTravelerToken,
    associatedAdult
  } = passenger.passengerInfo;
  const { type, passengerReference } = passenger;
  const isLapChild = type === LAPCHILD;
  const passengerInfo = {
    passengerReference,
    name: {
      firstName,
      lastName,
      middleName: optionalFieldCheck(middleName),
      suffix: optionalFieldCheck(suffix)
    },
    dateOfBirth,
    gender,
    accountNumber: rapidRewardsNumber,
    knownTravelerId: knownTravelerNumber,
    redressNumber,
    ...(saveAsFrequentTraveler ? { saveAsFrequentTraveler } : {}),
    ...(frequentTravelerToken && frequentTravelerId ? { frequentTravelerToken, frequentTravelerId } : {}),
    ...(isLapChild
      ? {
        otherPassengerReference: otherPassengerReference(type, passengerReference, associatedAdult)
      }
      : {})
  };

  if (passenger.passportAndEmergencyContact) {
    _.assign(passengerInfo, buildPassportAndEmergencyContact(passenger.passportAndEmergencyContact));
  }

  if (passenger.specialAssistance) {
    _.set(
      passengerInfo,
      'nonChargeableAncillaryProducts',
      transformToNonChargeableAncillaryProducts(passenger.specialAssistance)
    );
  }

  return passengerInfo;
};

export const buildReservationGroups = (adults: PassengerInfos, lapChildren: PassengerInfos) => {
  const reservationGroups = [];
  const addReservationGroup = (passengerType, passengers) => ({
    passengerType,
    passengers: _.map(passengers, buildPassenger)
  });

  if (!_.isEmpty(adults)) {
    reservationGroups.push(addReservationGroup('ADULT', adults));
  }

  if (!_.isEmpty(lapChildren)) {
    reservationGroups.push(addReservationGroup('LAP_INFANT', lapChildren));
  }

  return reservationGroups;
};

const buildPayment = (
  flightPricingPageResponse,
  fundsAppliedToken,
  travelFundsBalanceRemaining,
  paymentInfo,
  priceTotal,
  chaseSessionId,
  securityCode,
  payPal,
  applePayCard,
  upliftCard
) => {
  const { selectedCardId = NEW_CREDIT_CARD_ID, selectedGhostCardId, chasePhoneNumber } = paymentInfo;

  let moneyTotalFare;

  if (fundsAppliedToken) {
    moneyTotalFare = travelFundsBalanceRemaining;
  } else {
    moneyTotalFare = _.get(priceTotal, 'totals.moneyTotal');
  }

  let pointsTotalBaseFare = _.get(flightPricingPageResponse, 'flightPricingPage.totals.pointsTotal', null);

  pointsTotalBaseFare = pointsTotalBaseFare
    ? _.pick(pointsTotalBaseFare, ['amount', 'currencyCode'])
    : pointsTotalBaseFare;

  const newCreditCard = generateNewCreditCardInfo(paymentInfo);
  const savedCreditCard = {
    savedCreditCardId: selectedCardId
  };

  !_.isEmpty(securityCode) && _.assign(savedCreditCard, { securityCode });

  const purchasePaymentInfo = { moneyTotalFare, pointsTotalBaseFare };

  fundsAppliedToken && _.set(purchasePaymentInfo, 'fundToken', fundsAppliedToken);

  if (isCurrencyAmountZero(travelFundsBalanceRemaining)) {
    return purchasePaymentInfo;
  } else if (selectedGhostCardId && selectedGhostCardId === selectedCardId) {
    return _.merge({}, purchasePaymentInfo, { savedGhostCard: { savedGhostCardId: selectedGhostCardId } });
  } else {
    switch (selectedCardId) {
      case NEW_CREDIT_CARD_ID:
        return _.merge({}, purchasePaymentInfo, { newCreditCard });
      case RAPID_REWARDS_VISA_ID:
        return _.merge({}, purchasePaymentInfo, {
          chaseInstantCreditCard: {
            phoneNumber: removeSeparator(chasePhoneNumber),
            sessionId: chaseSessionId
          }
        });
      case PAY_PAL_CARD_ID: {
        const paypalToken = _.get(payPal, 'token');

        return _.merge({}, purchasePaymentInfo, {
          paypal: {
            paypalToken
          }
        });
      }
      case APPLE_PAY_CARD_ID: {
        if (applePayCard && applePayCard.isNativeApplePay) {
          return _.merge({}, purchasePaymentInfo, applePayCard.purchaseRequest);
        } else {
          const newApplePayCreditCard = generateUatpCardInfo(applePayCard, APPLE_PAY.key);

          return _.merge({}, purchasePaymentInfo, { newCreditCard: newApplePayCreditCard });
        }
      }
      case UPLIFT_CARD_ID: {
        const newUpliftCardInfo = generateUatpCardInfo(upliftCard, UPLIFT.key);

        return _.merge({}, purchasePaymentInfo, { newCreditCard: newUpliftCardInfo });
      }
      default:
        return _.merge({}, purchasePaymentInfo, { savedCreditCard });
    }
  }
};

const transformToExpressPurchaseRequest = (purchaseFlightParams: PurchaseFlightParamsType) => {
  const {
    flightPricingPageResponse,
    contactMethodInfo,
    formData,
    earlyBirdEligibility,
    priceTotal,
    fundsAppliedToken,
    travelFundsBalanceRemaining,
    earlyBirdSelected,
    selectedIrn
  } = purchaseFlightParams;

  const { purposeOfTravel, securityCode: savedCreditCardSecurityCode } = formData;
  const { declineNotifications } = contactMethodInfo;

  const { flightConfirmationPage } = _.get(flightPricingPageResponse, 'flightPricingPage._links', {});

  const groups = _.get(flightConfirmationPage, 'body.reservationGroups');
  const reservationGroups = _.map(groups, (group) => ({ ...group, passengerType: _.toUpper(group.passengerType) }));

  const earlyBirdProducts = earlyBirdEligibility && transformEarlyBirdProductsForPurchase(earlyBirdEligibility);
  const earlyBird = (formData.isEarlyBirdInPathRadioButtonChecked || earlyBirdSelected) && earlyBirdProducts;

  const pointsTotal = _.get(flightPricingPageResponse, 'flightPricingPage.totals.pointsTotal');
  const pointsTotalBaseFare = pointsTotal && _.pick(pointsTotal, ['amount', 'currencyCode']);

  const moneyTotalFare = getMoneyTotalForAirBooking(fundsAppliedToken, travelFundsBalanceRemaining, priceTotal);

  const body = {
    ..._.omitIfEmpty({
      earlyBird,
      savedCreditCardSecurityCode,
      purposeOfTravel
    }),
    internalReferenceNumber: optionalFieldCheck(selectedIrn),
    declineNotifications: _.toBoolean(declineNotifications),
    payment: { pointsTotalBaseFare, moneyTotalFare },
    reservationGroups
  };

  return _.merge({}, flightConfirmationPage, { body });
};

export const transformToPurchaseRequest = (
  purchaseFlightParams: PurchaseFlightParamsType,
  isExpressPurchaseRequest: boolean = false
) => {
  if (isExpressPurchaseRequest) {
    return transformToExpressPurchaseRequest(purchaseFlightParams);
  }

  const {
    applePayCard,
    calculateFundsTaxesAndFees,
    chaseSessionId,
    contactMethodInfo,
    dutyOfCareContact,
    earlyBirdEligibility,
    earlyBirdPricingDifference,
    earlyBirdSelected,
    flightPricingPageResponse,
    formData,
    fundsAppliedToken,
    passengerInfos,
    paymentInfo,
    payPal,
    priceTotal,
    selectedIrn,
    travelFundsBalanceRemaining,
    upliftCard
  } = purchaseFlightParams;
  const { purposeOfTravel, securityCode, travelFundsAddress } = formData;
  const { contactMethod, phoneCountryCode, phoneNumber, email, declineNotifications, preferredLanguage } =
    contactMethodInfo;
  const { emailReceiptTo, shareItineraryEmail } = _.get(passengerInfos, '[0].passengerInfo', {});
  const isEarlyBirdEligible = earlyBirdEligibility && hasAnyEligibleEarlyBirdProducts(earlyBirdEligibility);

  const adultPassengers = _.filter(passengerInfos, { type: 'adult' });
  const lapChildren = _.filter(passengerInfos, { type: 'lapChild' });

  const isDeclineNotifications = _.toBoolean(declineNotifications);
  let body = {
    declineNotifications: isDeclineNotifications,
    payment: buildPayment(
      flightPricingPageResponse,
      fundsAppliedToken,
      travelFundsBalanceRemaining,
      paymentInfo,
      priceTotal,
      chaseSessionId,
      securityCode,
      payPal,
      applePayCard,
      upliftCard
    ),
    reservationGroups: buildReservationGroups(adultPassengers, lapChildren),
    receiptEmail: emailReceiptTo,
    purposeOfTravel: optionalFieldCheck(purposeOfTravel),
    sharedItineraryEmail: optionalFieldCheck(shareItineraryEmail),
    internalReferenceNumber: optionalFieldCheck(selectedIrn)
  };

  if ((formData.isEarlyBirdInPathRadioButtonChecked || earlyBirdSelected) && isEarlyBirdEligible) {
    body = _.merge({}, body, {
      earlyBird: transformEarlyBirdProductsForPurchase(earlyBirdEligibility),
      ..._.omitIfEmpty({ earlyBirdPricingDifference })
    });
  }

  if (travelFundsAddress && isCurrencyAmountZero(travelFundsBalanceRemaining)) {
    body = _.merge({}, body, {
      travelFundsAddress: transformToTravelFundsAddress(travelFundsAddress)
    });
  }

  if (!isDeclineNotifications) {
    const contactInformation = _.omitBy(
      {
        email,
        phoneNumber: phoneCountryCode ? phoneCountryCode + removeSeparator(phoneNumber) : undefined,
        contactMethod,
        preferredLanguage: preferredLanguage || 'EN'
      },
      _.isUndefined
    );

    body = _.merge(body, { contactInformation });
  }

  if (dutyOfCareContact?.contactMethod) {
    if (dutyOfCareContact?.contactPhone) {
      const phone = dutyOfCareContact?.contactPhone ?? {};

      phone.number = removeSeparator(phone.number);
    }

    body = { ...body, ...{ dutyOfCareContact } };
  }

  const modifiedPurchaseResponse = _.merge({}, flightPricingPageResponse.flightPricingPage._links.flightConfirmationPage, { body });

  if (calculateFundsTaxesAndFees) {
    modifiedPurchaseResponse.body.reservationGroups.forEach((group) => {
      if (group.passengerType === 'ADULT') {
        group.amountApplied.taxesAndFees = calculateFundsTaxesAndFees;
      }
    });
  }

  return modifiedPurchaseResponse;
};
