class FlightProductItem {
  constructor() {
    this.bookingCode = 'N';
    this.currencyPriceDetails = {
      baseFareCents: 11628,
      discountedBaseFareCents: 11628,
      segmentFees: [{
        passengerFacilityChargeCents: 450,
        securityFeeCents: 560,
        segmentFeeCents: 400
      }, {
        passengerFacilityChargeCents: 450,
        securityFeeCents: 0,
        segmentFeeCents: 400
      }],
      taxCents: 872
    };
    this.productId = 'TkxBMFZOUk98QW1lcmljYS9OZXdfWW9ya3wyMDE2MDUwNDA1NDAsMjAxNjA1MDQwODI1fEFUTC1EQUwsREFMLUFVU3xXTjc0NCxXTjEwN3xOfE5SRnw3M1csNzNX';
    this.totalCents = 14760;
  }

  withProductId(productId) {
    this.productId = productId;

    return this;
  }

  build() {
    return {
      bookingCode: this.bookingCode,
      currencyPriceDetails: this.currencyPriceDetails,
      productId: this.productId,
      totalCents: this.totalCents
    };
  }
}

module.exports = FlightProductItem;
