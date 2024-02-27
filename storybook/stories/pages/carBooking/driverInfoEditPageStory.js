import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import React from 'react';
import _ from 'lodash';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { DriverInfoEditPage } from 'src/carBooking/pages/driverInfoEditPage';

const defaultProps = {
  driverInfo: {
    firstName: 'Amber',
    lastName: 'Awesome',
    accountNumber: '10000'
  },
  saveUserAccountDriverInfoFn: _.noop,
  push: _.noop
};

storiesOf('pages/carBooking/driverInfoEditPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <DriverInfoEditPage {...defaultProps} />;
  })
  .add('no default values', () => {
    const withOutDriverInfo = _.omit(defaultProps, 'driverInfo');
    return <DriverInfoEditPage {...withOutDriverInfo} />;
  });
