import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import StoryRouter from 'storybook-router';
import configureMockStore from 'redux-mock-store';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { withFakeClock } from 'storybook/libs/withFakeClock';
import { RapidRewardsLandingPage } from 'src/rapidRewards/pages/rapidRewardsLandingPage';
import footer from 'mocks/templates/content-delivery/footer';

const store = {
  router: {
    location: {
      pathname: '/rapid-rewards'
    }
  }
};

const footerLinkRows = footer.results.footer.content.placement.linkRows;

const props = {
  footerLinkRows,
  MWEB_ADOBE_TARGET_TIMEOUT_MS: 0,
  push: _.noop,
  retrievePromotionsFn: _.noop
};

storiesOf('pages/rapidRewards/RapidRewardsLandingPage', module)
  .addDecorator(withFakeClock('2022-02-03'))
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(configureMockStore()(store)))
  .add('default', () => {
    return <RapidRewardsLandingPage {...props} />;
  });
