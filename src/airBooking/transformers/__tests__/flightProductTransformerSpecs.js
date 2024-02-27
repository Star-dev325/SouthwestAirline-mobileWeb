import { transformToFlightPricingPageRequest } from 'src/airBooking/transformers/flightProductTransformer';

describe('flightProductTransformerSpecs', () => {
  it('should transform to get product pricing api request', () => {
    const searchFlightRequest = {
      tripType: 'oneWay',
      isRoundTrip: false,
      origin: 'ALB',
      destination: 'AMA',
      departureDate: '2017-11-04',
      returnDate: '',
      numberOfAdults: 2,
      promoCode: '',
      currencyType: 'USD',
      numberOfLapInfants: 1
    };
    const pricingPageRequest = {
      href: 'v1/mobile-air-booking/page/flights/prices',
      method: 'POST',
      body: {
        adultPassengers: null,
        currency: 'USD',
        promoCodeToken: null,
        chaseSessionId: null,
        lapInfantPassengerCount: null
      }
    };
    const selectedProducts = {
      adult: {
        outbound: {
          fareProductId: 'productId1',
          flightCardIndex: 0
        }
      }
    };

    const request = transformToFlightPricingPageRequest(selectedProducts, pricingPageRequest, searchFlightRequest);

    const expectedRequest = {
      href: 'v1/mobile-air-booking/page/flights/prices',
      method: 'POST',
      body: {
        adultPassengers: {
          numberOfPassengers: 2,
          productIds: ['productId1']
        },
        currency: 'USD',
        promoCodeToken: null,
        chaseSessionId: null,
        lapInfantPassengerCount: 1
      }
    };

    expect(request).to.deep.equal(expectedRequest);
  });
});
