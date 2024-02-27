import _ from 'lodash';
import passengerInfosReducer from 'src/airBooking/reducers/passengerInfosReducer';
import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';
import PassengerInfoBuilder from 'test/builders/apiResponse/v1/mobile-misc/page/air-booking/passengerInformationBuilder';

const passengerInfo = {
  firstName: 'Cannon',
  lastName: 'Tangrila',
  gender: 'F',
  dateOfBirth: '1950-12-12'
};

describe('passengerInfosReducer', () => {
  context('when generate passengerIndex info', () => {
    const defaultAdultPassengerInfo = {
      departureDate: '2017-11-25',
      passengerReference: 2,
      type: 'adult'
    };

    let initialState;
    const searchRequest = {
      currencyType: 'money',
      departureDate: '2017-11-25',
      destination: 'AMA',
      isRoundTrip: false,
      numberOfAdults: 5,
      origin: 'ALB',
      promoCode: '',
      returnDate: '',
      tripType: 'oneWay',
      numberOfLapInfants: 0
    };

    it('should generate empty passengerIndexInfo if no exist passengerInfo', () => {
      initialState = [];
      const state = passengerInfosReducer(initialState, {
        type: AirBookingActionTypes.AIR_BOOKING__GENERATE_PASSENGER_PAGE_INFO,
        searchRequest
      });

      expect(state).deep.equal([
        {
          type: 'adult',
          passengerReference: 2,
          departureDate: '2017-11-25'
        },
        {
          type: 'adult',
          passengerReference: 3,
          departureDate: '2017-11-25'
        },
        {
          type: 'adult',
          passengerReference: 4,
          departureDate: '2017-11-25'
        },
        {
          type: 'adult',
          passengerReference: 5,
          departureDate: '2017-11-25'
        },
        {
          type: 'adult',
          passengerReference: 6,
          departureDate: '2017-11-25'
        }
      ]);
    });

    it('should generate empty passengerIndexInfo with empty passengerInfo', () => {
      initialState = [];
      const state = passengerInfosReducer(initialState, {
        type: AirBookingActionTypes.AIR_BOOKING__GENERATE_PASSENGER_PAGE_INFO,
        searchRequest
      });

      expect(state).deep.equal([
        {
          type: 'adult',
          passengerReference: 2,
          departureDate: '2017-11-25'
        },
        {
          type: 'adult',
          passengerReference: 3,
          departureDate: '2017-11-25'
        },
        {
          type: 'adult',
          passengerReference: 4,
          departureDate: '2017-11-25'
        },
        {
          type: 'adult',
          passengerReference: 5,
          departureDate: '2017-11-25'
        },
        {
          type: 'adult',
          passengerReference: 6,
          departureDate: '2017-11-25'
        }
      ]);
    });

    it('should generate passengerInfo when chaseCardHolder not empty', () => {
      initialState = [
        {
          passengerInfo: {
            dateOfBirth: '1900-02-03',
            gender: 'M',
            emailReceiptTo: 'a@a.com'
          }
        }
      ];
      const state = passengerInfosReducer(initialState, {
        type: AirBookingActionTypes.AIR_BOOKING__GENERATE_PASSENGER_PAGE_INFO,
        searchRequest: _.merge({}, searchRequest, { numberOfAdults: 1 }),
        chaseCardHolder: {
          accountNumber: '',
          firstName: 'firstName',
          lastName: 'lastName',
          middleName: 'middleName'
        }
      });

      expect(state).deep.equal([
        {
          type: 'adult',
          passengerReference: 2,
          departureDate: '2017-11-25',
          passengerInfo: {
            rapidRewardsNumber: '',
            firstName: 'firstName',
            lastName: 'lastName',
            middleName: 'middleName',
            dateOfBirth: '1900-02-03',
            gender: 'M',
            emailReceiptTo: 'a@a.com'
          }
        }
      ]);
    });

    it('should return existing passengerInfo merged with default passengerInfo if previous saved adult passengerInfo exists', () => {
      const savedPassenger = new PassengerInfoBuilder().build().passengerDetailsPage;

      initialState = [{ passengerInfo: savedPassenger }];
      const state = passengerInfosReducer(initialState, {
        type: AirBookingActionTypes.AIR_BOOKING__GENERATE_PASSENGER_PAGE_INFO,
        searchRequest: _.merge({}, searchRequest, { numberOfAdults: 1 })
      });

      expect(state).deep.equal([{ ...initialState[0], ...defaultAdultPassengerInfo }]);
    });

    it('should update and return the passenger information if passenger info empty while passport information non-empty', () => {
      initialState = [
        {
          type: 'adult',
          passportAndEmergencyContact: {
            passportNumber: '32131312321',
            passportIssuedBy: 'US',
            nationality: 'US',
            passportExpirationDate: '2019-11-01',
            countryOfResidence: 'US',
            emergencyContactSaveForAllPassengers: '',
            doNotWishToProvideAnEmergencyContact: 'false',
            emergencyContactName: '',
            emergencyContactPhoneNumber: '',
            emergencyContactCountryDialingCode: '',
            emergencyContactCountryCode: 'US'
          }
        }
      ];
      const state = passengerInfosReducer(initialState, {
        type: AirBookingActionTypes.AIR_BOOKING__GENERATE_PASSENGER_PAGE_INFO,
        searchRequest: _.merge({}, searchRequest, { numberOfAdults: 1 })
      });

      expect(state).deep.equal([{ ...initialState[0], ...defaultAdultPassengerInfo }]);
    });
  });

  it('should save passenger information', () => {
    const initState = [
      {
        type: 'adult',
        passengerInfo: {
          dateOfBirth: '1995-09-11',
          firstName: 'Charith',
          gender: 'M',
          knownTravelerNumber: '',
          lastName: 'Claw',
          middleName: '',
          rapidRewardsNumber: '',
          redressNumber: ''
        }
      },
      {
        type: 'adult'
      }
    ];
    const expectedState = [
      {
        type: 'adult',
        passengerInfo: {
          dateOfBirth: '1995-09-11',
          firstName: 'Charith',
          gender: 'M',
          knownTravelerNumber: '',
          lastName: 'Claw',
          middleName: '',
          rapidRewardsNumber: '',
          redressNumber: ''
        }
      },
      {
        type: 'adult',
        passengerInfo: {
          firstName: 'Cannon',
          middleName: '',
          lastName: 'Tangrila',
          gender: 'F',
          dateOfBirth: '1950-12-12',
          contactMethod: 'TEXT',
          contactEmail: '',
          number: '248-123-4567',
          countryCode: '',
          shareItineraryEmail: '',
          rapidRewardsNumber: '',
          redressNumber: '',
          knownTravelerNumber: ''
        }
      }
    ];

    const state = passengerInfosReducer(initState, {
      type: AirBookingActionTypes.AIR_BOOKING__SAVE_PASSENGER,
      index: 1,
      passengerInfo: {
        firstName: 'Cannon',
        middleName: '',
        lastName: 'Tangrila',
        gender: 'F',
        dateOfBirth: '1950-12-12',
        contactMethod: 'TEXT',
        contactEmail: '',
        number: '248-123-4567',
        countryCode: '',
        shareItineraryEmail: '',
        rapidRewardsNumber: '',
        redressNumber: '',
        knownTravelerNumber: ''
      }
    });

    expect(state).to.deep.equal(expectedState);
  });

  it('should update the special assistance info', () => {
    const initState = [
      {
        type: 'adult',
        passengerInfo,
        specialAssistance: {
          BLIND: false
        }
      }
    ];
    const expectedState = [
      {
        type: 'adult',
        passengerInfo,
        specialAssistance: {
          BLIND: true,
          DEAF: false,
          COGNITIVE_AND_DEVELOPMENTAL_SSR: false,
          ASSISTANCE_ANIMAL: false,
          PEANUT_DUST_ALLERGY: true,
          PORTABLE_OXYGEN_CONCENTRATOR: false,
          WHEELCHAIR_ASSISTANCE: 'AIRPORT_WHEELCHAIR',
          WHEELCHAIR_STOWAGE: 'NONE',
          WET_BATTERIES: '2',
          DRY_BATTERIES: null
        }
      }
    ];

    const state = passengerInfosReducer(initState, {
      type: AirBookingActionTypes.AIR_BOOKING__UPDATE_SPECIAL_ASSISTANCE,
      index: 0,
      specialAssistanceFormData: {
        BLIND: true,
        DEAF: false,
        COGNITIVE_AND_DEVELOPMENTAL_SSR: false,
        ASSISTANCE_ANIMAL: false,
        PEANUT_DUST_ALLERGY: true,
        PORTABLE_OXYGEN_CONCENTRATOR: false,
        WHEELCHAIR_ASSISTANCE: 'AIRPORT_WHEELCHAIR',
        WHEELCHAIR_STOWAGE: 'NONE',
        WET_BATTERIES: '2',
        DRY_BATTERIES: null
      }
    });

    expect(state).to.deep.equal(expectedState);
  });

  it('should clear the special assistance info', () => {
    const initState = [
      {
        type: 'adult',
        passengerInfo,
        specialAssistance: {
          BLIND: false
        }
      }
    ];
    const expectedState = [
      {
        type: 'adult',
        passengerInfo
      }
    ];

    const state = passengerInfosReducer(initState, {
      type: AirBookingActionTypes.AIR_BOOKING__CLEAR_SPECIAL_ASSISTANCE,
      index: 0
    });

    expect(state).to.deep.equal(expectedState);
  });

  it('should update the passenger information', () => {
    const initState = [
      {
        type: 'adult',
        passengerInfo: {
          firstName: 'Cannon',
          middleName: '',
          lastName: 'Tangrila',
          gender: 'F',
          dateOfBirth: '1950-12-12',
          contactMethod: 'TEXT',
          contactEmail: '',
          number: '248-123-4567',
          countryCode: '',
          shareItineraryEmail: '',
          rapidRewardsNumber: '',
          redressNumber: '',
          knownTravelerNumber: ''
        }
      },
      {
        type: 'adult',
        passengerInfo: {
          dateOfBirth: '1995-09-11',
          firstName: 'Charith',
          gender: 'M',
          knownTravelerNumber: '',
          lastName: 'Claw',
          middleName: '',
          rapidRewardsNumber: '',
          redressNumber: ''
        }
      }
    ];
    const expectedState = [
      {
        type: 'adult',
        passengerInfo: {
          firstName: 'Siyang',
          middleName: '',
          lastName: 'Li',
          gender: 'M',
          dateOfBirth: '1990-12-12',
          contactMethod: 'TEXT',
          contactEmail: '',
          number: '248-123-4567',
          countryCode: '',
          shareItineraryEmail: '',
          rapidRewardsNumber: '',
          redressNumber: '',
          knownTravelerNumber: ''
        }
      },
      {
        type: 'adult',
        passengerInfo: {
          dateOfBirth: '1995-09-11',
          firstName: 'Charith',
          gender: 'M',
          knownTravelerNumber: '',
          lastName: 'Claw',
          middleName: '',
          rapidRewardsNumber: '',
          redressNumber: ''
        }
      }
    ];

    const state = passengerInfosReducer(initState, {
      type: AirBookingActionTypes.AIR_BOOKING__UPDATE_PASSENGER,
      index: 0,
      passengerInfo: {
        firstName: 'Siyang',
        middleName: '',
        lastName: 'Li',
        gender: 'M',
        dateOfBirth: '1990-12-12',
        shareItineraryEmail: '',
        rapidRewardsNumber: '',
        redressNumber: '',
        knownTravelerNumber: ''
      }
    });

    expect(state).to.deep.equal(expectedState);
  });

  it('should clear passenger information when reset passenger', () => {
    const initState = [
      {
        type: 'adult',
        passengerInfo: {
          firstName: 'Cannon',
          middleName: '',
          lastName: 'Tangrila',
          gender: 'F',
          dateOfBirth: '1950-12-12',
          contactMethod: 'TEXT',
          contactEmail: '',
          number: '248-123-4567',
          countryCode: '',
          shareItineraryEmail: '',
          rapidRewardsNumber: '',
          redressNumber: '',
          knownTravelerNumber: ''
        }
      },
      {
        type: 'adult',
        passengerInfo: {
          dateOfBirth: '1995-09-11',
          firstName: 'Charith',
          gender: 'M',
          knownTravelerNumber: '',
          lastName: 'Claw',
          middleName: '',
          rapidRewardsNumber: '',
          redressNumber: ''
        }
      }
    ];
    const expectedState = [];

    const state = passengerInfosReducer(initState, {
      type: AirBookingActionTypes.AIR_BOOKING__RESET_PASSENGER
    });

    expect(state).to.deep.equal(expectedState);
  });

  context('pre-fill passenger information without clearing passenger type', () => {
    it('when single pax logged in', () => {
      const initState = [
        {
          type: 'adult',
          passportAndEmergencyContact: {
            passportNumber: 'TWOTOW',
            passportIssuedBy: 'DZ',
            nationality: 'AD',
            passportExpirationDate: '2018-11-10',
            countryOfResidence: 'AQ',
            emergencyContactSaveForAllPassengers: '',
            doNotWishToProvideAnEmergencyContact: 'false',
            emergencyContactName: 'two two',
            emergencyContactPhoneNumber: '248-123-4567',
            emergencyContactCountryDialingCode: '',
            emergencyContactCountryCode: 'US'
          }
        }
      ];

      const state = passengerInfosReducer(initState, {
        type: AirBookingActionTypes.AIR_BOOKING__PREFILL_PASSENGER_INFO,
        passengerDetailsPage: {
          dateOfBirth: '1995-09-11',
          firstName: 'Charith',
          gender: 'M',
          knownTravelerNumber: '',
          lastName: 'Claw',
          middleName: '',
          rapidRewardsNumber: '',
          redressNumber: '',
          contactMethod: 'CALL_ME',
          contactPhone: '122121',
          contactEmail: null
        }
      });

      expect(state).to.deep.equal([
        {
          type: 'adult',
          passengerInfo: {
            dateOfBirth: '1995-09-11',
            firstName: 'Charith',
            gender: 'M',
            knownTravelerNumber: '',
            lastName: 'Claw',
            middleName: '',
            rapidRewardsNumber: '',
            redressNumber: ''
          }
        }
      ]);
    });
  });
  context('Passport', () => {
    it('should update passenger passport and emergency contact information', () => {
      const initState = [
        {
          type: 'adult'
        }
      ];

      const expectedState = [
        {
          type: 'adult',
          passportAndEmergencyContact: {
            passportNumber: '1234567',
            passportIssuedBy: 'US',
            nationality: 'US',
            passportExpirationDate: '2020-10-01',
            countryOfResidence: 'US',
            emergencyContactName: 'Wang',
            emergencyContactPhoneNumber: '1234123',
            emergencyContactCountryDialingCode: '1',
            emergencyContactCountryCode: 'US'
          }
        }
      ];

      const state = passengerInfosReducer(initState, {
        type: AirBookingActionTypes.AIR_BOOKING__SAVE_PASSENGER_PASSPORT,
        paxNumber: 0,
        passportAndEmergencyContact: {
          passportNumber: '1234567',
          passportIssuedBy: 'US',
          nationality: 'US',
          passportExpirationDate: '2020-10-01',
          countryOfResidence: 'US',
          emergencyContactName: 'Wang',
          emergencyContactPhoneNumber: '1234123',
          emergencyContactCountryDialingCode: '1',
          emergencyContactCountryCode: 'US'
        }
      });

      expect(state).to.deep.equal(expectedState);
    });

    it('should not change passport number if user do not change it', () => {
      const initState = [
        {
          type: 'adult',
          passportAndEmergencyContact: {
            passportNumber: '111111111',
            passportIssuedBy: 'US',
            nationality: 'US',
            passportExpirationDate: '2020-10-01',
            countryOfResidence: 'US',
            emergencyContactName: 'Wang',
            emergencyContactPhoneNumber: '1234123',
            emergencyContactCountryDialingCode: '1',
            emergencyContactCountryCode: 'US'
          }
        }
      ];

      const expectedState = [
        {
          type: 'adult',
          passportAndEmergencyContact: {
            passportNumber: '111111111',
            passportIssuedBy: 'CN',
            nationality: 'CN',
            passportExpirationDate: '2020-10-01',
            countryOfResidence: 'CN',
            emergencyContactName: 'Wang',
            emergencyContactPhoneNumber: '1234123',
            emergencyContactCountryDialingCode: '1',
            emergencyContactCountryCode: 'US'
          }
        }
      ];

      const state = passengerInfosReducer(initState, {
        type: AirBookingActionTypes.AIR_BOOKING__SAVE_PASSENGER_PASSPORT,
        paxNumber: 0,
        passportAndEmergencyContact: {
          passportIssuedBy: 'CN',
          nationality: 'CN',
          passportExpirationDate: '2020-10-01',
          countryOfResidence: 'CN',
          emergencyContactName: 'Wang',
          emergencyContactPhoneNumber: '1234123',
          emergencyContactCountryDialingCode: '1',
          emergencyContactCountryCode: 'US'
        }
      });

      expect(state).to.deep.equal(expectedState);
    });

    it('should reset passport information form', () => {
      const initState = [
        {
          type: 'adult',
          passportAndEmergencyContact: {
            passportNumber: '111111111',
            passportIssuedBy: 'US',
            nationality: 'US',
            passportExpirationDate: '2020-10-01',
            countryOfResidence: 'US',
            emergencyContactName: 'Wang',
            emergencyContactPhoneNumber: '1234123',
            emergencyContactCountryDialingCode: '1',
            emergencyContactCountryCode: 'US'
          }
        }
      ];
      const state = passengerInfosReducer(initState, {
        type: AirBookingActionTypes.AIR_BOOKING__RESET_PASSENGER_PASSPORT,
        paxNumber: 0
      });

      expect(state).to.deep.equal([{ type: 'adult' }]);
    });

    it('should check passport information form presence before reset', () => {
      const initState = [
        {
          type: 'adult'
        }
      ];
      const state = passengerInfosReducer(initState, {
        type: AirBookingActionTypes.AIR_BOOKING__RESET_PASSENGER_PASSPORT,
        paxNumber: 0
      });

      expect(state).to.deep.equal([{ type: 'adult' }]);
    });
  });
});
