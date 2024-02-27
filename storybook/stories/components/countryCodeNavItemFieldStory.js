import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import CountryCodeNavItemField from 'src/shared/form/fields/countryCodeNavItemField';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';

const store = createMockedFormStore();
const MockedForm = createMockedForm(store);

const props = {
  countryCode: 'US',
  onLabelClick: _.noop
};

storiesOf('components/countryCodeNavItemField', module).add('default', () => {
  return (
    <MockedForm onSubmit={_.noop}>
      <CountryCodeNavItemField {...props} />
    </MockedForm>
  );
});
