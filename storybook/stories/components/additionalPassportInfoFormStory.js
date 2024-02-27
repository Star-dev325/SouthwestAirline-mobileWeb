import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';

import AdditionalPassportInfoForm from 'src/checkIn/components/additionalPassportInfoForm';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';

storiesOf('components/additionalPassportInfoForm', module)
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return (
      <div>
        <AdditionalPassportInfoForm
          formId="additionalPassportInfoForm"
          onSubmit={_.noop}
          initialFormData={{
            permanentResidentCard: null
          }}
          passengerName="Shelton Suen"
          isLastPAX
          onAdditionalNavItemClick={_.noop}
        />
      </div>
    );
  });
