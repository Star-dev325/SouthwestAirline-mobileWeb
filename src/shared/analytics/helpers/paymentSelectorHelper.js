import _ from 'lodash';

import { getCardType } from 'src/shared/helpers/creditCardHelper';

import {
  NEW_CREDIT_CARD_ID,
  RAPID_REWARDS_VISA_ID,
  PAY_PAL_CARD_ID,
  APPLE_PAY_CARD_ID,
  UPLIFT_CARD_ID
} from 'src/shared/constants/creditCardConstants';
import { INSTANT_CREDIT_RAPID_REWARDS_VISA, PAYPAL, APPLE_PAY, UATP } from 'src/shared/constants/creditCardTypes';
import { addCurrency } from 'src/shared/api/helpers/currencyHelper';
import { isCurrencyAmountZero } from 'src/shared/helpers/travelFundsHelper';

export const buildPaymentAnalyticsData = (
  paymentInfo,
  savedCreditCards,
  flightConfirmationPage,
  travelFundsBalanceRemaining
) => {
  let typeOfCreditCard;
  const { city, stateProvinceRegion, zipOrPostalCode, saveCreditCard, cardNumber } = paymentInfo;
  const fundsApplied = _.get(flightConfirmationPage, 'fundsApplied');
  let selectedCardId = _.get(paymentInfo, 'selectedCardId');
  const selectedSavedCreditCard =
    _.find(_.chain(savedCreditCards).values().flatten().value(), { savedCreditCardId: selectedCardId }) || {};
  const creditCardType = getCardType(cardNumber);
  const primaryCardType = _.get(savedCreditCards, 'primaryCard.type');
  const rtfs = [];
  const luvVouchers = [];
  const giftCards = [];
  const isApplePay = _.isEqual(selectedCardId, APPLE_PAY_CARD_ID);
  const isUplift = _.isEqual(selectedCardId, UPLIFT_CARD_ID);

  if (!_.isEmpty(fundsApplied)) {
    let fundTypes = [];

    if (!_.isEmpty(paymentInfo) && !isCurrencyAmountZero(travelFundsBalanceRemaining)) {
      if (_.isEmpty(creditCardType) && selectedSavedCreditCard.type) {
        fundTypes = [selectedSavedCreditCard.type];
      } else if (isApplePay) {
        fundTypes = [APPLE_PAY.shortName];
      } else if (isUplift) {
        fundTypes = [UATP.shortName];
      } else if (_.isEmpty(creditCardType)) {
        fundTypes = [INSTANT_CREDIT_RAPID_REWARDS_VISA.key];
      } else {
        fundTypes = [creditCardType];
      }
    } else if (_.isEmpty(paymentInfo) && !isCurrencyAmountZero(travelFundsBalanceRemaining)) {
      fundTypes = [primaryCardType];
    }

    _.forEach(fundsApplied, (fund) => {
      const fundType = _.get(fund, 'travelFundType');
      const appliedAmount = _.get(fund, 'appliedAmount');

      !_.includes(fundTypes, fundType) && fundTypes.push(fundType);
      fundType === 'TRAVEL_FUNDS' && rtfs.push(appliedAmount);
      fundType === 'LUV_VOUCHER' && luvVouchers.push(appliedAmount);
      fundType === 'GIFT_CARD' && giftCards.push(appliedAmount);

      typeOfCreditCard = fundTypes.join(',');
    });
  } else {
    if (_.isEmpty(paymentInfo)) {
      typeOfCreditCard = isApplePay ? APPLE_PAY.shortName : primaryCardType;
      typeOfCreditCard = isUplift ? UATP.shortName : typeOfCreditCard;
      selectedCardId = _.get(savedCreditCards, 'primaryCard.savedCreditCardId');
    } else {
      typeOfCreditCard = _.isEmpty(creditCardType)
        ? selectedSavedCreditCard.type || INSTANT_CREDIT_RAPID_REWARDS_VISA.key
        : creditCardType;

      typeOfCreditCard = isApplePay ? APPLE_PAY.shortName : typeOfCreditCard;
      typeOfCreditCard = isUplift ? UATP.shortName : typeOfCreditCard;
    }
  }

  const type = selectedCardId === PAY_PAL_CARD_ID ? PAYPAL.key : typeOfCreditCard;

  return _.omitBy(
    {
      city,
      state: stateProvinceRegion,
      zipcode: zipOrPostalCode,
      saveNewCardSelected: _.toBoolean(saveCreditCard) || false,
      storedCard:
        selectedCardId &&
        !isCurrencyAmountZero(travelFundsBalanceRemaining) &&
        !_.includes(
          [NEW_CREDIT_CARD_ID, RAPID_REWARDS_VISA_ID, PAY_PAL_CARD_ID, APPLE_PAY_CARD_ID, UPLIFT_CARD_ID],
          selectedCardId
        ),
      type,
      travelfund:
        rtfs.length > 1
          ? _.get(addCurrency(...rtfs), 'amount')
          : !_.isEmpty(rtfs[0])
            ? _.get(rtfs[0], 'amount')
            : undefined,
      luvvoucher:
        luvVouchers.length > 1
          ? _.get(addCurrency(...luvVouchers), 'amount')
          : !_.isEmpty(luvVouchers[0])
            ? _.get(luvVouchers[0], 'amount')
            : undefined,
      giftcard:
        giftCards.length > 1
          ? _.get(addCurrency(...giftCards), 'amount')
          : !_.isEmpty(giftCards[0])
            ? _.get(giftCards[0], 'amount')
            : undefined
    },
    _.isUndefined
  );
};
