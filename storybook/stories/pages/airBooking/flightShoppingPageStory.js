import { storiesOf } from '@storybook/react';
import _ from 'lodash';
import { bottomPromo1, promoTop01 } from 'mocks/flexPlacement/flightShoppingPagePlacements';
import React from 'react';
import { generateFlightShoppingPages } from 'src/airBooking/helpers/flightShoppingPageHelper';
import { FlightShoppingPage } from 'src/airBooking/pages/flightShoppingPage';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { withFakeClock } from 'storybook/libs/withFakeClock';
import MultiSelectGroupBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/multiSelectGroupBuilder';
import ProductsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/productsBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const EnhancedFlightShoppingPage = withBodyClass('flight-shopping-page')(FlightShoppingPage);
const EnhancedWebViewFlightShoppingPage = withBodyClass(['is-webview', 'flight-shopping-page'])(FlightShoppingPage);

const searchFlightRequest = {
  currencyType: 'USD',
  departureDate: '2017-11-10',
  destination: 'CLT',
  isRoundTrip: true,
  numberOfAdults: 1,
  origin: 'AUS',
  returnDate: '2017-11-13',
  tripType: 'roundTrip',
  promoCode: ''
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

const response = new ProductsBuilder()
  .withSGAMessage()
  .withValidPromoCode()
  .withInboundPage()
  .withSelectedData('2018-01-01')
  .withProductDefinitions()
  .build();
const pageProps = {
  fetchFlightShoppingPageSuccessFn: (response) => {},
  flightShoppingPage: {
    pages: generateFlightShoppingPages(response),
    response: response,
    sortBy: {
      adult: {
        outbound: 'departureTime',
        inbound: 'departureTime'
      }
    },
    multiSelectGroup: {}
  },
  getFlightSelectPagePlacementsFn: () => Promise.resolve(),
  getProductListFn: () => {},
  multiSelectGroupState: {
    isSelected: false
  },
  lastBookableDate: '2018-06-01',
  params: {
    direction: 'outbound',
    paxType: 'adult'
  },
  push: () => {},
  searchRequest: searchFlightRequest,
  selectedProducts: {},
  sortFlightProductsFn: () => {},
  trackCalendarStripFn: () => {},
  updatetMultiSelectGroupCurrentDirectionFn: (direction: string) => {}
};
const pagePropsWithMultiSelectGroupWithoutBound = {
  ...pageProps,
  flightShoppingPage: {
    ...pageProps.flightShoppingPage,
    pages: [],
    response: {
      ...pageProps.flightShoppingPage.response,
      FlightShoppingPage: null
    },
    multiSelectGroup: new MultiSelectGroupBuilder().build().multipleAirportsData
  },
  multiSelectGroupState: {
    isSelected: true,
    origin: ['MDW', 'ORD'],
    destination: ['BOS', 'BDL', 'MHT', 'PVD']
  }
};
const pagePropsWithMultiSelectGroupWithBoundSelected = {
  ...pageProps,
  flightShoppingPage: {
    ...pageProps.flightShoppingPage,
    response: {
      ...pageProps.flightShoppingPage.response,
      FlightShoppingPage: null
    },
    multiSelectGroup: {
      ...new MultiSelectGroupBuilder().build().multipleAirportsData,
      selectedBound: {
        originBoundAirport: 'MDW',
        destinationBoundAirport: 'BOS'
      }
    }
  },
  isMultiSelectGroup: true
};
const pagePropsWithInboundDirection = {
  ...pageProps,
  params: {
    direction: 'inbound',
    paxType: 'adult'
  }
};
const corporateProps = {
  selectedCompanyName: 'Dunder Mifflin Paper Company'
};
const withoutSwitchProps = {
  searchRequest: { ...searchFlightRequest, numberOfLapInfants: 1 }
};

const store = createMockedFormStore();
const webViewStore = createMockedFormStore({
  app: {
    webView: {
      isWebView: true
    }
  }
});

storiesOf('pages/airBooking/flightShoppingPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(withFakeClock('2018-01-01'))
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <EnhancedFlightShoppingPage {...pageProps} />;
  })
  .add('corporateBooking', () => {
    return <EnhancedFlightShoppingPage {..._.merge({}, pageProps, corporateProps)} />;
  })
  .add('without money/points switch', () => {
    return <EnhancedFlightShoppingPage {..._.merge({}, pageProps, withoutSwitchProps)} />;
  })
  .add('with multiSelectGroup bound', () => {
    return (
      <EnhancedFlightShoppingPage {..._.merge({}, pagePropsWithMultiSelectGroupWithoutBound, withoutSwitchProps)} />
    );
  })
  .add('with multiSelectGroup bound unavailable', () => {
    return (
      <EnhancedFlightShoppingPage
        {..._.merge(
          {},
          {
            ...pagePropsWithMultiSelectGroupWithoutBound,
            multiSelectGroupState: {
              ...pagePropsWithMultiSelectGroupWithoutBound.multiSelectGroupState,
              unavailableGroup: [{ origin: 'MDW', destination: 'BOS' }]
            }
          },
          withoutSwitchProps
        )}
      />
    );
  })
  .add('with multiSelectGroup bound selected', () => {
    return (
      <EnhancedFlightShoppingPage
        {..._.merge({}, pagePropsWithMultiSelectGroupWithBoundSelected, withoutSwitchProps)}
      />
    );
  })
  .add('with top placement for outbound flow', () => {
    return <EnhancedFlightShoppingPage {..._.merge({}, pageProps, withTopPlacement)} />;
  })
  .add('with bottom placement for outbound flow', () => {
    return <EnhancedFlightShoppingPage {..._.merge({}, pageProps, withBottomPlacement)} />;
  })
  .add('with both placements for outbound flow', () => {
    return <EnhancedFlightShoppingPage {..._.merge({}, pageProps, withBothPlacements)} />;
  })
  .add('with top placement for inbound flow', () => {
    return <EnhancedFlightShoppingPage {..._.merge({}, pagePropsWithInboundDirection, withTopPlacement)} />;
  })
  .add('with bottom placement for inbound flow', () => {
    return <EnhancedFlightShoppingPage {..._.merge({}, pagePropsWithInboundDirection, withBottomPlacement)} />;
  })
  .add('with both placements for inbound flow', () => {
    return <EnhancedFlightShoppingPage {..._.merge({}, pagePropsWithInboundDirection, withBothPlacements)} />;
  });

storiesOf('pages/airBooking/flightShoppingPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(withFakeClock('2018-01-01'))
  .addDecorator(StoryReduxProvider(webViewStore))
  .add('ipad webview', () => {
    return <EnhancedWebViewFlightShoppingPage {...pageProps} />;
  });
