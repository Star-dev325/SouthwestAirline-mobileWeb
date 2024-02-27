import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import configureMockStore from 'redux-mock-store';

import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { CarCancelConfirmationPage } from 'src/carCancel/pages/carCancelConfirmationPage';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

const EnhancedCarCancelConfirmationPage = withBodyClass('bgwhite')(CarCancelConfirmationPage);

const props = {
  carCancelInfo: {
    driver: {
      firstName: 'HX',
      lastName: 'LIN'
    },
    confirmationNumber: '61805258COUNT',
    vendorImage: '/content/mkt/images/car_vendors/Avis_Logo_results.png',
    pickUpTime: '2016-03-01T11:00:00.000',
    cityName: 'Dallas (Love Field)',
    cityState: 'TX'
  }
};

const store = configureMockStore()({
  app: {},
  router: {
    location: {
      search: 'search'
    }
  }
});

storiesOf('pages/carCancel/CarCancelConfirmationPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <EnhancedCarCancelConfirmationPage {...props} />;
  });
