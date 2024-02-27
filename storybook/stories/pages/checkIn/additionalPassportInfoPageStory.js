import Q from 'q';
import _ from 'lodash';
import React from 'react';
import StoryRouter from 'storybook-router';
import { storiesOf } from '@storybook/react';

import { AdditionalPassportInfoPage } from 'src/checkIn/pages/additionalPassportInfoPage';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';

const props = {
  isLoggedIn: true,
  passengerName: 'Paul Pillips',
  recordLocator: '',
  shouldShowSkipButton: true,
  initialFormData: {
    destination: null,
    permanentResidentCard: null,
    visa: null
  },
  travelDocuments: [
    {
      requestData: {},
      travelerName: 'Li Chen',
      passportPageFormData: { passport: 'passport' },
      additionalPassportPageFormData: {},
      missingDocuments: ['PERMANENT_RESIDENT_CARD', 'VISA', 'DESTINATION']
    }
  ],
  isLastPAX: false,
  requestData: {},
  checkInSessionToken: '',
  showDialogFn: _.noop,
  hideDialogFn: _.noop,
  addAdditionalPassportInfoDocumentsFn: () => Q(),
  prepareTravelDocumentAndRecordLocatorFn: _.noop,
  prefillNextPaxInfoFn: _.noop,
  saveDestinationForAllFn: _.noop,
  logoutFn: _.noop,
  params: {
    paxNumber: 1
  },
  push: _.noop
};

const store = createMockedFormStore();

storiesOf('pages/checkIn/additionalPassportInfoPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <AdditionalPassportInfoPage {...props} />;
  });
