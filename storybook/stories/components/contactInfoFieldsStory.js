import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import ContactInfoFields from 'src/shared/form/fields/contactInfoFields';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';

const store = createMockedFormStore();
const MockedForm = createMockedForm(store);

storiesOf('components/contactInfoFields', module)
  .add('default', () => {
    return (
      <MockedForm onSubmit={_.noop}>
        <ContactInfoFields
          names={[
            'isoCountryCode',
            'addressLine1',
            'addressLine2',
            'city',
            'stateProvinceRegion',
            'zipOrPostalCode',
            'phoneNumber',
            'phoneCountryCode'
          ]}
          supportModifyCountryCode
        />
      </MockedForm>
    );
  })
  .add('with Country Code Select', () => {
    return (
      <MockedForm onSubmit={_.noop}>
        <ContactInfoFields
          names={[
            'isoCountryCode',
            'addressLine1',
            'addressLine2',
            'city',
            'stateProvinceRegion',
            'zipOrPostalCode',
            'phoneNumber',
            'phoneCountryCode'
          ]}
          supportModifyCountryCode
          showCountryCodeAsDropDown
        />
      </MockedForm>
    );
  });
