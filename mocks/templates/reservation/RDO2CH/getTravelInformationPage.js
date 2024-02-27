module.exports = {
  editPNRPassengerPage: {
    editNamesMessage: {
      key: 'UPDATE_PASSENGER_NAMES_MESSAGE',
      header: null,
      body: 'Last name change is limited to a one time change of up to 3 characters. Passenger information must match government-issued ID.',
      icon: null,
      textColor: 'DEFAULT'
    },
    editNamesCheckedInMessage: null,
    accountNumber: null,
    redressNumber: null,
    knownTravelerId: null,
    passengerName: 'Carol Biggs',
    passengerDetails: {
      name: {
        firstName: 'Carol',
        middleName: null,
        lastName: 'Biggs',
        suffix: null
      },
      dateOfBirth: '04/01/XXXX',
      gender: 'On File'
    },
    emergencyContact: null,
    disableSpecialAssistance: false,
    nonChargeableAncillaryProducts: null,
    passportInformation: null,
    isInternational: false,
    _analytics: {
      daysToTrip: '10'
    },
    _links: {
      href: '/v1/mobile-air-booking/feature/reservation/edit-pnr-passenger/RDO2CH',
      method: 'POST',
      body: {
        passengerReference: '2',
        firstName: 'CAROL',
        lastName: 'BIGGS',
        passengerSearchToken:
          'Jkz4H5URUwowWBYF7uPhbC80_0_noW-zSYHzAQDCmDW2wT8ILfLiDClWWGChxOLx-jf6FOUm4tzax_10hg9gcijRMRl10ldTpHVUwIhNwYISUdmBw9z0ypjYHsUbdqbCZ-5egnDk2SqEPXlonw=='
      }
    },
    _meta: {
      isEditablePassengerFirstMiddleName: true,
      isEditablePassengerLastName: true
    }
  }
};
