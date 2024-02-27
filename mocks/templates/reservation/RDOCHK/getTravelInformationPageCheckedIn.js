module.exports = {
  editPNRPassengerPage: {
    editNamesMessage: {
      key: 'UPDATE_PASSENGER_NAMES_MESSAGE',
      header: null,
      body: 'Last name change is limited to a one time change of up to 3 characters. Passenger information must match government-issued ID.',
      icon: null,
      textColor: 'DEFAULT'
    },
    editNamesCheckedInMessage: {
      key: 'UPDATE_PASSENGER_NAMES_CHECKED_IN_MESSAGE',
      header: null,
      body: 'To complete your name correction we must first delete your boarding pass. Your boarding position will be maintained but you will need to check in again for your flight. Do you want to continue?',
      icon: null,
      textColor: 'DEFAULT'
    },
    accountNumber: null,
    redressNumber: null,
    knownTravelerId: null,
    passengerName: 'Yang Lu',
    passengerDetails: {
      name: {
        firstName: 'Cannon',
        middleName: null,
        lastName: 'Biggs',
        suffix: null
      },
      dateOfBirth: '08/20/XXXX',
      gender: 'On File'
    },
    emergencyContact: null,
    disableSpecialAssistance: false,
    nonChargeableAncillaryProducts: null,
    passportInformation: null,
    isInternational: false,
    _analytics: {
      daysToTrip: '1'
    },
    _links: {
      href: '/v1/mobile-air-booking/feature/reservation/edit-pnr-passenger/RDOCHK',
      method: 'POST',
      body: {
        passengerReference: '2',
        firstName: 'Cannon',
        lastName: 'Biggs'
      }
    },
    _meta: {
      isEditablePassengerFirstMiddleName: true,
      isEditablePassengerLastName: true
    }
  }
};
