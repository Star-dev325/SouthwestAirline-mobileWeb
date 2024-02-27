export default class PassengerInfoBuilder {
  constructor() {
    this.dateOfBirth = '1959-12-22';
    this.emailReceiptTo = 'aterris@example.com';
    this.rapidRewardsNumber = '600597056';
    this.gender = 'M';
    this.passengerReference = 2;
    this.firstName = 'Andrew';
    this.lastName = 'Phillips';
    this.suffix = null;
    this.type = 'adult';
  }

  withDateOfBirth(dateOfBirth) {
    this.dateOfBirth = dateOfBirth;

    return this;
  }

  withEmailReceiptTo(emailReceiptTo) {
    this.emailReceiptTo = emailReceiptTo;

    return this;
  }

  withRapidRewardsNumber(rapidRewardsNumber) {
    this.rapidRewardsNumber = rapidRewardsNumber;

    return this;
  }

  withGender(gender) {
    this.gender = gender;

    return this;
  }

  withPassengerReference(passengerReference) {
    this.passengerReference = passengerReference;

    return this;
  }

  withFirstName(firstName) {
    this.firstName = firstName;

    return this;
  }

  withLastName(lastName) {
    this.lastName = lastName;

    return this;
  }

  withSuffix(suffix) {
    this.suffix = suffix;

    return this;
  }

  getAccountInfoWithFrequentTravelerList({ frequentTravelerResponse }) {
    return {
      addFrequentTravelerDisclaimerText: null,
      allowAddFrequentTraveler: false,
      contactEmail: null,
      contactMethod: 'TEXT_ME',
      contactPhone: { countryCode: '1', number: '4693344559' },
      dateOfBirth: '1930-01-01',
      emailReceiptTo: 'test@test.com',
      firstName: 'Peanut',
      frequentTravelerId: 'ACCOUNT',
      frequentTravelerList: frequentTravelerResponse,
      gender: 'M',
      knownTravelerNumber: '74847565',
      lastName: 'Dust',
      middleName: null,
      rapidRewardsNumber: '600650050',
      redressNumber: '22334',
      suffix: null
    };
  }

  getPersonalInfoWithRapidRewardNumber(withFrequentTravlerDetails, rapidRewardNumber) {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      rapidRewardsNumber: rapidRewardNumber,
      ...(withFrequentTravlerDetails ? this.getFrequentTravelerDetails() : {})
    };
  }

  getPersonalInfoWithAccountNumber(withFrequentTravlerDetails, accountNumber) {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      accountNumber: accountNumber,
      ...(withFrequentTravlerDetails ? this.getFrequentTravelerDetails() : {})
    };
  }

  getFrequentTravelerDetails() {
    return {
      frequentTravelerId: '1-30MU1D9',
      frequentTravelerToken:
        'y6aOQD5N_sdzbYIri1Fa8mc1d6F0rcc5QBseJW8n_5juj_lQlLIN6N7lfMG2t1J8c4BWzifbSakSGyLKIxnoDhhgb5'
    };
  }

  build() {
    return {
      type: this.type,
      passengerReference: this.passengerReference,
      passengerInfo: {
        dateOfBirth: this.dateOfBirth,
        emailReceiptTo: this.emailReceiptTo,
        firstName: this.firstName,
        gender: this.gender,
        knownTravelerNumber: '42345345',
        lastName: this.lastName,
        middleName: '',
        suffix: this.suffix,
        number: '248-123-4567',
        rapidRewardsNumber: this.rapidRewardsNumber,
        redressNumber: '123435456',
        shareItineraryEmail: 'test@test.com'
      }
    };
  }
}
