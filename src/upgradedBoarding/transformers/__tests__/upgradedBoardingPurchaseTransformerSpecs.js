import _ from 'lodash';
import { sandbox } from 'sinon';
import { generateUpgradedBoardingRequestLink } from 'src/upgradedBoarding/transformers/upgradedBoardingPurchaseTransformer';
import * as creditCardHelper from 'src/shared/helpers/creditCardHelper';
import { APPLE_PAY_CARD_ID, NEW_CREDIT_CARD_ID, PAY_PAL_CARD_ID } from 'src/shared/constants/creditCardConstants';
import UpgradedBoardingPurchaseFormBuilder from 'test/builders/model/upgradedBoardingPurchaseFormBuilder';
import {
  getApplePayCard,
  getNativeApplePayCard,
  getPaymentInfoForUseNewCreditCard
} from 'test/builders/model/paymentInfoBuilder';
import { APPLE_PAY, UATP } from 'src/shared/constants/creditCardTypes';

const sinon = sandbox.create();
const receiptEmail = 'test@wnco.com';
const passengerSearchToken = 'mockPassengerSearchToken';
const productReferenceToken = 'mockProductReferenceToken';
const productIds = ['productId1', 'productId2'];
const href = '/v1/mobile-air-operations/page/upgraded-boarding/A12345/confirmation';
const xhref = '/v1/mobile-air-operations/page/upgraded-boarding/A12345/x-confirmation';
const method = 'POST';

