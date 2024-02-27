import { storiesOf } from '@storybook/react';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import StoryRouter from 'storybook-router';

import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { EarlyBirdCheckInPage } from 'src/earlyBird/pages/earlyBirdCheckInPage';

const defaultProps = {
  getEarlyBirdReservationFn: () => {},
  retrieveEarlyBirdBannerFn: () => {},
  fetchEarlyBirdPlacementsFn: () => {},
  banner: {
    image: '/content/mkt/images/product_features/EarlyBird_Hero_180821.png',
    alt: 'EarlyBird Check-In. Automatic check-in. Better boarding position. Earlier access to overhead bins. Starting from $15 one-way.* *Beginning August 29, EarlyBird Check-In can be purchased at prices ranging from $15 - $25 one-way per passenger.'
  },
  isLoggedIn: true,
  ENABLE_TARGET_CONFIG: false,
  promoBannerConfig: {}
};

const withEarlyBirdCheckInPlacement = {
  banner: {},
  ENABLE_TARGET_CONFIG: true,
  promoBannerConfig: {
    promoTop01: {
      displayType: 'block-placement',
      promoImageBackground: '/content/mkt/images/product_features/EarlyBird_Hero_180821.png',
      imageForegroundAltText:
        'EarlyBird Check-In - Automatic check-in - Better boarding position - Earlier access to overhead bins.  Starting from $15 one-way.  Earlybird Check-In can be purchased at prices ranging from $15 - $25 one-way per passenger.',
      blocks: [],
      target: '',
      linkType: 'none',
      viewPortThreshold: 0.5,
      shouldObserveViewPort: false,
      contentBlockId: '',
      isChasePrequal: false,
      isChaseCombo: false,
      isChasePlacement: false
    }
  }
};

const store = configureMockStore()({
  app: {}
});

storiesOf('pages/earlyBird/EarlyBirdCheckInPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <EarlyBirdCheckInPage {...defaultProps} />;
  })
  .add('with early bird checkIn placement', () => {
    return <EarlyBirdCheckInPage {...defaultProps} {...withEarlyBirdCheckInPlacement} />;
  });
