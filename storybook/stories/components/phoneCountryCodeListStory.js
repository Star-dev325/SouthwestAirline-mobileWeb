import _ from 'lodash';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import PhoneCountryCodeList from 'src/shared/components/phoneCountryCodeList';

const store = createMockedFormStore();
const sharedProps = {
  onCountryCodeSelect: () => 'test',
  onCancel: () => 'test',
  showSearchBar: false
};

storiesOf('components/phoneCountryCodeList', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <PhoneCountryCodeList {...sharedProps} />;
  })
  .add('show search bar', () => {
    return <PhoneCountryCodeList {...sharedProps} showSearchBar={true} />;
  });
