import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import StoryRouter from 'storybook-router';

import { SelectFare } from 'src/airBooking/components/selectFare';
import { withFakeClock } from 'storybook/libs/withFakeClock';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import ProductsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/productsBuilder';
import { generateFlightShoppingPages } from 'src/airBooking/helpers/flightShoppingPageHelper';
import productDefinitions from 'mocks/templates/productDefinitions';
import { promoTop01, bottomPromo1 } from 'mocks/flexPlacement/flightShoppingPagePlacements';

const response = new ProductsBuilder().withProductDefinitions().withSelectedData('2018-01-01').build();
const pages = generateFlightShoppingPages(response);
const disclaimerWithLinks: String =
  'All fares are rounded up to the nearest dollar and include <a href="https://mobile.southwest.com/taxes-and-fees" target="_blank">Gov\'t taxes &amp; fees.</a>';

const pageProps = {
  productDefinitions,
  card: {
    ...pages[0].cards[0],
    isNextDayArrival: true
  },
  disclaimerWithLinks,
  params: { direction: 'outbound', paxType: 'adult' },
  getFlightSelectFarePagePlacementsFn: () => {},
  fareDetailsLink: response.flightShoppingPage._links.fareDetails,
  push: _.noop,
  goBack: _.noop
};

const pagePropsWithInboundDirection = {
  ...pageProps,
  params: {
    direction: 'inbound',
    paxType: 'adult'
  }
};

const pagePropsWithOneStop = {
  ...pageProps,
  card: {
    ...pageProps.card,
    flightNumbers: "2233/2332",
    stopDescriptionOnSelect: "1 Stop, change planes HOU"
  }
};

const pagePropsWithTwoStops  = {
  ...pageProps,
  card: {
    ...pageProps.card,
    flightNumbers: "833/2233/2332",
    stopDescriptionOnSelect: "2 Stops, change planes DEN, BWI"
  }
};

const pagePropsWithTwoStopsAndLongerFlightNumber  = {
  ...pageProps,
  card: {
    ...pageProps.card,
    flightNumbers: "2833/2233/2332",
    stopDescriptionOnSelect: "2 Stops, change planes DEN, BWI"
  }
};

const pagePropsWithOvernight = {
  ...pageProps,
  card: {
    ...pages[0].cards[0],
    isOvernight: true
  }
};

const withTopPlacement = {
  placements: {
    promoTop01
  }
};
const withBottomPlacement = {
  placements: {
    bottomPromo1
  }
};

const withBothPlacements = {
  placements: {
    bottomPromo1,
    promoTop01
  }
};

const store = createMockedFormStore();

storiesOf('components/selectFare', module)
  .addDecorator(StoryRouter())
  .addDecorator(withFakeClock('2018-01-01'))
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => <SelectFare {...pageProps} />);

storiesOf('components/selectFare', module)
  .addDecorator(StoryRouter())
  .addDecorator(withFakeClock('2018-01-01'))
  .addDecorator(StoryReduxProvider(store))
  .add('with one stop', () => <SelectFare {...pagePropsWithOneStop} />);

storiesOf('components/selectFare', module)
  .addDecorator(StoryRouter())
  .addDecorator(withFakeClock('2018-01-01'))
  .addDecorator(StoryReduxProvider(store))
  .add('with two stops and has small flight number', () => <SelectFare {...pagePropsWithTwoStops} />);

storiesOf('components/selectFare', module)
  .addDecorator(StoryRouter())
  .addDecorator(withFakeClock('2018-01-01'))
  .addDecorator(StoryReduxProvider(store))
  .add('with two stops and longer flight number', () => <SelectFare {...pagePropsWithTwoStopsAndLongerFlightNumber} />);

  pagePropsWithTwoStopsAndLongerFlightNumber

  storiesOf('components/selectFare', module)
  .addDecorator(StoryRouter())
  .addDecorator(withFakeClock('2018-01-01'))
  .addDecorator(StoryReduxProvider(store))
  .add('with overnight', () => <SelectFare {...pagePropsWithOvernight} />);

storiesOf('components/selectFare', module)
  .addDecorator(StoryRouter())
  .addDecorator(withFakeClock('2018-01-01'))
  .addDecorator(StoryReduxProvider(store))
  .add('with top placement', () => <SelectFare {..._.merge({}, pageProps, withTopPlacement)} />)
  .add('with bottom placement', () => <SelectFare {..._.merge({}, pageProps, withBottomPlacement)} />)
  .add('with both placements', () => <SelectFare {..._.merge({}, pageProps, withBothPlacements)} />);
  