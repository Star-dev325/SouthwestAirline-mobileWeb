import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import * as CarBookingActions from 'src/carBooking/actions/carBookingActions';
import CrossSellCarLink from 'src/wcm/components/crossSellCarLink';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils';

describe('CrossSellCarLink', () => {
  let carBookingLinkQueryMock;
  let isWebViewMock;
  let prepareCarCrossSellFromQueryAndTransitionToCarBookingFnMock;

  beforeEach(() => {
    carBookingLinkQueryMock = {
      'pickup-location': 'DAL',
      'return-location': 'AUS',
      'pickup-datetime': '2017-12-18T11:30',
      'return-datetime': '2017-12-20T11:30'
    };
    isWebViewMock = false;
    prepareCarCrossSellFromQueryAndTransitionToCarBookingFnMock = jest.spyOn(
      CarBookingActions,
      'prepareCarCrossSellFromQueryAndTransitionToCarBooking'
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render CrossSellCarLink with children and call prepareCarCrossSellFromQueryAndTransitionToCarBookingFn with Mock params', () => {
    const { container } = createComponent();
    const crossSellCarLink = container.querySelector('[data-qa="cross-sell-car-link"]');
  
    expect(crossSellCarLink).toMatchSnapshot();
  
    fireEvent.click(crossSellCarLink);
  
    waitFor(() => {
      expect(prepareCarCrossSellFromQueryAndTransitionToCarBookingFnMock).toHaveBeenCalledWith(carBookingLinkQueryMock, isWebViewMock);
    });
  });  

  const createComponent = (props = {}) => {
    const defaultProps = {
      children: <div />,
      carBookingLinkQuery: carBookingLinkQueryMock,
      isWebView: isWebViewMock,
      prepareCarCrossSellFromQueryAndTransitionToCarBookingFn: prepareCarCrossSellFromQueryAndTransitionToCarBookingFnMock
    };

    return integrationRender()({}, CrossSellCarLink, { ...defaultProps, ...props });
  };
});