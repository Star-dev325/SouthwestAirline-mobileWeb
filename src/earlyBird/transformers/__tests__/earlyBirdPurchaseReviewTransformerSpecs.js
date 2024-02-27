import { sandbox } from 'sinon';
import _ from 'lodash';
import {
  filterSelectedPassengersFromEarlyBirdBounds,
  generateEarlyBirdPurchaseRequestLink
} from 'src/earlyBird/transformers/earlyBirdPurchaseReviewTransformer';
import * as creditCardHelper from 'src/shared/helpers/creditCardHelper';
import { NEW_CREDIT_CARD_ID, PAY_PAL_CARD_ID, APPLE_PAY_CARD_ID } from 'src/shared/constants/creditCardConstants';
import EarlyBirdDetailFormDataBuilder from 'test/builders/formData/earlyBirdDetailFormDataBuilder';
import { getApplePayCard } from 'test/builders/model/paymentInfoBuilder';
import { UATP, APPLE_PAY } from 'src/shared/constants/creditCardTypes';

const sinon = sandbox.create();

describe('EarlyBirdPurchaseReviewTransformer', () => {
  afterEach(() => {
    sinon.restore();
  });

  context('filterSelectedPassengersFromEarlyBirdBounds', () => {
    it('should remove all passengers that are not selected in the form', () => {
      const bounds = [
        {
          boundType: 'DEPARTING',
          flight: '461/1125',
          departureAirportCode: 'DAL',
          arrivalAirportCode: 'MSP',
          earlyBirdBoundPrice: {
            amount: '15.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          passengers: [
            {
              accountNumber: null,
              canPurchaseEarlyBird: true,
              decisionDescription: null,
              name: 'CANNON LIU',
              _meta: {
                productId: 'productId00'
              }
            },
            {
              accountNumber: null,
              canPurchaseEarlyBird: true,
              decisionDescription: null,
              name: 'TANG LIU',
              _meta: {
                productId: 'productId01'
              }
            }
          ]
        },
        {
          boundType: 'RETURNING',
          flight: '9982',
          departureAirportCode: 'MSP',
          arrivalAirportCode: 'DAL',
          earlyBirdBoundPrice: {
            amount: '15.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          passengers: [
            {
              accountNumber: null,
              canPurchaseEarlyBird: true,
              decisionDescription: null,
              name: 'CANNON LIU',
              _meta: {
                productId: 'productId10'
              }
            },
            {
              accountNumber: null,
              canPurchaseEarlyBird: true,
              decisionDescription: null,
              name: 'TANG LIU',
              _meta: {
                productId: 'productId11'
              }
            }
          ]
        }
      ];

      const formData = new EarlyBirdDetailFormDataBuilder().withOnePaxSelected().build();

      const expectedResult = [
        {
          boundType: 'RETURNING',
          flight: '9982',
          departureAirportCode: 'MSP',
          arrivalAirportCode: 'DAL',
          earlyBirdBoundPrice: {
            amount: '15.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          passengers: [
            {
              accountNumber: null,
              canPurchaseEarlyBird: true,
              decisionDescription: null,
              name: 'CANNON LIU',
              _meta: {
                productId: 'productId10'
              }
            }
          ]
        }
      ];

      expect(filterSelectedPassengersFromEarlyBirdBounds(bounds, formData)).to.deep.equal(expectedResult);
    });
  });

  context('generateEarlyBirdPurchaseRequestLink', () => {
    const earlyBirdPurchaseInfo = {
      moneyTotalFare: 'moneyTotalFare',
      productIds: ['productId1', 'productId2']
    };
    const earlyBirdConfirmationPageLink = {
      body: { firstName: 'c', lastName: 'chen', receiptEmail: 'ATERRIS@EXAMPLE.COM', recordLocator: 'PL4ND6' },
      href: '/v1/mobile-air-booking/page/early-bird/PL4ND6',
      method: 'POST'
    };

    context('saved credit card', () => {
      let expectedLink;

      beforeEach(() => {
        expectedLink = {
          body: {
            payment: {
              moneyTotalFare: 'moneyTotalFare',
              newCreditCard: undefined,
              savedCreditCard: {
                savedCreditCardId: '1-JJKG9',
                securityCode: undefined
              }
            },
            firstName: 'c',
            lastName: 'chen',
            receiptEmail: 'ATERRIS@EXAMPLE.COM',
            recordLocator: 'PL4ND6',
            productIds: ['productId1', 'productId2']
          },
          href: '/v1/mobile-air-booking/page/early-bird/PL4ND6',
          method: 'POST'
        };
      });

      it('should generate request body with a saved credit card and verified cvv (cvv not entered)', () => {
        const formData = {
          paymentInfo: { selectedCardId: '1-JJKG9' }
        };

        expect(
          generateEarlyBirdPurchaseRequestLink({ formData, earlyBirdPurchaseInfo, earlyBirdConfirmationPageLink })
        ).to.deep.equal(expectedLink);
      });

      it('should generate request body with a saved credit card and cvv not verified (cvv entered)', () => {
        const formData = {
          paymentInfo: {
            selectedCardId: '1-JJKG9'
          },
          securityCode: '123'
        };

        _.set(expectedLink, 'body.payment.savedCreditCard.securityCode', '123');
        expect(
          generateEarlyBirdPurchaseRequestLink({ formData, earlyBirdPurchaseInfo, earlyBirdConfirmationPageLink })
        ).to.deep.equal(expectedLink);
      });

      it('should generate request body when formData receiptEmail exists', () => {
        const customEmail = 'whatever@email.com';
        const formData = {
          paymentInfo: { selectedCardId: '1-JJKG9' },
          receiptEmail: customEmail
        };

        const expectedLinkWithCustomEmail = expectedLink;

        expectedLinkWithCustomEmail.body.receiptEmail = customEmail;

        expect(
          generateEarlyBirdPurchaseRequestLink({ formData, earlyBirdPurchaseInfo, earlyBirdConfirmationPageLink })
        ).to.deep.equal(expectedLinkWithCustomEmail);
      });
    });

    it('should generate request body with a new credit card', () => {
      const formData = {
        paymentInfo: { selectedCardId: NEW_CREDIT_CARD_ID }
      };

      sinon.stub(creditCardHelper, 'generateNewCreditCardInfo').withArgs(formData.paymentInfo).returns('newCreditCard');

      expect(
        generateEarlyBirdPurchaseRequestLink({ formData, earlyBirdPurchaseInfo, earlyBirdConfirmationPageLink })
      ).to.deep.equal({
        body: {
          payment: {
            moneyTotalFare: 'moneyTotalFare',
            newCreditCard: 'newCreditCard',
            savedCreditCard: undefined
          },
          firstName: 'c',
          productIds: ['productId1', 'productId2'],
          lastName: 'chen',
          receiptEmail: 'ATERRIS@EXAMPLE.COM',
          recordLocator: 'PL4ND6'
        },
        href: '/v1/mobile-air-booking/page/early-bird/PL4ND6',
        method: 'POST'
      });
    });

    it('should generate request body with paypal card', () => {
      const formData = {
        paymentInfo: { selectedCardId: PAY_PAL_CARD_ID }
      };
      const payPal = {
        token: 'EC-123'
      };

      expect(
        generateEarlyBirdPurchaseRequestLink({ formData, earlyBirdPurchaseInfo, earlyBirdConfirmationPageLink, payPal })
      ).to.deep.equal({
        body: {
          payment: {
            moneyTotalFare: 'moneyTotalFare',
            newCreditCard: undefined,
            savedCreditCard: undefined,
            paypal: {
              paypalToken: payPal.token
            }
          },
          firstName: 'c',
          productIds: ['productId1', 'productId2'],
          lastName: 'chen',
          receiptEmail: 'ATERRIS@EXAMPLE.COM',
          recordLocator: 'PL4ND6'
        },
        href: '/v1/mobile-air-booking/page/early-bird/PL4ND6',
        method: 'POST'
      });
    });

    it('should generate request body with apple pay card', () => {
      const formData = {
        paymentInfo: { selectedCardId: APPLE_PAY_CARD_ID }
      };
      const applePayCard = getApplePayCard();

      const earlyBirdRequest = generateEarlyBirdPurchaseRequestLink({
        formData,
        earlyBirdPurchaseInfo,
        earlyBirdConfirmationPageLink,
        applePayCard
      });
      const applePay = earlyBirdRequest.body.payment.newCreditCard;

      expect(applePay).to.deep.eql({
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
      });
    });
  });
});
