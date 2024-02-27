import proxyquire from 'proxyquire';
import { sandbox } from 'sinon';
import AirBookingApplyRapidRewardsPageApiJsonBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/splitPay/applyRapidRewardsPageApiJsonBuilder';
import { getPassengerInfos } from 'test/builders/model/passengerInfosBuilder';
import mockRestClient from 'test/unit/helpers/mockRestClient';

const sinon = sandbox.create();

describe('FlightBookingApi', () => {
  let FlightBookingApi;
  let mockEnvironment;

  beforeEach(() => {
    mockEnvironment = {
      reservations: 'http://reservations.com',
      mobile: 'http://reservations.com',
      accounts: 'http://accounts.com',
      chapiMisc: 'http://mobile-misc.chapi.com',
      chapiAirBooking: 'http://mobile-air-booking.chapi.com',
      chapiAirShopping: 'http://mobile-air-shopping.chapi.com'
    };

    FlightBookingApi = proxyquire('src/shared/api/flightBookingApi', {
      'src/shared/api/restClient': mockRestClient,
      'src/shared/api/apiRoutes': { default: mockEnvironment }
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  context('findFlightProducts', () => {
    let chapiFlightProductSearchRequest;

    beforeEach(() => {
      chapiFlightProductSearchRequest = {
        'origination-airport': 'DAL',
        'destination-airport': 'AUS',
        'departure-date': '2015-06-10',
        'return-date': '2015-06-11',
        'number-adult-passengers': 1,
        'purchase-with': 'money'
      };
    });

    it('should call the CHAPI shopping page API without href', () =>
      FlightBookingApi.findFlightProducts({ query: chapiFlightProductSearchRequest }).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.query).to.deep.equal({
          'origination-airport': 'DAL',
          'destination-airport': 'AUS',
          'departure-date': '2015-06-10',
          'return-date': '2015-06-11',
          'number-adult-passengers': 1,
          'purchase-with': 'money'
        });
        expect(optionsSentToAjax.url).to.equal(
          'http://mobile-air-shopping.chapi.com/v1/mobile-air-shopping/page/flights/products'
        );
      }));

    it('should call the CHAPI shopping page API with href', () =>
      FlightBookingApi.findFlightProducts({
        href: 'testhref',
        query: chapiFlightProductSearchRequest
      }).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.query).to.deep.equal({
          'origination-airport': 'DAL',
          'destination-airport': 'AUS',
          'departure-date': '2015-06-10',
          'return-date': '2015-06-11',
          'number-adult-passengers': 1,
          'purchase-with': 'money'
        });
        expect(optionsSentToAjax.url).to.equal('http://mobile-air-shopping.chapi.com/testhref');
      }));
  });

  context('getProductPrices', () => {
    let chapiGetProductPricesRequest;

    beforeEach(() => {
      chapiGetProductPricesRequest = {
        href: 'v1/mobile-air-booking/page/flights/prices',
        method: 'POST',
        body: {
          adultPassengers: {
            numberOfPassengers: 1,
            productIds: ['productId=']
          },
          currency: 'USD',
          promoCodeToken: null,
          chaseSessionId: null
        }
      };
    });

    it('should call the pricing API with the correct content type', () =>
      FlightBookingApi.getProductPrices(chapiGetProductPricesRequest).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.contentType).to.equal('application/json');
      }));

    it('should call the pricing API with the correct body', () =>
      FlightBookingApi.getProductPrices(chapiGetProductPricesRequest).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.body).to.deep.equal(chapiGetProductPricesRequest.body);
      }));

    it('should call the pricing API with the correct href and method', () =>
      FlightBookingApi.getProductPrices(chapiGetProductPricesRequest).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).to.equal(
          'http://mobile-air-booking.chapi.com/v1/mobile-air-booking/page/flights/prices'
        );
        expect(optionsSentToAjax.type).to.equal('POST');
      }));
  });

  context('retrieveEarlyBirdInPathInfo', () => {
    let mockRequest;

    beforeEach(() => {
      mockRequest = {
        href: '/v1/mobile-air-booking/feature/earlybird/prices',
        method: 'POST',
        body: {}
      };
    });

    it('should get early bird pricing API with the correct request', () =>
      FlightBookingApi.retrieveEarlyBirdInPathInfo(mockRequest).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.body).to.deep.equal(mockRequest.body);
        expect(optionsSentToAjax.contentType).to.equal('application/json');
        expect(optionsSentToAjax.url).to.equal(
          'http://mobile-air-booking.chapi.com/v1/mobile-air-booking/feature/earlybird/prices'
        );
        expect(optionsSentToAjax.type).to.equal('POST');
      }));
  });

  context('purchaseFlight', () => {
    let chapiPurchaseFlightRequest;

    beforeEach(() => {
      chapiPurchaseFlightRequest = {
        href: 'v1/mobile-air-booking/page/flights/purchase',
        xhref: 'v1/mobile-air-booking/page/flights/x-purchase',
        xphref: 'v1/mobile-air-booking/page/flights/express-purchase',
        method: 'POST',
        body: {
          contactInformation: {
            phoneNumber: 11234564567
          },
          payment: {},
          reservationGroups: []
        }
      };
    });

    it('should call the purchase API with the correct content type', () =>
      FlightBookingApi.purchaseFlight(chapiPurchaseFlightRequest).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.contentType).to.equal('application/json');
      }));

    it('should call the secure purchase API with the correct content type', () =>
      FlightBookingApi.purchaseFlight(chapiPurchaseFlightRequest, true).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.contentType).to.equal('application/json');
        expect(optionsSentToAjax.authentication).to.be.true;
      }));

    it('should call the purchase API with the correct body', () =>
      FlightBookingApi.purchaseFlight(chapiPurchaseFlightRequest).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.body).to.deep.equal(chapiPurchaseFlightRequest.body);
      }));

    it('should call the secure purchase API with the correct body', () =>
      FlightBookingApi.purchaseFlight(chapiPurchaseFlightRequest, true).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.body).to.deep.equal(chapiPurchaseFlightRequest.body);
      }));

    it('should call the purchase API with the correct href and method', () =>
      FlightBookingApi.purchaseFlight(chapiPurchaseFlightRequest).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).to.equal(
          'http://mobile-air-booking.chapi.com/v1/mobile-air-booking/page/flights/purchase'
        );
        expect(optionsSentToAjax.type).to.equal('POST');
      }));

    it('should call the secure purchase API with the correct xhref and method', () => {
      FlightBookingApi = proxyquire('src/shared/api/flightBookingApi', {
        'src/shared/api/restClient': mockRestClient,
        'src/shared/helpers/loginSessionHelper': {
          hasActiveSessionCookies: sinon.stub().returns(true)
        },
        'src/shared/api/apiRoutes': { default: mockEnvironment }
      });

      return FlightBookingApi.purchaseFlight(chapiPurchaseFlightRequest, true).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).to.equal(
          'http://mobile-air-booking.chapi.com/v1/mobile-air-booking/page/flights/x-purchase'
        );
        expect(optionsSentToAjax.type).to.equal('POST');
      });
    });

    it('should call the x-purchase API with the xhref', () =>
      FlightBookingApi.purchaseFlight(chapiPurchaseFlightRequest, true, false).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).to.equal(
          'http://mobile-air-booking.chapi.com/v1/mobile-air-booking/page/flights/x-purchase'
        );
        expect(optionsSentToAjax.type).to.equal('POST');
      }));

    it('should call the purchase API with href', () =>
      FlightBookingApi.purchaseFlight(chapiPurchaseFlightRequest, false, false).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).to.equal(
          'http://mobile-air-booking.chapi.com/v1/mobile-air-booking/page/flights/purchase'
        );
        expect(optionsSentToAjax.type).to.equal('POST');
      }));

    it('should call the express purchase API with the xphref', () =>
      FlightBookingApi.purchaseFlight(chapiPurchaseFlightRequest, true, true).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).to.equal(
          'http://mobile-air-booking.chapi.com/v1/mobile-air-booking/page/flights/express-purchase'
        );
        expect(optionsSentToAjax.type).to.equal('POST');
      }));

    it('should call the express purchase API with xphref', () =>
      FlightBookingApi.purchaseFlight(chapiPurchaseFlightRequest, false, true).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).to.equal(
          'http://mobile-air-booking.chapi.com/v1/mobile-air-booking/page/flights/express-purchase'
        );
        expect(optionsSentToAjax.type).to.equal('POST');
      }));
  });

  context('fetchShoppingDetails', () => {
    it('should call shopping details from mobile-air-booking', () =>
      FlightBookingApi.fetchShoppingDetails().then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).to.equal(
          'http://mobile-air-booking.chapi.com/v1/mobile-air-booking/feature/shopping-details'
        );
      }));
  });

  context('Split Pay Radio Options List', () => {
    let splitPayOptionsRequest;

    beforeEach(() => {
      splitPayOptionsRequest = new AirBookingApplyRapidRewardsPageApiJsonBuilder().build();
    });

    it('should fetch splitPay options with correct body', () =>
      FlightBookingApi.fetchSplitPayOptionsList(splitPayOptionsRequest).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.body).to.deep.equal({
          fundsAppliedToken: 'funds-token',
          itineraryPricingToken: 'itinerary-token',
          offerId: '3204890832666624',
          passengers: [
            {
              accountNumber: '1234567890',
              dateOfBirth: '10-2-1987',
              gender: 'M',
              name: {
                firstName: 'Fred',
                middleName: 'john',
                lastName: 'Flintstone',
                suffix: 'Mr.'
              },
              passengerReference: 1,
              passengerType: 'ADULT'
            }
          ],
          promoCodeToken: 'promoCodeToken'
        });
      }));

    it('should fetch splitPay options with current contentType', () =>
      FlightBookingApi.fetchSplitPayOptionsList(splitPayOptionsRequest).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.contentType).to.equal('application/json');
      }));

    it('should fetch splitPay options with current href', () =>
      FlightBookingApi.fetchSplitPayOptionsList(splitPayOptionsRequest).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).to.equal(
          'http://mobile-air-booking.chapi.com/v1/mobile-air-booking/feature/split-pay-options-secure'
        );
      }));

    it('should fetch splitPay options with current method', () =>
      FlightBookingApi.fetchSplitPayOptionsList(splitPayOptionsRequest).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.type).to.equal('POST');
      }));
  });

  context('calc travel funds', () => {
    it('should call calc travel funds API with auth header and RTF info when user is logged in', () => {
      const rtfCalcRequest = {
        href: '/v1/mobile-air-booking/page/calculate-funds/TRAVEL_FUND',
        method: 'POST',
        body: {
          travelFundIdentifier: 'fund1',
          firstName: 'Fred',
          lastName: 'Flintstone',
          passengers: {
            passengerReference: '1',
            passengerType: 'ADULT',
            name: {
              firstName: 'Fred',
              lastName: 'Flintstone'
            }
          }
        }
      };

      return FlightBookingApi.calculateFunds(rtfCalcRequest, true).then((optionsSentToAjax) => {
        expect(optionsSentToAjax).to.deep.equal({
          url: 'http://mobile-air-booking.chapi.com/v1/mobile-air-booking/page/calculate-funds/TRAVEL_FUND',
          type: 'POST',
          authentication: true,
          body: {
            travelFundIdentifier: 'fund1',
            firstName: 'Fred',
            lastName: 'Flintstone',
            passengers: {
              passengerReference: '1',
              passengerType: 'ADULT',
              name: {
                firstName: 'Fred',
                lastName: 'Flintstone'
              }
            }
          },
          contentType: 'application/json',
          dataType: 'json'
        });
      });
    });

    it('should call calc travel funds API with auth header, id, and securityCode for giftcards/vouchers when user is logged in', () => {
      const giftCardCalcRequest = {
        href: '/v1/mobile-air-booking/page/calculate-funds/GIFT_CARD',
        method: 'POST',
        body: {
          travelFundIdentifier: 'fund1',
          securityCode: '1234',
          passengers: {
            passengerReference: '1',
            passengerType: 'ADULT',
            name: {
              firstName: 'Fred',
              lastName: 'Flintstone'
            }
          }
        }
      };

      return FlightBookingApi.calculateFunds(giftCardCalcRequest, true).then((optionsSentToAjax) => {
        expect(optionsSentToAjax).to.deep.equal({
          url: 'http://mobile-air-booking.chapi.com/v1/mobile-air-booking/page/calculate-funds/GIFT_CARD',
          type: 'POST',
          authentication: true,
          body: {
            travelFundIdentifier: 'fund1',
            securityCode: '1234',
            passengers: {
              passengerReference: '1',
              passengerType: 'ADULT',
              name: {
                firstName: 'Fred',
                lastName: 'Flintstone'
              }
            }
          },
          contentType: 'application/json',
          dataType: 'json'
        });
      });
    });

    it('should call calc travel funds API without auth header, with id and securityCode for giftcards/vouchers when user is logged out', () => {
      const giftCardCalcRequest = {
        href: '/v1/mobile-air-booking/page/calculate-funds/GIFT_CARD',
        method: 'POST',
        body: {
          travelFundIdentifier: 'fund1',
          securityCode: '1234',
          passengers: {
            passengerReference: '1',
            passengerType: 'ADULT',
            name: {
              firstName: 'Fred',
              lastName: 'Flintstone'
            }
          }
        }
      };

      return FlightBookingApi.calculateFunds(giftCardCalcRequest, false).then((optionsSentToAjax) => {
        expect(optionsSentToAjax).to.deep.equal({
          url: 'http://mobile-air-booking.chapi.com/v1/mobile-air-booking/page/calculate-funds/GIFT_CARD',
          type: 'POST',
          body: {
            travelFundIdentifier: 'fund1',
            securityCode: '1234',
            passengers: {
              passengerReference: '1',
              passengerType: 'ADULT',
              name: {
                firstName: 'Fred',
                lastName: 'Flintstone'
              }
            }
          },
          contentType: 'application/json',
          dataType: 'json'
        });
      });
    });
  });

  context('Low Fare Calendar', () => {
    let lfcRequest;

    beforeEach(() => {
      lfcRequest = {
        'origination-airport': 'DAL',
        'destination-airport': 'AUS',
        'departure-date': '2015-06-10',
        'return-date': '2015-06-11',
        'number-adult-passengers': 1,
        currency: 'USD'
      };
    });

    it('should fetch low fare calendar correctly', () =>
      FlightBookingApi.getLowFareCalendar({ query: lfcRequest }).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.query).to.deep.equal({
          'origination-airport': 'DAL',
          'destination-airport': 'AUS',
          'departure-date': '2015-06-10',
          'return-date': '2015-06-11',
          'number-adult-passengers': 1,
          currency: 'USD'
        });
        expect(optionsSentToAjax.url).to.equal(
          'http://mobile-air-shopping.chapi.com/v1/mobile-air-shopping/page/flights/low-fare-calendar/products'
        );
      }));
  });

  describe('findMultiSelectGroup', () => {
    const mockRequest = {
      href: 'v1/mobile-air-shopping/page/flights/multiple-airports',
      method: 'POST',
      body: {
        destinationAirport: 'AUS',
        numberAdultPassengers: 1,
        currency: 'USD',
        departureDate: '2022-09-18',
        multipleOriginationAirportGroupName: 'Chicago',
        multipleOriginationAirports: ['MDW', 'ORD']
      }
    };

    it('should fetch multipleAiport data correctly', () =>
      FlightBookingApi.findMultiSelectGroup(mockRequest).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.body).to.deep.equal({
          destinationAirport: 'AUS',
          numberAdultPassengers: 1,
          currency: 'USD',
          departureDate: '2022-09-18',
          multipleOriginationAirportGroupName: 'Chicago',
          multipleOriginationAirports: ['MDW', 'ORD']
        });
        expect(optionsSentToAjax.url).to.equal(
          'http://mobile-air-shopping.chapi.com/v1/mobile-air-shopping/page/flights/multiple-airports'
        );
      }));
  });

  describe('passengerValidationCall', () => {
    const mockPassengerInfos = getPassengerInfos();
    const passengerValidation = {
      body: {
        adultPassengers: {
          productIds: ['testOutboundProductId', 'testInboundProductId']
        }
      },
      href: 'http://mobile-air-booking.chapi.com/v1/mobile-air-booking/feature/passenger-validation',
      method: 'POST'
    };

    it('should fetch passenger validations', () =>
      FlightBookingApi.passengerValidationCall(mockPassengerInfos, passengerValidation).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.body).to.deep.equal({
          passengers: [
            {
              accountNumber: '600597056',
              dateOfBirth: '1959-12-22',
              gender: 'M',
              knownTravelerId: '42345345',
              name: {
                firstName: 'Andrew',
                middleName: null,
                lastName: 'Phillips',
                suffix: null
              },
              passengerReference: 2,
              redressNumber: '123435456'
            }
          ],
          productIds: ['testOutboundProductId', 'testInboundProductId']
        });
        expect(optionsSentToAjax.url).to.equal(
          'http://mobile-air-booking.chapi.com/v1/mobile-air-booking/feature/passenger-validation'
        );
      }));

    it('should fetch passenger validations with null data if passengerInfos is empty', async () => {
      const mockPassengerInfos = [];
      const passengerValidation = {
        href: 'http://mobile-air-booking.chapi.com/v1/mobile-air-booking/feature/passenger-validation'
      };

      FlightBookingApi.passengerValidationCall(mockPassengerInfos, passengerValidation).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.body).to.deep.equal({
          passengers: null,
          productIds: null
        });
        expect(optionsSentToAjax.url).to.equal('http://mobile-air-booking.chapi.com/v1/mobile-air-booking/feature/passenger-validation');
      });
    });
  });
});
