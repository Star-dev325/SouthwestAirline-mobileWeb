// @flow
import _ from 'lodash';
import BoundDetailBuilder from 'test/builders/model/boundDetailBuilder';
import MockPromoBuilder from 'test/builders/model/mockPromoBuilder';
import PriceTotalBuilder from 'test/builders/model/priceTotalBuilder';
import type { FlightPurchasePageResponseType } from 'src/airBooking/flow-typed/airBooking.types';

export default class FlightPurchasePageBuilder {
  response: FlightPurchasePageResponseType;

  constructor() {
    this.response = {
      flightConfirmationPage: {
        dates: {
          first: '2017-12-13',
          second: null
        },
        destinationDescription: 'Austin',
        pnrs: [
          {
            passengers: [
              {
                displayName: 'Xin Wang',
                accountNumber: '01010101101'
              }
            ],
            recordLocator: 'ABC123'
          }
        ],
        passengerInfos: [{ passengerInfo: { firstName: 'Xin', lastName: 'Wang' } }],
        failedPassengers: null,
        getAirBookingSeniorVisibilityFn: () => {},
        bounds: [new BoundDetailBuilder().build()],
        totals: new PriceTotalBuilder().withEarlyBirdPriceDetails().build().totals,
        billingInfo: {
          cardType: 'DINERS',
          lastFourDigits: '9999',
          cardHolderName: 'Li Rui',
          amountApplied: {
            amount: '401.78',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          billingAddress: {
            streetOne: '441 Main St',
            streetTwo: '442 Main St',
            location: 'Brooklyn, NY US 57508'
          }
        },
        headerMessage: {
          key: 'BOOKING_CONFIRMATION',
          header: 'Your trip is booked!',
          body: 'Check in up to 24 hours in advance. The earlier you check in, the better your seat selection.'
        },
        _links: {
          carBooking: {
            href: '/v1/mobile-misc/feature/cars/products',
            method: 'GET',
            query: {
              'pickup-location': 'DAL',
              'return-location': 'AUS',
              'pickup-datetime': '2017-12-18T11:30',
              'return-datetime': '2017-12-20T11:30'
            }
          }
        },
        autoProvisioningMessage: null,
        getConfirmationPagePlacementsFn: () => {},
        confirmationPromoBannerConfig: {},
        confirmationPagePlacements: {
          promoBottom02: new MockPromoBuilder().withPromoTextContent('promoBottom02').build()
        }
      }
    };
  }

  withPayPal() {
    _.set(this.response, 'flightConfirmationPage.billingInfo', {
      cardType: 'PAYPAL',
      lastFourDigits: '8888',
      cardHolderName: 'Max Holder',
      amountApplied: {
        amount: '401.78',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      billingAddress: {
        streetOne: '441 Main St',
        streetTwo: 'Apt #23',
        location: 'Brooklyn, NY US 57508'
      }
    });

    return this;
  }

  withApplePay() {
    _.set(this.response, 'flightConfirmationPage.billingInfo', {
      cardType: 'APPLE_PAY',
      cardHolderName: 'Test User',
      lastFourDigits: '1234',
      afpCardType: 'Visa',
      amountApplied: {
        amount: '401.78',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      billingAddress: {
        streetOne: '1234 Test Ln',
        streetTwo: null,
        location: 'Dallas, TX US 75254'
      }
    });

    return this;
  }

  withChaseAutoProvisioningCard() {
    _.set(this.response, 'flightConfirmationPage.autoProvisioningMessage', {
      key: 'CHASE_CARD_PROVISION',
      header: 'Thanks for becoming a Rapid Rewards® Credit Card member!',
      body: null
    });

    return this;
  }

  withChaseAutoProvisioningEmailProvision() {
    _.set(this.response, 'flightConfirmationPage.autoProvisioningMessage', {
      key: 'CHASE_EMAIL_PROVISION',
      header: 'Please complete your Rapid Rewards account',
      body: 'Check your email for setup instructions.'
    });

    return this;
  }

  withCOS() {
    this.response.flightConfirmationPage.pnrs[0].passengers.push({
      displayName: 'Extra Seat'
    });

    return this;
  }

  withFundsApplied() {
    _.set(this.response, 'flightConfirmationPage.billingInfo', {
      cardType: 'MASTERCARD',
      lastFourDigits: '5454',
      cardHolderName: 'Xin Wang',
      amountApplied: {
        amount: '50.01',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      billingAddress: {
        streetOne: '123 Street Blvd',
        streetTwo: 'Apt 457',
        location: 'Dallas, TX 12345'
      }
    });
    _.set(this.response, 'flightConfirmationPage.fundsApplied', [
      {
        travelFundType: 'GIFT_CARD',
        appliedAmount: {
          amount: '10.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        displayName: 'Southwest Gift Card',
        fundIdentifier: 'XXXXXXXXXXXX-1865'
      },
      {
        travelFundType: 'LUV_VOUCHER',
        appliedAmount: {
          amount: '50.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        displayName: 'Southwest LUV Voucher',
        fundIdentifier: 'XXXXXXXXXXXX-8754',
        expirationDate: '2019-12-25'
      },
      {
        travelFundType: 'TRAVEL_FUNDS',
        leisureFund: true,
        appliedAmount: {
          amount: '100.97',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        displayName: 'Xin Wang',
        fundIdentifier: 'TVLFND',
        expirationDate: '2020-08-27'
      },
      {
        travelFundType: 'TRAVEL_FUNDS',
        leisureFund: false,
        appliedAmount: {
          amount: '23.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        displayName: 'Xin Wang',
        fundIdentifier: 'TVLFND',
        expirationDate: '2020-08-27'
      }
    ]);

    return this;
  }

  withSplitPaymentFundsApplied() {
    _.set(this.response, 'flightConfirmationPage.billingInfo', {
      cardType: 'MASTERCARD',
      lastFourDigits: '5454',
      cardHolderName: 'Xin Wang',
      amountApplied: {
        amount: '50.01',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      billingAddress: {
        streetOne: '123 Street Blvd',
        streetTwo: 'Apt 457',
        location: 'Dallas, TX 12345'
      }
    });
    _.set(this.response, 'flightConfirmationPage.fundsApplied', [
      {
        travelFundType: 'GIFT_CARD',
        appliedAmount: {
          amount: '10.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        displayName: 'Southwest Gift Card',
        fundIdentifier: 'XXXXXXXXXXXX-1865'
      },
      {
        travelFundType: 'LUV_VOUCHER',
        appliedAmount: {
          amount: '50.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        displayName: 'Southwest LUV Voucher',
        fundIdentifier: 'XXXXXXXXXXXX-8754',
        expirationDate: '2019-12-25'
      },
      {
        travelFundType: 'TRAVEL_FUNDS',
        leisureFund: true,
        appliedAmount: {
          amount: '100.97',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        displayName: 'Xin Wang',
        fundIdentifier: 'TVLFND',
        expirationDate: '2020-08-27'
      },
      {
        travelFundType: 'SPLIT_PAYMENT',
        leisureFund: false,
        appliedAmount: {
          amount: '23.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        appliedPoints: {
          amount: '12,333',
          currencyCode: 'PTS',
          currencySymbol: 'PTS'
        },
        displayName: 'Cash + Points',
        pointsRemaining: 'Remaining balance 336,269 pts'
      }
    ]);

    return this;
  }

  withNoExpirationDateTextFundsApplied() {
    _.set(this.response, 'flightConfirmationPage.fundsApplied', [
      {
        travelFundType: 'TRAVEL_FUNDS',
        leisureFund: true,
        appliedAmount: {
          amount: '100.97',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        displayName: 'Xin Wang',
        fundIdentifier: 'TVLFND',
        expirationDate: null,
        expirationDateString: 'Expiration: None'
      }
    ]);

    return this;
  }

  withEarlyBirdPNR() {
    _.set(this.response, 'flightConfirmationPage.pnrs[0].passengers[0].hasAnyEarlyBird', true);

    return this;
  }

  withWarningIcon() {
    _.set(this.response, 'flightConfirmationPage.headerMessage.icon', 'WARNING');

    return this;
  }

  withPassportRequiredMessage() {
    _.set(this.response, 'flightConfirmationPage.messages', [
      {
        key: 'BOOKING_CONFIRMATION_PASSPORT_REQUIRED',
        header: 'Passport information incomplete',
        body: 'Thank you for your purchase! Complete your passport information ahead of time so check-in is quick and easy.',
        icon: 'INFO',
        textColor: 'DEFAULT'
      }
    ]);

    return this;
  }

  withoutHeaderMessage() {
    _.set(this.response, 'flightConfirmationPage.headerMessage', null);

    return this;
  }

  withEarlyBird() {
    _.set(this.response, 'flightConfirmationPage.headerMessage', {
      header: 'Your trip is booked with EarlyBird!'
    });
  }

  withAddEarlyBird() {
    _.set(this.response, 'flightConfirmationPage._links.earlyBird', {
      body: { passengerSearchToken: 'abc.123.xyz' },
      href: '/v1/mobile-air-booking/page/view-early-bird/ABC123',
      labelText: null,
      method: 'POST'
    });

    return this;
  }

  withLapChildInBooking() {
    this.response.flightConfirmationPage.pnrs = [
      {
        greyBoxMessage: {
          body: 'A birth certificate or other government-issued identification bearing the birth date of each Lap Child is required upon request. <a href="https://www.southwest.com/faq/age-verified" target="_blank">Learn More</a>',
          header: '',
          key: 'GREY_BOX_INFANT_ON_LAP_PURCHASE_CONFIRMATION'
        },
        passengers: [
          {
            displayName: 'Adult One',
            hasAnyEarlyBird: false,
            lapInfant: {
              name: 'Baby Bond'
            }
          }
        ],
        recordLocator: 'ABC123'
      }
    ];

    return this;
  }

  withLongDestinationName() {
    _.set(
      this.response,
      'flightConfirmationPage.destinationDescription',
      'Austin - Capital City of the State of Texas'
    );

    return this;
  }

  withYoungTravelerParentGuardianPnr() {
    _.set(this.response, 'flightConfirmationPage.pnrs', [
      {
        parentGuardianDetails: {
          linkIcon: 'clipboard-circle',
          linkSuffixClickableText: 'Review your parent/guardian info',
          linkTitle: 'Parent/guardian info',
          modalDetails: {
            body: 'Any changes to the parent/guardian information must be completed at the airport.',
            buttonText: 'Got it',
            parentGuardianAddressLine1: '100 Main St',
            parentGuardianAddressLine2: 'Apt 101',
            parentLocation: 'Dallas, TX 78725',
            parentGuardianCountry: 'United States of America',
            parentGuardianName: 'Jane Doe',
            parentGuardianPhone: '(555) 555-5555',
            parentGuardianRelationship: 'Mom',
            title: 'Parent/guardian'
          }
        },
        passengers: [
          {
            accountNumber: null,
            displayName: 'Young Traveler',
            hasAnyEarlyBird: false,
            lapInfant: null,
            specialAssistanceMessage: null
          }
        ],
        recordLocator: 'ABC123',
        youngTravelersDetails: {
          linkIcon: 'young-traveler-circle',
          linkSuffixClickableText: 'Review our Young Traveler policy',
          linkTitle: 'Young Travelers',
          linkUrl: 'https://www.southwest.com/help/flying-with-children/young-travelers-terms-and-conditions'
        }
      }
    ]);

    return this;
  }

  build() {
    return this.response;
  }
}
