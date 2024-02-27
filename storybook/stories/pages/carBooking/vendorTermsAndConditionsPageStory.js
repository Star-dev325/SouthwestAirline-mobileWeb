import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import React from 'react';
import _ from 'lodash';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { VendorTermsAndConditionsPage } from 'src/carBooking/pages/vendorTermsAndConditionsPage';

const defaultProps = {
  query: {
    productId: 'product-D1'
  },
  termsAndConditions: [
    "Additional  drivers must qualify with a valid driver's license in their own name. There may be charges " +
      'for additional drivers.',
    'Customers returning a vehicle outside the normal business hours for the Houston sub locations, must ' +
      'return the vehicle to the Thrifty facility at either  IAH or HOU airport.  This information also applies for ' +
      'ONEWAY DROPS from any corporate location.'
  ],
  retrieveVendorTermsAndConditionsFn: _.noop
};

storiesOf('pages/carBooking/vendorTermsAndConditionsPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <VendorTermsAndConditionsPage {...defaultProps} />;
  });
