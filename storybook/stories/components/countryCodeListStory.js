import { storiesOf } from '@storybook/react';
import React from 'react';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import CountryCodeList from 'src/shared/components/countryCodeList';

const store = createMockedFormStore();

storiesOf('components/countryCodeList', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <CountryCodeList showSearchBar={false} />;
  })
  .add('showSearchBar', () => {
    return <CountryCodeList showSearchBar />;
  });
