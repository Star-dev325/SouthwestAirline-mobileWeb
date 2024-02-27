import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { withFakeClock } from 'storybook/libs/withFakeClock';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { PassportPage } from 'src/checkIn/pages/checkInPassportPage';

const props = {
  shouldShowSaveEmergencyContactForAll: false,
  isUserLoggedIn: true,
  recordLocator: 'ZRTY56',
  checkInSessionToken: 'someToken',
  requestData: {
    href: '/v1/mobile-air-operations/feature/check-in/travel-documents',
    method: 'POST',
    body: {
      recordLocator: 'PKEPEV',
      travelerIdentifier: '2401DB8D0000B616',
      firstName: 'AGE',
      lastName: 'SENIOR',
      fullName: 'Age Verified Senior',
      accountNumber: '601005646'
    }
  },
  shouldShowSkipButton: false,
  formData: {},
  location: {},
  travelerName: 'Aged Senior',
  isLastPage: true,
  nextPageOptions: { nextPagePath: '/check-in/:paxNumber/passportPage', nextPaxNumber: '2' },
  prepareTravelDocumentAndRecordLocatorFn: _.noop,
  addNationalityAndEmergencyDocumentsFn: _.noop,
  logoutFn: _.noop,
  hideDialogFn: _.noop,
  showDialogFn: _.noop,
  push: _.noop,
  params: { paxNumber: 1 }
};

const passportFormData = {
  formData: {
    passportNumber: 'E12312313',
    passportIssuedBy: 'US',
    nationality: 'US',
    passportExpirationDate: '2019-11-19',
    countryOfResidence: 'US',
    doNotWishToProvideAnEmergencyContact: true
  }
};

const store = createMockedFormStore();

storiesOf('pages/checkIn/checkInPassportPage', module)
  .addDecorator(withFakeClock('2020-03-01'))
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <PassportPage {...props} />;
  })
  .add('prefilled', () => {
    return <PassportPage {..._.merge({}, props, passportFormData)} />;
  });
