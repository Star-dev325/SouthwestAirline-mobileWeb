import EarlyBirdInPathBoundBuilder from 'test/builders/apiResponse/earlyBirdInPathBoundBuilder';

export default class EarlyBirdInPathPricesBuilder {
  constructor() {
    this.unitPrice = {
      amount: '15.00',
      currencyCode: 'USD',
      currencySymbol: '$',
      description: 'per passenger, each way'
    };
    this.totalPrice = {
      amount: '15.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    };
    this.passengers = [
      {
        accountNumber: null,
        dateOfBirth: '1937-02-03',
        gender: 'M',
        name: {
          firstName: 'Charith',
          lastName: 'Janusz',
          middleName: ''
        },
        passengerReference: '2'
      }
    ];
    this.bounds = new EarlyBirdInPathBoundBuilder().singleAdultOneWayEligibleEarlyBird().build().bounds;
  }

  withRoundTripBounds() {
    this.bounds = new EarlyBirdInPathBoundBuilder().singleAdultRoundTripEligibleEarlyBird().build().bounds;

    return this;
  }

  withMultipleAdultRoundTrip() {
    this.bounds = new EarlyBirdInPathBoundBuilder().multipleAdultRoundTripEligibleEarlyBird().build().bounds;

    return this;
  }

  withBounds(bounds) {
    this.bounds = bounds;

    return this;
  }

  build() {
    const { unitPrice, totalPrice, passengers, bounds } = this;

    return {
      earlyBirdEligibility: {
        unitPrice,
        totalPrice,
        bounds,
        seniorProductsCount: '0',
        adultProductsCount: '1',
        ineligibilityReasons: null,
        _meta: {
          passengers
        }
      }
    };
  }
}