describe('UpgradedBoardingPurchaseTransformer', () => {
  describe('generateUpgradedBoardingRequestLink', () => {
    const formData = {
      productId1: true,
      productId2: true,
      productId3: false,
      receiptEmail,
      paymentInfo: { selectedCardId: NEW_CREDIT_CARD_ID }
    };
    const upgradedBoardingConfirmationPageLink = new UpgradedBoardingPurchaseFormBuilder().build()
      .upgradedBoardingPurchasePage._links.upgradedBoardingConfirmationPage;
    const moneyTotal = {
      amount: '0.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    };

    describe('newCreditCard', () => {
      it('should generate correct upgraded boarding request link', () => {
        sinon
          .stub(creditCardHelper, 'generateNewCreditCardInfo')
          .withArgs(formData.paymentInfo)
          .returns('newCreditCard');
        
        expect(
          generateUpgradedBoardingRequestLink({ formData, upgradedBoardingConfirmationPageLink, moneyTotal })
        ).to.deep.equal({
          body: {
            payment: { moneyTotalFare: moneyTotal, newCreditCard: 'newCreditCard' },
            receiptEmail,
            productIds,
            passengerSearchToken,
            productReferenceToken
          },
          href,
          xhref,
          method
        });
        sinon.restore();
      });
    });

    describe('PayPal', () => {
      const payPal = { token: 'payPalToken' };
      const payPalFormData = { ...formData, paymentInfo: { selectedCardId: PAY_PAL_CARD_ID } };

      it('should generate correct upgraded boarding request link', () => {
        expect(
          generateUpgradedBoardingRequestLink({
            formData: payPalFormData,
            upgradedBoardingConfirmationPageLink,
            moneyTotal,
            payPal
          })
        ).to.deep.equal({
          body: {
            payment: {
              moneyTotalFare: moneyTotal,
              paypal: {
                paypalToken: 'payPalToken'
              }
            },
            receiptEmail,
            productIds,
            passengerSearchToken,
            productReferenceToken
          },
          href,
          xhref,
          method
        });
      });
    });

    describe('Apple Pay', () => {
      const applePayFormData = { ...formData, paymentInfo: { selectedCardId: APPLE_PAY_CARD_ID } };
      const newCreditCard = getPaymentInfoForUseNewCreditCard();

      it('should merge purchase request to payment info if NativeApplePay', () => {
        const applePayCard = getNativeApplePayCard();

        expect(
          generateUpgradedBoardingRequestLink({
            formData: applePayFormData,
            upgradedBoardingConfirmationPageLink,
            moneyTotal,
            applePayCard
          })
        ).to.deep.equal({
          body: {
            payment: {
              moneyTotalFare: moneyTotal,
              newCreditCard
            },
            productIds,
            passengerSearchToken,
            productReferenceToken,
            receiptEmail
          },

          href,
          xhref,
          method
        });
      });

      it('should generate correct upgraded boarding request link', () => {
        const applePayCard = getApplePayCard();

        expect(
          generateUpgradedBoardingRequestLink({
            formData: applePayFormData,
            upgradedBoardingConfirmationPageLink,
            moneyTotal,
            applePayCard
          })
        ).to.deep.equal({
          body: {
            payment: {
              moneyTotalFare: moneyTotal,
              newCreditCard: {
                billingContactInfo: {
                  address: {
                    addressLine1: '1234 Test Ln',
                    addressLine2: '',
                    city: 'Dallas',
                    isoCountryCode: 'US',
                    stateProvinceRegion: 'TX',
                    zipOrPostalCode: '12312'
                  },
                  firstName: 'First',
                  lastName: 'Last'
                },
                cardNumber: '123456',
                creditCardType: UATP.key,
                digitalPaymentType: APPLE_PAY.key,
                digitalTransactionId: '123456',
                expiration: '2020-01'
              }
            },
            passengerSearchToken,
            productIds,
            productReferenceToken,
            receiptEmail
          },
          href,
          method,
          xhref
        });
      });

      it('should omit the receiptEmail when empty string', () => {
        const applePayCard = getApplePayCard();
        const applePayCardNoReceiptEmail = { ...applePayCard, formData: { receiptEmail: '' } };
        const applePayFormDataNoReceiptEmail = { ...applePayFormData, receiptEmail: '' };

        expect(
          generateUpgradedBoardingRequestLink({
            formData: applePayFormDataNoReceiptEmail,
            upgradedBoardingConfirmationPageLink,
            moneyTotal,
            applePayCard: applePayCardNoReceiptEmail
          })
        ).to.deep.equal({
          body: {
            payment: {
              moneyTotalFare: moneyTotal,
              newCreditCard: {
                billingContactInfo: {
                  address: {
                    addressLine1: '1234 Test Ln',
                    addressLine2: '',
                    city: 'Dallas',  
                    isoCountryCode: 'US',
                    stateProvinceRegion: 'TX',
                    zipOrPostalCode: '12312'
                  },
                  firstName: 'First',
                  lastName: 'Last'
                },
                cardNumber: '123456',
                creditCardType: UATP.key,
                digitalPaymentType: APPLE_PAY.key,
                digitalTransactionId: '123456',
                expiration: '2020-01'
              }
            },
            passengerSearchToken,
            productIds,
            productReferenceToken
          },
          href,
          method,
          xhref
        });
      });

      it('should omit the receiptEmail when undefined', () => {
        const applePayCard = getApplePayCard();
        const applePayCardNoReceiptEmail = { ...applePayCard, formData: {} };
        const applePayFormDataNoReceiptEmail = _.omit(applePayFormData, 'receiptEmail');

        expect(
          generateUpgradedBoardingRequestLink({
            formData: applePayFormDataNoReceiptEmail,
            upgradedBoardingConfirmationPageLink,
            moneyTotal,
            applePayCard: applePayCardNoReceiptEmail
          })
        ).to.deep.equal({
          body: {
            payment: {
              moneyTotalFare: moneyTotal,
              newCreditCard: {
                billingContactInfo: {
                  address: {
                    addressLine1: '1234 Test Ln',
                    addressLine2: '',
                    city: 'Dallas',
                    isoCountryCode: 'US',
                    stateProvinceRegion: 'TX',
                    zipOrPostalCode: '12312'
                  },
                  firstName: 'First',
                  lastName: 'Last'
                },
                cardNumber: '123456',
                creditCardType: UATP.key,
                digitalPaymentType: APPLE_PAY.key,
                digitalTransactionId: '123456',
                expiration: '2020-01'
              }
            },
            passengerSearchToken,
            productIds,
            productReferenceToken
          },
          href,
          method,
          xhref
        });
      });
    });
  });
});
