// @flow

import _ from 'lodash';
import type { FlightPricingPageResponse } from 'src/airBooking/flow-typed/airBooking.types';
import type { CurrencyType } from 'src/shared/flow-typed/shared.types';

class PricesBuilder {
  response: FlightPricingPageResponse = {
    flightPricingPage: {
      header: 'DAL - ATL (One Way)',
      acceptanceText1: 'Select cancel to change your flight selections.',
      acceptanceText2: 'By tapping continue, you accept the new price.',
      bounds: [
        {
          boundType: 'DEPARTING',
          departureDate: '2017-11-01',
          flights: [
            {
              number: '1504',
              wifiOnBoard: true
            }
          ],
          departureTime: '06:30',
          departureAirport: {
            name: 'Dallas (Love Field)',
            state: 'TX',
            code: 'DAL',
            country: null
          },
          arrivalDate: '2017-11-01',
          arrivalTime: '09:30',
          arrivalAirport: {
            name: 'Atlanta',
            state: 'GA',
            code: 'ATL',
            country: null
          },
          passengers: [
            {
              type: 'Passenger',
              count: 1,
              fareType: 'Wanna Get Away',
              bookingCode: 'Q'
            }
          ],
          fareProductDetails: {
            label: 'Wanna Get Away',
            fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
          },
          stops: [
            {
              airport: {
                name: 'Houston (Hobby)',
                state: 'TX',
                code: 'HOU',
                country: null
              },
              arrivalTime: '15:35',
              departureTime: '16:25',
              changePlanes: true
            }
          ],
          travelTime: '02:00',
          isNextDayArrival: false
        }
      ],
      totals: {
        pointsTotal: null,
        moneyTotal: {
          amount: '233.98',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        adultFare: {
          baseFare: {
            fare: {
              amount: '204.45',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            discount: {
              amount: '20.0',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            totalBaseFare: {
              amount: '184.45',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          },
          taxesAndFees: [
            {
              description: 'Excise Taxes',
              fee: {
                amount: '15.33',
                currencyCode: 'USD',
                currencySymbol: '$'
              }
            },
            {
              description: 'Security Fee',
              fee: {
                amount: '5.60',
                currencyCode: 'USD',
                currencySymbol: '$'
              }
            },
            {
              description: 'Segment Fee',
              fee: {
                amount: '4.10',
                currencyCode: 'USD',
                currencySymbol: '$'
              }
            },
            {
              description: 'Passenger Facility Charge',
              fee: {
                amount: '4.50',
                currencyCode: 'USD',
                currencySymbol: '$'
              }
            }
          ],
          totalPerPassenger: {
            points: null,
            money: {
              amount: '233.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            passengerCount: 1
          },
          paxTypeTotal: {
            moneyTotal: {
              amount: '233.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pointsTotal: null
          }
        }
      },
      fareRulesWithLinks:
        'Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.',
      chaseBanner: null,
      billingAddress: null,
      reviewMessages: null,
      _meta: {
        purchaseWithPoints: false,
        showRepriceNotification: false,
        newCardHasSufficientFunds: false,
        authorizeUser: false,
        internationalBooking: false,
        chase: null
      },
      _links: {
        flightConfirmationPage: {
          href: '/v1/mobile-air-booking/page/flights/purchase',
          method: 'POST',
          xhref: '/v1/mobile-air-booking/page/flights/x-purchase',
          body: {
            promoCodeToken: null,
            reservationGroups: [
              {
                passengerType: 'Passenger',
                amountApplied: {
                  totalBaseFare: {
                    amount: '203.52',
                    currencyCode: 'USD',
                    currencySymbol: '$'
                  },
                  taxesAndFees: [
                    {
                      code: 'US',
                      description: 'Excise Taxes',
                      fee: {
                        amount: '15.26',
                        currencyCode: 'USD',
                        currencySymbol: '$'
                      }
                    },
                    {
                      code: 'AY',
                      description: 'Sept 11 Security Fee',
                      fee: {
                        amount: '5.60',
                        currencyCode: 'USD',
                        currencySymbol: '$'
                      }
                    },
                    {
                      code: 'ZP',
                      description: 'Segment Fee',
                      fee: {
                        amount: '4.20',
                        currencyCode: 'USD',
                        currencySymbol: '$'
                      }
                    },
                    {
                      code: 'XF',
                      description: 'Passenger Facility Charge',
                      fee: {
                        amount: '4.50',
                        currencyCode: 'USD',
                        currencySymbol: '$'
                      }
                    }
                  ]
                },
                productIds: [
                  'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMTjBXTlIsUSxBVEwsQVVTLDIwMTctMTItMTRUMTM6MDAtMDU6MDAsMjAxNy0xMi0xNFQxNDozMC0wNjowMCxXTixXTiwxODg3LDczVyIsInF1b3RlZFByaWNlIjoiMjMzLjA4In0='
                ]
              }
            ]
          }
        },
        loggedInPassengerInformation: {
          href: 'v1/mobile-misc/page/air-booking/passenger-information',
          method: 'GET'
        },
        savedCreditCards: null,
        earlyBirdPricing: {
          body: {
            adultPassengers: {
              productIds: ['eyJwcm9kdWN0SWQiO']
            }
          },
          href: '/v1/mobile-air-booking/feature/earlybird/prices',
          method: 'POST'
        },
        calculateFunds: {
          body: {
            promoCodeToken: null,
            itineraryPricingToken: 'itinerary-token'
          },
          href: '/v1/mobile-air-booking/page/calculate-funds',
          method: 'POST'
        },
        companionPurchase: null,
        passengerValidation: {
          body: {
            adultPassengers: {
              productIds: ['testOutboundProductId', 'testInboundProductId']
            }
          },
          href: 'http://mobile-air-booking.chapi.com/v1/mobile-air-booking/feature/passenger-validation',
          method: 'POST'
        }
      }
    },
    prefill: null
  };

  withReprice(): PricesBuilder {
    const { flightPricingPage } = this.response;

    flightPricingPage._meta = _.merge({}, flightPricingPage._meta, { showRepriceNotification: true });

    return this;
  }

  withMessages(): PricesBuilder {
    this.response.flightPricingPage.messages = [
      {
        key: 'PRICING_EARLY_BIRD_BUNDLED_INSIDE_24_HOURS',
        header: 'EarlyBird Check-in is not available',
        body: 'We can not add this product to a flight that leaves within 24 hours of purchase',
        icon: 'WARNING'
      }
    ];

    return this;
  }

  withMoneyTotal(moneyTotal: CurrencyType): PricesBuilder {
    _.set(this.response, 'flightPricingPage.totals.adultFare.paxTypeTotal.moneyTotal', moneyTotal);

    return this;
  }

  withPointsTotal(pointsTotal: CurrencyType): PricesBuilder {
    const { flightPricingPage } = this.response;

    flightPricingPage.totals.pointsTotal = pointsTotal;

    return this;
  }

  withNoDiscountForBaseFare(paxType: string) {
    const { flightPricingPage } = this.response;

    flightPricingPage.totals[`${paxType}Fare`].baseFare.discount = null;

    return this;
  }

  withPointsForBaseFare(paxType: string) {
    const { flightPricingPage } = this.response;

    flightPricingPage.totals[`${paxType}Fare`].baseFare = {
      fare: {
        amount: '204.45',
        currencyCode: 'PTS',
        currencySymbol: null
      },
      discount: {
        amount: '20.0',
        currencyCode: 'PTS',
        currencySymbol: null
      },
      totalBaseFare: {
        amount: '184.45',
        currencyCode: 'PTS',
        currencySymbol: null
      }
    };

    return this;
  }

  withPointsForTotalPerPassenger(paxType: string) {
    const { flightPricingPage } = this.response;

    flightPricingPage.totals[`${paxType}Fare`].totalPerPassenger = {
      points: {
        amount: '233.98',
        currencyCode: 'PTS',
        currencySymbol: null
      },
      money: null,
      passengerCount: 1
    };

    return this;
  }

  withChaseApplicationCompleted() {
    const { flightPricingPage } = this.response;

    _.set(flightPricingPage, '_meta.chase.chaseApplicationCompleted', true);
    _.set(flightPricingPage, '_analytics.Chase.creditStatus', 'APPROVED');

    return this;
  }

  withRoundTrip() {
    const { bounds } = this.response.flightPricingPage;
    const inbound = {
      boundType: 'RETURNING',
      departureDate: '2017-11-01',
      flights: [
        {
          number: '1504',
          wifiOnBoard: true
        }
      ],
      departureTime: '06:30',
      departureAirport: {
        name: 'Atlanta',
        state: 'GA',
        code: 'ATL',
        country: null
      },
      arrivalDate: '2017-11-01',
      arrivalTime: '09:30',
      arrivalAirport: {
        name: 'Dallas (Love Field)',
        state: 'TX',
        code: 'DAL',
        country: null
      },
      passengers: [
        {
          type: 'Passenger',
          count: 1,
          fareType: 'Wanna Get Away',
          bookingCode: 'Q'
        }
      ],
      fareProductDetails: {
        label: 'Wanna Get Away',
        fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
      },
      stops: [
        {
          airport: {
            name: 'Houston (Hobby)',
            state: 'TX',
            code: 'HOU',
            country: null
          },
          arrivalTime: '15:35',
          departureTime: '16:25',
          changePlanes: true
        }
      ],
      travelTime: '02:00',
      isNextDayArrival: false
    };

    bounds.push(inbound);

    return this;
  }

  withLapChildEnabled(): PricesBuilder {
    const lapChild = {
      type: 'Lap Child',
      count: 1,
      fareType: 'Wanna Get Away',
      bookingCode: 'U'
    };

    if (this.response.flightPricingPage.bounds[0].passengers) {
      this.response.flightPricingPage.bounds[0].passengers.push(lapChild);
    }

    this.response.flightPricingPage.totals.infantFare = {
      baseFare: {
        fare: {
          amount: '0',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        discount: {
          amount: '0',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        totalBaseFare: {
          amount: '0',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      taxesAndFees: [
        {
          description: 'Excise Taxes',
          fee: {
            amount: '0',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        },
        {
          description: 'Security Fee',
          fee: {
            amount: '0',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        },
        {
          description: 'Segment Fee',
          fee: {
            amount: '0',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        },
        {
          description: 'Passenger Facility Charge',
          fee: {
            amount: '0',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        }
      ],
      totalPerPassenger: {
        points: null,
        money: {
          amount: '0',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        passengerCount: 1
      },
      paxTypeTotal: {
        moneyTotal: {
          amount: '0',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        pointsTotal: null
      }
    };

    return this;
  }

  withUpsellDetails(): PricesBuilder {
    this.response.flightPricingPage.upsellDetails = {
      upsellToProductId: 'BUS',
      offerTitle: 'Upgrade to Business Select®',
      offerText: '',
      offerIcon: 'bestseats',
      selectionText: 'Upgrade both for $101',
      labelText: 'Upgrade from $50',
      upsellPrice: '101',
      offerFeatures: [
        {
          icon: 'check',
          label: 'Guaranteed A1-A15 boarding',
          prefix: '',
          suffix: '',
          link: ''
        },
        {
          icon: 'check',
          label:
            'Refundable flights. Amazing experience with extra leg rooms and variety of drinks and especial foods with remarkable service',
          suffixl: '1',
          prefix: '',
          suffix: '',
          link: ''
        },
        {
          icon: 'check',
          label: '12 Rapid Rewards® points per Dollar',
          suffixl: '1',
          prefix: '',
          suffix: '',
          link: ''
        }
      ]
    };

    return this;
  }

  withWGAPlusUpsellDetails(): PricesBuilder {
    this.response.flightPricingPage.upsellDetails = {
      upsellToProductId: 'BUS',
      offerTitle: 'Upgrade to Business Select®',
      offerText: '',
      offerIcon: '',
      selectionText: 'Upgrade both for $101',
      labelText: 'Upgrade from $50',
      upsellPrice: '101',
      stylizedOfferTitle: [
        {
          inverseLabelColor: 'neutral-white',
          label: 'Upgrade to Wanna Get Away',
          primaryLabelColor: 'primary-dark-blue'
        },
        {
          font: 'Fairwater Script',
          inverseLabelColor: 'neutral-white',
          label: ' plus',
          primaryLabelColor: 'primary-red'
        }
      ],
      offerFeatures: [
        {
          icon: 'check',
          label: 'Guaranteed A1-A15 boarding',
          prefix: '',
          suffix: '',
          link: ''
        },
        {
          icon: 'check',
          label:
            'Refundable flights. Amazing experience with extra leg rooms and variety of drinks and especial foods with remarkable service',
          suffixl: '1',
          prefix: '',
          suffix: '',
          link: ''
        },
        {
          icon: 'check',
          label: '12 Rapid Rewards® points per Dollar',
          suffixl: '1',
          prefix: '',
          suffix: '',
          link: ''
        }
      ]
    };

    return this;
  }

  withUpsellSuccessMessage(): PricesBuilder {
    this.response.flightPricingPage.upsellSuccessMessage = {
      header: 'Great, you’re all set!',
      body: 'You have A1 - A15 boarding, a refundable ticket, and will earn 12 points per dollar for your departing flight with Business Select®.'
    };

    return this;
  }

  withUpsellBothBoundsOptions(): PricesBuilder {
    this.withRoundTrip().withUpsellDetails();

    this.response.flightPricingPage.bounds[0].upsellBoundDetails = {
      selectionText: 'Upgrade departing for $50',
      upsellPrice: '50'
    };
    this.response.flightPricingPage.bounds[0]._links = {
      flightPricingUpsellSingleBound: {
        body: {
          adultPassengers: {
            productIds: ['testDepartureProductId'],
            numberOfPassengers: '3'
          },
          promoCodeToken: null,
          chaseSessionId: null,
          itineraryPricingToken: 'departure-itinerary-token',
          upsellToken: 'testDepartureUpsellToken'
        },
        href: '/v1/mobile-air-booking/page/flights/prices',
        method: 'POST'
      }
    };
    this.response.flightPricingPage.bounds[1].upsellBoundDetails = {
      selectionText: 'Upgrade returning for $51',
      upsellPrice: '51'
    };
    this.response.flightPricingPage.bounds[1]._links = {
      flightPricingUpsellSingleBound: {
        body: {
          adultPassengers: {
            productIds: ['testReturnProductId'],
            numberOfPassengers: '3'
          },
          promoCodeToken: null,
          chaseSessionId: null,
          itineraryPricingToken: 'return-itinerary-token',
          upsellToken: 'testReturnUpsellToken'
        },
        href: '/v1/mobile-air-booking/page/flights/prices',
        method: 'POST'
      }
    };
    this.response.flightPricingPage._links.flightPricingUpsellBothBounds = {
      body: {
        adultPassengers: {
          productIds: ['testProductId'],
          numberOfPassengers: '3'
        },
        promoCodeToken: null,
        chaseSessionId: null,
        itineraryPricingToken: 'itinerary-token',
        upsellToken: 'testUpsellToken'
      },
      href: '/v1/mobile-air-booking/page/flights/prices',
      method: 'POST'
    };

    return this;
  }

  withReviewMessages() {
    this.response.flightPricingPage.reviewMessages = [
      {
        body: "Your flight has an overnight connection. During this time, you will not have access to your checked baggage as it will be on it's way to your next destination.",
        header: '',
        icon: 'WARNING',
        key: 'BOOKING_PURCHASE_OVERNIGHT',
        textColor: 'DEFAULT'
      }
    ];

    return this;
  }

  withNoPassengerValidation() {
    this.response.flightPricingPage._links.passengerValidation = null;

    return this;
  }

  build() {
    return this.response;
  }
}

export default PricesBuilder;
