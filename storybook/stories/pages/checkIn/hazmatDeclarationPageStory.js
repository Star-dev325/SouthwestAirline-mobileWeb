import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { HazmatDeclarationPage } from 'src/checkIn/pages/hazmatDeclarationPage';

const props = {
  replace: _.noop,
  goBack: _.noop,
  location: {
    state: {
      pnr: {},
      flights: []
    }
  }
};

storiesOf('pages/checkIn/hazmatDeclarationPage', module).add('default', () => {
  return <HazmatDeclarationPage {...props} />;
});
