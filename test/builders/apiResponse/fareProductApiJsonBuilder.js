module.exports = function FareProductApiJsonBuilder() {
  this.fareType = 'Business Select';
  this.totalFareCents = 33850;
  this.discountedTotalFareCents = 2000;
  this.unavailabilityReason = 'NONE';
  this.productId = 'QW1lcmljYS9DaGljYWdvfDIwMTUwNjEzMDYyMCwyMDE1MDYxMzExMTB8REFMLVNUTCxTVEwtQVRMfFdOMTI2NixXTjEzNTF8S3xBRFR8NzNXLDczVw==';

  this.setFareType = function(fareType) {
    this.fareType = fareType;

    return this;
  };

  this.setTotalFareCents = function(totalFareCents) {
    this.totalFareCents = totalFareCents;

    return this;
  };

  this.setDiscountedTotalFareCents = function(discountedTotalFareCents) {
    this.discountedTotalFareCents = discountedTotalFareCents;

    return this;
  };

  this.setUnavailabilityReason = function(unavailabilityReason) {
    this.unavailabilityReason = unavailabilityReason;

    return this;
  };

  this.setProductId = function(productId) {
    this.productId = productId;

    return this;
  };

  this.build = function() {
    return {
      productId: this.productId,
      fareType: this.fareType,
      seatsAvailable: '8',
      unavailabilityReason: this.unavailabilityReason,
      bookingCode: 'K',
      fareBasisCode: 'KZBP',
      paxPricingType: 'ADT',
      currencyPrice: {
        totalFareCents: this.totalFareCents,
        discountedTotalFareCents: this.discountedTotalFareCents,
        accrualPoints: 3526
      }
    };
  };

  this.buildWithoutCurrencyPrice = function() {
    return {
      productId: this.productId,
      fareType: this.fareType,
      seatsAvailable: '8',
      unavailabilityReason: this.unavailabilityReason,
      bookingCode: 'K',
      fareBasisCode: 'KZBP',
      paxPricingType: 'ADT'
    };
  };
};
