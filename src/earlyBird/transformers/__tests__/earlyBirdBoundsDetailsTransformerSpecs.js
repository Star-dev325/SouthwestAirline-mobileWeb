import { transformToEarlyBirdBoundDetails } from 'src/earlyBird/transformers/earlyBirdBoundsDetailsTransformer';

describe('transformToFlightDetails', () => {
  it('transform to flight details', () => {
    const passengers = [
      {
        name: 'Fred Flintstone',
        canPurchaseEarlyBird: true,
        accountNumber: '601534942'
      },
      {
        name: 'Barney Rubble',
        canPurchaseEarlyBird: false,
        accountNumber: '601005646'
      }
    ];

    const earlyBirdBoundPrice = {
      amount: '99',
      currencyCode: 'EN',
      currencySymbol: null
    };

    const bounds = [
      {
        arrivalAirportCode: 'MSP',
        arrivalTime: '11:25',
        boundType: 'DEPARTING',
        departureAirportCode: 'DAL',
        departureDate: '2018-05-19',
        departureTime: '06:20',
        earlyBirdBoundPrice: earlyBirdBoundPrice,
        flight: '461/1125',
        isNextDayArrival: false,
        isOvernight: false,
        passengers
      },
      {
        arrivalAirportCode: 'DAL',
        arrivalTime: '17:25',
        boundType: 'RETURNING',
        departureAirportCode: 'MSP',
        departureDate: '2018-06-29',
        departureTime: '15:35',
        earlyBirdBoundPrice: earlyBirdBoundPrice,
        flight: '9982',
        isNextDayArrival: false,
        isOvernight: false,
        passengers
      }
    ];

    const expectedFlightDetails = [
      {
        boundBrief: {
          arrivalAirportCode: 'MSP',
          arrivalTime: '11:25',
          departureAirportCode: 'DAL',
          departureDate: '2018-05-19',
          departureDayOfWeek: 'Saturday',
          departureTime: '06:20',
          isOvernight: false
        },
        boundType: 'DEPARTING',
        passengers
      },
      { 
        boundBrief: {
          arrivalAirportCode: 'DAL',
          arrivalTime: '17:25',
          departureAirportCode: 'MSP',
          departureDate: '2018-06-29',
          departureDayOfWeek: 'Friday',
          departureTime: '15:35',
          isOvernight: false
        },
        boundType: 'RETURNING',
        passengers
      }
    ];

    expect(transformToEarlyBirdBoundDetails(bounds)).to.be.deep.equal(expectedFlightDetails);
  });
});
