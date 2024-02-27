import React from 'react';
import _ from 'lodash';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import configureMockStore from 'redux-mock-store';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';

import { TravelInformationPage } from 'src/viewReservation/pages/travelInformationPage';

const store = configureMockStore()({
  app: {},
  router: {
    location: {
      search: 'search'
    }
  },
  toggles: {}
});

const props = {
  location: {
    state: {
      firstName: 'Age',
      lastName: 'Senior',
      recordLocator: 'PPUWKZ'
    }
  },
  params: { passengerReference: '2' },
  editPNRPassengerPage: {
    accountNumber: null,
    redressNumber: null,
    knownTravelerId: null,
    emergencyContact: null,
    passportInformation: null,
    isInternational: true,
    nonChargeableAncillaryProducts: null,
    disableSpecialAssistance: false,
    _links: {
      href: '/v1/mobile-air-booking/feature/reservation/edit-pnr-passenger/PPUWKZ',
      method: 'POST',
      body: { passengerReference: '2', firstName: 'AGE', lastName: 'SENIOR' }
    },
    passengerDetails: {
      dateOfBirth: '02/01/XXXX',
      gender: 'On File',
      name: {
        firstName: 'Age Verified',
        lastName: 'Senior',
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

const propsSpecialAssistanceDisabled = {
  location: {
    state: {
      firstName: 'Age',
      lastName: 'Senior',
      recordLocator: 'PPUWKZ'
    }
  },
  params: { passengerReference: '2' },
  editPNRPassengerPage: {
    accountNumber: null,
    redressNumber: null,
    knownTravelerId: null,
    emergencyContact: null,
    passportInformation: null,
    isInternational: null,
    nonChargeableAncillaryProducts: [{ ancillaryType: 'BLIND' }],
    disableSpecialAssistance: true,
    _links: {
      href: '/v1/mobile-air-booking/feature/reservation/edit-pnr-passenger/PPUWKZ',
      method: 'POST',
      body: { passengerReference: '2', firstName: 'AGE', lastName: 'SENIOR' }
    },
    passengerDetails: {
      dateOfBirth: '02/01/XXXX',
      gender: 'On File',
      name: {
        firstName: 'Age Verified',
        lastName: 'Senior',
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

const allFieldsPrefilled = {
  editPNRPassengerPage: {
    accountNumber: '601005646',
    redressNumber: '1234567',
    knownTravelerId: '123456789012345',
    emergencyContact: {
      name: 'Fred Flintstone',
      contactPhone: {
        countryCode: 'DZ',
        number: '8178551234'
      }
    },
    passportInformation: {
      lastFourPassportNumber: '1234',
      passportIssuedBy: 'AL',
      nationality: 'DZ',
      passportExpirationDate: '2030-11-19',
      countryOfResidence: 'US'
    },
    isInternational: true,
    nonChargeableAncillaryProducts: [{ ancillaryType: 'BLIND' }],
    disableSpecialAssistance: false,
    _links: {
      href: '/v1/mobile-air-booking/feature/reservation/edit-pnr-passenger/PPUWKZ',
      method: 'POST',
      body: { passengerReference: '2', firstName: 'AGE', lastName: 'SENIOR' }
    },
    passengerDetails: {
      dateOfBirth: '02/01/XXXX',
      gender: 'On File',
      name: {
        firstName: 'Age Verified',
        lastName: 'Senior',
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

storiesOf('pages/viewReservation/travelInformationPage', module)
  .addDecorator(StoryReduxProvider(store))
  .addDecorator(StoryRouter())
  .add('Domestic', () => {
    const domestic = {
      location: {
        state: {
          firstName: 'Age',
          lastName: 'Senior',
          recordLocator: 'PPUWKZ'
        }
      },
      params: { passengerReference: '2' },
      editPNRPassengerPage: {
        accountNumber: null,
        redressNumber: null,
        knownTravelerId: null,
        emergencyContact: null,
        passportInformation: null,
        isInternational: false,
        nonChargeableAncillaryProducts: null,
        disableSpecialAssistance: false,
        _links: {
          href: '/v1/mobile-air-booking/feature/reservation/edit-pnr-passenger/PPUWKZ',
          method: 'POST',
          body: { passengerReference: '2', firstName: 'AGE', lastName: 'SENIOR' }
        },
        passengerDetails: {
          dateOfBirth: '02/01/XXXX',
          gender: 'On File',
          name: {
            firstName: 'Age Verified',
            lastName: 'Senior',
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
    return <TravelInformationPage {...domestic} />;
  })
  .add('Domestic all field pre-filled', () => {
    const prefilled = {
      editPNRPassengerPage: {
        accountNumber: '601005646',
        redressNumber: '234567',
        knownTravelerId: '123456789ABC',
        isInternational: false,
        passengerDetails: {
          dateOfBirth: '02/01/XXXX',
          gender: 'On File',
          name: {
            firstName: 'Age Verified',
            lastName: 'Senior',
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

    return <TravelInformationPage {...props} {...prefilled} />;
  })
  .add('International', () => {
    return <TravelInformationPage {...props} />;
  })
  .add('International all fields pre-filled', () => {
    return <TravelInformationPage {...props} {...allFieldsPrefilled} />;
  })
  .add('International partial passport data for error', () => {
    const errorProps = _.cloneDeep(props);
    _.set(errorProps, 'editPNRPassengerPage.passportInformation.lastFourPassportNumber', '1234');

    return <TravelInformationPage {...errorProps} />;
  })
  .add('International partial emergency contact data for error', () => {
    const errorProps = _.cloneDeep(props);
    _.set(errorProps, 'editPNRPassengerPage.emergencyContact.name', 'Fred');

    return <TravelInformationPage {...errorProps} />;
  })
  .add('Special Assistance Disabled', () => {
    return <TravelInformationPage {...propsSpecialAssistanceDisabled} />;
  });
