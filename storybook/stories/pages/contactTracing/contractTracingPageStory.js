import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';

import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { ContactTracingPage } from 'src/contactTracing/pages/contactTracingPage';
import StoryRouter from 'storybook-router';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import contactTracing from 'mocks/templates/airReservation/contactTracing';

const { passengers, destinationConfig } = contactTracing.contactTracingPage;

const defaultProps = {
  currentConfirmationNumber: 'ABC123',
  destinationConfig,
  passengers,
  location: {
    pathname: ''
  },
  history: {},
  goBack: _.noop,
  replace: _.noop,
  updatePassengerIndexFn: _.noop,
  resetFlowFn: _.noop,
  retrieveContractTracingFn: _.noop,
  updateContactTracingFn: _.noop
};
const modifiedDestinationConfig = {
  title: 'Contact Tracing Details',
  collectionNoticeHeader: 'We are collecting information on behalf of the Centers for Disease Control and Prevention',
  collectionNoticeTextWithLinks:
    'As noted in the Privacy Act Statement, CDC requires airlines to collect this information and “CDC will use this information to help prevent the introduction, transmission, and spread of communicable diseases by performing contact tracing investigations and notifying exposed individuals and public health authorities; and for health education, treatment, prophylaxis, or other appropriate public health interventions, including the implementation of travel restrictions.” By clicking ‘Save,’ (1) I understand that the U.S. Government requires me to provide my contact information and that failure to provide complete and accurate information may result in criminal penalties, and (2) I confirm the information I have provided is complete and accurate. OMB Control No.: 0920-1354 Expiration date: 05/31/2022',
  termsAndConditionsHeader: 'Additional information about Contact Tracing',
  termsAndConditionsTextWithLinks:
    'Review the CDC <a href="https://www.southwest.com/coronavirus/#contact-tracing" target="_blank">Privacy statement</a> and <a href="https://www.southwest.com/coronavirus/#contact-tracing" target="_blank">Burden of Time statement</a> for more information',
  addressTextWithLinks:
    'Enter the address you can be reached at during your stay in the United States. If you are returning to the United States, enter the address of your residence.',
  includeContactTracingFields: true,
  contactEmailRequired: true,
  contactPhone1Required: true,
  contactPhone1Label: 'Phone number 1',
  contactPhone2Required: true,
  contactPhone2Label: 'Phone number 2',
  applyToAllLabel: null,
  allowApplyToAll: null
};
const lastPassengerProps = {
  currentConfirmationNumber: 'ABC123',
  destinationConfig: modifiedDestinationConfig,
  passengers,
  location: {
    pathname: ''
  },
  history: {},
  goBack: _.noop,
  replace: _.noop,
  updatePassengerIndexFn: _.noop,
  resetFlowFn: _.noop,
  retrieveContractTracingFn: _.noop,
  updateContactTracingFn: _.noop
};

storiesOf('pages/contactTracing/contractTracingPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <ContactTracingPage {...defaultProps} />;
  })
  .add('lastPassenger', () => {
    return (
      <ContactTracingPage
        {...{
          ...lastPassengerProps,
          passengerIndex: 1
        }}
      />
    );
  });
