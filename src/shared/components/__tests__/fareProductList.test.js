import { render } from '@testing-library/react';
import React from 'react';
import FareProductList from 'src/shared/components/fareProductList';
import FlightProductBuilder from 'test/builders/model/flightProductBuilder';
import ProductsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/productsBuilder';

describe('FlightNumber', () => {
  it('should match the snapshot', () => {
    const fares = new FlightProductBuilder().build().fares;
    const { productDefinitions } = new ProductsBuilder().withProductDefinitions().build().flightShoppingPage;

    const props = {
      fares,
      productDefinitions,
      onFareSelected: () => {},
      isPromoCodeApplied: false
    };
    const { container } = createComponent(props);

    expect(container).toMatchSnapshot();
  });
});

const createComponent = (props) => render(<FareProductList {...props} />);
