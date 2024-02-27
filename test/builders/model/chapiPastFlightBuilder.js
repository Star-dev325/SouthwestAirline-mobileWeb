function ChapiPastFlightBuilder() {
  this.origin = 'HOU';
  this.destination = 'DAL';
  this.type = 'ROUND_TRIP';
  this.confirmationNumber = 'F4HYUR';
  this.firstDate = '2015-04-07';
  this.secondDate = null;
  this.destinationDescription = 'Dallas (Love Field), TX';
  this.originDescription = 'Houston (Hobby), TX';
  this.isRebookable = true;

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

  this.withConfirmationNumber = function(confirmationNumber) {
    this.confirmationNumber = confirmationNumber;

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

  this.withIsRebookable = function(isRebookable) {
    this.isRebookable = isRebookable;

    return this;
  };

  this.build = function() {
    return {
      _infoNeededToRebook: {
        destination: this.destination,
        origin: this.origin,
        type: this.type
      },
      confirmationNumber: this.confirmationNumber,
      dates: {
        first: this.firstDate,
        second: this.secondDate
      },
      destinationDescription: this.destinationDescription,
      isRebookable: this.isRebookable,
      originDescription: this.originDescription
    };
  };
}

module.exports = ChapiPastFlightBuilder;
