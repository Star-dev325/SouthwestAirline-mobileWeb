'use strict';
const _ = require('lodash');

class PassengerInformationBuilder {
  constructor() {
    this.info = {
      passengerDetailsPage: {
        firstName: 'Ron',
        middleName: null,
        lastName: 'Hackmann',
        dateOfBirth: '1967-01-12',
        gender: 'M',
        rapidRewardsNumber: '600597056',
        contactMethod: '',
        contactPhone: {
          countryCode: '1',
          number: '9123456789'
        },
        contactEmail: null,
        emailReceiptTo: 'abc@example.com',
        redressNumber: '1231234',
        knownTravelerNumber: '981234567'
      }
    };
  }

  build() {
    return this.info;
  }

  withGender(gender) {
    this.info.passengerDetailsPage.gender = gender;

    return this;
  }

  withContactMethodAsEmail(email) {
    this.info.passengerDetailsPage = _.merge(this.info.passengerDetailsPage, {
      contactMethod: 'EMAIL_ME',
      contactEmail: email,
      contactPhone: {
        number: '',
        countryCode: ''
      }
    });

    return this;
  }

  withContactMethodAsCALL(countryCode, number) {
    this.info.passengerDetailsPage = _.merge(this.info.passengerDetailsPage, {
      contactMethod: 'CALL_ME',
      contactEmail: null,
      contactPhone: {
        number,
        countryCode
      }
    });

    return this;
  }

  withContactMethodAsTEXT(countryCode, number) {
    this.info.passengerDetailsPage = _.merge(this.info.passengerDetailsPage, {
      contactMethod: 'TEXT_ME',
      contactEmail: null,
      contactPhone: {
        number,
        countryCode
      }
    });

    return this;
  }

  withRapidRewardsNumber(string) {
    this.info.passengerDetailsPage.rapidRewardsNumber = string;

    return this;
  }

  withRedressNumber(string) {
    this.info.passengerDetailsPage.redressNumber = string;

    return this;
  }

  withKnownTravelerNumber(string) {
    this.info.passengerDetailsPage.knownTravelerNumber = string;

    return this;
  }
}

module.exports = PassengerInformationBuilder;
