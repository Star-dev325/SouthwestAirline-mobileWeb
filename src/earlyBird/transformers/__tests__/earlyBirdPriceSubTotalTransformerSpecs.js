import { transformToEarlyBirdPriceSubTotal } from 'src/earlyBird/transformers/earlyBirdPriceSubTotalTransformer';
import EarlyBirdDetailFormDataBuilder from 'test/builders/formData/earlyBirdDetailFormDataBuilder';

describe('transformToEarlyBirdPriceSubTotal', () => {
  it('transform bounds to early bird price sub total', () => {
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
        }
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
        }
      }
    ];

    const formData = new EarlyBirdDetailFormDataBuilder().build();

    const expected = [
      {
        departureAirportCode: 'DAL',
        arrivalAirportCode: 'MSP',
        earlyBirdBoundPrice: {
          amount: '15.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        flight: '461/1125',
        selectedPaxCount: 1,
        totalBoundPrice: {
          amount: '15.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      {
        departureAirportCode: 'MSP',
        arrivalAirportCode: 'DAL',
        earlyBirdBoundPrice: {
          amount: '15.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        flight: '9982',
        selectedPaxCount: 1,
        totalBoundPrice: {
          amount: '15.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      }
    ];

    expect(transformToEarlyBirdPriceSubTotal(bounds, formData)).to.deep.equal(expected);
  });
});
