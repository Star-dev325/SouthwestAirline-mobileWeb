// @flow
import _ from 'lodash';
import store2 from 'store2';
import { getSameDayFareSummary } from 'src/sameDay/selectors/sameDayPriceSelectors';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import StorageKeys from 'src/shared/helpers/storageKeys';
import {
  INITIAL_AVAILABILITY,
  PAYMENT_METHODS,
  APPLICATION_TYPES,
  APPLICATION_TYPES_UPLIFT
} from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import { DOLLAR } from 'src/shared/constants/currencyTypes';
import environment from 'src/shared/api/apiRoutes';
import {
  getAmountFromTotal,
  getMoneyTotalForAirBooking,
  getMoneyTotalForAirChange
} from 'src/shared/helpers/alternativeFormsOfPaymentHelper';
import { getUpliftPaymentMethodConfigParams } from 'src/shared/selectors/upliftSelector';
import {
  getPriceTotalWithEBForAirbooking,
  getBalanceRemainingWithEBForAirbooking,
  getBalanceRemainingWithEBForCompanion,
  getPriceTotalWithEBForCompanion
} from 'src/shared/selectors/earlyBirdSelector';

import type { AfpAvailability, CeptorConfig, CurrencyType } from 'src/shared/flow-typed/shared.types';

const applePayAvailability = (state) => _.get(state, 'app.applePay.applePayAvailability', INITIAL_AVAILABILITY);
const upliftAvailability = (state) => _.get(state, 'app.uplift.upliftAvailability', INITIAL_AVAILABILITY);

export const getPaymentMethodAvailabilities = createSelector(
  [applePayAvailability, upliftAvailability],
  (...afps: Array<AfpAvailability>) => afps
);

export const getAfpAvailability = createSelector(
  [applePayAvailability, upliftAvailability],
  (...afps: Array<AfpAvailability>) => {
    const activeAfp = _.find(afps, (afp) => _.get(afp, 'isActive', false));
    const availableAfp = _.find(afps, (afp) => _.get(afp, 'isAvailable', false));

    return activeAfp || availableAfp || INITIAL_AVAILABILITY;
  }
);
export const getBaseCeptorConfig = (state: *) => _.get(state, 'app.wcmContent.applicationProperties.ceptorConfig');
const getIsWebView = (state) => _.get(state, 'app.webView.isWebView', false);

export const getCeptorConfig = (applicationType: string, state: *) =>
  createSelector([getBaseCeptorConfig, getIsWebView], (ceptorConfig: CeptorConfig, isWebView: boolean) => {
    const { requestedAFPParams } = ceptorConfig || {};
    const { paymentMethodConfigParams } = requestedAFPParams || {};

    const webViewChannel = isWebView && store2.get(StorageKeys.WEB_VIEW_CHANNEL);
    const channel = (webViewChannel && webViewChannel.toLowerCase()) || 'mweb';

    const ceptorEnvironmentParams = {
      application: APPLICATION_TYPES_UPLIFT[applicationType],
      environment: environment.ceptorEnv,
      channel,
      site: environment.ceptorSite
    };

    const moneyTotal = getMoneyTotalForApplication(state, applicationType);
    const amount = moneyTotal ? getAmountFromTotal(moneyTotal) : 0;
    const { currencyCode: currency = DOLLAR } = moneyTotal || {};

    const upliftConfigParam = getUpliftPaymentMethodConfigParams(state, ceptorConfig, amount, applicationType);

    return {
      ...ceptorConfig,
      requestedAFPParams: {
        ...requestedAFPParams,
        ...ceptorEnvironmentParams,
        amount,
        currency,
        paymentMethodConfigParams: _.map(paymentMethodConfigParams, (param) => {
          if (param.paymentMethod === PAYMENT_METHODS.UPLIFT) {
            param = _.merge({}, param, upliftConfigParam);
          }

          return {
            ...param,
            config: {
              ..._.get(param, 'config'),
              isWebView
            }
          };
        })
      }
    };
  });

const getApplePayCard = (state) => _.get(state, 'app.applePay.applePayCard');

export const getConfirmationPageContent = (confirmationPage: *) =>
  createSelector([confirmationPage, getApplePayCard], (confirmationPageContent, applePayCard) => {
    const applePayBillingInfo = applePayCard &&
      applePayCard.token && {
      lastFourDigits: _.get(applePayCard, 'token.lastFourDigits'),
      afpCardType: _.get(applePayCard, 'token.cardType')
    };

    return {
      ...confirmationPageContent,
      billingInfo: {
        ...confirmationPageContent.billingInfo,
        ...applePayBillingInfo
      }
    };
  });

export const getMoneyTotalForApplication = (state: *, applicationType: string): ?CurrencyType => {
  switch (applicationType) {
    case APPLICATION_TYPES.AIR_BOOKING: {
      const fundsAppliedToken = _.get(state, 'app.airBooking.applyTravelFundsPage.response.fundsAppliedToken');
      const travelFundsBalanceRemaining = getBalanceRemainingWithEBForAirbooking(state).totals.moneyTotal;
      const priceTotal = getPriceTotalWithEBForAirbooking(state);

      return getMoneyTotalForAirBooking(fundsAppliedToken, travelFundsBalanceRemaining, priceTotal);
    }
    case APPLICATION_TYPES.AIR_UPGRADE:
    case APPLICATION_TYPES.AIR_CHANGE: {
      const { totalDueNow, newAmountDue } = _.get(
        state,
        'app.airChange.changePricingPage.response.fareSummary',
        {}
      );
      const purchaseWithPoints = _.get(
        state,
        'app.airChange.changePricingPage.response._meta.purchaseWithPoints',
        {}
      );

      return getMoneyTotalForAirChange(totalDueNow, newAmountDue, purchaseWithPoints);
    }
    case APPLICATION_TYPES.COMPANION: {
      const fundsAppliedToken = _.get(state, 'app.companion.applyTravelFundsPage.response.fundsAppliedToken');
      const travelFundsBalanceRemaining = getBalanceRemainingWithEBForCompanion(state).totals.moneyTotal;
      const priceTotal = getPriceTotalWithEBForCompanion(state);

      return getMoneyTotalForAirBooking(fundsAppliedToken, travelFundsBalanceRemaining, priceTotal);
    }
    case APPLICATION_TYPES.EARLYBIRD: {
      const moneyTotal = _.get(state, 'app.earlyBird.reviewPage.moneyTotalFare');

      return moneyTotal;
    }
    case APPLICATION_TYPES.SAME_DAY: {
      const { amountDue } = getSameDayFareSummary(state) ?? {};

      return amountDue?.tax || amountDue?.fare;
    }

    case APPLICATION_TYPES.UPGRADED_BOARDING: {
      return _.get(state, 'app.upgradedBoarding.upgradedBoardingPage.moneyTotal');
    }
    default: {
      return;
    }
  }
};
