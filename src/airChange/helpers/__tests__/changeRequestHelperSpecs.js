import { generateChangeRequest } from 'src/airChange/helpers/changeRequestHelper';
import { getApplePayCard, getNativeApplePayCard } from 'test/builders/model/paymentInfoBuilder';
import { UATP, APPLE_PAY } from 'src/shared/constants/creditCardTypes';

describe('changeRequestHelper', () => {
  const changeConfirmationPageLink = {
    href: '/v1/mobile-air-booking/page/flights/change',
    method: 'PUT',
    xhref: '/v1/mobile-air-booking/page/flights/x-change',
    body: {
      changeSession: {
        inboundBoundReference: null,
        outboundBoundReference: 'outboundBoundReference'
      },
      productIdToken: {
        inbound: null,
        outbound: 'productIdToken'
      },
      newFlightToken: 'newFlightToken'
    }
  };

  it('should generate correct request format for upgrade', () => {
    const flightChangeUpGradeRequestData = {
      emailReceiptTo: '',
      paymentInfo: {
        selectedCardId: '1-ENKDD'
      },
      moneyTotalFare: {
        amount: '518.78',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      contactMethodInfo: {
        contactMethod: 'TEXT',
        email: null,
        phoneNumber: '980-700-7070',
        phoneCountryCode: '1',
        preferredLanguage: 'EN',
        declineNotifications: 'false'
      },
      paymentRequired: true,
      securityCode: '123'
    };

    expect(generateChangeRequest(flightChangeUpGradeRequestData, changeConfirmationPageLink)).to.deep.equal({
      body: {
        changeSession: {
          inboundBoundReference: null,
          outboundBoundReference: 'outboundBoundReference'
        },
        contactInformation: {
          contactMethod: 'TEXT',
          email: null,
          phone: {
            countryCode: '1',
            number: '9807007070'
          }
        },
        emailReceiptTo: '',
        newFlightToken: 'newFlightToken',
        productIdToken: {
          inbound: null,
          outbound: 'productIdToken'
        },
        payment: {
          moneyTotalFare: {
            amount: '518.78',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          savedCreditCard: { savedCreditCardId: '1-ENKDD', securityCode: '123' }
        }
      },
      href: '/v1/mobile-air-booking/page/flights/change',
      method: 'PUT',
      xhref: '/v1/mobile-air-booking/page/flights/x-change'
    });
  });

  it('should generate correct request format for downgrade', () => {
    const flightChangeDownGradeRequestData = {
      emailReceiptTo: '',
      refundMethod: 'HOLD_FUTURE_USE',
      contactMethodInfo: {
        contactMethod: 'TEXT',
        email: null,
        phoneNumber: '980-700-7070',
        phoneCountryCode: '1',
        preferredLanguage: 'EN',
        declineNotifications: 'false'
      }
    };

    expect(generateChangeRequest(flightChangeDownGradeRequestData, changeConfirmationPageLink)).to.deep.equal({
      body: {
        changeSession: {
          inboundBoundReference: null,
          outboundBoundReference: 'outboundBoundReference'
        },
        contactInformation: {
          contactMethod: 'TEXT',
          email: null,
          phone: {
            countryCode: '1',
            number: '9807007070'
          }
        },
        emailReceiptTo: '',
        newFlightToken: 'newFlightToken',
        productIdToken: {
          inbound: null,
          outbound: 'productIdToken'
        },
        refundMethod: 'HOLD_FUTURE_USE'
      },
      href: '/v1/mobile-air-booking/page/flights/change',
      method: 'PUT',
      xhref: '/v1/mobile-air-booking/page/flights/x-change'
    });
  });

  it('should generate correct request when chose PayPal as payment method', () => {
    const flightChangeUsingPayPalPaymentMethod = {
      emailReceiptTo: '',
      paymentInfo: {
        selectedCardId: 'PAY_PAL_CARD_ID'
      },
      moneyTotalFare: {
        amount: '518.78',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      contactMethodInfo: {
        contactMethod: 'TEXT',
        email: null,
        phoneNumber: '980-700-7070',
        phoneCountryCode: '1',
        preferredLanguage: 'EN',
        declineNotifications: 'false'
      },
      paymentRequired: true,
      payPal: {
        token: 'token'
      }
    };

    expect(generateChangeRequest(flightChangeUsingPayPalPaymentMethod, changeConfirmationPageLink)).to.deep.equal({
      body: {
        changeSession: {
          inboundBoundReference: null,
          outboundBoundReference: 'outboundBoundReference'
        },
        contactInformation: {
          contactMethod: 'TEXT',
          email: null,
          phone: {
            countryCode: '1',
            number: '9807007070'
          }
        },
        emailReceiptTo: '',
        newFlightToken: 'newFlightToken',
        productIdToken: {
          inbound: null,
          outbound: 'productIdToken'
        },
        payment: {
          moneyTotalFare: {
            amount: '518.78',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          paypal: {
            paypalToken: 'token'
          }
        }
      },
      href: '/v1/mobile-air-booking/page/flights/change',
      method: 'PUT',
      xhref: '/v1/mobile-air-booking/page/flights/x-change'
    });
  });

  context('applePay', () => {
    it('should set up newCreditCard with applePay information when applePay is used', () => {
      const flightChangeUsingApplePay = {
        emailReceiptTo: '',
        paymentInfo: {
          selectedCardId: 'APPLE_PAY_CARD_ID'
        },
        moneyTotalFare: {
          amount: '518.78',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        contactMethodInfo: {
          contactMethod: 'TEXT',
          email: null,
          phoneNumber: '980-700-7070',
          phoneCountryCode: '1',
          preferredLanguage: 'EN',
          declineNotifications: 'false'
        },
        paymentRequired: true,
        applePayCard: getApplePayCard()
      };
      const flightChangeRequest = generateChangeRequest(flightChangeUsingApplePay);
      const applePay = flightChangeRequest.body.payment.newCreditCard;

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

    it('should set up existing with applePay information', () => {
      const moneyTotalFare = {
        amount: '518.78',
        currencyCode: 'USD',
        currencySymbol: '$'
      };
      const pointsTotalBaseFare = null;
      const flightChangeUsingApplePay = {
        emailReceiptTo: '',
        paymentInfo: {
          selectedCardId: 'APPLE_PAY_CARD_ID'
        },
        moneyTotalFare: {
          amount: '518.78',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        contactMethodInfo: {
          contactMethod: 'TEXT',
          email: null,
          phoneNumber: '980-700-7070',
          phoneCountryCode: '1',
          preferredLanguage: 'EN',
          declineNotifications: 'false'
        },
        paymentRequired: true,
        applePayCard: getNativeApplePayCard()
      };
      const flightChangeRequest = generateChangeRequest(flightChangeUsingApplePay);
      const applePay = flightChangeRequest.body.payment;

      expect(applePay).to.deep.equal({
        moneyTotalFare,
        pointsTotalBaseFare,
        ...flightChangeUsingApplePay.applePayCard.purchaseRequest
      });
    });
  });

  context('contact method info', () => {
    it('should genarate request with declineNotifications when user dose NOT wish to receive notifications', () => {
      const flightChangeDownGradeRequestData = {
        emailReceiptTo: '',
        refundMethod: 'HOLD_FUTURE_USE',
        contactMethodInfo: {
          declineNotifications: 'true'
        }
      };

      expect(generateChangeRequest(flightChangeDownGradeRequestData, changeConfirmationPageLink)).to.deep.equal({
        body: {
          changeSession: {
            inboundBoundReference: null,
            outboundBoundReference: 'outboundBoundReference'
          },
          emailReceiptTo: '',
          newFlightToken: 'newFlightToken',
          productIdToken: {
            inbound: null,
            outbound: 'productIdToken'
          },
          refundMethod: 'HOLD_FUTURE_USE',
          declineNotifications: true
        },
        href: '/v1/mobile-air-booking/page/flights/change',
        method: 'PUT',
        xhref: '/v1/mobile-air-booking/page/flights/x-change'
      });
    });

    it('should genarate request without declineNotifications when contact method is not empty', () => {
      const flightChangeDownGradeRequestData = {
        emailReceiptTo: '',
        refundMethod: 'HOLD_FUTURE_USE',
        contactMethodInfo: {
          contactMethod: 'TEXT',
          email: null,
          phoneNumber: '980-700-7070',
          phoneCountryCode: '1',
          preferredLanguage: 'EN'
        }
      };

      expect(generateChangeRequest(flightChangeDownGradeRequestData, changeConfirmationPageLink)).to.deep.equal({
        body: {
          changeSession: {
            inboundBoundReference: null,
            outboundBoundReference: 'outboundBoundReference'
          },
          emailReceiptTo: '',
          newFlightToken: 'newFlightToken',
          productIdToken: {
            inbound: null,
            outbound: 'productIdToken'
          },
          refundMethod: 'HOLD_FUTURE_USE',
          contactInformation: {
            contactMethod: 'TEXT',
            email: null,
            phone: {
              countryCode: '1',
              number: '9807007070'
            }
          }
        },
        href: '/v1/mobile-air-booking/page/flights/change',
        method: 'PUT',
        xhref: '/v1/mobile-air-booking/page/flights/x-change'
      });
    });

    it('should append the fundToken if there is one', () => {
      const flightChangeRequestWithFundsAppliedToken = {
        emailReceiptTo: '',
        paymentInfo: {
          selectedCardId: 'PAY_PAL_CARD_ID'
        },
        moneyTotalFare: {
          amount: '518.78',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        contactMethodInfo: {
          contactMethod: 'TEXT',
          email: null,
          phoneNumber: '980-700-7070',
          phoneCountryCode: '1',
          preferredLanguage: 'EN',
          declineNotifications: 'false'
        },
        paymentRequired: true,
        payPal: {
          token: 'token'
        },
        fundsAppliedToken: 'funds-token'
      };

      expect(generateChangeRequest(flightChangeRequestWithFundsAppliedToken, changeConfirmationPageLink)).to.deep.equal(
        {
          body: {
            changeSession: {
              inboundBoundReference: null,
              outboundBoundReference: 'outboundBoundReference'
            },
            contactInformation: {
              contactMethod: 'TEXT',
              email: null,
              phone: {
                countryCode: '1',
                number: '9807007070'
              }
            },
            emailReceiptTo: '',
            newFlightToken: 'newFlightToken',
            productIdToken: {
              inbound: null,
              outbound: 'productIdToken'
            },
            payment: {
              moneyTotalFare: {
                amount: '518.78',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              paypal: {
                paypalToken: 'token'
              },
              fundToken: 'funds-token'
            }
          },
          href: '/v1/mobile-air-booking/page/flights/change',
          method: 'PUT',
          xhref: '/v1/mobile-air-booking/page/flights/x-change'
        }
      );
    });

    it('should generate the correct request if travel funds covered the entire payment', () => {
      const flightChangeRequestFundsPaidForEverything = {
        emailReceiptTo: '',
        moneyTotalFare: {
          amount: '0.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        contactMethodInfo: {
          contactMethod: 'TEXT',
          email: null,
          phoneNumber: '980-700-7070',
          phoneCountryCode: '1',
          preferredLanguage: 'EN',
          declineNotifications: 'false'
        },
        paymentRequired: false,
        fundsAppliedToken: 'funds-token'
      };

      expect(
        generateChangeRequest(flightChangeRequestFundsPaidForEverything, changeConfirmationPageLink)
      ).to.deep.equal({
        body: {
          changeSession: {
            inboundBoundReference: null,
            outboundBoundReference: 'outboundBoundReference'
          },
          contactInformation: {
            contactMethod: 'TEXT',
            email: null,
            phone: {
              countryCode: '1',
              number: '9807007070'
            }
          },
          emailReceiptTo: '',
          newFlightToken: 'newFlightToken',
          productIdToken: {
            inbound: null,
            outbound: 'productIdToken'
          },
          payment: {
            moneyTotalFare: {
              amount: '0.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            fundToken: 'funds-token'
          }
        },
        href: '/v1/mobile-air-booking/page/flights/change',
        method: 'PUT',
        xhref: '/v1/mobile-air-booking/page/flights/x-change'
      });
    });
  });
});
