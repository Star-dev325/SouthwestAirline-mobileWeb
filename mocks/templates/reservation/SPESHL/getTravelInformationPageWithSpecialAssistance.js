module.exports = {
  editPNRPassengerPage: {
    accountNumber: '601005646',
    redressNumber: null,
    knownTravelerId: null,
    passengerName: 'SA Passenger Viewrezerton',
    emergencyContact: null,
    passportInformation: null,
    nonChargeableAncillaryProducts: [{ ancillaryType: 'BLIND' }],
    disableSpecialAssistance: false,
    _links: {
      href: '/v1/mobile-air-booking/feature/reservation/edit-pnr-passenger/SPESHL',
      method: 'POST',
      body: { passengerReference: '2', firstName: 'SA PASSENGER', lastName: 'VIEWREZERTON' }
    },
    passengerDetails: {
      dateOfBirth: '02/01/XXXX',
      gender: 'On File',
      name: {
        firstName: 'SA Passenger',
        lastName: 'Viewrezerton',
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
