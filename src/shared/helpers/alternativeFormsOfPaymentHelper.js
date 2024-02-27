// @flow
import _ from 'lodash';

import { invalidUsStateError, PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import { DOLLAR } from 'src/shared/constants/currencyTypes';

import { toPersonalInfoFormData, toBillingInfoFormData, toCeptorValidationErrorArray, removeStateAndZipRequirementForInternationalCountries } from 'src/shared/transformers/alternativeFormsOfPaymentTransformer';
import passengerPersonalInfoFormValidator from 'src/shared/form/formValidators/passengerPersonalInfoFormValidator';
import billingAddressFormValidator from 'src/shared/form/formValidators/billingAddressFormValidator';
import statesOfUS from 'src/shared/constants/statesOfAmerican';

import type { CurrencyType, TotalsType, CeptorCallbackResponse, CeptorBillingInfo, CeptorConfigWithAmount, AfpAvailability } from 'src/shared/flow-typed/shared.types';
import type { PricingChangeFareItem } from 'src/airChange/flow-typed/airChange.types';

export const getAmountFromTotal = (moneyTotal: CurrencyType) => {
  const { amount: amountWithCents = '0' } = moneyTotal || {};

  const amountWithoutCommas = _.chain(amountWithCents).split(',').join('').value();
  const amountAsCents = _.toNumber(amountWithoutCommas) * 100;

  return parseInt(amountAsCents.toFixed()) || 0;
};

export const getTotalFromAmount = (amountAsCents: number) => {
  const amountWithCents = _.toNumber(amountAsCents) / 100 || 0;
  const amount = parseFloat(amountWithCents).toFixed(2);

  return { amount, currencyCode: DOLLAR };
};

export const getMoneyTotalForAirBooking = (fundsAppliedToken: ?string, travelFundsBalanceRemaining: ?CurrencyType, priceTotal: {totals: TotalsType}) => (fundsAppliedToken ? _.cloneDeep(travelFundsBalanceRemaining) : _.get(priceTotal, 'totals.moneyTotal'));

export const getMoneyTotalForAirChange = (totalDueNow: ?PricingChangeFareItem, newAmountDue: ?PricingChangeFareItem, purchaseWithPoints: boolean) => {
  const moneyFareObj = totalDueNow ? totalDueNow : newAmountDue;

  return purchaseWithPoints ? _.get(moneyFareObj, 'tax') : _.get(moneyFareObj, 'fare');
};

export const containsError = (response: CeptorCallbackResponse) => {
  const { code } = response || {};

  return _.toNumber(code) !== 200;
};

export const getValidationErrors = (response?: CeptorBillingInfo) => {
  if (!response || _.isEmpty(response)) {
    return [];
  }

  const personalInfoErrors = getPersonalInfoValidationErrors(response);
  const billingAddressErrors = getBillingAddressValidationErrors(response);

  return [...personalInfoErrors, ...billingAddressErrors];
};

const getPersonalInfoValidationErrors = (response: CeptorBillingInfo) => {
  const personalInfoFormData = toPersonalInfoFormData(response);
  const personalInfoErrors = passengerPersonalInfoFormValidator({})(personalInfoFormData);

  return toCeptorValidationErrorArray(personalInfoErrors);
};

const getBillingAddressValidationErrors = (response: CeptorBillingInfo) => {
  const billingAddressFormData = toBillingInfoFormData(response);
  const billingAddressErrors = billingAddressFormValidator()(billingAddressFormData);

  const { stateProvinceRegion, isoCountryCode } = billingAddressFormData || {};
  const isInternational = isCountryInternational(isoCountryCode);

  const updatedBillingAddressErrors = removeStateAndZipRequirementForInternationalCountries(isInternational, billingAddressErrors);
  const invalidStateError = !isStateValid(isInternational, stateProvinceRegion) ? invalidUsStateError : null;

  return toCeptorValidationErrorArray({
    ...updatedBillingAddressErrors,
    ...invalidStateError
  });
};

const isCountryInternational = (isoCountryCode: string) => isoCountryCode !== 'US';

const isStateValid = (isInternational: boolean, stateProvinceRegion: string) => {
  if (isInternational) {return true;}

  const usState = _.toUpper(stateProvinceRegion);

  return !!_.find(statesOfUS, (fullStateName: string, abbreviation: string) => _.toUpper(fullStateName) === usState || _.toUpper(abbreviation) === usState);
};

export const validatePaymentMethodIsAvailable = (paymentMethod: string, availability: ?AfpAvailability, shouldShowUplift: ?boolean, shouldDisableUplift: ?boolean) => {
  const isAvailable = _.get(availability, 'isAvailable', false);

  switch (paymentMethod) {
    case PAYMENT_METHODS.APPLE_PAY: {
      return isAvailable;
    }
    case PAYMENT_METHODS.UPLIFT: {
      return isAvailable && shouldShowUplift && !shouldDisableUplift;
    }
    default: {return false;}
  }
};

export const getQueryParamsForExternalPaymentPage = (paymentMethod: string, ceptorConfig: CeptorConfigWithAmount, location: HistoryLocation, isWebView: boolean) => {
  const persistenceIdentifier = getPersistenceIdentifierForPaymentMethod(paymentMethod, ceptorConfig);
  const provider = getProviderForPaymentMethod(paymentMethod, ceptorConfig);

  return {
    persistenceIdentifier,
    provider,
    paymentMethod,
    redirectUrl: _.get(location, 'pathname'),
    webView: isWebView
  };
};

const getPersistenceIdentifierForPaymentMethod = (paymentMethod: string, ceptorConfig: CeptorConfigWithAmount) => {
  const paymentMethodConfigParams = _.get(ceptorConfig, 'requestedAFPParams.paymentMethodConfigParams', []);
  const configParam = _.find(paymentMethodConfigParams, param => param && param.paymentMethod === paymentMethod);

  switch (paymentMethod) {
    case PAYMENT_METHODS.UPLIFT: {
      return _.get(configParam, 'config.persistenceIdentifier', '');
    }
    default: {return '';}
  }
};

const getProviderForPaymentMethod = (paymentMethod: string, ceptorConfig: CeptorConfigWithAmount) => {
  const paymentMethodConfigParams = _.get(ceptorConfig, 'requestedAFPParams.paymentMethodConfigParams', []);
  const configParam = _.find(paymentMethodConfigParams, param => param && param.paymentMethod === paymentMethod);

  return _.get(configParam, 'provider');
};

export const getAvailabilityForPaymentMethod = (state: *, paymentMethod: string) => {
  switch (paymentMethod) {
    case PAYMENT_METHODS.UPLIFT: {
      return _.get(state, 'app.uplift.upliftAvailability', {});
    }
    case PAYMENT_METHODS.APPLE_PAY: {
      return _.get(state, 'app.applePay.applePayAvailability', {});
    }
    default: return {};
  }
};
