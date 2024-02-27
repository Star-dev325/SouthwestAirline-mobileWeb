import { generateSameDayConfirmationRequest } from 'src/sameDay/transformers/sameDayPurchaseRequestTransformer';
import SameDayPricingResponseBuilder from 'test/builders/apiResponse/sameDayPricingBuilder';

describe('sameDayPurchaseRequestTransformer', () => {
  describe('generateSameDayConfirmationRequest', () => {
    it('should generate PayPal same day request', () => {
      const expectedResponse = {
        body: {
          boundSelection: 'bound2',
          payment: {
            moneyTotalFare: {
              amount: '5.06',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            paypal: {
              paypalToken: '1234567890'
            }
          },
          productId: 'productId2',
          recipientEmail: 'test@test.com',
          sameDayToken: 'token'
        },
        href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
        labelText: 'make your changes',
        method: 'PUT',
        xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
      };
      const formData = {
        paymentInfo: {
          addressLine1: '1221 test Dr',
          addressLine2: '',
          cardNumber: '4012999999999999',
          city: 'McKinney',
          expiration: '2026-12',
          isoCountryCode: 'US',
          nameOnCard: 'Juan Perez',
          phoneCountryCode: 'US',
          phoneNumber: '345-345-3543',
          securityCode: '123',
          selectedCardId: 'PAY_PAL_CARD_ID',
          stateProvinceRegion: 'TX',
          zipOrPostalCode: '75071'
        },
        recipientEmail: 'test@test.com',
        payPal: {
          token: '1234567890'
        }
      };

      const sameDayConfirmationRequest = {
        body: {
          sameDayToken: 'token',
          boundSelection: 'bound2',
          productId: 'productId2'
        },
        href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
        labelText: 'make your changes',
        method: 'PUT',
        xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
      };
      const { sameDayPricingPage } = new SameDayPricingResponseBuilder().withAmountDueAndTax().build();

      const response = generateSameDayConfirmationRequest(
        formData,
        sameDayConfirmationRequest,
        sameDayPricingPage.fareSummary.amountDue
      );

      expect(response).toEqual(expectedResponse);
    });

    it('should generate UatpCard ApplePay same day request', () => {
      const expectedResponse = {
        body: {
          boundSelection: 'bound2',
          payment: {
            moneyTotalFare: {
              amount: '5.06',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            newCreditCard: {
              billingContactInfo: {
                address: {
                  addressLine1: '1221 test Dr',
                  addressLine2: null,
                  city: 'McKinney',
                  isoCountryCode: 'US',
                  stateProvinceRegion: 'TX',
                  zipOrPostalCode: '75071'
                },
                firstName: 'Juan',
                lastName: 'Perez'
              },
              cardNumber: '4012999999999999',
              creditCardType: 'UATP',
              digitalPaymentType: 'APPLE_PAY',
              digitalTransactionId: '1234567890',
              expiration: '2026-12'
            }
          },
          productId: 'productId2',
          recipientEmail: 'test@test.com',
          sameDayToken: 'token'
        },
        href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
        labelText: 'make your changes',
        method: 'PUT',
        xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
      };
      const formData = {
        paymentInfo: {
          addressLine1: '1221 test Dr',
          addressLine2: '',
          cardNumber: '4012999999999999',
          city: 'McKinney',
          expiration: '2026-12',
          isoCountryCode: 'US',
          nameOnCard: 'Juan Perez',
          phoneCountryCode: 'US',
          phoneNumber: '345-345-3543',
          securityCode: '123',
          selectedCardId: 'APPLE_PAY_CARD_ID',
          stateProvinceRegion: 'TX',
          zipOrPostalCode: '75071'
        },
        recipientEmail: 'test@test.com',
        applePayCard: {
          isNativeApplePay: false,
          token: {
            digitalTransactionId: '1234567890',
            expirationYear: '2026',
            expirationMonth: '12',
            number: '4012999999999999'
          },
          billingAddress: {
            addressLine1: '1221 test Dr',
            addressLine2: null,
            city: 'McKinney',
            isoCountryCode: 'US',
            stateProvinceRegion: 'TX',
            zipOrPostalCode: '75071',
            firstName: 'Juan',
            lastName: 'Perez'
          }
        }
      };

      const sameDayConfirmationRequest = {
        body: {
          sameDayToken: 'token',
          boundSelection: 'bound2',
          productId: 'productId2'
        },
        href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
        labelText: 'make your changes',
        method: 'PUT',
        xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
      };
      const { sameDayPricingPage } = new SameDayPricingResponseBuilder().withAmountDueAndTax().build();

      const response = generateSameDayConfirmationRequest(
        formData,
        sameDayConfirmationRequest,
        sameDayPricingPage.fareSummary.amountDue
      );

      expect(response).toEqual(expectedResponse);
    });

    it('should generate NativeApplePay same day request', () => {
      const expectedResponse = {
        body: {
          boundSelection: 'bound2',
          payment: {
            moneyTotalFare: {
              amount: '5.06',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            newCreditCard: {
              billingContactInfo: {
                address: {
                  addressLine1: '1221 test Dr',
                  addressLine2: null,
                  city: 'McKinney',
                  isoCountryCode: 'US',
                  stateProvinceRegion: 'TX',
                  zipOrPostalCode: '75071'
                },
                firstName: 'Juan',
                lastName: 'Perez',
                phoneNumber: '3453453543'
              },
              cardNumber: '4012999999999999',
              creditCardType: 'VISA',
              expiration: '2026-12',
              intentToStore: false,
              isPrimary: undefined,
              securityCode: '123'
            }
          },
          productId: 'productId2',
          recipientEmail: 'test@test.com',
          sameDayToken: 'token'
        },
        href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
        labelText: 'make your changes',
        method: 'PUT',
        xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
      };
      const formData = {
        paymentInfo: {
          addressLine1: '1221 test Dr',
          addressLine2: '',
          cardNumber: '4012999999999999',
          city: 'McKinney',
          expiration: '2026-12',
          isoCountryCode: 'US',
          nameOnCard: 'Juan Perez',
          phoneCountryCode: 'US',
          phoneNumber: '345-345-3543',
          securityCode: '123',
          selectedCardId: 'APPLE_PAY_CARD_ID',
          stateProvinceRegion: 'TX',
          zipOrPostalCode: '75071'
        },
        recipientEmail: 'test@test.com',
        applePayCard: {
          isNativeApplePay: true,
          purchaseRequest: {
            newCreditCard: {
              billingContactInfo: {
                address: {
                  addressLine1: '1221 test Dr',
                  addressLine2: null,
                  city: 'McKinney',
                  isoCountryCode: 'US',
                  stateProvinceRegion: 'TX',
                  zipOrPostalCode: '75071'
                },
                firstName: 'Juan',
                lastName: 'Perez',
                phoneNumber: '3453453543'
              },
              cardNumber: '4012999999999999',
              creditCardType: 'VISA',
              expiration: '2026-12',
              intentToStore: false,
              isPrimary: undefined,
              securityCode: '123'
            }
          }
        }
      };

      const sameDayConfirmationRequest = {
        body: {
          sameDayToken: 'token',
          boundSelection: 'bound2',
          productId: 'productId2'
        },
        href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
        labelText: 'make your changes',
        method: 'PUT',
        xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
      };
      const { sameDayPricingPage } = new SameDayPricingResponseBuilder().withAmountDueAndTax().build();

      const response = generateSameDayConfirmationRequest(
        formData,
        sameDayConfirmationRequest,
        sameDayPricingPage.fareSummary.amountDue
      );

      expect(response).toEqual(expectedResponse);
    });

    it('should render with new credit card', () => {
      const expectedResponse = {
        body: {
          boundSelection: 'bound2',
          payment: {
            moneyTotalFare: {
              amount: '5.06',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            newCreditCard: {
              billingContactInfo: {
                address: {
                  addressLine1: '1221 test Dr',
                  addressLine2: null,
                  city: 'McKinney',
                  isoCountryCode: 'US',
                  stateProvinceRegion: 'TX',
                  zipOrPostalCode: '75071'
                },
                firstName: 'Juan',
                lastName: 'Perez',
                phoneNumber: '3453453543'
              },
              cardNumber: '4012999999999999',
              creditCardType: 'VISA',
              expiration: '2026-12',
              intentToStore: false,
              isPrimary: undefined,
              securityCode: '123'
            }
          },
          productId: 'productId2',
          recipientEmail: 'test@test.com',
          sameDayToken: 'token'
        },
        href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
        labelText: 'make your changes',
        method: 'PUT',
        xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
      };
      const formData = {
        paymentInfo: {
          addressLine1: '1221 test Dr',
          addressLine2: '',
          cardNumber: '4012999999999999',
          city: 'McKinney',
          expiration: '2026-12',
          isoCountryCode: 'US',
          nameOnCard: 'Juan Perez',
          phoneCountryCode: 'US',
          phoneNumber: '345-345-3543',
          securityCode: '123',
          selectedCardId: 'NEW_CREDIT_CARD_ID',
          stateProvinceRegion: 'TX',
          zipOrPostalCode: '75071'
        },
        recipientEmail: 'test@test.com'
      };

      const sameDayConfirmationRequest = {
        body: {
          sameDayToken: 'token',
          boundSelection: 'bound2',
          productId: 'productId2'
        },
        href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
        labelText: 'make your changes',
        method: 'PUT',
        xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
      };
      const { sameDayPricingPage } = new SameDayPricingResponseBuilder().withAmountDueAndTax().build();

      const response = generateSameDayConfirmationRequest(
        formData,
        sameDayConfirmationRequest,
        sameDayPricingPage.fareSummary.amountDue
      );

      expect(response).toEqual(expectedResponse);
    });

    it('should render with exiting credit card', () => {
      const expectedResponse = {
        body: {
          boundSelection: 'bound2',
          payment: {
            moneyTotalFare: {
              amount: '20.00',
              currencyCode: 'USD',
              currencySymbol: '$',
              item: 'Amount Due'
            },
            savedCreditCard: {
              intentToStore: false,
              savedCreditCardId: '1-XI9N76',
              securityCode: null
            },
            savedCreditCardSelected: true
          },
          productId: 'productId2',
          recipientEmail: 'test@test.com',
          sameDayToken: 'token'
        },
        href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
        labelText: 'make your changes',
        method: 'PUT',
        xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
      };
      const formData = {
        paymentInfo: {
          selectedCardId: '1-XI9N76'
        },
        recipientEmail: 'test@test.com'
      };
      const sameDayConfirmationRequest = {
        body: {
          sameDayToken: 'token',
          boundSelection: 'bound2',
          productId: 'productId2'
        },
        href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
        labelText: 'make your changes',
        method: 'PUT',
        xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
      };
      const { sameDayPricingPage } = new SameDayPricingResponseBuilder().withAmountDueFare().build();

      const response = generateSameDayConfirmationRequest(
        formData,
        sameDayConfirmationRequest,
        sameDayPricingPage.fareSummary.amountDue
      );

      expect(response).toEqual(expectedResponse);
    });

    it('should render with no card', () => {
      const expectedResponse = {
        body: {
          boundSelection: 'bound2',
          payment: {
            moneyTotalFare: {
              amount: '5.06',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            savedCreditCard: {
              intentToStore: false,
              savedCreditCardId: [],
              securityCode: null
            },
            savedCreditCardSelected: true
          },
          productId: 'productId2',
          recipientEmail: 'test@test.com',
          sameDayToken: 'token'
        },
        href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
        labelText: 'make your changes',
        method: 'PUT',
        xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
      };
      const formData = {
        paymentInfo: {
          selectedCardId: undefined
        },
        recipientEmail: 'test@test.com'
      };
      const sameDayConfirmationRequest = {
        body: {
          sameDayToken: 'token',
          boundSelection: 'bound2',
          productId: 'productId2'
        },
        href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
        labelText: 'make your changes',
        method: 'PUT',
        xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
      };
      const { sameDayPricingPage } = new SameDayPricingResponseBuilder().withAmountDueAndTax().build();

      const response = generateSameDayConfirmationRequest(
        formData,
        sameDayConfirmationRequest,
        sameDayPricingPage.fareSummary.amountDue
      );

      expect(response).toEqual(expectedResponse);
    });

    it('should render when we have securitycode', () => {
      const expectedResponse = {
        body: {
          boundSelection: 'bound2',
          payment: {
            moneyTotalFare: {
              amount: '5.06',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            savedCreditCard: {
              intentToStore: false,
              savedCreditCardId: '1-XI9N76',
              securityCode: '123'
            },
            savedCreditCardSelected: true
          },
          productId: 'productId2',
          recipientEmail: 'test@test.com',
          sameDayToken: 'token'
        },
        href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
        labelText: 'make your changes',
        method: 'PUT',
        xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
      };
      const formData = {
        paymentInfo: {
          selectedCardId: '1-XI9N76'
        },
        recipientEmail: 'test@test.com',
        securityCode: '123'
      };
      const sameDayConfirmationRequest = {
        body: {
          sameDayToken: 'token',
          boundSelection: 'bound2',
          productId: 'productId2'
        },
        href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
        labelText: 'make your changes',
        method: 'PUT',
        xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
      };
      const { sameDayPricingPage } = new SameDayPricingResponseBuilder().withAmountDueAndTax().build();

      const response = generateSameDayConfirmationRequest(
        formData,
        sameDayConfirmationRequest,
        sameDayPricingPage.fareSummary.amountDue
      );

      expect(response).toEqual(expectedResponse);
    });

    it('should render when we have no formdata ', () => {
      const expectedResponse = {
        body: {
          boundSelection: 'bound2',
          payment: {
            moneyTotalFare: {
              amount: '5.06',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            savedCreditCard: {
              intentToStore: false,
              savedCreditCardId: [],
              securityCode: null
            },
            savedCreditCardSelected: true
          },
          productId: 'productId2',
          recipientEmail: null,
          refundMethod: undefined,
          sameDayToken: 'token'
        },
        href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
        labelText: 'make your changes',
        method: 'PUT',
        xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
      };
      const formData = {};
      const sameDayConfirmationRequest = {
        body: {
          sameDayToken: 'token',
          boundSelection: 'bound2',
          productId: 'productId2'
        },
        href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
        labelText: 'make your changes',
        method: 'PUT',
        xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
      };
      const { sameDayPricingPage } = new SameDayPricingResponseBuilder().withAmountDueAndTax().build();

      const response = generateSameDayConfirmationRequest(
        formData,
        sameDayConfirmationRequest,
        sameDayPricingPage.fareSummary.amountDue
      );

      expect(response).toEqual(expectedResponse);
    });

    it('should render when we have no formdata with no paymentInfo', () => {
      const expectedResponse = {
        body: {
          boundSelection: 'bound2',
          payment: {
            moneyTotalFare: {
              amount: '5.06',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            savedCreditCard: {
              intentToStore: false,
              savedCreditCardId: [],
              securityCode: null
            },
            savedCreditCardSelected: true
          },
          productId: 'productId2',
          recipientEmail: null,
          refundMethod: undefined,
          sameDayToken: 'token'
        },
        href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
        labelText: 'make your changes',
        method: 'PUT',
        xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
      };
      const formData = { paymentInfo: {} };
      const sameDayConfirmationRequest = {
        body: {
          sameDayToken: 'token',
          boundSelection: 'bound2',
          productId: 'productId2'
        },
        href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
        labelText: 'make your changes',
        method: 'PUT',
        xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
      };
      const { sameDayPricingPage } = new SameDayPricingResponseBuilder().withAmountDueAndTax().build();

      const response = generateSameDayConfirmationRequest(
        formData,
        sameDayConfirmationRequest,
        sameDayPricingPage.fareSummary.amountDue
      );

      expect(response).toEqual(expectedResponse);
    });

    describe('recipientEmail', () => {
      it('should render when we have recipient email in the form', () => {
        const expectedResponse = {
          body: {
            boundSelection: 'bound2',
            productId: 'productId2',
            recipientEmail: 'test@test.com',
            sameDayToken: 'token'
          },
          href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
          labelText: 'make your changes',
          method: 'PUT',
          xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
        };
        const formData = {
          paymentInfo: {},
          recipientEmail: 'test@test.com'
        };
        const sameDayConfirmationRequest = {
          body: {
            sameDayToken: 'token',
            boundSelection: 'bound2',
            productId: 'productId2'
          },
          href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
          labelText: 'make your changes',
          method: 'PUT',
          xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
        };

        const response = generateSameDayConfirmationRequest(formData, sameDayConfirmationRequest);

        expect(response).toEqual(expectedResponse);
      });

      it('should render when recipient email is not present', () => {
        const expectedResponse = {
          body: {
            boundSelection: 'bound2',
            productId: 'productId2',
            recipientEmail: null,
            refundMethod: undefined,
            sameDayToken: 'token'
          },
          href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
          labelText: 'make your changes',
          method: 'PUT',
          xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
        };
        const formData = {
          paymentInfo: {}
        };
        const sameDayConfirmationRequest = {
          body: {
            sameDayToken: 'token',
            boundSelection: 'bound2',
            productId: 'productId2'
          },
          href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
          labelText: 'make your changes',
          method: 'PUT',
          xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
        };

        const response = generateSameDayConfirmationRequest(formData, sameDayConfirmationRequest);

        expect(response).toEqual(expectedResponse);
      });
    });
  });
});
