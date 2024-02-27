import { formatCreditCardPresentInfo } from 'src/shared/helpers/creditCardInfoFormatter';
import {
  getPaymentInfoForUseNewCreditCard,
  getPaymentInfoForRapidRewardCard,
  getPaymentInfoForPayPalCard,
  getPaymentInfoForApplePayCard,
  getPaymentInfoForUpliftCard
} from 'test/builders/model/paymentInfoBuilder';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';

describe('creditCardInfoFormatter', () => {
  let paymentInfo;
  let savedCreditCards;

  context('formatCreditCardPresentInfo', () => {
    context('when use saved credit card', () => {
      beforeEach(() => {
        paymentInfo = {
          selectedCardId: '1-ENKS5K'
        };

        savedCreditCards = new PaymentSavedCreditCardsBuilder().build();
      });

      it('should return empty string if no card is found', () => {
        paymentInfo = { selectedCardId: 'INVALID_CARD_ID' };

        const result = formatCreditCardPresentInfo(paymentInfo);

        expect(result).to.equal('');
      });

      it('should return original credit card object', () => {
        const result = formatCreditCardPresentInfo(paymentInfo, savedCreditCards);

        expect(result).to.deep.equal({
          savedCreditCardId: '1-ENKS5K',
          type: 'DISCOVER',
          name: 'VISA 9999',
          lastFourDigits: '9999',
          isExpired: false,
          cvvVerified: true,
          _links: {
            view: {
              href: '/v1/mobile-misc/page/air-booking/payment-options/1-ENKS5K',
              method: 'GET'
            }
          }
        });
      });

      it('should return empty string when payment info is empty', () => {
        const result = formatCreditCardPresentInfo({}, savedCreditCards);

        expect(result).to.be.empty;
      });

      it('should return empty string when payment info is incomplete', () => {
        const result = formatCreditCardPresentInfo({ savedCreditCardId: 'NEW_CREDIT_CARD_ID' }, savedCreditCards);

        expect(result).to.be.empty;
      });
    });

    context('when use new credit card', () => {
      beforeEach(() => {
        paymentInfo = getPaymentInfoForUseNewCreditCard();
      });

      it('should transform payment info into a credit card object', () => {
        const result = formatCreditCardPresentInfo(paymentInfo);

        expect(result).to.deep.equal({
          savedCreditCardId: 'NEW_CREDIT_CARD_ID',
          type: 'VISA',
          name: 'Visa',
          lastFourDigits: '9012',
          isExpired: false
        });
      });

      it('should return empty string when payment info is empty', () => {
        const result = formatCreditCardPresentInfo({});

        expect(result).to.be.empty;
      });
    });

    context('when use rapid reward card', () => {
      it('should get rapid reward card description by payment info when using rapid reward card', () => {
        paymentInfo = getPaymentInfoForRapidRewardCard();

        const result = formatCreditCardPresentInfo(paymentInfo);

        expect(result).to.deep.equal({
          savedCreditCardId: 'RAPID_REWARDS_VISA_ID',
          name: 'Rapid Rewards® Visa',
          type: 'RAPID_REWARDS_VISA'
        });
      });
    });

    context('when use paypal card', () => {
      it('should get paypal card description by payment info when using paypal card', () => {
        paymentInfo = getPaymentInfoForPayPalCard();

        const result = formatCreditCardPresentInfo(paymentInfo);

        expect(result).to.deep.equal({
          savedCreditCardId: 'PAY_PAL_CARD_ID',
          name: 'PayPal',
          type: 'PAYPAL'
        });
      });
    });

    context('when use apple pay card', () => {
      it('should get apple pay card description by payment info when using apple pay card', () => {
        paymentInfo = getPaymentInfoForApplePayCard();

        const result = formatCreditCardPresentInfo(paymentInfo);

        expect(result).to.deep.equal({
          savedCreditCardId: 'APPLE_PAY_CARD_ID',
          name: 'Apple Pay',
          type: 'APPLE_PAY'
        });
      });
    });

    context('when use ghost card', () => {
      it('should get original ghost card object when using ghost card', () => {
        const paymentInfo = {
          selectedCardId: 'First Ghost Card'
        };
        const savedCreditCards = {
          ghostCards: [
            {
              savedCreditCardId: 'First Ghost Card'
            }
          ]
        };

        const result = formatCreditCardPresentInfo(paymentInfo, savedCreditCards);

        expect(result).to.deep.equal({
          savedCreditCardId: 'First Ghost Card'
        });
      });
    });

    context('when use uplift', () => {
      it('should get uplift description by payment info when using uplift', () => {
        paymentInfo = getPaymentInfoForUpliftCard();

        const result = formatCreditCardPresentInfo(paymentInfo);

        expect(result).to.deep.equal({
          savedCreditCardId: 'UPLIFT_CARD_ID',
          name: 'Pay Monthly',
          type: 'UPLIFT'
        });
      });
    });
  });
});
