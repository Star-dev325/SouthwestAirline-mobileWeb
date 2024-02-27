class PassengerRefundInfoBuilder {
  constructor() {
    this.firstName = 'Mickey';
    this.lastName = 'Mouse';
    this.expirationDate = '2015-03-24';
    this.amountCents = 1566;
  }

  withExpirationDate(expirationDate) {
    this.expirationDate = expirationDate;

    return this;
  }

  withName(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;

    return this;
  }

  withAmountCents(amountCents) {
    this.amountCents = amountCents;

    return this;
  }

  build() {
    return {
      secureFlightName: {
        firstName: this.firstName,
        lastName: this.lastName
      },
      amountCents: this.amountCents,
      expirationDate: this.expirationDate
    };
  }
}

module.exports = PassengerRefundInfoBuilder;
