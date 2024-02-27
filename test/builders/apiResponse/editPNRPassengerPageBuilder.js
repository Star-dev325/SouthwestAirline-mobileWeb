import _ from 'lodash';

class EditPNRPassengerPageBuilder {
  constructor() {
    this.editPNRPassengerPage = {
      accountNumber: '601005646',
      knownTravelerId: '123456789012345',
      passengerName: 'First Last',
      passengerDetails: {
        name: {
          firstName: 'First',
          middleName: 'Middle',
          lastName: 'Last'
        },
        dateOfBirth: '1975-01-11',
        gender: 'on file'
      },
      emergencyContact: {
        name: 'Fred Flintstone',
        contactPhone: {
          countryCode: 'DZ',
          number: '817-855-1234'
        }
      },
      passportInformation: {
        lastFourPassportNumber: '1234',
        passportIssuedBy: 'AL',
        nationality: 'DZ',
        passportExpirationDate: '2020-11-19',
        countryOfResidence: 'US'
      },
      isInternational: true,
      nonChargeableAncillaryProducts: [],
      disableSpecialAssistance: false,
      _links: {
        href: '/v1/mobile-air-booking/feature/reservation/edit-pnr-passenger/PPUWKZ',
        method: 'POST',
        body: { passengerReference: '2', firstName: 'AGE', lastName: 'OLDER' }
      },
      _meta: {
        isEditablePassengerFirstMiddleName: false,
        isEditablePassengerLastName: false
      },
      editNamesMessage: {
        body: 'Last name change is limited to a one time change of up to 3 characters.  Passenger information must match government-issued ID',
        key: '4'
      }
    };
  }

  withPassengerDetails() {
    _.set(this.editPNRPassengerPage, 'passengerDetails', {
      dateOfBirth: '02/01/XXXX',
      gender: 'On File',
      name: {
        firstName: 'Fred',
        lastName: 'Flinstone',
        middleName: '',
        suffix: ''
      }
    });

    return this;
  }

  withEditNamesCheckedInMessage() {
    _.set(this.editPNRPassengerPage, 'editNamesCheckedInMessage', {
      key: 'UPDATE_PASSENGER_NAMES_CHECKED_IN_MESSAGE',
      header: null,
      body: 'To complete your name correction we must first delete your boarding pass. Your boarding position will be maintained but you will need to check in again for your flight. Do you want to continue?',
      icon: null,
      textColor: 'DEFAULT'
    });

    return this;
  }

  withIsInternational(isInternational) {
    _.set(this.editPNRPassengerPage, 'isInternational', isInternational);

    return this;
  }

  withEditNameFlags(isEditablePassengerFirstMiddleName, isEditablePassengerLastName) {
    _.set(this.editPNRPassengerPage, '_meta', {
      isEditablePassengerFirstMiddleName,
      isEditablePassengerLastName
    });

    return this;
  }

  withEditNamesSuccessfulUpdateMessage() {
    _.set(this.editPNRPassengerPage, 'editNamesSuccessfulUpdateMessage', {
      body: 'Name correction successful.  Please remember to check in again for your flights.',
      header: null,
      icon: null,
      key: 'EDIT_NAME_SUCCESSFUL_UPDATE_MESSAGE',
      textColor: 'DEFAULT'
    });

    return this;
  }

  build() {
    return {
      ...this.editPNRPassengerPage
    };
  }
}

module.exports = EditPNRPassengerPageBuilder;
