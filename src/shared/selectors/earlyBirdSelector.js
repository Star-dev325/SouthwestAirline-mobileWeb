// @flow

import _ from 'lodash';
import numeral from 'numeral';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { addCurrency } from 'src/shared/api/helpers/currencyHelper';
import { AIRBOOKING_PURCHASE_SUMMARY_FORM, COMPANION_PURCHASE_SUMMARY_FORM } from 'src/shared/constants/formIds';

import type { EarlyBirdEligibility, EarlyBirdInPathBound } from 'src/airBooking/flow-typed/airBooking.types';
import type { TotalsType, CurrencyType } from 'src/shared/flow-typed/shared.types';
import { convertStringToInt } from 'src/shared/helpers/numberHelper';
import { transformToUnitPrice } from 'src/airBooking/transformers/transformToEarlyBirdPriceDetails';

const defaultCurrencyType = { amount: '0', currencySymbol: '$', currencyCode: 'USD' };

export const hasAnyEligibleEarlyBirdProducts = (earlyBirdEligibility: EarlyBirdEligibility) =>
  _.some(_.get(earlyBirdEligibility, 'bounds', []), 'isEligible');

const getAirbookingIsEarlyBirdInPathRadioButtonChecked = (state: *) =>
  (_.get(state, 'app.toggles.EARLY_BIRD_AB_TESTING', false)
    ? _.get(state, 'app.airBooking.earlyBirdSelected')
    : _.get(state, `app.formData.${AIRBOOKING_PURCHASE_SUMMARY_FORM}.data.isEarlyBirdInPathRadioButtonChecked`));
const getAirbookingPriceTotal = (state: *) =>
  _.get(state, 'app.airBooking.flightPricingPage.response.flightPricingPage.totals');
const getAirbookingEarlyBirdEligibility = (state: *) => _.get(state, 'app.airBooking.earlyBirdEligibility');
const getAirbookingBalanceRemainingWithFunds = (state: *) => ({
  moneyTotal: _.get(state, 'app.airBooking.applyTravelFundsPage.response.balanceRemaining', defaultCurrencyType),
  pointsTotal: null,
  adultFare: _.get(state, 'app.airBooking.flightPricingPage.response.flightPricingPage.totals.adultFare'),
  infantFare: _.get(state, 'app.airBooking.flightPricingPage.response.flightPricingPage.totals.infantFare')
});
const getAirbookingFundsApplied = (state: *) =>
  _.get(state, 'app.airBooking.applyTravelFundsPage.response.totalFunds', defaultCurrencyType);

const getCompanionIsEarlyBirdInPathRadioButtonChecked = (state: *) =>
  _.get(state, `app.formData.${COMPANION_PURCHASE_SUMMARY_FORM}.data.isEarlyBirdInPathRadioButtonChecked`);
const getCompanionPricingTotal = (state: *) => _.get(state, 'app.companion.flightPricingPage.totals', {});
const getCompanionEarlyBirdEligibility = (state: *) => _.get(state, 'app.companion.earlyBirdEligibility');
const getCompanionBalanceRemainingWithFunds = (state: *) => ({
  moneyTotal: _.get(state, 'app.companion.applyTravelFundsPage.response.balanceRemaining', defaultCurrencyType),
  pointsTotal: null,
  adultFare: _.get(state, 'app.companion.flightPricingPage.totals.adultFare')
});
const getCompanionFundsApplied = (state: *) =>
  _.get(state, 'app.companion.applyTravelFundsPage.response.totalFunds', defaultCurrencyType);

const getEarlyBirdPassengerCount = (bound: EarlyBirdInPathBound, paxType: string): number =>
  _.get(bound, `_meta.products.${paxType}.passengerReference.length`, 0);

const calculatePassengerEarlyBirdPrice = (
  earlyBirdEligibility: EarlyBirdEligibility,
  paxType: string,
  priceTotal: TotalsType
) => {
  const unitPriceOutBound = transformToUnitPrice(_.get(earlyBirdEligibility, 'bounds[0]'));
  const unitPriceInBound = transformToUnitPrice(_.get(earlyBirdEligibility, 'bounds[1]'));
  const perPassengerPrice = addCurrency(unitPriceOutBound, unitPriceInBound);
  const passengerOutBoundCount = getEarlyBirdPassengerCount(_.get(earlyBirdEligibility, 'bounds[0]'), paxType);
  const passengerInBoundCount = getEarlyBirdPassengerCount(_.get(earlyBirdEligibility, 'bounds[1]'), paxType);
  const earlyBirdAmount = numeral(passengerOutBoundCount)
    .multiply(_.get(unitPriceOutBound, 'amount', 0))
    .add(numeral(passengerInBoundCount).multiply(_.get(unitPriceInBound, 'amount', 0)).value())
    .format('0.00');

  const productsCountByPaxType = earlyBirdEligibility[`${paxType}ProductsCount`];
  const combinedPaxTypeTotal = _.reduce(
    ['adultFare', 'infantFare'],
    (paxTypeTotal, paxTypeValue) => {
      const passengerTypeFare = priceTotal[paxTypeValue] || '0.00';
      const paxTypeAmount = _.get(passengerTypeFare, 'paxTypeTotal.moneyTotal.amount');

      return numeral(paxTypeAmount).add(paxTypeTotal).value();
    },
    0
  );

  const combinedPaxTypeTotalWithEarlyBird = numeral(combinedPaxTypeTotal).add(earlyBirdAmount).value() || '0.00';

  return paxType
    ? {
      paxTypeTotal: { moneyTotal: { amount: numeral(combinedPaxTypeTotalWithEarlyBird).format('0,0.00') } },
      earlyBirdPrice: {
        unitPrice: perPassengerPrice,
        total: { ...perPassengerPrice, amount: earlyBirdAmount },
        purchasedCount: convertStringToInt(productsCountByPaxType)
      }
    }
    : null;
};

