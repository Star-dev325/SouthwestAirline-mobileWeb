function AirportBuilder() {
  this.code = 'CAK';
  this.cityName = 'Akron';
  this.shortDisplayName = 'Akron';
  this.cityState = 'OH';
  this.airportName = 'Akron Airport (CAK)';
  this.countryCode = 'US';
  this.displayName = 'Akron Airport (CAK)';

  this.withCode = function(code) {
    this.code = code;

    return this;
  };

  this.withCityName = function(cityName) {
    this.cityName = cityName;

    return this;
  };

  this.withShortDisplayName = function(shortDisplayName) {
    this.shortDisplayName = shortDisplayName;

    return this;
  };

  this.withCityState = function(cityState) {
    this.cityState = cityState;

    return this;
  };

  this.withAirportName = function(airportName) {
    this.airportName = airportName;

    return this;
  };

  this.withCountryCode = function(countryCode) {
    this.countryCode = countryCode;

    return this;
  };

  this.withDisplayName = function(displayName) {
    this.displayName = displayName;

    return this;
  };

  this.buildEmptyAirport = function() {
    return {
      cityName: this.cityName,
      cityState: this.cityState,
      airportCode: this.code
    };
  };

  this.build = function() {
    return {
      code: this.code,
      cityName: this.cityName,
      shortDisplayName: this.shortDisplayName,
      displayName: this.displayName,
      airportName: this.airportName,
      cityState: this.cityState,
      marketingCarriers: [
        'WN'
      ],
      countryCode: this.countryCode,
      longitude: '-81.4422',
      latitude: '40.9161',
      airportSearchName: 'Ohio'
    };
  };
}

module.exports = AirportBuilder;
