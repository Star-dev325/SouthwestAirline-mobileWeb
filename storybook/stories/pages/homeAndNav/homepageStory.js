import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { Homepage } from 'src/homeAndNav/pages/homepage';
import footer from 'mocks/templates/content-delivery/footer';
import configureMockStore from 'redux-mock-store';
import { withFakeClock } from 'storybook/libs/withFakeClock';

const footerLinkRows = footer.results.footer.content.placement.linkRows;

const homePagePromotions = [
  {
    id: 'promo01',
    title: 'Flying Southwest',
    description: 'Retrieve reservation, checkin for upcoming flights & more',
    'promotion-image': '/content/mkt/images/promotions/AboutRR_Icon_FPO.png',
    alt: 'Flying Southwest',
    link_type: 'webview',
    target: '/flying-southwest'
  }
];

const heroContents = [
  {
    displayType: 'mobile_hero',
    imageForegroundAltText: 'Test Hero 01',
    promoImageBackground: '/content/mkt/images/hero_shots/test-hero-01-background.png',
    linkType: 'app',
    target: 'test01'
  },
  {
    displayType: 'mobile_hero',
    promoImageForeground: '/content/mkt/images/hero_shots/test-hero-02-foreground.png',
    imageForegroundAltText: 'Test Hero 02',
    promoImageBackground: '/content/mkt/images/hero_shots/test-hero-02-background.jpg',
    linkType: 'app',
    target: 'text02'
  }
];

const defaultProps = {
  push: _.noop,
  homePagePromotions: homePagePromotions,
  homeBanners: [],
  heroContents: heroContents,
  upcomingTripsCount: 0,
  MWEB_ADOBE_TARGET_TIMEOUT_MS: 3000,
  clearUpcomingTripsCountFn: _.noop,
  resetHeroContentsFn: _.noop,
  retrieveHomepagePromotionsFn: _.noop,
  loadHomepagePlacementsFn: _.noop,
  getAccountUpcomingTripsFn: _.noop,
  getTravelAdvisoriesFn: _.noop,
  trip: null,
  travelAdvisories: [],
  isLoggedIn: false,
  name: '',
  retrieveCarReservationFn: _.noop,
  clearFlightReservationFn: _.noop,
  setTripTypeForDetailsPageFn: _.noop,
  updateChaseAnalyticsCodesFn: _.noop,
  footerLinkRows: footerLinkRows
};

const store = configureMockStore()({
  app: {
    toggles: {}
  },
  router: {
    location: {
      pathname: '/',
      search: 'search'
    }
  }
});

storiesOf('pages/homeAndNav/homepage', module)
  .addDecorator(withFakeClock('2021-03-22'))
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    _.set(window, 'swa.inflight', false);
    return <Homepage {...defaultProps} />;
  })
  .add('with inflight wifi banner', () => {
    _.set(window, 'swa.inflight', true);
    return <Homepage {...defaultProps} />;
  });
