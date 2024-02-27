import { SPLIT_PAY_CALC_FUNDS_HREF } from 'src/airBooking/constants/airBookingConstants';

export default class SplitPayCalcFundsApiJsonBuilder {
  constructor() {
    this.splitPayCalcFundsRequest = {
      href: SPLIT_PAY_CALC_FUNDS_HREF,
      method: 'POST',
      body: {
        cashPointsPage: true,
        travelFundIdentifier: 'ABC123',
        firstName: 'Fred',
        lastName: 'Flintstone',
        fundsAppliedToken: 'funds-token',
        itineraryPricingToken: 'itinerary-token',
        passengers: [
          {
            accountNumber: '1234567890',
            dateOfBirth: '1954-4-19',
            gender: 'M',
            passengerReference: 1,
            passengerType: 'ADULT',
            name: {
              firstName: 'Fred',
              lastName: 'Flintstone',
              middleName: null,
              suffix: 'Mr.'
            }
          }
        ]
      }
    };
  }

  build() {
    return this.splitPayCalcFundsRequest;
  }
}
