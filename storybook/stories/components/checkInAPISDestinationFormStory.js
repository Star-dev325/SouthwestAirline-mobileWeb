import React from 'react';
import _ from 'lodash';
import { storiesOf } from '@storybook/react';

import CheckInAPISDestinationForm from 'src/checkIn/components/checkInAPISDestinationForm';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import StoryRouter from 'storybook-router';
import { contactTracingPage } from 'mocks/templates/airReservation/contactTracing';

const { destinationConfig } = contactTracingPage;

const store = createMockedFormStore();

const props = {
  initialFormData: {},
  formId: 'formId',
  onCancel: _.noop,
  onSubmit: _.noop,
  updateFormDataValueFn: _.noop
};

const contactTracingProps = {
  ...props,
  destinationConfig
};

storiesOf('component/checkIn/checkInAPISDestinationForm', module)
  .addDecorator(StoryReduxProvider(store))
  .addDecorator(StoryRouter())
  .add('default', () => {
    return <CheckInAPISDestinationForm {...props} />;
  })
  .add('contact-tracing', () => {
    return <CheckInAPISDestinationForm {...contactTracingProps} />;
  })
  .add('contact-tracing-pax-one', () => {
    return <CheckInAPISDestinationForm {...contactTracingProps} shouldDisplayUseForAll={true} />;
  });
