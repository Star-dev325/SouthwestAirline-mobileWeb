import { buildPaymentAnalyticsData } from 'src/shared/analytics/helpers/paymentSelectorHelper';

import {
  getPaymentInfoForUseNewCreditCard,
  getPaymentInfoForRapidRewardCard,
  getPaymentInfoForUseSavedCreditCard
} from 'test/builders/model/paymentInfoBuilder';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';

describe('buildPaymentAnalyticsData', () => {
  const flightConfirmationTravelFunds = {
    fundsApplied: [
      {
        travelFundType: 'TRAVEL_FUNDS',
        appliedAmount: {
          amount: '10.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      {
        travelFundType: 'LUV_VOUCHER',
        appliedAmount: {
          amount: '10.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      {
        travelFundType: 'GIFT_CARD',
        appliedAmount: {
          amount: '10.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      {
        travelFundType: 'GIFT_CARD',
        appliedAmount: {
          amount: '10.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      }
    ]
  };

  it('should generate payment based on paymentInfo with new credit card', () => {
    const paymentInfo = { ...getPaymentInfoForUseNewCreditCard(), saveCreditCard: 'true' };

    const payment = buildPaymentAnalyticsData(paymentInfo);

    expect(payment).to.deep.equal({
      city: 'Brooklyn',
      saveNewCardSelected: true,
      state: 'AS',
      storedCard: false,
      type: 'VISA',
      zipcode: '12312'
    });
  });

  it('should generate payment based on paymentInfo without saved credit card in account', () => {
    const paymentInfo = { ...getPaymentInfoForUseNewCreditCard(), saveCreditCard: 'true' };

    const payment = buildPaymentAnalyticsData(paymentInfo, { primaryCard: null, otherCards: [] });

    expect(payment).to.deep.equal({
      city: 'Brooklyn',
      saveNewCardSelected: true,
      state: 'AS',
      storedCard: false,
      type: 'VISA',
      zipcode: '12312'
    });
  });

  it('should generate payment based on paymentInfo with chase card', () => {
    const paymentInfo = getPaymentInfoForRapidRewardCard();

    const payment = buildPaymentAnalyticsData(paymentInfo);

    expect(payment).to.deep.equal({
      saveNewCardSelected: false,
      storedCard: false,
      type: 'INSTANT_CREDIT_RAPID_REWARDS_VISA'
    });
  });

  it('should generate payment based on paymentInfo with saved credit card', () => {
    const paymentInfo = { ...getPaymentInfoForUseSavedCreditCard(), selectedCardId: '1-ENKS5K' };
    const savedCreditCards = new PaymentSavedCreditCardsBuilder().build();

    const payment = buildPaymentAnalyticsData(paymentInfo, savedCreditCards);

    expect(payment).to.deep.equal({
      saveNewCardSelected: false,
      storedCard: true,
      type: 'DISCOVER'
    });
  });

  it('should generate payment base on paymentInfo with Apple Pay', () => {
    const paymentInfo = { selectedCardId: 'APPLE_PAY_CARD_ID' };
    const savedCreditCards = new PaymentSavedCreditCardsBuilder().build();

    const payment = buildPaymentAnalyticsData(paymentInfo, savedCreditCards);

    expect(payment).to.deep.equal({
      saveNewCardSelected: false,
      storedCard: false,
      type: 'Apple Pay'
    });
  });

  it('should generate payment base on paymentInfo with Uplift', () => {
    const paymentInfo = { selectedCardId: 'UPLIFT_CARD_ID' };
    const savedCreditCards = new PaymentSavedCreditCardsBuilder().build();

    const payment = buildPaymentAnalyticsData(paymentInfo, savedCreditCards);

    expect(payment).to.deep.equal({
      saveNewCardSelected: false,
      storedCard: false,
      type: 'UATP'
    });
  });

  it('should generate payment base on paymentInfo with PayPal', () => {
    const paymentInfo = { selectedCardId: 'PAY_PAL_CARD_ID' };
    const savedCreditCards = new PaymentSavedCreditCardsBuilder().build();

    const payment = buildPaymentAnalyticsData(paymentInfo, savedCreditCards);

    expect(payment).to.deep.equal({
      saveNewCardSelected: false,
      storedCard: false,
      type: 'PAYPAL'
    });
  });

  it('should set payment type according to primary card when payment is empty', () => {
    const paymentInfo = {};
    const savedCreditCards = new PaymentSavedCreditCardsBuilder().build();

    const payment = buildPaymentAnalyticsData(paymentInfo, savedCreditCards);

    expect(payment).to.deep.equal({
      saveNewCardSelected: false,
      storedCard: true,
      type: 'VISA'
    });
  });

  it('should set payment type and fund values with travel funds types when card and funds paying', () => {
    const paymentInfo = { ...getPaymentInfoForUseSavedCreditCard(), selectedCardId: '1-ENKS5K' };
    const savedCreditCards = new PaymentSavedCreditCardsBuilder().build();
    const travelFundsBalanceRemaining = {
      amount: '10.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    };

    const payment = buildPaymentAnalyticsData(
      paymentInfo,
      savedCreditCards,
      flightConfirmationTravelFunds,
      travelFundsBalanceRemaining
    );

    expect(payment).to.deep.equal({
      travelfund: '10.00',
      luvvoucher: '10.00',
      giftcard: '20.00',
      saveNewCardSelected: false,
      storedCard: true,
      type: 'DISCOVER,TRAVEL_FUNDS,LUV_VOUCHER,GIFT_CARD'
    });
  });

  it('should set payment type and fund values with travel funds types when Apple Pay and funds paying', () => {
    const paymentInfo = { selectedCardId: 'APPLE_PAY_CARD_ID' };
    const savedCreditCards = new PaymentSavedCreditCardsBuilder().build();
    const travelFundsBalanceRemaining = {
      amount: '10.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    };

    const payment = buildPaymentAnalyticsData(
      paymentInfo,
      savedCreditCards,
      flightConfirmationTravelFunds,
      travelFundsBalanceRemaining
    );

    expect(payment).to.deep.equal({
      travelfund: '10.00',
      luvvoucher: '10.00',
      giftcard: '20.00',
      saveNewCardSelected: false,
      storedCard: false,
      type: 'Apple Pay,TRAVEL_FUNDS,LUV_VOUCHER,GIFT_CARD'
    });
  });

  it('should set payment type and fund values with travel funds types when Uplift and funds paying', () => {
    const paymentInfo = { selectedCardId: 'UPLIFT_CARD_ID' };
    const savedCreditCards = new PaymentSavedCreditCardsBuilder().build();
    const travelFundsBalanceRemaining = {
      amount: '10.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    };

    const payment = buildPaymentAnalyticsData(
      paymentInfo,
      savedCreditCards,
      flightConfirmationTravelFunds,
      travelFundsBalanceRemaining
    );

    expect(payment).to.deep.equal({
      travelfund: '10.00',
      luvvoucher: '10.00',
      giftcard: '20.00',
      saveNewCardSelected: false,
      storedCard: false,
      type: 'UATP,TRAVEL_FUNDS,LUV_VOUCHER,GIFT_CARD'
    });
  });

  it('should set payment type and fund values with travel funds types when card and funds paying and paymentInfo is not available', () => {
    const paymentInfo = {};
    const savedCreditCards = new PaymentSavedCreditCardsBuilder().build();
    const travelFundsBalanceRemaining = {
      amount: '10.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    };

    const payment = buildPaymentAnalyticsData(
      paymentInfo,
      savedCreditCards,
      flightConfirmationTravelFunds,
      travelFundsBalanceRemaining
    );

    expect(payment).to.deep.equal({
      travelfund: '10.00',
      luvvoucher: '10.00',
      giftcard: '20.00',
      saveNewCardSelected: false,
      type: 'VISA,TRAVEL_FUNDS,LUV_VOUCHER,GIFT_CARD'
    });
  });

  it('should set payment type and fund values with travel funds types when funds are paying for entire purchase', () => {
    const paymentInfo = {};
    const savedCreditCards = new PaymentSavedCreditCardsBuilder().build();
    const travelFundsBalanceRemaining = {
      amount: '0.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    };

    const payment = buildPaymentAnalyticsData(
      paymentInfo,
      savedCreditCards,
      flightConfirmationTravelFunds,
      travelFundsBalanceRemaining
    );

    expect(payment).to.deep.equal({
      travelfund: '10.00',
      luvvoucher: '10.00',
      giftcard: '20.00',
      saveNewCardSelected: false,
      type: 'TRAVEL_FUNDS,LUV_VOUCHER,GIFT_CARD'
    });
  });
});
