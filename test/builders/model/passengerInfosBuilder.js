import _ from 'lodash';
import PassengerInfoBuilder from 'test/builders/model/passengerInfoBuilder';

const PassengerInfosBuilder = {

  getWAPIPassengerInfos() {
    return [{
      firstName: 'Qianqian',
      middleName: '',
      lastName: 'Johnson',
      gender: 'Female',
      dateOfBirth: '1900-08-03',
      contactMethod: 'EMAIL',
      email: 'kpaxqin@foxmail.com',
      phoneNumber: '',
      phoneCountryCode: '1',
      emailReceiptTo: 'sdfds@wdfd.com',
      accountNumber: '',
      redressNumber: '',
      knownTravelerNumber: '',
      type: 'adult'
    }, {
      firstName: 'Qianqian',
      middleName: '',
      lastName: 'Johnson',
      gender: 'Female',
      dateOfBirth: '1900-08-03',
      accountNumber: '',
      redressNumber: '',
      knownTravelerNumber: '',
      type: 'adult'
    }];
  },

  initPassengerInfos() {
    this.state = this.getWAPIPassengerInfos();

    return this;
  },

  withSaveContactMethod() {
    this.state = _.merge(this.state, [{ saveContactMethod: 'true' }]);

    return this;
  },

  withCallMe() {
    this.state = _.merge(this.state, [{
      contactMethod: 'CALL',
      phoneNumber: '123-132-1312',
      phoneCountryCode: '1',
      email: ''
    }]);

    return this;
  },

  withTextMe() {
    this.state = _.merge(this.state, [{
      contactMethod: 'TEXT',
      phoneNumber: '123-999-999',
      phoneCountryCode: '1',
      email: ''
    }]);

    return this;
  },

  build() {
    return this.state;
  },
  withCountryCode(code) {
    this.state = _.merge(this.state, [{
      phoneCountryCode: code
    }]);

    return this;
  },

  formatContactMethodFromWapiToChapi() {
    this.state = this.state.map((passenger, index) => {
      const omitPassengerInfo = _.omit(passenger, ['phoneNumber', 'email', 'phoneCountryCode']);

      return index === 0
        ? _.merge(omitPassengerInfo, {
          number: passenger.phoneNumber,
          contactEmail: passenger.email,
          countryCode: `+${passenger.phoneCountryCode}`
        })
        : passenger;
    });

    return this;
  },

  getPassengerInfos() {
    return [new PassengerInfoBuilder().build()];
  },

  getPassengerInfosWithInputDOBFormat() {
    return [
      new PassengerInfoBuilder()
        .withDateOfBirth('05/06/1977')
        .build()
    ];
  },

  getCompanionPassengerInfos() {
    return [
      new PassengerInfoBuilder()
        .withFirstName('Companion')
        .withLastName('Wang')
        .build()
    ];
  },

  getMultipleAdultPassengers() {
    return [
      new PassengerInfoBuilder().build(),
      new PassengerInfoBuilder().build()
    ];
  },

  getMultipleAdultPassengersWithInputDOBFormat() {
    return [
      new PassengerInfoBuilder()
        .withDateOfBirth('05/06/1977')
        .build(),
      new PassengerInfoBuilder()
        .withDateOfBirth('12/14/2008')
        .build()
    ];
  },

  getPassengerWithSuffix() {
    const passengers = [
      new PassengerInfoBuilder().withSuffix('CEO').build()
    ];

    return passengers;
  },

  getFrequentTravelerPassengerInfos() {
    return [
      {
        departureDate: '2023-01-29',
        passportAndEmergencyContact: {
          passportNumber: "123456789",
          passportIssuedBy: "AS",
          nationality: "AF",
          passportExpirationDate: "2023-03-17",
          countryOfResidence: "AF"
        },
        passengerInfo: {
          dateOfBirth: '1995-04-23',
          gender: 'M',
          middleName: 'yg',
          firstName: 'Minnie',
          lastName: 'Haynes',
          contactMethod: 'CALL_ME',
          contactEmail: 'minniehaynes4@test.com',
          number: '2154545451',
          countryCode: '01',
          emailReceiptTo: 'minniehaynes4@test.com',
          contactPhone: { countryCode: '1', number: '2154545451' },
          allowAddFrequentTraveler: true
        }
      },
      {
        departureDate: '2023-01-29',
        passengerInfo: {
          dateOfBirth: '1997-04-23',
          gender: 'M',
          middleName: 'yg',
          firstName: 'Minnie',
          lastName: 'Haynes',
          contactMethod: 'CALL_ME',
          contactEmail: 'minniehaynes5@test.com',
          number: '2154545451',
          countryCode: '01',
          emailReceiptTo: 'minniehaynes5@test.com',
          contactPhone: { countryCode: '1', number: '2154545451' },
          allowAddFrequentTraveler: true
        }
      }
    ];
  },

  getLapChildPassengerInfos() {
    return [
      {
        type: 'adult',
        departureDate: '2015-02-01',
        passengerInfo: {
          firstName: 'test',
          lastName: 'wang',
          gender: 'M',
          dateOfBirth: '2015-02-01'
        },
        passengerReference: 2
      },
      {
        type: 'adult',
        departureDate: '2015-02-01',
        passengerInfo: {
          firstName: 'james',
          lastName: 'bond',
          gender: 'M',
          dateOfBirth: '2015-02-01'
        },
        passengerReference: 3
      },
      {
        type: 'lapChild',
        departureDate: '2022-02-01',
        passengerInfo: {
          firstName: 'don',
          lastName: 'jon',
          gender: 'M',
          dateOfBirth: '2021-02-01',
          associatedAdult: '2'
        },
        passengerReference: 4
      }
    ];
  }
};

module.exports = PassengerInfosBuilder;
