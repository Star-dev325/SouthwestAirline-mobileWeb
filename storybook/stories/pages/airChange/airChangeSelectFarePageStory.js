import { storiesOf } from '@storybook/react';
import productDefinitions from 'mocks/templates/productDefinitions';
import React from 'react';
import { generateFlightShoppingPages } from 'src/airBooking/helpers/flightShoppingPageHelper';
import { AirChangeSelectFarePage } from 'src/airChange/pages/airChangeSelectFarePage';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { withFakeClock } from 'storybook/libs/withFakeClock';
import ProductsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/productsBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const EnhancedFlightSelectFarePage = withBodyClass('flight-select-fare-page')(AirChangeSelectFarePage);

const response = new ProductsBuilder().withSelectedData('2018-01-01').build();
const pages = generateFlightShoppingPages(response);
const disclaimerWithLinks: String =
  'All fares are rounded up to the nearest dollar and include <a href="https://mobile.southwest.com/taxes-and-fees" target="_blank">Gov\'t taxes &amp; fees.</a>';

const pageProps = {
  fareDetailsLink: {
    href: '/mock-fare-details-href',
    labelText: 'Mock Fare Details Text'
  },
  productDefinitions,
  page: {
    _meta: {}
  },
  card: {
    ...pages[0].cards[0],
    isNextDayArrival: true
  },
  disclaimerWithLinks,
  push: _.noop,
  goBack: _.noop
};

const pagePropsWithOvernight = {
  ...pageProps,
  card: {
    ...pages[0].cards[0],
    isOvernight: true
  }
};

const store = createMockedFormStore();

storiesOf('pages/airChange/airChangeSelectFarePage', module)
  .addDecorator(StoryRouter())
  .addDecorator(withFakeClock('2018-01-01'))
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => <EnhancedFlightSelectFarePage {...pageProps} />)
  .add('with overnight', () => <EnhancedFlightSelectFarePage {...pagePropsWithOvernight} />);
