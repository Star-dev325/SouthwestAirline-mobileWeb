import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import React from 'react';
import _ from 'lodash';
import { withFakeClock } from 'storybook/libs/withFakeClock';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { CarShoppingResultsPage } from 'src/carBooking/pages/carShoppingResultsPage';
import CarShoppingSearchBuilder from 'test/builders/apiResponse/v1/mobile-misc/feature/cars/products/carShoppingSearchBuilder';
import * as CarVendorsBuilder from 'test/builders/model/carVendorsBuilder';
import { transformShoppingResponse } from 'src/shared/api/transformers/carBookingApiTransformers';
import * as CarResultsBuilder from 'test/builders/model/carResultsBuilder';

const EnhancedCarShoppingResultsPage = withBodyClass('car-shopping--results')(CarShoppingResultsPage);
const EnhancedWebViewCarShoppingResultsPage = withBodyClass(['car-shopping--results', 'is-webview'])(
  CarShoppingResultsPage
);
const chapiResponse = transformShoppingResponse(new CarShoppingSearchBuilder().build());
const findCarResponse = chapiResponse.carProducts;
const carVendorImages = [];
const carResults = CarResultsBuilder.build();

const defaultProps = {
  searchRequest: {
    pickUpDate: '2019-03-23',
    dropOffDate: '2019-03-26',
    pickUp: 'ABI',
    dropOff: 'ABI',
    pickUpTime: '11:30AM',
    dropOffTime: '11:30AM',
    carCompany: 'Shop all',
    discount: [],
    vehicleType: 'Mid-size',
    pickUpAirport: {
      airport: {
        code: 'ABI'
      },
      city: 'Abilene'
    }
  },
  findCarResponse,
  carVendors: CarVendorsBuilder.build(),
  carVendorImages,
  promoCodesResponse: [],
  carResults,
  saveCarSearchRequestFn: _.noop,
  retrieveCarPricingFn: _.noop,
  saveCarResultsFn: _.noop,
  location: {
    pathname: '/car/booking/results',
    search: ''
  },
  match: {
    params: '',
    isExact: false,
    path: '',
    url: ''
  }
};

const propsWithWebView = _.merge({}, defaultProps, {
  isWebView: true
});

const discount = [
  {
    code: '65688',
    type: 'CORPORATE_RATE',
    vendor: 'HERTZ',
    vendorName: 'Hertz'
  },
  {
    code: 'ABC123',
    type: 'CORPORATE_RATE',
    vendor: 'AVIS',
    vendorName: 'Avis'
  }
];

const promoCodesResponse = [
  {
    code: '65688',
    promoCodeApplied: true,
    type: 'CORPORATE_RATE',
    vendor: 'HERTZ'
  },
  {
    code: 'ABC123',
    promoCodeApplied: false,
    type: 'CORPORATE_RATE',
    vendor: 'AVIS'
  }
];

const store = {
  app: {
    webView: {
      isWebView: true
    }
  }
};

storiesOf('pages/carBooking/carShoppingResultsPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(withFakeClock('2019-03-22'))
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <EnhancedCarShoppingResultsPage {...defaultProps} />;
  })
  .add('with valid and invalid promo codes', () => {
    const props = _.cloneDeep(defaultProps);
    _.set(props, 'searchRequest.discount', discount);
    _.set(props, 'promoCodesResponse', promoCodesResponse);
    return <EnhancedCarShoppingResultsPage {...props} />;
  });

storiesOf('pages/carBooking/carShoppingResultsPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(withFakeClock('2019-03-22'))
  .addDecorator(StoryReduxProvider(createMockedFormStore(store)))
  .add('webview', () => {
    return <EnhancedWebViewCarShoppingResultsPage {...propsWithWebView} />;
  });
