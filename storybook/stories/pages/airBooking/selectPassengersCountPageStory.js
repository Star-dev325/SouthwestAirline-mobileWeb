import { storiesOf } from '@storybook/react';
import React from 'react';

import { SelectPassengersCountPage } from 'src/airBooking/pages/selectPassengersCountPage';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import _ from 'lodash';

const pageProps = {
  goBack: _.noop,
  savePassengerCountFn: _.noop,
  updateFormFieldDataValueFn: _.noop,
  passengerCountData: {
    lapChildCount: 0,
    adultCount: 1,
    valueUpdated: false
  }
};

const store = createMockedFormStore();
const EnhancedSelectPassengersCountPage = withBodyClass(['select-passengers-count-page'])(SelectPassengersCountPage);


storiesOf('pages/airBooking/selectPassengersCountPage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <EnhancedSelectPassengersCountPage {...pageProps} />;
  });
