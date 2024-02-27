import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryRouter from 'storybook-router';

import FlightProductSection from 'src/shared/components/flightProductSection';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { withFakeClock } from 'storybook/libs/withFakeClock';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import ProductsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/productsBuilder';
import { generateFlightShoppingPages } from 'src/airBooking/helpers/flightShoppingPageHelper';
import productDefinitions from 'mocks/templates/productDefinitions';
import FlightProductBuilder from 'test/builders/model/flightProductBuilder';

const EnhancedFlightProductSection = withBodyClass('flight-product-section')(FlightProductSection);

const response = new ProductsBuilder().withSelectedData('2018-01-01').build();
const pages = generateFlightShoppingPages(response);

const diffCard = new FlightProductBuilder(0).withPoints(0).build();

const pageProps = {
  productDefinition: productDefinitions.products[0],
  fareProduct: pages[0].cards[0].fares[0],
  canBeSelected: true,
  showPriceDifference: false
};

const priceDiffProps = {
  productDefinition: productDefinitions.products[0],
  fareProduct: diffCard.fares[0],
  canBeSelected: true,
  showPriceDifference: true
};

const pointsProps = {
  productDefinition: productDefinitions.products[3],
  fareProduct: pages[0].cards[2].fares[2],
  canBeSelected: true,
  showPriceDifference: false
};

const pointsWithPromoProps = {
  ...pointsProps,
  isPromoCodeApplied: true,
  showPriceDifference: false
};

const unavailableProps = {
  productDefinition: productDefinitions.products[0],
  fareProduct: null,
  unavailableDefault: 'Sold Out'
};

const dynamicBrandColorProps = {
  ...pageProps,
  productDefinition: {
    ...productDefinitions.products[0],
    primaryThemeColor: 'primary-red'
  }
};

const dynamicBrandColorOverrideProps = {
  ...pageProps,
  productDefinition: {
    ...productDefinitions.products[0],
    primaryThemeColor: 'primary-red',
    primaryThemeHexColor: '#FF00FF'
  }
};

const store = createMockedFormStore();

const createComponent = (childProps) => {
  return (
    <div className="bgwhite black">
      <EnhancedFlightProductSection {...childProps} />
    </div>
  );
};

storiesOf('components/flightProductSection', module)
  .addDecorator(StoryRouter())
  .addDecorator(withFakeClock('2018-01-01'))
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => createComponent(pageProps))
  .add('price-diff', () => createComponent(priceDiffProps))
  .add('points', () => createComponent(pointsProps))
  .add('points-with-promo', () => createComponent(pointsWithPromoProps))
  .add('unavailable', () => createComponent(unavailableProps))
  .add('dynamic-brand-colors', () => createComponent(dynamicBrandColorProps))
  .add('dynamic-brand-colors-hex-override', () => createComponent(dynamicBrandColorOverrideProps));
