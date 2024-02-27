import _ from 'lodash';
import React from 'react';
import { storiesOf } from '@storybook/react';
import { OffersPage } from 'src/homeAndNav/pages/offersPage';
import imagePlacementBuilder from 'test/builders/model/imagePlacementBuilder';
import configureMockStore from 'redux-mock-store';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

const props = {
  placements: [
    new imagePlacementBuilder().build(),
    new imagePlacementBuilder().build(),
    new imagePlacementBuilder().build()
  ],
  loadOffersPagePlacementsFn: () => Promise.resolve(),
  saveOffersPagePlacementsFn: _.noop,
  handleFirmOfferOfCreditFn: _.noop
};

const noPlacementsProps = {
  ...props,
  placements: []
};

const EnhancedOffersPageClass = withBodyClass(['offers-page'])(OffersPage);

storiesOf('pages/homeAndNav/offersPage', module)
  .addDecorator(StoryReduxProvider(configureMockStore()({})))
  .add('default', () => {
    return <EnhancedOffersPageClass {...props} />;
  })
  .add('no placements', () => {
    return <EnhancedOffersPageClass {...noPlacementsProps} />;
  });