export const getPriceTotalWithEB = (...priceTotalGetters: *) =>
  createSelector(
    [...priceTotalGetters],
    (isAddEarlyBird: boolean, priceTotal: TotalsType, earlyBirdEligibility: EarlyBirdEligibility) => {
      if (isAddEarlyBird && hasAnyEligibleEarlyBirdProducts(earlyBirdEligibility)) {
        const adultFare = calculatePassengerEarlyBirdPrice(earlyBirdEligibility, 'adult', priceTotal);

        const moneyTotal = addCurrency(..._.map([adultFare], 'paxTypeTotal.moneyTotal'));

        return _.merge(
          {},
          { totals: priceTotal },
          {
            totals: {
              moneyTotal,
              adultFare
            }
          }
        );
      }

      return { totals: priceTotal };
    }
  );

export const getBalanceRemainingWithEB = (...priceTotalGetters: *) =>
  createSelector(
    [...priceTotalGetters],
    (
      isAddEarlyBird: boolean,
      balanceRemainingPriceTotal: TotalsType,
      earlyBirdEligibility: EarlyBirdEligibility,
      fundsAppliedToPurchase: CurrencyType
    ) => {
      if (isAddEarlyBird && hasAnyEligibleEarlyBirdProducts(earlyBirdEligibility)) {
        if (!fundsAppliedToPurchase) return;

        const adultFare = calculatePassengerEarlyBirdPrice(earlyBirdEligibility, 'adult', balanceRemainingPriceTotal);

        const totalBeforePayment = addCurrency(..._.map([adultFare], 'paxTypeTotal.moneyTotal'));
        const moneyTotal = _.merge({}, _.pick(fundsAppliedToPurchase, ['currencyCode', 'currencySymbol']), {
          amount: numeral(
            _.subtract(
              numeral(_.get(totalBeforePayment, 'amount')).value(),
              numeral(_.get(fundsAppliedToPurchase, 'amount')).value()
            )
          ).format('0,000.00')
        });

        return _.merge(
          {},
          { totals: balanceRemainingPriceTotal },
          {
            totals: {
              moneyTotal,
              adultFare
            }
          }
        );
      }

      return { totals: balanceRemainingPriceTotal };
    }
  );

export function shouldShowEarlyBirdInPath(earlyBirdEligibilityGetter: *) {
  return createSelector([earlyBirdEligibilityGetter], (earlyBirdEligibility: EarlyBirdEligibility) =>
    hasAnyEligibleEarlyBirdProducts(earlyBirdEligibility)
  );
}

export const getPriceTotalWithEBForAirbooking = getPriceTotalWithEB(
  getAirbookingIsEarlyBirdInPathRadioButtonChecked,
  getAirbookingPriceTotal,
  getAirbookingEarlyBirdEligibility
);

export const getBalanceRemainingWithEBForAirbooking = getBalanceRemainingWithEB(
  getAirbookingIsEarlyBirdInPathRadioButtonChecked,
  getAirbookingBalanceRemainingWithFunds,
  getAirbookingEarlyBirdEligibility,
  getAirbookingFundsApplied
);

export const getPriceTotalWithEBForCompanion = getPriceTotalWithEB(
  getCompanionIsEarlyBirdInPathRadioButtonChecked,
  getCompanionPricingTotal,
  getCompanionEarlyBirdEligibility
);

export const getBalanceRemainingWithEBForCompanion = getBalanceRemainingWithEB(
  getCompanionIsEarlyBirdInPathRadioButtonChecked,
  getCompanionBalanceRemainingWithFunds,
  getCompanionEarlyBirdEligibility,
  getCompanionFundsApplied
);

export const shouldShowEarlyBirdInPathForAirbooking = shouldShowEarlyBirdInPath(getAirbookingEarlyBirdEligibility);

export const shouldShowEarlyBirdInPathForCompanion = shouldShowEarlyBirdInPath(getCompanionEarlyBirdEligibility);
