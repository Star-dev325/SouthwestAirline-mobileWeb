module.exports = {
  editPNRPassengerPage: {
    accountNumber: null,
    redressNumber: null,
    knownTravelerId: null,
    passengerName: 'Fang Fang',
    emergencyContact: null,
    passportInformation: null,
    isInternational: true,
    _links: {
      href: '/v1/mobile-air-booking/feature/reservation/edit-pnr-passenger/INTEMT',
      method: 'POST',
      body: { passengerReference: '2', firstName: 'FANG', lastName: 'FANG' }
    },
    passengerDetails: {
      dateOfBirth: '02/01/XXXX',
      gender: 'On File',
      name: {
        firstName: 'Fang',
        lastName: 'Fang',
        middleName: null,
        suffix: null
      }
    },
    _meta: {
      isEditablePassengerFirstMiddleName: false,
      isEditablePassengerLastName: false
    },
    editNamesMessage: {
      body: 'Last name change is limited to a one time change of up to 3 characters.  Passenger information must match government-issued ID',
      key: 'UPDATE_PASSENGER_NAMES_MESSAGE'
    }
  }
};
