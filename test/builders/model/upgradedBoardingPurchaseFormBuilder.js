import _ from 'lodash';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';

class UpgradedBoardingPurchaseFormBuilder {
  constructor() {
    this.data = {
      upgradedBoardingPurchasePage: {
        recordLocator: '3NSCML',
        dates: {
          first: '2021-08-21',
          second: '2021-08-24'
        },
        originationDestinationDescription: 'Denver, CO to Buffalo, NY',
        destinationDescription: 'Buffalo',
        upgradedBoardingExpiredMessage: {
          body: 'Your time has expired. Sorry! But you can try again to upgrade your boarding position.',
          header: null,
          icon: 'NONE',
          key: 'UPGRADED_BOARDING_EXPIRED',
          labelText: 'Start Over',
          textColor: 'DEFAULT'
        },
        upgradedBoardingExpiredSeconds: 300,
        upgradedBoardingInformationalMessage:
          '* The time will only hold your upgraded boarding pass for up to 5 minutes. Once time has expired without purchase, the position will be released and you must start over',
        fareRulesWithLinks: `<sup>1</sup>Please read <a href="https://mobile.dev8.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase. Certain exclusions may apply. Upgraded boarding is non-refundable.`,
        upgradedBoardingSegment: [
          {
            flight: '2272',
            departureDate: '2021-08-21',
            departureTime: '08:00',
            departureAirportCode: 'DEN',
            arrivalTime: '11:00',
            arrivalAirportCode: 'BUF',
            departureDayOfWeek: 'Monday',
            isOvernight: false,
            upgradedBoardingSegmentMessage: 'ELIGIBLE FLIGHT 1 OF 2',
            upgradedBoardingPrice: {
              amount: '40.00',
              currencyCode: 'USD',
              currencySymbol: '$',
              description: '+'
            },
            passengers: [
              {
                name: 'Bobby Blaine (C1)',
                accountNumber: '0123456789',
                _meta: {
                  productId: 'abcdefghi'
                }
              },
              {
                name: 'Brenda Blaine (C2)',
                accountNumber: '0123456789',
                _meta: {
                  productId: 'jklmnopqr'
                }
              }
            ]
          },
          {
            flight: '4474',
            departureDate: '2021-08-23',
            departureTime: '08:00',
            departureAirportCode: 'BUF',
            arrivalTime: '11:00',
            arrivalAirportCode: 'DEN',
            departureDayOfWeek: 'Wednesday',
            isOvernight: false,
            upgradedBoardingSegmentMessage: 'ELIGIBLE FLIGHT 2 OF 2',
            upgradedBoardingPrice: {
              amount: '40.00',
              currencyCode: 'USD',
              currencySymbol: '$',
              description: '+'
            },
            passengers: [
              {
                name: 'Bobby Blaine (C1)',
                accountNumber: '0123456789',
                _meta: {
                  productId: 'stuvqwxyz'
                }
              },
              {
                name: 'Brenda Blaine (C2)',
                accountNumber: '0123456789',
                _meta: {
                  productId: '0123456789'
                }
              }
            ]
          }
        ],
        _links: {
          upgradedBoardingConfirmationPage: {
            href: '/v1/mobile-air-operations/page/upgraded-boarding/A12345/confirmation',
            method: 'POST',
            xhref: '/v1/mobile-air-operations/page/upgraded-boarding/A12345/x-confirmation',
            body: {
              passengerSearchToken: 'mockPassengerSearchToken',
              productReferenceToken: 'mockProductReferenceToken'
            }
          },
          upgradedBoardingCancel: {
            href: '/v1/mobile-air-operations/feature/upgraded-boarding/cancel/{record-locator}/products',
            method: 'DELETE',
            body: {
              passengerSearchToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0',
              productReferenceToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0'
            }
          }
        }
      },
      // non CHAPI form data
      savedCreditCards: new PaymentSavedCreditCardsBuilder().build(),
      shouldShowSecurityInputField: false,
      UPGRADED_BOARDING_BY_SEGMENT: false,
      push: () => {},
      paymentInfo: {},
      purchasePagePlacements: {},
      moneyTotal: {
        amount: '160.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      cancelUpgradedBoardingReservationFn: () => {},
      isWebView: false,
      isLoggedIn: false,
      exitWebViewFn: () => {},
      purchaseUpgradedBoardingFn: () => {},
      handleCancelUpgradedBoardingFn: () => {},
      shouldResumeDataFn: () => {},
      resumeDataFn: () => {},
      shouldGotoPayPalSignInFn: () => {},
      gotoPayPalSignInFn: () => {},
      checkSessionExpired: () => {},
      resetCountdownTimeStampFn: () => {},
      saveMoneyTotalFn: () => {},
      saveFormDataFn: () => {},
      saveCountdownTimeStampFn: () => {},
      hasSelectedAlternativeFormOfPaymentFn: () => {},
      initiateAlternativeFormOfPaymentFn: () => {},
      getSavedCreditCardsFn: () => {},
      loadPurchasePagePlacementsFn: () => {},
      setReLoginCallbackFunctionsFn: () => {}
    };
  }

  build() {
    return { ...this.data };
  }

  withOvernight() {
    this.data.upgradedBoardingPurchasePage.upgradedBoardingSegment[1].isOvernight = true;
    this.data.upgradedBoardingPurchasePage.upgradedBoardingSegment[1].isOvernightUnderDeparture = true;

    return { ...this.data };
  }

  withSinglePaxSingleSegment() {
    this.data = this.withMultiPaxSingleSegment();
    this.data = this.withSinglePaxMultiSegment();

    _.set(this.data, 'moneyTotal.amount', '40.00');

    return { ...this.data };
  }

  withMultiPaxSingleSegment() {
    this.data.upgradedBoardingPurchasePage.upgradedBoardingSegment.pop();
    this.data.upgradedBoardingPurchasePage.upgradedBoardingSegment[0].upgradedBoardingSegmentMessage =
      'ELIGIBLE FLIGHT';
    _.set(this.data, 'moneyTotal.amount', '80.00');

    return { ...this.data };
  }

  withSinglePaxMultiSegment() {
    this.data.upgradedBoardingPurchasePage.upgradedBoardingSegment.map((segment) => {
      segment.passengers.pop();
    });
    _.set(this.data, 'moneyTotal.amount', '80.00');

    return { ...this.data };
  }

  withUpgradedBoardingExpiredSeconds(upgradedBoardingExpiredSeconds) {
    this.data.upgradedBoardingPurchasePage.upgradedBoardingExpiredSeconds = upgradedBoardingExpiredSeconds;

    return this;
  }

  withEmptyDates() {
    this.data.upgradedBoardingPurchasePage.dates = { first: '', second: '' };

    return { ...this.data };
  }
}

export default UpgradedBoardingPurchaseFormBuilder;
