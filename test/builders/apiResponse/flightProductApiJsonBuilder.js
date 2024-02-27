const FareProductApiJsonBuilder = require('test/builders/apiResponse/fareProductApiJsonBuilder');
const SegmentApiJsonBuilder = require('test/builders/apiResponse/segmentApiJsonBuilder');

module.exports = function FlightProductApiJsonBuilder() {
  this.durationMinutes = 230;
  this.segments = [
    new SegmentApiJsonBuilder().build(),
    new SegmentApiJsonBuilder().build()
  ];

  this.fareProducts = [
    new FareProductApiJsonBuilder()
      .setFareType('Business Select')
      .setTotalFareCents(50)
      .build()
  ];

  this.setSegments = function(segments) {
    this.segments = segments;

    return this;
  };

  this.setFareProducts = function(fareProducts) {
    this.fareProducts = fareProducts;

    return this;
  };

  this.setDurationMinutes = function(durationMinutes) {
    this.durationMinutes = durationMinutes;

    return this;
  };

  this.build = function() {
    return {
      durationMinutes: this.durationMinutes,
      segments: this.segments,
      fareProducts: this.fareProducts
    };
  };
};
