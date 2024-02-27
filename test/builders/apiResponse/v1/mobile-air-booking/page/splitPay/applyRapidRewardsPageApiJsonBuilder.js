export default class AirBookingApplyRapidRewardsPageApiJsonBuilder {
  constructor() {
    this.splitPayOptionsRequest = {
      href: '/v1/mobile-air-booking/feature/split-pay-options-secure',
      method: 'POST',
      body: {
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
      }
    };
  }

  build() {
    return this.splitPayOptionsRequest;
  }
}
