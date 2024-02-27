function ChapiSavedFlightBuilder() {
  this.origin = 'HOU';
  this.destination = 'DAL';
  this.type = 'ONE_WAY';
  this.firstDate = '2015-04-07';
  this.secondDate = null;
  this.destinationDescription = 'Dallas (Love Field), TX';
  this.originDescription = 'Houston (Hobby), TX';
  this.originDepartureDate = '2015-04-07';
  this.destinationDepartureDate = null;
  this.numberAdults = 1;
  this.promoCode = '';
  this.currencyType = 'DOLLARS';
  this.checkPriceMessage = null;

  this.withOrigin = function(origin) {
    this.origin = origin;

    return this;
  };

  this.withDestination = function(destination) {
    this.destination = destination;

    return this;
  };

  this.withType = function(type) {
    this.type = type;

    return this;
  };

  this.withFirstDate = function(firstDate) {
    this.firstDate = firstDate;

    return this;
  };

  this.withSecondDate = function(secondDate) {
    this.secondDate = secondDate;

    return this;
  };

  this.withDestinationDescription = function(destinationDescription) {
    this.destinationDescription = destinationDescription;

    return this;
  };

  this.withOriginDescription = function(originDescription) {
    this.originDescription = originDescription;

    return this;
  };

  this.withOriginDepartureDate = function(originDepartureDate) {
    this.originDepartureDate = originDepartureDate;

    return this;
  };

  this.withDestinationDepartureDate = function(destinationDepartureDate) {
    this.destinationDepartureDate = destinationDepartureDate;

    return this;
  };

  this.withNumberOfAdults = function(numberAdults) {
    this.numberAdults = numberAdults;

    return this;
  };

  this.withPromoCode = function(promoCode) {
    this.promoCode = promoCode;

    return this;
  };

  this.withCurrencyType = function(currencyType) {
    this.currencyType = currencyType;

    return this;
  };

  this.withCheckPriceMessage = function() {
    this.checkPriceMessage = 'well hello there';

    return this;
  };

  this.build = function() {
    return {
      dates: {
        first: this.firstDate,
        second: this.secondDate
      },
      originDescription: this.originDescription,
      destinationDescription: this.destinationDescription,
      passengers: {
        adults: this.numberAdults
      },
      checkPriceMessage: this.checkPriceMessage,
      _links: null,
      _v1_infoNeededToCheckPrice: {
        type: this.type,
        origin: this.origin,
        destination: this.destination,
        originDepartureDate: this.originDepartureDate,
        destinationDepartureDate: this.destinationDepartureDate,
        promoCode: this.promoCode,
        currencyType: this.currencyType,
        numberAdults: this.numberAdults
      }
    };
  };
}

export default ChapiSavedFlightBuilder;
